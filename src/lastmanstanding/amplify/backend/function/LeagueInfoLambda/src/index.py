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

	for team in response["standings"][0]["table"]:
		if team["team"]["name"] in abbreviations:
			TeamName = abbreviations[team["team"]["name"]]
		else:
			TeamName = team["team"]["name"]
		# print(TeamName)
		position = team["position"]
		crestUrl = team["team"]["crestUrl"]
		gamesPlayed = team["playedGames"]
		won = team["won"]
		draw = team["draw"]
		lost = team["lost"]
		points = team["points"]
		goalDifference = team["goalDifference"]

		dynamodb = boto3.resource('dynamodb')

		tableName = "PlStandingsDB-develop"
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
	tableName1 = "PLFixturesDB-develop"
	FixturesTable = dynamodb.Table(tableName1)
	tableName2 = "PLResultsDB-develop"
	ResultsTable = dynamodb.Table(tableName2)
	scan2 = FixturesTable.scan()
	with FixturesTable.batch_writer() as batch:
		for each in scan2['Items']:
			batch.delete_item(Key={'FixtureID':each['FixtureID']})
			
	scan1 = ResultsTable.scan()
	with ResultsTable.batch_writer() as batch:
		for each in scan1['Items']:
			batch.delete_item(Key={'MatchID':each['MatchID']})
			
	for fixture in response2["matches"]:
		if fixture["matchday"] > fixture["season"]["currentMatchday"] + 2:
			break

		if fixture["matchday"] == fixture["season"]["currentMatchday"] - 1:
			homeTeam = fixture["homeTeam"]["name"]
			homeTeamCrest1 = crests[homeTeam]
			awayTeam = fixture["awayTeam"]["name"]
			awayTeamCrest1 = crests[awayTeam]
			if homeTeam in abbreviations:
				homeTeam = abbreviations[homeTeam]
			if awayTeam in abbreviations:
				awayTeam = abbreviations[awayTeam]

			gameWeek = fixture["season"]["currentMatchday"]
			homeTeamScore = fixture["score"]["fullTime"]["homeTeam"]
			awayTeamScore = fixture["score"]["fullTime"]["awayTeam"]
			if homeTeamScore == None and awayTeamScore == None:
				homeTeamScore = "-"
				awayTeamScore = "-"
			if fixture["score"]["winner"] == "HOME_TEAM":
				winner = fixture["homeTeam"]["name"]
			elif fixture["score"]["winner"] == "AWAY_TEAM":
				winner = fixture["awayTeam"]["name"]
			else:
				winner = "Draw"

			ResultsTable.put_item(
				Item={
					'MatchID': homeTeam + "-" + awayTeam,
					'HomeTeam': homeTeam,
					'HomeTeamCrest': homeTeamCrest1,
					'AwayTeam': awayTeam,
					'AwayTeamCrest': awayTeamCrest1,
					'GameWeek': str(gameWeek),
					'Winner': winner,
					'HomeScore': str(homeTeamScore),
					'AwayScore': str(awayTeamScore),
					'createdTime': str(datetime.today())
				}
			)
		
		if fixture["matchday"] == 26:
			startTime = fixture["utcDate"].split("T")[1].split(":")
			startTime2 = startTime[0]+":"+startTime[1]
			startDate = fixture["utcDate"].split("T")[0]
			# print(startTime2)
			homeTeam = fixture["homeTeam"]["name"]
			homeTeamCrest2 = crests[homeTeam]
			awayTeam = fixture["awayTeam"]["name"]
			awayTeamCrest2 = crests[awayTeam]
			if homeTeam in abbreviations:
				homeTeam = abbreviations[homeTeam]
			if awayTeam in abbreviations:
				awayTeam = abbreviations[awayTeam]
			gameWeek = fixture["season"]["currentMatchday"]


			FixturesTable.put_item(
				Item={
					'FixtureID': homeTeam + "-" + awayTeam,
					'HomeTeam': homeTeam,
					'HomeTeamCrest': homeTeamCrest2,
					'AwayTeam': awayTeam,
					'AwayTeamCrest': awayTeamCrest2,
					'GameWeek': str(gameWeek),
					'createdTime': str(datetime.today()),
					'startTime': str(startTime2),
					'startDate': str(startDate)
				}
			)

	return {
	'message': 'Hello from your new Amplify Python lambda!'
	}
