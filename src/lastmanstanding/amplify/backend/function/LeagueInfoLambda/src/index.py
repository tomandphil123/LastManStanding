import http.client
import json
import boto3
from datetime import datetime
from boto3.dynamodb.conditions import Key

def scanTable(tableName):
    response = tableName.scan()
    return response['Items']

def getProbability(match):
	homeTeamOdds = match['odds']['homeWin']
	drawOdds = match['odds']['draw']
	awayTeamOdds = match['odds']['awayWin']
	
	overallOdds = 1/homeTeamOdds + 1/awayTeamOdds + 1/drawOdds
	overRound = overallOdds - 1
	
	homeTeamProb = 100 / (homeTeamOdds * 100) 
	awayTeamProb = 100 / (awayTeamOdds * 100)
	drawProb = 100 / (drawOdds * 100)
	
	homeTeamProb = (homeTeamProb - (homeTeamProb * overRound)) * 100
	awayTeamProb = (awayTeamProb - (awayTeamProb * overRound)) * 100
	drawProb = (drawProb - (drawProb * overRound)) * 100
				
	return [homeTeamProb, drawProb, awayTeamProb]

def createCron(client, myCron):
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
		print('Error occured, but dont worry about it.')
	
	return 'Successfully set up cron'

def createEmailCron(client, myEmailCron):
	rule = client.put_rule(
		Name="MyRuleId2",
		ScheduleExpression=myEmailCron,
		State="ENABLED",
	)
	client.put_targets(
		Rule="MyRuleId2",
		Targets=[
			{
				"Id": "MyTargetId2",
				"Arn": "arn:aws:lambda:eu-west-1:706350010776:function:deadlineReminder-develop",
			}
		]
	)
	try:
		client.add_permission(
			FunctionName="arn:aws:lambda:eu-west-1:706350010776:function:deadlineReminder-develop",
			StatementId="MyRuleID2",
			Action="lambda:InvokeFunction",
			Principal="events.amazonaws.com",
			SourceArn=rule["RuleArn"]
		)
	except:
		print('Error occured, but dont worry about it.')
	
	return 'Successfully set up email cron'

def addResults(tableName, match, homeTeam, awayTeam, crests, currentGameWeek, winner):
	tableName.put_item(
		Item={
			'MatchID': homeTeam + '-' + awayTeam,
			'HomeTeam': homeTeam,
			'HomeTeamCrest': crests[homeTeam],
			'AwayTeam': awayTeam,
			'AwayTeamCrest': crests[awayTeam],
			'GameWeek': str(currentGameWeek),
			'Winner': winner,
			'HomeScore': str(match['score']['fullTime']['homeTeam']),
			'AwayScore': str(match['score']['fullTime']['awayTeam']),
			'createdTime': str(datetime.today())
		}
	)
	return 'Added results'

def addFixtures(tableName, homeTeam, awayTeam, crests, nextGameWeek, startTime, startDate, probabilities):
	tableName.put_item(
		Item={
			'FixtureID': homeTeam + '-' + awayTeam,
			'HomeTeam': homeTeam,
			'HomeTeamCrest': crests[homeTeam],
			'AwayTeam': awayTeam,
			'AwayTeamCrest': crests[awayTeam],
			'GameWeek': str(nextGameWeek),
			'createdTime': str(datetime.today()),
			'startTime': str(startTime),
			'startDate': str(startDate),
			'homeTeamProb': str(round(probabilities[0])),
			'awayTeamProb': str(round(probabilities[2])),
			'drawProb': str(round(probabilities[1]))
		}
	)
	return 'Added fixtures'

def removeExistingDbItems(tableName, response, dbKey):
	with tableName.batch_writer() as batch:
		for each in response:
			batch.delete_item(Key={dbKey :each[dbKey]})
	return 'Removed all items from DB'

