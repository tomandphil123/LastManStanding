import boto3
import json
import random

def handler(event, context):
    print('received event:')
    print(event)
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')

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
    
    leaguePlayerTable = dynamodb.Table('LeaguePlayerDB-develop')
    leaguePlayerResponse = leaguePlayerTable.scan()
    leaguePlayerResults = leaguePlayerResponse['Items']

    standingsTable = dynamodb.Table('PlStandingsDB-develop')
    standingsResponse = standingsTable.scan()
    standings = standingsResponse['Items']
    standingsData = sorted(standings, key = lambda i: int(i['position']))

    print(standings)
    for player in leaguePlayerResults:
      currentPick = player['CurrentPick']
      pickedTeams = player['PickedTeams']
      unPickedTeams = player['UnpickedTeams']

      if currentPick in unPickedTeams:
        unPickedTeams.remove(currentPick)
        pickedTeams.append(currentPick)

      else:
        for team in standingsData:
          if team['TeamName'] in unPickedTeams:
            currentPick = team['TeamName']
            unPickedTeams.remove(currentPick)
            pickedTeams.append(currentPick)
            break
        
      leaguePlayerTable.update_item(
        Key={
            'LeaguePlayerID': player['LeaguePlayerID']
          },
            UpdateExpression="set PickedTeams=:val1, UnpickedTeams=:val2, CurrentPick=:val3",
            ExpressionAttributeValues={
            ':val1': pickedTeams,
            ':val2': unPickedTeams,
            ':val3': currentPick
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