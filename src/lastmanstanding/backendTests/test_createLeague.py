import boto3
import pytest
from moto import mock_dynamodb2, mock_ses
from amplify.backend.function.createLeague.src.index import updatePlayerDB, createLeague, createLeaguePlayer, sendEmail

@mock_dynamodb2
def test_updatePlayerDB():
    # set up DB
    table_name = 'PlayerDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'Sub', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'Sub','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    PlayerTable = dynamodb.Table(table_name)
    PlayerTable.put_item(
			Item={
				'Sub': '124567',
                'leagueIDs': ['Test1', 'Test2']
			})
    result = {
        'sub': '124567',
    }

    updatePlayerDB_func_response = updatePlayerDB(PlayerTable, result, 'Test3')

    response = PlayerTable.scan()

    assert updatePlayerDB_func_response == 'Successfully updated players leagues'
    assert response['Items'][0]['leagueIDs'] == ['Test1', 'Test2', 'Test3']

@mock_dynamodb2
def test_createLeague():
    # set up DB
    table_name = 'LeaguesDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'LeagueID', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'LeagueID','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    LeagueTable = dynamodb.Table(table_name)

    player={
        'sub': '12356',
        'firstName': 'Jane',
        'lastName': 'Doe',
        'leagueName': 'TestLeague'
    }

    createLeague_func_response = createLeague(LeagueTable, player, '12345', 'TestLeague/1234')

    response = LeagueTable.scan()

    assert createLeague_func_response == 'Successfully added league to leaguesDB'
    assert response['Items'][0]['LeagueName'] == 'TestLeague'
    assert response['Items'][0]['invitationCode'] == '12345'

@mock_dynamodb2
def test_createLeaguePlayer():
    # set up DB
    table_name = 'LeaguePlayerDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'LeaguePlayerID', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'LeaguePlayerID','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    LeaguePlayerTable = dynamodb.Table(table_name)

    player={
        'sub': '12356',
        'firstName': 'Jane',
        'lastName': 'Doe',
        'username': 'JDoe'
    }

    createLeaguePlayer_func_response = createLeaguePlayer(LeaguePlayerTable, player, 'Testing')

    response = LeaguePlayerTable.scan()

    assert createLeaguePlayer_func_response == 'Successfully added leaguePlayer'
    assert response['Items'][0]['Username'] == 'JDoe'

