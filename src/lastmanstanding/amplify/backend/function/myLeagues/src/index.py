import json
import boto3
from boto3.dynamodb.conditions import Key

def handler(event, context):
	print('received event:')
	print(event)
	result = json.loads(event['body'])
	sub = result['sub']

	dynamodb = boto3.resource('dynamodb')
	table = dynamodb.Table('PlayerDB-dev')
	data = table.query(
	KeyConditionExpression=Key('Sub').eq(sub)
	)

	resp = data['Items']
	LeagueIDs = resp[0]['leagueIDs']

	table2 = dynamodb.Table('LeaguePlayerDB-dev')
	resList = []
	for m in LeagueIDs:
		data = table2.query(
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
