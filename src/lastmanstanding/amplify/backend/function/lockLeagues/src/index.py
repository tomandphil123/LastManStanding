import boto3
import json

def handler(event, context):
    print('received event:')
    print(event)
    dynamodb = boto3.resource('dynamodb')

    teamsTable = dynamodb.Table('LeaguesDB-develop')
    response = teamsTable.scan()
    leagues = response['Items']

    for league in leagues:
      leagueID = league['LeagueID']
      teamsTable.update_item(
        Key={
                'LeagueID': leagueID
            },
            UpdateExpression='set LeagueStatus=:s',
            ExpressionAttributeValues={
                ':s': 'Closed'
            },
            ReturnValues="UPDATED_NEW"
      )

    return {
      'statusCode': 200,
      'headers': {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': 'Leagues Locked'
    }