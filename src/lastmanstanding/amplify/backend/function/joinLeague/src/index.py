import json
import boto3
from datetime import datetime
from boto3.dynamodb.conditions import Key

def queryTable(leagueCode):
  client = boto3.client('dynamodb')

  data = client.query(
    TableName = 'LeaguesDB-develop',
    IndexName = 'invitationCode-LeagueID-index',
    ExpressionAttributeValues={
        ':v1': {
            'S': leagueCode
        },
    },
    KeyConditionExpression='invitationCode= :v1'
  )

  return data['Items']

def checkUser(leagueID, sub, playerDB):
  data = playerDB.query(
    KeyConditionExpression=Key('Sub').eq(sub)
  )

  resp = data['Items']
  leagueIDs = resp[0]['leagueIDs']
  if leagueID not in leagueIDs:
    return leagueIDs
  
  return ''

def handler(event, context):
  dynamodb = boto3.resource('dynamodb')
  result = json.loads(event['body'])
  leagueCode = result['leagueCode']
  sub = result['sub']
  fname = result['firstName']
  lname = result['lastName']
  fullName = fname + ' ' + lname
  username = result['username']
  admin = 'No'


  resp = queryTable(leagueCode)
  leagueID = resp[0]['LeagueID']['S']

  response = "Already In League"
  playerDB = dynamodb.Table('PlayerDB-develop')

  leagueIDs = checkUser(leagueID, sub, playerDB)

  if len(leagueIDs) != 0:
    leaguePlayerID = leagueID +'/'+ sub
    createdDate = str(datetime.today())

    tableName = 'LeaguePlayerDB-develop'
    leaguePlayerDB = dynamodb.Table(tableName)

    leaguePlayerDB.put_item(
        Item={
          'LeaguePlayerID': leaguePlayerID,
          'LeagueID': leagueID,
          'CurrentPick': '-',
          'PickedTeams': [],
          'Admin': admin,
          'fullName': fullName,
          'Username': username,
          'playerStatus': 'In',
          'createdTime': createdDate,
          'UnpickedTeams': ['Manchester United FC','Manchester City FC','Leicester City FC','Liverpool FC','Tottenham Hotspur FC','Everton FC','Chelsea FC','Southampton FC','West Ham United FC','Sheffield United FC','Arsenal FC','Aston Villa FC','Leeds United FC','Crystal Palace FC','Wolverhampton Wanderers FC','Newcastle United FC','Brighton & Hove Albion FC','Burnley FC','Fulham FC','West Bromwich Albion FC']
      })

    leagueIDs.append(leagueID)
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
    leaguesDB.update_item(
      Key={
              'LeagueID': leagueID
          },
          UpdateExpression='set RemainingPlayers = RemainingPlayers + :val',
          ExpressionAttributeValues={
              ':val': 1
          },
          ReturnValues='UPDATED_NEW'
    )

    response = "Successfully Joined League"
  
  return {
    'statusCode': 200,
    'headers': {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': response
  }
  