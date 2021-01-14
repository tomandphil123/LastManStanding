import json
from datetime import datetime
import boto3
from random import randint

def handler(event, context):
	result = json.loads(event['body'])

	leagueID = result['leagueName'] +"-"+ str(randint(100000, 999999))
	leagueName = result['leagueName']
	admin = result['sub']
	createdDate = str(datetime.today())
	invitationCode = str(randint(100000, 999999))
	username = result['username']

	dynamodb = boto3.resource('dynamodb')

	tableName = "LeaguesDB-dev"
	table = dynamodb.Table(tableName)

	table.put_item(
			Item={
				'LeagueID': leagueID,
				'LeagueName': leagueName,
				'admin': admin,
				'createdTime': createdDate,
				'invitationCode': invitationCode
			})

	leaguePlayerID = leagueID +'/'+ result['sub']

	dynamodb = boto3.resource('dynamodb')

	tableName2 = "LeaguePlayerDB-dev"
	table2 = dynamodb.Table(tableName2)

	table2.put_item(
			Item={
				'LeaguePlayerID': leaguePlayerID,
				'LeagueID': leagueID,
				'CurrentPick': " ",
				'PickedTeams': [],
				'Admin': "Yes",
				'Username': username,
				'Status': "In",
				'createdTime': createdDate,
				'UnpickedTeams': []
			})

	return {
	'statusCode': 200,
	'headers': {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
	},
	'body': "hello tom"
	}
