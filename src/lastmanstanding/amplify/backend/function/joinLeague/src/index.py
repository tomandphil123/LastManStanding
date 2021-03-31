import json
import boto3
from datetime import datetime
from boto3.dynamodb.conditions import Key

def queryTable(tableName, result):
  data = tableName.query(
    IndexName = 'invitationCode-LeagueID-index',
    KeyConditionExpression=Key('invitationCode').eq(result['leagueCode'])
  )
  return data['Items']

def updateLeaguePlayerDB(tableName, result, leagueID):
  tableName.put_item(
        Item={
          'LeaguePlayerID': leagueID + '/' + result['sub'],
          'LeagueID': leagueID,
          'CurrentPick': '-',
          'PickedTeams': [],
          'Admin': 'No',
          'fullName': result['firstName']+ ' ' +result['lastName'],
          'Username': result['username'],
          'playerStatus': 'In',
          'createdTime': str(datetime.today()),
          'UnpickedTeams': ['Manchester United FC','Manchester City FC','Leicester City FC','Liverpool FC','Tottenham Hotspur FC','Everton FC','Chelsea FC','Southampton FC','West Ham United FC','Sheffield United FC','Arsenal FC','Aston Villa FC','Leeds United FC','Crystal Palace FC','Wolves FC','Newcastle United FC','Brighton FC','Burnley FC','Fulham FC','West Brom FC']
      })
  return 'Successfully added to LeaguePlayerDB'

def updatePlayerDB(tableName, leagueIDs, result, leagueID):
  leagueIDs.append(leagueID)
  tableName.update_item(
    Key={
            'Sub': result['sub']
        },
        UpdateExpression='set leagueIDs=:l',
        ExpressionAttributeValues={
            ':l': leagueIDs
        },
        ReturnValues='UPDATED_NEW'
  )
  return 'Successfully updated PlayerDB'

def updatedRemainingPlayers(tableName, leagueID):
  leagueData = tableName.query(
        KeyConditionExpression=Key('LeagueID').eq(leagueID)
      )

  resp = leagueData['Items']
  remainingPlayers = int(resp[0]['RemainingPlayers']) + 1

  tableName.update_item(
    Key={
            'LeagueID': leagueID
        },
        UpdateExpression='set RemainingPlayers = :val',
        ExpressionAttributeValues={
            ':val': str(remainingPlayers)
        },
        ReturnValues='UPDATED_NEW'
  )

  return 'Successfully updated remaining players'

def checkUser(leagueID, result, playerDB, resp):
  dynamodb = boto3.resource('dynamodb', 'eu-west-1')

  # lookup users leagues
  data = playerDB.query(
    KeyConditionExpression=Key('Sub').eq(result['sub'])
  )

  res = data['Items']
  leagueIDs = res[0]['leagueIDs']

  # check if user already in league and it is joinable
  if leagueID not in leagueIDs and resp[0]['Joinable'] == 'Yes':
    # update players leagueIDs
    updatePlayerDB(playerDB, leagueIDs, result, leagueID)

    # add player to leaguePlayerDB
    leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
    updateLeaguePlayerDB(leaguePlayerDB, result, leagueID)

    # update remaining players
    leaguesDB = dynamodb.Table('LeaguesDB-develop')
    updatedRemainingPlayers(leaguesDB, leagueID)

    return 'Successfully joined league'

  elif resp[0]['Joinable'] == 'No':
    return 'League is not joinable'

  return 'Player already in league'

def handler(event, context):
  dynamodb = boto3.resource('dynamodb', 'eu-west-1')
  result = json.loads(event['body'])

  # lookup on leaguesDB
  leaguesDB = dynamodb.Table('LeaguesDB-develop')
  resp = queryTable(leaguesDB, result)


  # updated player if not in league and league is joinable
  leagueID = resp[0]['LeagueID']
  playerDB = dynamodb.Table('PlayerDB-develop')
  response = checkUser(leagueID, result, playerDB, resp)
    
  return {
    'statusCode': 200,
    'headers': {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': response
  }
  