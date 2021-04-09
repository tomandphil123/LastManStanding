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

def scanDB(tableName):
	response = tableName.scan()
	res = response['Items']
	return res

def handler(event, context):
	result = json.loads(event['body'])
	leagueID = result['leagueId']
	ret_lst = []
	picksPreview = {}

	dynamodb = boto3.resource('dynamodb', 'eu-west-1')

	# Query to get all players in a league
	LPtable = dynamodb.Table('LeaguePlayerDB-develop')
	leaguePlayerData = queryWithIndex(LPtable, 'LeagueID-LeaguePlayerID-index', leagueID)

	# Sort list of players by status
	leaguePlayerData.sort(key=lambda s: s['playerStatus'])
	ret_lst.append(leaguePlayerData)
	for player in leaguePlayerData:
		if player['CurrentPick'] in picksPreview:
			picksPreview[player['CurrentPick']] += 1
		else:
			picksPreview[player['CurrentPick']] = 1

	# Get league data
	Ltable = dynamodb.Table('LeaguesDB-develop')
	leagueData = queryDB(Ltable, leagueID)
	ret_lst.append(leagueData)

	# sort picksPreview by number of picks
	sorted_picksPreview = sorted(picksPreview.items(), key=lambda x: x[1], reverse=True)
	ret_lst.append(sorted_picksPreview)

	schedulerTable = dynamodb.Table('SchedulerDB-develop')
	schedulerData = scanDB(schedulerTable)
	deadlineTime = schedulerData[0]['Deadline'].split(':')
	gmtDeadlineTime = int(deadlineTime[0]) + 1
	deadline = str(gmtDeadlineTime) + ':' + deadlineTime[1]
	ret_lst.append(deadline)

	return {
		'statusCode': 200,
		'headers': {
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
		},
		'body': json.dumps(ret_lst)
	}
