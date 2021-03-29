import json
import boto3
from boto3.dynamodb.conditions import Key

def queryDB(tableName, leagueID):
	leagueData = tableName.query(
		KeyConditionExpression=Key('LeagueID').eq(leagueID)
	)
	return leagueData['Items']

def queryWithIndex(tableName, indexName, leagueID):
	leaguePlayerData = tableName.query(
		IndexName = indexName,
		KeyConditionExpression=Key('LeagueID').eq(leagueID)
	)
	return leaguePlayerData['Items']


def handler(event, context):
	print('received event:')
	print(event)
	result = json.loads(event['body'])
	leagueID = result['leagueId']
	ret_lst = []

	dynamodb = boto3.resource('dynamodb', 'eu-west-1')

	# Query to get all players in a league
	LPtable = dynamodb.Table('LeaguePlayerDB-develop')
	leaguePlayerData = queryWithIndex(LPtable, 'LeagueID-LeaguePlayerID-index', leagueID)

	# Sort list of players by status
	leaguePlayerData.sort(key=lambda s: s['playerStatus'])
	ret_lst.append(leaguePlayerData)

	# Get deague data
	Ltable = dynamodb.Table('LeaguesDB-develop')
	leagueData = queryDB(Ltable, leagueID)
	ret_lst.append(leagueData)

	return {
		'statusCode': 200,
		'headers': {
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
		},
		'body': json.dumps(ret_lst)
	}
