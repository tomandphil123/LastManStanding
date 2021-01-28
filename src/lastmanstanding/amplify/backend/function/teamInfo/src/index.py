import boto3
import json

def handler(event, context):
    print('received event:')
    print(event)
    dynamodb = boto3.resource('dynamodb')

    teamsTable = dynamodb.Table('PlTeamsDB-develop')
    response1 = teamsTable.scan()
    res = response1['Items']
    teams = sorted(res, key = lambda i: i["TeamName"])

    return {
        'statusCode': 200,
        'headers': {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps(teams)
    }
