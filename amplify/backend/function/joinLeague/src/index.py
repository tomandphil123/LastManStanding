import json
import boto3
from datetime import datetime

def handler(event, context):
  print('received event:')
  print(event)
  result = json.loads(event['body'])
  leagueCode = result["leagueCode"]
  sub = result["sub"]
  username = result["username"]

  client = boto3.client('dynamodb')

  data = client.query(
    TableName = "LeaguesDB-dev",
    IndexName = "invitationCode-LeagueID-index",
    ExpressionAttributeValues={
        ':v1': {
            'S': leagueCode
        },
    },
    KeyConditionExpression='invitationCode= :v1'
  )

  resp = data['Items']
  leagueID = resp[0]['LeagueID']['S']

  leaguePlayerID = leagueID +'/'+ sub
  admin = "No"
  createdDate = str(datetime.today())
  dynamodb = boto3.resource('dynamodb')

  tableName = "LeaguePlayerDB-dev"
  table = dynamodb.Table(tableName)

  table.put_item(
      Item={
				'LeaguePlayerID': leaguePlayerID,
				'LeagueID': leagueID,
				'CurrentPick': " ",
				'PickedTeams': [],
				'Admin': admin,
				'Username': username,
				'Status': "In",
				'createdTime': createdDate,
				'UnpickedTeams': []
      })

  return {
    'statusCode': 200,
    'headers': {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': "hello"
    }

