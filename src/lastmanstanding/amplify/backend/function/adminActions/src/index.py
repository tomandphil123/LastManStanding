import json
import boto3
from boto3.dynamodb.conditions import Key

def deleteLeague(result):
  leagueID = result['leagueID']

  dynamodb = boto3.resource('dynamodb')
  # delete league from leaguesDB
  leaguesDB = dynamodb.Table('LeaguesDB-develop')
  leaguesDB.delete_item(
    Key={
        'LeagueID': leagueID
    }
  )

  # delete players from leaguePlayerDB from that league
  subs = []
  leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
  leaguePlayerData = leaguePlayerDB.query(
		IndexName = 'LeagueID-LeaguePlayerID-index',
		KeyConditionExpression=Key('LeagueID').eq(leagueID)
	)
  for player in leaguePlayerData['Items']:
    subs.append(player['LeaguePlayerID'].split('/')[1])
    leaguePlayerDB.delete_item(
      Key={
          'LeaguePlayerID': player['LeaguePlayerID']
      }
    )

  # delete leagueID from list of LeaguesIDs in playerDB
  playerDB = dynamodb.Table('PlayerDB-develop')
  for sub in subs:
    data = playerDB.query(
      KeyConditionExpression=Key('Sub').eq(sub)
    )

    resp = data['Items']
    leagueIDs = resp[0]['leagueIDs']
    leagueIDs.remove(leagueID)


    playerDB.update_item(
      Key={
              'Sub': sub
          },
          UpdateExpression="set leagueIDs=:l",
          ExpressionAttributeValues={
              ':l': leagueIDs
          },
          ReturnValues="UPDATED_NEW"
    )

  return 'Successfully Deleted League'

def toggleLeague(result):
  leagueID = result['leagueID']
  action = result['lockLeague']

  status = 'No'
  if action:
    #unlockLeague
    status = 'Yes'

  dynamodb = boto3.resource('dynamodb')
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
    return 'Sucessfully Set League to Joinable'
  
  return 'Sucessfully Set League to Not Joinable'

def handler(event, context):
  result = json.loads(event['body'])
  flag = result['flag']
  

  if flag == 'deleteLeague':
    resp = deleteLeague(result)
  elif flag == 'toggleLeague':
    resp = toggleLeague(result)
  else:
    pass



  return {
  'statusCode': 200,
  'headers': {
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
  },
  'body': resp
  }
