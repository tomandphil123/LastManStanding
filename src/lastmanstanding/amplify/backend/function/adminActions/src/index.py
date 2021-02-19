import json
import boto3
from boto3.dynamodb.conditions import Key

def deleteLeague(result):
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
