import boto3
import json
import random

def scanTable(tableName):
  response = tableName.scan()
  return response['Items']

def updateLeagueStatus(tableName, leagues):
  for league in leagues:
    leagueID = league['LeagueID']
    tableName.update_item(
      Key={
              'LeagueID': leagueID
          },
          UpdateExpression='set LeagueStatus=:s',
          ExpressionAttributeValues={
              ':s': 'Closed'
          },
          ReturnValues="UPDATED_NEW"
    )
  return 'Successfuly updated league status'

def updateLeaguePlayerPicks(tableName, player, currentPick, pickedTeams, unPickedTeams):
  tableName.update_item(
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
  return 'Successfully updated players picks'

def handler(event, context):
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')

    # scan leaguesDB
    leaguesDB = dynamodb.Table('LeaguesDB-develop')
    leagues = scanTable(leaguesDB)

    # update league status to closed
    updateLeagueStatus(leaguesDB, leagues)
    
    # scan leaguePlayerDB
    leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
    leaguePlayerResults = scanTable(leaguePlayerDB)

    # scan standingsDB
    standingsDB = dynamodb.Table('PlStandingsDB-develop')
    standings = scanTable(standingsDB)
    standingsData = sorted(standings, key = lambda i: int(i['position']))

    # setting current pick
    for player in leaguePlayerResults:
      currentPick = player['CurrentPick']
      pickedTeams = player['PickedTeams']
      unPickedTeams = player['UnpickedTeams']

      # remove and add current pick accordingly
      if currentPick in unPickedTeams:
        unPickedTeams.remove(currentPick)
        pickedTeams.append(currentPick)

      # if user does not pick, select highest ranked unpicked team
      else:
        for team in standingsData:
          if team['TeamName'] in unPickedTeams:
            currentPick = team['TeamName']
            unPickedTeams.remove(currentPick)
            pickedTeams.append(currentPick)
            break

      # update players picks in DB
      updateLeaguePlayerPicks(leaguePlayerDB, player, currentPick, pickedTeams, unPickedTeams)

    return {
      'statusCode': 200,
      'headers': {
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': 'Leagues Locked'
    }