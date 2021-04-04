import boto3
import json
from boto3.dynamodb.conditions import Key

def queryDB(tableName, val, dbKey):
  data = tableName.query(
    KeyConditionExpression=Key(dbKey).eq(val)
  )
  return data['Items']

def scanTable(tableName):
  response = tableName.scan()
  return response['Items']

def queryLeaguePlayerDB(tableName, leagueID):
  leaguePlayerData = tableName.query(
		IndexName = 'LeagueID-LeaguePlayerID-index',
		KeyConditionExpression=Key('LeagueID').eq(leagueID)
	)
  return leaguePlayerData['Items']

def updatePlayerDB(tableName, sub, val, dbKey):
  tableName.update_item(
    Key={
            'Sub': sub
        },
        UpdateExpression='set {}=:val1'.format(dbKey),
        ExpressionAttributeValues={
            ':val1': str(val)
        },
        ReturnValues='UPDATED_NEW'
  )
  return 'Successfully updated playerDB'

def updateLeaguesDB(tableName, player, leagueID):
  tableName.update_item(
    Key={
        'LeagueID': leagueID
    },
    UpdateExpression='set Winner=:val1',
    ExpressionAttributeValues={
        ':val1': player['Username']
    },
    ReturnValues='UPDATED_NEW'
  )
  return 'Successfully updated playerDB'

def updateWinner(leagueID):
  dynamodb = boto3.resource('dynamodb', 'eu-west-1')
  leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
  leaguePlayerResponse = queryLeaguePlayerDB(leaguePlayerDB, leagueID)

  for player in leaguePlayerResponse:
    sub = player['LeaguePlayerID'].split('/')[1]
    playerDB = dynamodb.Table('PlayerDB-develop')
    data = queryDB(playerDB, sub, 'Sub')

    wins = data[0]['wins']
    losses = data[0]['losses']
    leaguesDB = dynamodb.Table('LeaguesDB-develop')
    if player['playerStatus'] == 'In':  
      wins = int(wins) + 1
      updatePlayerDB(playerDB, sub, wins, 'wins')
      updateLeaguesDB(leaguesDB, player,leagueID)

    else:
      losses = int(losses) + 1
      updatePlayerDB(playerDB, sub, losses, 'losses')
  return 'Successfully updated winner'

def updateEliminatedPlayer(tableName, player):
  tableName.update_item(
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
  return 'Successfully updated eliminated player'

def updateSuccessfulPlayer(tableName, player):
  tableName.update_item(
    Key={
      'LeaguePlayerID': player['LeaguePlayerID']
    },
      UpdateExpression='set CurrentPick=:s',
      ExpressionAttributeValues={
      ':s': '-'
    },
    ReturnValues='UPDATED_NEW'
  )
  return 'Successfully updated successful player'

def updateRemainingAndEliminated(tableName, leagueID, remainingPlayers, EliminatedPlayers ):
  tableName.update_item(
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

  if EliminatedPlayers > 0  and remainingPlayers == 1:
    updateWinner(leagueID)
    return 'Winner found'
  return 'Successfully updated remaining and eliminated players'

def handler(event, context):
  dynamodb = boto3.resource('dynamodb', 'eu-west-1')
  leagueDics = {}

  abbreviations = {
		'West Bromwich Albion FC': 'West Brom FC',
		'Wolverhampton Wanderers FC': 'Wolves FC',
		'Brighton & Hove Albion FC': 'Brighton FC'
	}
  
  leaguesDB = dynamodb.Table('LeaguesDB-develop')
  leagues = scanTable(leaguesDB)

  for league in leagues:
    leagueID = league['LeagueID']
    leagueDics[leagueID] = 0

  # Get results
  resultsDB = dynamodb.Table('PLResultsDB-develop')
  results = scanTable(resultsDB)

  winners = []
  for result in results:
    team = result['Winner']
    if team not in abbreviations:
      winners.append(team)
    else:
      TeamName = abbreviations[team]
      winners.append(TeamName)

  # Get all players
  leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
  leaguePlayerResults = scanTable(leaguePlayerDB)

  for player in leaguePlayerResults:
    if player['CurrentPick'] != 'Eliminated':
      if player['CurrentPick'] not in winners:
        updateEliminatedPlayer(leaguePlayerDB, player)
        leagueDics[player['LeagueID']] += 1

      else:
        updateSuccessfulPlayer(leaguePlayerDB, player)

  # update remaining and eliminated players
  for k,v in leagueDics.items():
    leagueID = k
    eliminatedPlayers = v
    
    resp = queryDB(leaguesDB, leagueID, 'LeagueID')
    remainingPlayers = int(resp[0]['RemainingPlayers']) - eliminatedPlayers
    EliminatedPlayers = int(resp[0]['EliminatedPlayers']) + eliminatedPlayers

    updateRemainingAndEliminated(leaguesDB, leagueID, remainingPlayers, EliminatedPlayers)
      
  return {
    'statusCode': 200,
    'headers': {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': 'Leagues Unlocked'
  }