import json
from datetime import datetime
import boto3
from boto3.dynamodb.conditions import Key
from random import randint

def createLeague(tableName, result, invitationCode,leagueID):
	tableName.put_item(
			Item={
				'LeagueID': leagueID,
				'LeagueName': result['leagueName'],
				'admin': result['sub'],
				'fullName': result['firstName']+ ' ' +result['lastName'],
				'createdTime': str(datetime.today()),
				'invitationCode': invitationCode,
				'LeagueStatus': 'Open',
				'RemainingPlayers': '1',
				'EliminatedPlayers': '0',
				'Joinable': 'Yes',
				'Winner': '-'
			})
	return 'Successfully added league to leaguesDB'

def sendEmail(result, leagueID, invitationCode):
	boto3.client('ses', 'eu-west-1').send_email(
		Source = 'mylastmanstanding123@gmail.com',
		Destination={
			'ToAddresses': [
				result['email']
			]
		},
		Message={
			'Subject': {
				'Data': 'Successful League Creation: ' + result['leagueName']
			},
			'Body': {
			'Text': {
				'Data':  '\n' + 'Congratulations on creating a new league.'+ '\n\n'+'League ID: ' + leagueID + '\n\n' + 'Invitation code: ' + invitationCode + '\n\n' + 'Send the above code to people you would like in your Last Man Standing League.'
			}
		}
	})
	return 'Successfully sent email'

def createLeaguePlayer(tableName, result, leagueID):
	leaguePlayerID = leagueID +'/'+ result['sub']
	tableName.put_item(
			Item={
				'LeaguePlayerID': leaguePlayerID,
				'LeagueID': leagueID,
				'CurrentPick': '-',
				'PickedTeams': [],
				'Admin': 'Yes',
				'fullName': result['firstName']+ ' ' +result['lastName'],
				'Username': result['username'],
				'playerStatus': 'In',
				'createdTime': str(datetime.today()),
				'UnpickedTeams': ['Manchester United FC','Manchester City FC','Leicester City FC','Liverpool FC','Tottenham Hotspur FC','Everton FC','Chelsea FC','Southampton FC','West Ham United FC','Sheffield United FC','Arsenal FC','Aston Villa FC','Leeds United FC','Crystal Palace FC','Wolves FC','Newcastle United FC','Brighton FC','Burnley FC','Fulham FC','West Brom FC']
			})
	return 'Successfully added leaguePlayer'

def updatePlayerDB(tableName, result, leagueID):
	sub = result['sub']
	data = tableName.query(
		KeyConditionExpression=Key('Sub').eq(sub)
	)

	resp = data['Items']
	leagueIDs = resp[0]['leagueIDs']
	leagueIDs.append(leagueID)
	tableName.update_item(
		Key={
            'Sub': sub
        },
        UpdateExpression='set leagueIDs=:l',
        ExpressionAttributeValues={
            ':l': leagueIDs
        },
        ReturnValues='UPDATED_NEW'
	)
	return 'Successfully updated players leagues'


def handler(event, context):
	dynamodb = boto3.resource('dynamodb', 'eu-west-1')
	result = json.loads(event['body'])

	# Take in info from front end post request
	leagueID = result['leagueName'] +'#'+ str(randint(100000, 999999)) 
	invitationCode = str(randint(100000, 999999))

	# Creating League in the leagues Database
	leaguesDB = dynamodb.Table('LeaguesDB-develop')
	createLeague(leaguesDB, result, invitationCode, leagueID)

	# Send confirmation email with invitation code for users to join the league
	sendEmail(result, leagueID, invitationCode)

	# User gets added to leaguePlayer database
	leaguePlayerDB = dynamodb.Table('LeaguePlayerDB-develop')
	createLeaguePlayer(leaguePlayerDB, result, leagueID)

	# League is added to User's list of leagues (PlayerDB)
	playerDB = dynamodb.Table('PlayerDB-develop')
	updatePlayerDB(playerDB, result, leagueID)

	return {
	'statusCode': 200,
	'headers': {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
	},
	'body': invitationCode
	}