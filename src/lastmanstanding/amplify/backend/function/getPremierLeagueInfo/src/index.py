import boto3
import json

def handler(event, context):
	dynamodb = boto3.resource('dynamodb')

	table1 = dynamodb.Table('PlStandingsDB-develop')
	response1 = table1.scan()
	res = response1['Items']
	standingsData = sorted(res, key = lambda i: int(i["position"]))
	print(standingsData)

	table2 = dynamodb.Table('PLFixturesDB-develop')
	response2 = table2.scan()
	fixturesData = response2['Items']

	table3 = dynamodb.Table('PLResultsDB-develop')
	response3 = table3.scan()
	resultsData = response3['Items']

	lst = [standingsData, fixturesData, resultsData]

	return {
	'statusCode': 200,
	'headers': {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
	},
	'body': json.dumps(lst)
	}