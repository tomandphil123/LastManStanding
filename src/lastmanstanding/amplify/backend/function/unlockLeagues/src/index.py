import boto3
import json
from boto3.dynamodb.conditions import Key

def updateWinner(leagueID):
  dynamodb = boto3.resource('dynamodb', 'eu-west-1')
  leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
  leaguePlayerData = leaguePlayerDB.query(
		IndexName = 'LeagueID-LeaguePlayerID-index',
		KeyConditionExpression=Key('LeagueID').eq(leagueID)
	)
  for player in leaguePlayerData['Items']:
    sub = player['LeaguePlayerID'].split('/')[1]
    playerDB = dynamodb.Table('PlayerDB-develop')
    data = playerDB.query(
        KeyConditionExpression=Key('Sub').eq(sub)
      )
    print(data)
    wins = data['Items'][0]['wins']
    losses = data['Items'][0]['losses']
    leaguesDB = dynamodb.Table('LeaguesDB-develop')
    if player['playerStatus'] == 'In':  
      print("Winner Found: " + player['Username'])
      wins = int(wins) + 1
      playerDB.update_item(
        Key={
                'Sub': sub
            },
            UpdateExpression='set wins=:val1',
            ExpressionAttributeValues={
                ':val1': str(wins)
            },
            ReturnValues='UPDATED_NEW'
      )
      leaguesDB.update_item(
        Key={
            'LeagueID': leagueID
        },
        UpdateExpression='set Winner=:val1',
        ExpressionAttributeValues={
            ':val1': player['Username']
        },
        ReturnValues='UPDATED_NEW'
      )
    else:
      losses = int(losses) + 1
      playerDB.update_item(
        Key={
                'Sub': sub
            },
            UpdateExpression='set losses=:val1',
            ExpressionAttributeValues={
                ':val1': str(losses)
            },
            ReturnValues='UPDATED_NEW'
      )

def handler(event, context):
  print('received event:')
  print(event)
  dynamodb = boto3.resource('dynamodb', 'eu-west-1')
  leagueDics = {}

  abbreviations = {
		'West Bromwich Albion FC': 'West Brom FC',
		'Wolverhampton Wanderers FC': 'Wolves FC',
		'Brighton & Hove Albion FC': 'Brighton FC'
	}
  
  teamsTable = dynamodb.Table('LeaguesDB-develop')
  response = teamsTable.scan()
  leagues = response['Items']

  for league in leagues:
    leagueID = league['LeagueID']
    leagueDics[leagueID] = 0


  # Get results
  resultsTable = dynamodb.Table('PLResultsDB-develop')
  resultsResponse = resultsTable.scan(AttributesToGet=['Winner'])
  results = resultsResponse['Items']
  winners = []

  for winner in results:
    team = winner['Winner']
    if team not in abbreviations:
      winners.append(team)
    else:
      TeamName = abbreviations[team]
      winners.append(TeamName)


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
    print(remainingPlayers, EliminatedPlayers)

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

    if EliminatedPlayers > 0  and remainingPlayers == 1:
      updateWinner(leagueID)

      
  return {
    'statusCode': 200,
    'headers': {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': 'Leagues Unlocked'
  }