def updatedStandingsDB(tableName, team, TeamName):
	tableName.put_item(
		Item={
		'TeamName': TeamName,
		'position': str(team['position']),
		'crestUrl': team['team']['crestUrl'],
		'gamesPlayed': str(team['playedGames']),
		'won': str(team['won']),
		'draw': str(team['draw']),
		'lost': str(team['lost']),
		'points': str(team['points']),
		'goalDifference': str(team['goalDifference']),
		'createdTime': str(datetime.today())
		}
	)
	return 'Successfully updated standings'

def updateSchedulerDB(tableName, nextGameWeek, currentGameWeek, firstGameTime, lastMatch, lastMatchStartTime, deadline, firstGameDate):
	tableName.update_item(
		Key={
		'GamePeriod': 'Testing'
		},
		UpdateExpression='set CurrentGameWeek=:val1, FirstGameTime=:val2, NextGameWeek=:val3, PreviousGameWeek=:val4, LastGame=:val5, LastMatchStartTime=:val6, Deadline=:val7',
		ExpressionAttributeValues={
			':val1': str(nextGameWeek),
			':val2': str(firstGameTime),
			':val3': str(int(nextGameWeek)+1),
			':val4': str(currentGameWeek),
			':val5': str(lastMatch),
			':val6': str(lastMatchStartTime),
			':val7': str(deadline + " " + firstGameDate)
		},
		ReturnValues='UPDATED_NEW'
	)
	return 'Successfully updated scheduler'

