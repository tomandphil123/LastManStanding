import boto3
import json

def scanTable(table, sorter):
	response = table.scan()
	res = response['Items']
	if sorter == 'position':
		data = sorted(res, key = lambda i: int(i[sorter]))
	else:
		data = sorted(res, key = lambda i: i[sorter])
	return data

def handler(event, context):
	dynamodb = boto3.resource('dynamodb')

	table1 = dynamodb.Table('PlStandingsDB-develop')
	standingsData = scanTable(table1, 'position')

	table2 = dynamodb.Table('PLFixturesDB-develop')
	fixtures = scanTable(table2, 'startTime')

	table3 = dynamodb.Table('PLResultsDB-develop')
	resultsData = scanTable(table3, 'createdTime')

	lst = [standingsData, fixtures, resultsData]

	return {
	'statusCode': 200,
	'headers': {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
	},
	'body': json.dumps(lst)
	}