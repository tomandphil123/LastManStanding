import json
import boto3
from boto3.dynamodb.conditions import Key

def deleteLeagueFromDB(tableName, dbKey, val):
  tableName.delete_item(
    Key={
        dbKey : val
    }
  )
  return 'Successfully removed from League'

def queryDB(tableName, dbKey, val):
	data = tableName.query(
		KeyConditionExpression=Key(dbKey).eq(val)
	)
	return data['Items']

def deleteLeague(result):
  leagueID = result['leagueID']

  dynamodb = boto3.resource('dynamodb', 'eu-west-1')
  # delete league from leaguesDB
  leaguesDB = dynamodb.Table('LeaguesDB-develop')
  deleteLeagueFromDB(leaguesDB, 'LeagueID', leagueID)

  # delete players from leaguePlayerDB from that league
  subs = []
  leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
  leaguePlayerData = leaguePlayerDB.query(
		IndexName = 'LeagueID-LeaguePlayerID-index',
		KeyConditionExpression=Key('LeagueID').eq(leagueID)
	)
  for player in leaguePlayerData['Items']:
    subs.append(player['LeaguePlayerID'].split('/')[1])
    deleteLeagueFromDB(leaguePlayerDB, 'LeaguePlayerID', player['LeaguePlayerID'])

  # delete leagueID from list of LeaguesIDs in playerDB
  playerDB = dynamodb.Table('PlayerDB-develop')
  for sub in subs:
    resp = queryDB(playerDB, 'Sub', sub)
    leagueIDs = resp[0]['leagueIDs']
    leagueIDs.remove(leagueID)

    playerDB.update_item(
      Key={
              'Sub': sub
          },
          UpdateExpression='set leagueIDs=:l',
          ExpressionAttributeValues={
              ':l': leagueIDs
          },
          ReturnValues='UPDATED_NEW'
    )

  return 'Successfully Deleted League'

def toggleLeague(result):
  leagueID = result['leagueID']
  action = result['lockLeague']

  status = 'No'
  if action:
    #unlockLeague
    status = 'Yes'

  dynamodb = boto3.resource('dynamodb', 'eu-west-1')
  leaguesDB = dynamodb.Table('LeaguesDB-develop')
  leaguesDB.update_item(
    Key={
            'LeagueID': leagueID
        },
        UpdateExpression='set Joinable = :val',
        ExpressionAttributeValues={
            ':val': status
        },
        ReturnValues='UPDATED_NEW'
  )

  if status == 'Yes':
    return 'Successfully Set League to Joinable'
  
  return 'Successfully Set League to Not Joinable'

def removePlayer(result):
  leaguePlayerID = result['leaguePlayerID']
  leagueID = leaguePlayerID.split('/')[0]
  sub = leaguePlayerID.split('/')[1]

  dynamodb = boto3.resource('dynamodb', 'eu-west-1')
  leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
  deleteLeagueFromDB(leaguePlayerDB, 'LeaguePlayerID', leaguePlayerID)

  playerDB = dynamodb.Table('PlayerDB-develop')

  resp = queryDB(playerDB, 'Sub', sub)
  leagueIDs = resp[0]['leagueIDs']
  leagueIDs.remove(leagueID)

  playerDB.update_item(
    Key={
            'Sub': sub
        },
        UpdateExpression='set leagueIDs=:l',
        ExpressionAttributeValues={
            ':l': leagueIDs
        },
        ReturnValues='UPDATED_NEW'
  )

  leaguesDB = dynamodb.Table('LeaguesDB-develop')
  resp = queryDB(leaguesDB, 'LeagueID', leagueID)
  remainingPlayers = int(resp[0]['RemainingPlayers']) - 1

  leaguesDB.update_item(
    Key={
            'LeagueID': leagueID
        },
        UpdateExpression='set RemainingPlayers = :val',
        ExpressionAttributeValues={
            ':val': str(remainingPlayers)
        },
        ReturnValues='UPDATED_NEW'
  )

  return 'Successfully removed player'

def resetLeague(result):
  leagueID = result['leagueID']

  dynamodb = boto3.resource('dynamodb', 'eu-west-1')
  # reset each player in league
  leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
  counter = 0
  leaguePlayerData = leaguePlayerDB.query(
		IndexName = 'LeagueID-LeaguePlayerID-index',
		KeyConditionExpression=Key('LeagueID').eq(leagueID)
	)
  
  for player in leaguePlayerData['Items']:
    counter +=1
    leaguePlayerDB.update_item(
      Key={
              'LeaguePlayerID': player['LeaguePlayerID']
          },
          UpdateExpression='set playerStatus=:val1, CurrentPick=:val2, PickedTeams=:val3, UnpickedTeams=:val4',
          ExpressionAttributeValues={
              ':val1': 'In',
              ':val2': '-',
              ':val3': [],
              ':val4': ['Manchester United FC','Manchester City FC','Leicester City FC','Liverpool FC','Tottenham Hotspur FC','Everton FC','Chelsea FC','Southampton FC','West Ham United FC','Sheffield United FC','Arsenal FC','Aston Villa FC','Leeds United FC','Crystal Palace FC','Wolves FC','Newcastle United FC','Brighton FC','Burnley FC','Fulham FC','West Brom FC'],
          },
          ReturnValues='UPDATED_NEW'
    )
  
  # reset league
  leaguesDB = dynamodb.Table('LeaguesDB-develop')
  leaguesDB.update_item(
      Key={
              'LeagueID': leagueID
          },
          UpdateExpression='set EliminatedPlayers=:val1, RemainingPlayers=:val2, Joinable=:val3, LeagueStatus=:val4, Winner=:val5',
          ExpressionAttributeValues={
              ':val1': '0',
              ':val2': str(counter),
              ':val3': 'Yes',
              ':val4': 'Open',
              ':val5': '-'
          },
          ReturnValues='UPDATED_NEW'
    )

  return 'Successfully Reset League'

def handler(event, context):
  result = json.loads(event['body'])
  flag = result['flag']

  if flag == 'deleteLeague':
    resp = deleteLeague(result)
  elif flag == 'toggleLeague':
    resp = toggleLeague(result)
  elif flag == 'removePlayer':
    resp = removePlayer(result)
  elif flag == 'resetLeague':
    resp = resetLeague(result)

  return {
  'statusCode': 200,
  'headers': {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
  },
  'body': resp
  }
