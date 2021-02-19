import boto3
import json
from boto3.dynamodb.conditions import Key

def handler(event, context):
    print('received event:')
    print(event)
    dynamodb = boto3.resource('dynamodb')
    leagueDics = {}

    teamsTable = dynamodb.Table('LeaguesDB-develop')
    response = teamsTable.scan()
    leagues = response['Items']

    for league in leagues:
      leagueID = league['LeagueID']
      leagueDics[leagueID] = 0
    
    print(leagueDics)

    # Get results
    resultsTable = dynamodb.Table('PLResultsDB-develop')
    resultsResponse = resultsTable.scan(AttributesToGet=['Winner'])
    results = resultsResponse['Items']
    winners = []

    for winner in results:
      winners.append(winner['Winner'])


    # Get all players
    leaguePlayerTable = dynamodb.Table('LeaguePlayerDB-develop')
    leaguePlayerResponse = leaguePlayerTable.scan()
    leaguePlayerResults = leaguePlayerResponse['Items']

    for player in leaguePlayerResults:
      if player['CurrentPick'] not in winners:
        leaguePlayerTable.update_item(
          Key={
            'LeaguePlayerID': player['LeaguePlayerID']
          },
            UpdateExpression='set playerStatus=:val1, CurrentPick=:val2',
            ExpressionAttributeValues={
            ':val1': 'Out',
            ':val2': 'Eliminated'
          },
          ReturnValues='UPDATED_NEW'
        )
        leagueIDy = player['LeagueID']
        leagueDics[leagueIDy] += 1

      else:
        leaguePlayerTable.update_item(
          Key={
            'LeaguePlayerID': player['LeaguePlayerID']
          },
            UpdateExpression='set CurrentPick=:s',
            ExpressionAttributeValues={
            ':s': '-'
          },
          ReturnValues='UPDATED_NEW'
        )

    print(leagueDics)
    for k,v in leagueDics.items():
      leagueID = k
      eliminatedPlayers = v
      
      leagueData = teamsTable.query(
          KeyConditionExpression=Key('LeagueID').eq(leagueID)
        )
      resp = leagueData['Items']
      print(resp)
      remainingPlayers = int(resp[0]['RemainingPlayers']) - eliminatedPlayers
      EliminatedPlayers = int(resp[0]['EliminatedPlayers']) + eliminatedPlayers

      teamsTable.update_item(
        Key={
                'LeagueID': leagueID
            },
            UpdateExpression='set RemainingPlayers = :val1, EliminatedPlayers = :val2, LeagueStatus = :val3',
            ExpressionAttributeValues={
                ':val1': str(remainingPlayers),
                ':val2': str(EliminatedPlayers),
                ':val3': 'Open'
            },
            ReturnValues='UPDATED_NEW'
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