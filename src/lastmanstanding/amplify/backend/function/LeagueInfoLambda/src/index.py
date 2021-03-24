import http.client
import json
import boto3
from datetime import datetime
from boto3.dynamodb.conditions import Key

def handler(event, context):
	# print('received event:')
	# print(event)
	connection = http.client.HTTPConnection('api.football-data.org')
	headers = { 'X-Auth-Token': 'f2f6419113714a1b8e549654bf734336' }
	connection.request('GET', '/v2/competitions/PL/standings', None, headers )
	response = json.loads(connection.getresponse().read().decode())
	connection.request('GET', '/v2/competitions/PL/matches', None, headers )
	response2 = json.loads(connection.getresponse().read().decode())
	print(response2)
	abbreviations = {
		'West Bromwich Albion FC': 'West Brom FC',
		'Wolverhampton Wanderers FC': 'Wolves FC',
		'Brighton & Hove Albion FC': 'Brighton FC'
	}

	crests = {
		'Manchester United FC':'https://crests.football-data.org/66.svg',
		'Manchester City FC':'https://crests.football-data.org/65.svg',
		'Leicester City FC':'https://crests.football-data.org/338.svg',
		'Liverpool FC':'https://crests.football-data.org/64.svg',
		'Tottenham Hotspur FC':'https://crests.football-data.org/73.svg',
		'Everton FC':'https://crests.football-data.org/62.svg',
		'Chelsea FC':'https://crests.football-data.org/61.svg',
		'Southampton FC':'https://crests.football-data.org/340.svg',
		'West Ham United FC':'https://crests.football-data.org/563.svg',
		'Sheffield United FC':'https://crests.football-data.org/356.svg',
		'Arsenal FC':'https://crests.football-data.org/57.svg',
		'Aston Villa FC':'https://crests.football-data.org/58.svg',
		'Leeds United FC':'https://crests.football-data.org/341.svg',
		'Crystal Palace FC':'https://crests.football-data.org/354.svg',
		'Wolverhampton Wanderers FC':'https://crests.football-data.org/76.svg',
		'Newcastle United FC':'https://crests.football-data.org/67.svg',
		'Brighton & Hove Albion FC':'https://crests.football-data.org/397.svg',
		'Burnley FC':'https://crests.football-data.org/328.svg',
		'Fulham FC':'https://crests.football-data.org/63.svg',
		'West Bromwich Albion FC': 'https://crests.football-data.org/74.svg',
	}

	dynamodb = boto3.resource('dynamodb')
	schedulerDB = 'SchedulerDB-develop'
	schedulerTable = dynamodb.Table(schedulerDB)
	schedulerScan = schedulerTable.scan()
	scheduler = schedulerScan['Items']
	currentGameWeek = scheduler[0]['CurrentGameWeek']
	previousGameWeek = scheduler[0]['PreviousGameWeek']
	nextGameWeek = scheduler[0]['NextGameWeek']
	lastMatch = scheduler[0]['LastGame']
	print(currentGameWeek)
	print(lastMatch)
	
	currWeek = response2['matches'][0]['season']['currentMatchday']
	updated = False
	
	for fixture in response2['matches']:
		if str(fixture['matchday']) == str(currentGameWeek) and str(fixture['homeTeam']['name']) == str(lastMatch) and str(fixture['score']['fullTime']['homeTeam']) != 'None':
			updated = True
			break

	if updated == True:
		for fixture in response2['matches']:
			if str(fixture['matchday']) == str(nextGameWeek):
				firstGame = fixture['utcDate'].split('T')[1].split(':')
				firstGameTime = str(int(firstGame[0]) + 1) + ':' + firstGame[1]
				deadline = str(int(firstGame[0]) - 1) + ':' + firstGame[1]
				print(deadline)
				firstGameDate = fixture['utcDate'].split('T')[0]
				break

		for team in response['standings'][0]['table']:
			if team['team']['name'] in abbreviations:
				TeamName = abbreviations[team['team']['name']]
			else:
				TeamName = team['team']['name']
			position = team['position']
			crestUrl = team['team']['crestUrl']
			gamesPlayed = team['playedGames']
			won = team['won']
			draw = team['draw']
			lost = team['lost']
			points = team['points']
			goalDifference = team['goalDifference']


			tableName = 'PlStandingsDB-develop'
			table = dynamodb.Table(tableName)

			table.put_item(
				Item={
					'TeamName': TeamName,
					'position': str(position),
					'crestUrl': crestUrl,
					'gamesPlayed': str(gamesPlayed),
					'won': str(won),
					'draw': str(draw),
					'lost': str(lost),
					'points': str(points),
					'goalDifference': str(goalDifference),
					'createdTime': str(datetime.today())
				}
			)
		
		dynamodb = boto3.resource('dynamodb')
		tableName1 = 'PLFixturesDB-develop'
		FixturesTable = dynamodb.Table(tableName1)
		tableName2 = 'PLResultsDB-develop'
		ResultsTable = dynamodb.Table(tableName2)
		
		scan2 = FixturesTable.scan()
		with FixturesTable.batch_writer() as batch:
			for each in scan2['Items']:
				batch.delete_item(Key={'FixtureID':each['FixtureID']})
				
		scan1 = ResultsTable.scan()
		with ResultsTable.batch_writer() as batch:
			for each in scan1['Items']:
				batch.delete_item(Key={'MatchID':each['MatchID']})

		for fixture in response2['matches']:
			if str(fixture['matchday']) == str(currentGameWeek):
				homeTeam = fixture['homeTeam']['name']
				
				homeTeamCrest1 = crests[homeTeam]
				awayTeam = fixture['awayTeam']['name']
				awayTeamCrest1 = crests[awayTeam]
				if homeTeam in abbreviations:
					homeTeam = abbreviations[homeTeam]
				if awayTeam in abbreviations:
					awayTeam = abbreviations[awayTeam]

				homeTeamScore = fixture['score']['fullTime']['homeTeam']
				awayTeamScore = fixture['score']['fullTime']['awayTeam']
				if homeTeamScore == None and awayTeamScore == None:
					homeTeamScore = '-'
					awayTeamScore = '-'
				if fixture['score']['winner'] == 'HOME_TEAM':
					winner = fixture['homeTeam']['name']
				elif fixture['score']['winner'] == 'AWAY_TEAM':
					winner = fixture['awayTeam']['name']
				else:
					winner = 'Draw'

				ResultsTable.put_item(
					Item={
						'MatchID': homeTeam + '-' + awayTeam,
						'HomeTeam': homeTeam,
						'HomeTeamCrest': homeTeamCrest1,
						'AwayTeam': awayTeam,
						'AwayTeamCrest': awayTeamCrest1,
						'GameWeek': str(currentGameWeek),
						'Winner': winner,
						'HomeScore': str(homeTeamScore),
						'AwayScore': str(awayTeamScore),
						'createdTime': str(datetime.today())
					}
				)
				
			if str(fixture['matchday']) == str(nextGameWeek):
				startTime = fixture['utcDate'].split('T')[1].split(':')
				startTime2 = str(int(startTime[0]) + 1) +':'+startTime[1]
				startDate = fixture['utcDate'].split('T')[0]

				homeTeam = fixture['homeTeam']['name']
				lastMatch = homeTeam
				homeTeamOdds = fixture['odds']['homeWin']
				
				drawOdds = fixture['odds']['draw']
				
				homeTeamCrest2 = crests[homeTeam]
				awayTeam = fixture['awayTeam']['name']
				awayTeamOdds = fixture['odds']['awayWin']
				
				overallOdds = 1/homeTeamOdds + 1/awayTeamOdds + 1/drawOdds
				overRound = overallOdds - 1
				
				homeTeamProb = 100 / (homeTeamOdds * 100) 
				awayTeamProb = 100 / (awayTeamOdds * 100)
				drawProb = 100 / (drawOdds * 100)
				
				homeTeamProb = (homeTeamProb - (homeTeamProb * overRound)) * 100
				awayTeamProb = (awayTeamProb - (awayTeamProb * overRound)) * 100
				drawProb = (drawProb - (drawProb * overRound)) * 100
				
				awayTeamCrest2 = crests[awayTeam]
				if homeTeam in abbreviations:
					homeTeam = abbreviations[homeTeam]
				if awayTeam in abbreviations:
					awayTeam = abbreviations[awayTeam]

				FixturesTable.put_item(
					Item={
						'FixtureID': homeTeam + '-' + awayTeam,
						'HomeTeam': homeTeam,
						'HomeTeamCrest': homeTeamCrest2,
						'AwayTeam': awayTeam,
						'AwayTeamCrest': awayTeamCrest2,
						'GameWeek': str(nextGameWeek),
						'createdTime': str(datetime.today()),
						'startTime': str(startTime2),
						'startDate': str(startDate),
						'homeTeamProb': str(round(homeTeamProb)),
						'awayTeamProb': str(round(awayTeamProb)),
						'drawProb': str(round(drawProb))
					}
				)
		
		# lambda_client = boto3.client('lambda')
		# lambda_client.invoke(
		# 	FunctionName = 'arn:aws:lambda:eu-west-1:706350010776:function:unlockLeagues-develop',
		# )
		
		schedulerTable.update_item(
			Key={
			'GamePeriod': 'Testing'
			},
			UpdateExpression='set CurrentGameWeek=:val1, FirstGameTime=:val2, NextGameWeek=:val3, PreviousGameWeek=:val4, LastGame=:val5, Deadline=:val6',
			ExpressionAttributeValues={
				':val1': str(nextGameWeek),
				':val2': str(firstGameTime),
				':val3': str(int(nextGameWeek)+1),
				':val4': str(currentGameWeek),
				':val5': str(lastMatch),
				':val6': str(deadline + " " + firstGameDate)
			},
			ReturnValues='UPDATED_NEW'
		)

		minutes = firstGameTime.split(':')[1]
		hours = firstGameTime.split(':')[0]
		hours = str(int(hours) - 2)
		print(hours)
		dayOfMonth = firstGameDate.split('-')[2]
		month = firstGameDate.split('-')[1]
		year = firstGameDate.split('-')[0]
		myCron = "cron({} {} {} {} ? {})".format(minutes,hours,dayOfMonth,month,year)
		print(myCron)

		client = boto3.client('events')
		rule = client.put_rule(
			Name="MyRuleId",
			ScheduleExpression=myCron,
			State="ENABLED",
		)
		client.put_targets(
			Rule="MyRuleId",
			Targets=[
				{
					"Id": "MyTargetId",
					"Arn": "arn:aws:lambda:eu-west-1:706350010776:function:lockLeagues-develop",
				}
			]
		)
		try:
			client.add_permission(
				FunctionName="arn:aws:lambda:eu-west-1:706350010776:function:lockLeagues-develop",
				StatementId="MyRuleID",
				Action="lambda:InvokeFunction",
				Principal="events.amazonaws.com",
				SourceArn=rule["RuleArn"]
			)
		except:
			print('Error occured')


	return {
	'message': 'Hello from your new Amplify Python lambda!'
	}

