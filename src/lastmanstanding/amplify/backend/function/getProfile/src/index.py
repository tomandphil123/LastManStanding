import json
import boto3
from boto3.dynamodb.conditions import Key

def queryDB(tableName, sub):
  playerData = tableName.query(
    KeyConditionExpression=Key('Sub').eq(sub)
  )
  return playerData['Items']


def handler(event, context):
  result = json.loads(event['body'])
  dynamodb = boto3.resource('dynamodb', 'eu-west-1')

  # Query playerDB for info
  PlayerDB = dynamodb.Table('PlayerDB-develop')
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