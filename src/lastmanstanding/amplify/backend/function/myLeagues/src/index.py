import json
import boto3
from boto3.dynamodb.conditions import Key

def queryPlayerDB(tableName, result):
	playerData = tableName.query(
		KeyConditionExpression=Key('Sub').eq(result['sub'])
	)
	resp = playerData['Items']

	return resp[0]['leagueIDs']

def queryLeaguePlayerDB(tableName, result, leagueIDs):
	resList = []
	# Get info from all of users leagues
	for league in leagueIDs:
		data = tableName.query(
			KeyConditionExpression=Key('LeaguePlayerID').eq(league + "/" + result['sub'])
		)
		resList.append(data['Items'])
	
	return resList

def handler(event, context):
	dynamodb = boto3.resource('dynamodb', 'eu-west-1')
	result = json.loads(event['body'])

	# Query Player DB for active leagues
	playerDB = dynamodb.Table('PlayerDB-develop')
	leagueIDs = queryPlayerDB(playerDB, result)

	# Get information from each League
	leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
	resList = queryLeaguePlayerDB(leaguePlayerDB, result, leagueIDs)

	return {
		'statusCode': 200,
		'headers': {
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
		},
		'body': json.dumps(resList)
	}
