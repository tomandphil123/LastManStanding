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
                ':s': 'Open'
            },
            ReturnValues="UPDATED_NEW"
      )
    
    resultsTable = dynamodb.Table('PLResultsDB-develop')
    resultsResponse = resultsTable.scan(AttributesToGet=['Winner'])
    results = resultsResponse['Items']
    print(results)
    winners = []

    for winner in results:
      winners.append(winner['Winner'])

    leaguePlayerTable = dynamodb.Table('LeaguePlayerDB-develop')
    leaguePlayerResponse = leaguePlayerTable.scan()
    leaguePlayerResults = leaguePlayerResponse['Items']
    print(leaguePlayerResults)

    for player in leaguePlayerResults:
      if player['CurrentPick'] not in winners:
        leaguePlayerTable.update_item(
          Key={
            'LeaguePlayerID': player['LeaguePlayerID']
          },
            UpdateExpression="set playerStatus=:s",
            ExpressionAttributeValues={
            ':s': 'Out'
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
      'body': 'Leagues Unlocked'
    }