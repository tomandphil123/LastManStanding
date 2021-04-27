import json
import boto3
from boto3.dynamodb.conditions import Key

def queryDB(tableName, sub):
  playerData = tableName.query(
    KeyConditionExpression=Key('Sub').eq(sub)
  )
  return playerData['Items']

def updateDB(tableName, sub, team):
  try:
    tableName.update_item(
		Key={
            'Sub': sub
        },
        UpdateExpression='set favouriteTeam=:l',
        ExpressionAttributeValues={
            ':l': team
        },
        ReturnValues='UPDATED_NEW'
	)
    return "Successfully Updated Favourite Team!"
  except:
    return "Pick Failed Please Try Again"


def handler(event, context):
  result = json.loads(event['body'])
  flag = result['flag']
  dynamodb = boto3.resource('dynamodb', 'eu-west-1')

  PlayerDB = dynamodb.Table('PlayerDB-develop')
  if flag == 'setTeam':
    updateDB(PlayerDB, result['sub'], result['team'])
    
  profileInfo = queryDB(PlayerDB, result['sub'])

  return {
    'statusCode': 200,
    'headers': {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': json.dumps(profileInfo)
  }