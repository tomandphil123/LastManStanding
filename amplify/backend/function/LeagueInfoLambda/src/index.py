import http.client
import json
import boto3
from datetime import datetime

def handler(event, context):
	# print('received event:')
	# print(event)

	connection = http.client.HTTPConnection('api.football-data.org')
	headers = { 'X-Auth-Token': 'f2f6419113714a1b8e549654bf734336' }
	connection.request('GET', '/v2/competitions/PL/standings', None, headers )
	response = json.loads(connection.getresponse().read().decode())
	# print(json.dumps(response))
	connection.request('GET', '/v2/competitions/PL/matches', None, headers )
	response2 = json.loads(connection.getresponse().read().decode())
	# print(json.dumps(response2))

	abbreviations = {
		'West Bromwich Albion FC': 'West Brom FC',
		'Wolverhampton Wanderers FC': 'Wolves FC',
		'Brighton & Hove Albion FC': 'Brighton FC'
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

		tableName = "PlStandingsDB-dev"
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
	
	for fixture in response2["matches"]:
		dynamodb = boto3.resource('dynamodb')
		tableName1 = "PlFixturesDB-dev"
		table1 = dynamodb.Table(tableName1)
		tableName2 = "PlResultsDB-dev"
		table2 = dynamodb.Table(tableName2)
		if fixture["matchday"] > fixture["season"]["currentMatchday"] + 2:
			break

		if fixture["matchday"] == fixture["season"]["currentMatchday"] - 1:
			homeTeam = fixture["homeTeam"]["name"]
			awayTeam = fixture["awayTeam"]["name"]
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
			else:
				winner = fixture["awayTeam"]["name"]

			table2.put_item(
				Item={
					'HomeTeam': homeTeam,
					'AwayTeam': awayTeam,
					'GameWeek': str(gameWeek),
					'Winner': winner,
					'HomeScore': str(homeTeamScore),
					'AwayScore': str(awayTeamScore),
					'createdTime': str(datetime.today())
				}
			)
		
		if fixture["matchday"] == fixture["season"]["currentMatchday"]:
			homeTeam = fixture["homeTeam"]["name"]
			awayTeam = fixture["awayTeam"]["name"]
			if homeTeam in abbreviations:
				homeTeam = abbreviations[homeTeam]
			if awayTeam in abbreviations:
				awayTeam = abbreviations[awayTeam]
			gameWeek = fixture["season"]["currentMatchday"]
			table1.put_item(
				Item={
					'HomeTeam': homeTeam,
					'AwayTeam': awayTeam,
					'GameWeek': str(gameWeek),
					'createdTime': str(datetime.today())
				}
			)

	return {
	'message': 'Hello from your new Amplify Python lambda!'
	}
