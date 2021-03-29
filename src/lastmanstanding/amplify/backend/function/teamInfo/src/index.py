import boto3
import json

def getTeams(tableName):
    response1 = tableName.scan()
    res = response1['Items']
    teams = sorted(res, key = lambda i: i['TeamName'])
    return teams

def handler(event, context):
    print('received event:')
    print(event)
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')

    teamsTable = dynamodb.Table('PlTeamsDB-develop')
    teams = getTeams(teamsTable)
    
    return {
        'statusCode': 200,
        'headers': {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(teams)
    }
