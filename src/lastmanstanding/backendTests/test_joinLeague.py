import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.joinLeague.src.index import updatedRemainingPlayers, updateLeaguePlayerDB, updatePlayerDB

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

    updatePlayerDB_func_response = updatePlayerDB(PlayerTable, ['Test1', 'Test2'], result, 'Test3')

    response = PlayerTable.scan()

    assert updatePlayerDB_func_response == 'Successfully updated PlayerDB'
    assert response['Items'][0]['leagueIDs'] == ['Test1', 'Test2', 'Test3']

@mock_dynamodb2
def test_updateRemainingPlayers():
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
    LeaguesTable = dynamodb.Table(table_name)
    LeaguesTable.put_item(
			Item={
				'LeagueID': 'TomsLeague',
                'RemainingPlayers': '1',
			})

    updateRandE_func_response = updatedRemainingPlayers(LeaguesTable, 'TomsLeague')
    response = LeaguesTable.scan()

    assert response['Items'][0]['RemainingPlayers'] == '2'
    assert updateRandE_func_response == 'Successfully updated remaining players'

@mock_dynamodb2
def test_updateLeaguePlayerDB():
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

    updateLeaguePlayerDB_func_response = updateLeaguePlayerDB(LeaguePlayerTable, player, 'Testing')

    response = LeaguePlayerTable.scan()

    assert updateLeaguePlayerDB_func_response == 'Successfully added to LeaguePlayerDB'
    assert response['Items'][0]['Username'] == 'JDoe'