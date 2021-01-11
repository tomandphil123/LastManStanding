import boto3
import json

def handler(event, context):
	dynamodb = boto3.resource('dynamodb')

	table1 = dynamodb.Table('PlStandingsDB-dev')
	response1 = table1.scan()
	standingsData = response1['Items']

	table2 = dynamodb.Table('PlFixturesDB-dev')
	response2 = table2.scan()
	fixturesData = response2['Items']

	table3 = dynamodb.Table('PlResultsDB-dev')
	response3 = table3.scan()
	resultsData = response3['Items']

	return standingsData, fixturesData, resultsData
