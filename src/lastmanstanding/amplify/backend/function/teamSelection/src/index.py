import json
import boto3
from boto3.dynamodb.conditions import Key

def selectTeam(primaryKey, tableName, selectedTeam):
	tableName.update_item(
		Key={
				'LeaguePlayerID': primaryKey
			},
			UpdateExpression="set CurrentPick=:S",
			ExpressionAttributeValues={
				':S': selectedTeam
			},
			ReturnValues="UPDATED_NEW"
	)

	return 'Successful Team Selection'


def handler(event, context):
	print('received event:')
	print(event)
	result = json.loads(event['body'])
	selectedTeam = result["team"]
	sub = result["sub"]
	leagueID = result["leagueID"]
	primaryKey = leagueID + "/" + sub

	dynamodb = boto3.resource('dynamodb', 'eu-west-1')

	table = dynamodb.Table('LeaguePlayerDB-develop')
	res = selectTeam(primaryKey, table, selectedTeam)

	return {
		'statusCode': 200,
		'headers': {
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
		},
		'body': res
	}
