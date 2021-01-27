import json
import boto3
from boto3.dynamodb.conditions import Key

def handler(event, context):
	print('received event:')
	print(event)
	result = json.loads(event['body'])
	leagueID = result['leagueId']

	dynamodb = boto3.resource('dynamodb')

	# Query to get all players in a league
	LPtable = dynamodb.Table('LeaguePlayerDB-develop')
	leagueData = LPtable.query(
		IndexName = 'LeagueID-LeaguePlayerID-index',
		KeyConditionExpression=Key('LeagueID').eq(leagueID)
	)


	return {
		'statusCode': 200,
		'headers': {
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
		},
		'body': json.dumps(leagueData['Items'])
	}
