import json
from datetime import datetime
import boto3
from boto3.dynamodb.conditions import Key
from random import randint

def handler(event, context):
	result = json.loads(event['body'])

	# Take in info from front end post request
	leagueID = result['leagueName'] +'#'+ str(randint(100000, 999999))
	leagueName = result['leagueName']
	admin = result['sub']
	sub = result['sub']
	email = result['email']
	fname = result['firstName']
	lname = result['lastName']
	fullName = fname + ' ' + lname
	createdDate = str(datetime.today())
	invitationCode = str(randint(100000, 999999))
	username = result['username']
	lmsEmail = 'mylastmanstanding123@gmail.com'

	dynamodb = boto3.resource('dynamodb')

	# Creating League in the leagues Database
	tableName = 'LeaguesDB-develop'
	table = dynamodb.Table(tableName)

	table.put_item(
			Item={
				'LeagueID': leagueID,
				'LeagueName': leagueName,
				'admin': admin,
				'fullName': fullName,
				'createdTime': createdDate,
				'invitationCode': invitationCode,
				'LeagueStatus': 'Open',
				'RemainingPlayers': '1',
				'EliminatedPlayers': '0',
				'Joinable': 'Yes'
			})

	# Send confirmation email with invitation code for users to join the league
	leaguePlayerID = leagueID +'/'+ result['sub']
	boto3.client('ses', 'eu-west-1').send_email(
		Source = lmsEmail,
		Destination={
			'ToAddresses': [
				email
			]
		},
		Message={
			'Subject': {
				'Data': 'Successful League Creation: ' + leagueName
			},
			'Body': {
			'Text': {
				'Data':  '\n' + 'Congratulations on creating a new league.'+ '\n\n'+'League ID: ' + leagueID + '\n\n' + 'Invitation code: ' + invitationCode + '\n\n' + 'Send the above code to people you would like in your Last Man Standing League.'
			}
		}
	})

	# User gets added to leaguePlayer database
	tableName2 = 'LeaguePlayerDB-develop'
	table2 = dynamodb.Table(tableName2)

	table2.put_item(
			Item={
				'LeaguePlayerID': leaguePlayerID,
				'LeagueID': leagueID,
				'CurrentPick': '-',
				'PickedTeams': [],
				'Admin': 'Yes',
				'fullName': fullName,
				'Username': username,
				'playerStatus': 'In',
				'createdTime': createdDate,
				'UnpickedTeams': ['Manchester United FC','Manchester City FC','Leicester City FC','Liverpool FC','Tottenham Hotspur FC','Everton FC','Chelsea FC','Southampton FC','West Ham United FC','Sheffield United FC','Arsenal FC','Aston Villa FC','Leeds United FC','Crystal Palace FC','Wolverhampton Wanderers FC','Newcastle United FC','Brighton & Hove Albion FC','Burnley FC','Fulham FC','West Bromwich Albion FC']
			})
	
	# League is added to User's list of leagues (PlayerDB)
	table3 = dynamodb.Table('PlayerDB-develop')
	data = table3.query(
		KeyConditionExpression=Key('Sub').eq(sub)
	)

	resp = data['Items']
	leagueIDs = resp[0]['leagueIDs']
	leagueIDs.append(leagueID)
	table3.update_item(
		Key={
            'Sub': sub
        },
        UpdateExpression='set leagueIDs=:l',
        ExpressionAttributeValues={
            ':l': leagueIDs
        },
        ReturnValues='UPDATED_NEW'
	)

	return {
	'statusCode': 200,
	'headers': {
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
	},
	'body': invitationCode
	}