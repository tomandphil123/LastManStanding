import json
import boto3

def handler(event, context):
  result = json.loads(event['body'])
  print('received event:')
  print(event)
  team = result['team']

  lambda_client = boto3.client('lambda')
  response = lambda_client.invoke(
    FunctionName = 'arn:aws:lambda:eu-west-1:706350010776:function:getTeamNews',
    Payload = json.dumps(team)
  )
  resp = json.loads(response['Payload'].read())
  print(resp)

  return {
    'statusCode': 200,
    'headers': {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': resp['body']
  }


