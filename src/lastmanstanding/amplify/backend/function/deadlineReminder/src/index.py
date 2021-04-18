import json
from datetime import datetime
import boto3
from boto3.dynamodb.conditions import Key
from random import randint

def scanDB(tableName):
  item = tableName.scan()
  return item['Items']

def queryDB(tableName, sub):
	playerData = tableName.query(
		KeyConditionExpression=Key('Sub').eq(sub)
	)
	return playerData['Items'][0]['email']

def sendEmail(email, deadline):
  boto3.client('ses', 'eu-west-1').send_email(
  Source = 'mylastmanstanding123@gmail.com',
  Destination={
    'ToAddresses': [
      email
    ]
  },
  Message={
    'Subject': {
      'Data': 'Deadline for Picks: ' + deadline
    },
    'Body': {
    'Text': {
      'Data':  'Hi Everyone!\n\n' + 'Final reminder to make your pick for the upcoming gameweek.\n\n The deadline is ' + deadline + '. \n\n Make your pick now mylastmanstanding.xyz'
    }
  }
  })
  return 'Successfully sent email'


def handler(event, context):
  dynamodb = boto3.resource('dynamodb', 'eu-west-1')

  # getting the deadline
  schedulerDB = dynamodb.Table('SchedulerDB-develop')
  schedulerData = scanDB(schedulerDB)
  deadline = schedulerData[0]['Deadline']

  # Creating League in the leagues Database
  leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
  players = scanDB(leaguePlayerDB)

  playerDB = dynamodb.Table('PlayerDB-develop')
  for player in players:
    if player['playerStatus'] == 'In':
      sub = player['LeaguePlayerID'].split('/')[1]
      email = queryDB(playerDB, sub)
      sendEmail(email, deadline)

  return {
    'statusCode': 200,
    'headers': {
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': 'Successful'
  }