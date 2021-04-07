import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.myLeagues.src.index import queryPlayerDB, queryLeaguePlayerDB

@mock_dynamodb2
def test_queryPlayerDB():
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
				'Sub': 'Testing123',
                'leagueIDs': ['Test1', 'Test2']
			})

    mock_input = {
        'sub': 'Testing123',
    }

    queryPlayerDB_func_response = queryPlayerDB(PlayerTable, mock_input)
    assert queryPlayerDB_func_response == ['Test1', 'Test2']

@mock_dynamodb2
def test_queryLeaguePlayerDB():
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
    LeaguePlayerTable.put_item(
			Item={
				'LeaguePlayerID': 'Testing123/456789'
			})

    mock_input = {
        'sub': '456789',
    }

    leagueIDs = ['Testing123']

    queryLeaguePlayerDB_func_response = queryLeaguePlayerDB(LeaguePlayerTable, mock_input, leagueIDs)

    assert queryLeaguePlayerDB_func_response[0][0]['LeaguePlayerID'] == 'Testing123/456789'