import json
import boto3
from boto3.dynamodb.conditions import Key

def handler(event, context):
	print('received event:')
	print(event)
	result = json.loads(event['body'])
	sub = result['sub']

	dynamodb = boto3.resource('dynamodb', 'eu-west-1')

	# Query Player DB for active leagues
	Ptable = dynamodb.Table('PlayerDB-develop')
	playerData = Ptable.query(
	KeyConditionExpression=Key('Sub').eq(sub)
	)
	resp = playerData['Items']
	LeagueIDs = resp[0]['leagueIDs']

	# Get information from each League
	LPtable = dynamodb.Table('LeaguePlayerDB-develop')
	resList = []
	for m in LeagueIDs:
		data = LPtable.query(
			KeyConditionExpression=Key('LeaguePlayerID').eq(m + "/" + sub)
		)
		resList.append(data['Items'])


	return {
		'statusCode': 200,
		'headers': {
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
		},
		'body': json.dumps(resList)
	}
