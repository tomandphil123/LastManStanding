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

	return {
	'statusCode': 200,
	'headers': {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
	},
	'body': "hello tom"
	}