def handler(event, context):
	dynamodb = boto3.resource('dynamodb', 'eu-west-1')
	connection = http.client.HTTPConnection('api.football-data.org')
	headers = { 'X-Auth-Token': 'f2f6419113714a1b8e549654bf734336' }

	connection.request('GET', '/v2/competitions/PL/standings', None, headers )
	standingsResponse = json.loads(connection.getresponse().read().decode())
	connection.request('GET', '/v2/competitions/PL/matches', None, headers )
	matchesResponse = json.loads(connection.getresponse().read().decode())

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
		'Wolves FC':'https://crests.football-data.org/76.svg',
		'Newcastle United FC':'https://crests.football-data.org/67.svg',
		'Brighton FC':'https://crests.football-data.org/397.svg',
		'Burnley FC':'https://crests.football-data.org/328.svg',
		'Fulham FC':'https://crests.football-data.org/63.svg',
		'West Brom FC': 'https://crests.football-data.org/74.svg',
	}

	schedulerDB = dynamodb.Table('SchedulerDB-develop')
	scheduler = scanTable(schedulerDB)

	currentGameWeek = scheduler[0]['CurrentGameWeek']
	nextGameWeek = scheduler[0]['NextGameWeek']
	lastMatch = scheduler[0]['LastGame']
	lastMatchStartTimer = scheduler[0]['LastMatchStartTime']
	updateTime = int(lastMatchStartTimer.split(':')[0]) + 3

	now = datetime.now()
	current_time = now.strftime("%H:%M:%S")
	currTime = current_time.split(':')[0]

	# check if API has been updated
	updated = False
	for match in matchesResponse['matches']:
		if int(currTime) >= updateTime and str(match['matchday']) == str(currentGameWeek) and str(match['homeTeam']['name']) == str(lastMatch) and str(match['score']['fullTime']['homeTeam']) != 'None':
			updated = True
			break

	# update DBs if API has been updated
	if updated == True:
		for match in matchesResponse['matches']:
			if str(match['matchday']) == str(nextGameWeek):
				firstGame = match['utcDate'].split('T')[1].split(':')
				firstGameTime = str(int(firstGame[0]) + 1) + ':' + firstGame[1]
				deadline = str(int(firstGame[0]) - 1) + ':' + firstGame[1]
				firstGameDate = match['utcDate'].split('T')[0]
				break

		for team in standingsResponse['standings'][0]['table']:
			if team['team']['name'] in abbreviations:
				TeamName = abbreviations[team['team']['name']]
			else:
				TeamName = team['team']['name']

            # update standings
			standingsDB = dynamodb.Table('PlStandingsDB-develop')
			updatedStandingsDB(standingsDB, team, TeamName)

		FixturesDB = dynamodb.Table('PLFixturesDB-develop')
		ResultsDB = dynamodb.Table('PLResultsDB-develop')
		
        # remove existing fixtures and results
		fixturesResponse = scanTable(FixturesDB)
		removeExistingDbItems(FixturesDB, fixturesResponse, 'FixtureID')
				
		resultsResponse = scanTable(ResultsDB)
		removeExistingDbItems(ResultsDB, resultsResponse, 'MatchID')

		for match in matchesResponse['matches']:
			# Results
			if str(match['matchday']) == str(currentGameWeek):
				homeTeam = match['homeTeam']['name']
				awayTeam = match['awayTeam']['name']
				if homeTeam in abbreviations:
					homeTeam = abbreviations[homeTeam]
				if awayTeam in abbreviations:
					awayTeam = abbreviations[awayTeam]

                # if match postponed set scores to null
				homeTeamScore = match['score']['fullTime']['homeTeam']
				awayTeamScore = match['score']['fullTime']['awayTeam']
				if homeTeamScore == None and awayTeamScore == None:
					homeTeamScore = '-'
					awayTeamScore = '-'
				if match['score']['winner'] == 'HOME_TEAM':
					winner = match['homeTeam']['name']
				elif match['score']['winner'] == 'AWAY_TEAM':
					winner = match['awayTeam']['name']
				else:
					winner = 'Draw'

				addResults(ResultsDB, match, homeTeam, awayTeam, crests, currentGameWeek, winner)

			# Fixtures
			if str(match['matchday']) == str(nextGameWeek):
				utcDateTime = match['utcDate'].split('T')[1].split(':')
				startTime = str(int(utcDateTime[0]) + 1) +':'+ utcDateTime[1]
				startDate = match['utcDate'].split('T')[0]

				homeTeam = match['homeTeam']['name']
				awayTeam = match['awayTeam']['name']

				# store tmp value
				lastMatch = match['homeTeam']['name']
				lastMatchTime = match['utcDate'].split('T')[1].split(':')
				lastMatchStartTime = str(int(lastMatchTime[0]) + 1) +':'+ lastMatchTime[1]

				# get probabilities of match
				probabilities = getProbability(match)
				
				# check if its a long team name
				if homeTeam in abbreviations:
					homeTeam = abbreviations[homeTeam]
				if awayTeam in abbreviations:
					awayTeam = abbreviations[awayTeam]

				# add fixtures to DB
				addFixtures(FixturesDB, homeTeam, awayTeam, crests, nextGameWeek, startTime, startDate, probabilities)

		# update sheduler DB
		updateSchedulerDB(schedulerDB, nextGameWeek, currentGameWeek, firstGameTime, lastMatch, lastMatchStartTime, deadline, firstGameDate)

		# set up cron
		minutes = firstGameTime.split(':')[1]
		hours = firstGameTime.split(':')[0]
		hours = str(int(hours) - 2)
		dayOfMonth = firstGameDate.split('-')[2]
		month = firstGameDate.split('-')[1]
		year = firstGameDate.split('-')[0]
		myCron = "cron({} {} {} {} ? {})".format(minutes,hours,dayOfMonth,month,year)

		# create cron 
		client = boto3.client('events')
		createCron(client, myCron)

		# set up email cron for reminding about deadline
		emailHours = str(int(hours)-1)
		myEmailCron = "cron({} {} {} {} ? {})".format(minutes,emailHours,dayOfMonth,month,year)
		createEmailCron(client, myEmailCron)

		# lambda_client = boto3.client('lambda')
		# lambda_client.invoke(
		# 	FunctionName = 'arn:aws:lambda:eu-west-1:706350010776:function:unlockLeagues-develop',
		# )

	return {
	'message': 'Updated!'
	}
