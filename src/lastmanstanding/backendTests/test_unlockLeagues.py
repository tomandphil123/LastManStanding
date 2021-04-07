import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.unlockLeagues.src.index import queryDB, scanTable, updatePlayerDB, updateRemainingAndEliminated, updateSuccessfulPlayer, updateEliminatedPlayer

@mock_dynamodb2
def test_queryDBandScan():
    # set up DB
    table_name = 'leaguePlayerDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'LeaguePlayerID', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'LeaguePlayerID','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    leaguePlayerTable = dynamodb.Table(table_name)
    leaguePlayerTable.put_item(
			Item={
				'LeaguePlayerID': 'Testing'
			})

    
    queryDB_func_response = queryDB(leaguePlayerTable, 'Testing', 'LeaguePlayerDB')
    scanDB_func_response = scanTable(leaguePlayerTable)

    assert queryDB_func_response[0]['LeaguePlayerID'] == 'Testing'
    assert scanDB_func_response[0]['LeaguePlayerID'] == 'Testing'

@mock_dynamodb2
def test_updateDB():
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
                'Wins': '1'
			})

    updatePlayerDB_func_response = updatePlayerDB(PlayerTable, '124567', 3, 'Wins')

    response = PlayerTable.scan()

    assert updatePlayerDB_func_response == 'Successfully updated playerDB'
    assert response['Items'][0]['Wins'] == '3'

@mock_dynamodb2
def test_updateRemainingAndEliminated():
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
                'EliminatedPlayers': '2'
			})

    updateRandE_func_response = updateRemainingAndEliminated(LeaguesTable, 'TomsLeague', 3, 3)
    response = LeaguesTable.scan()

    assert response['Items'][0]['RemainingPlayers'] == '3'
    assert updateRandE_func_response == 'Successfully updated remaining and eliminated players'

@mock_dynamodb2
def test_updateSuccessfulAndEliminated():
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
				'LeaguePlayerID': 'TomsLeague',
                'CurrentPick': 'Manchester United'
			})

    mock_player = {
        'LeaguePlayerID': 'TomsLeague',
    }

    updateSuccessful_func_response = updateSuccessfulPlayer(LeaguePlayerTable, mock_player)
    successfulResponse = LeaguePlayerTable.scan()
    assert successfulResponse['Items'][0]['CurrentPick'] == '-'
    
    updateEliminated_func_response = updateEliminatedPlayer(LeaguePlayerTable, mock_player)
    eliminatedResponse = LeaguePlayerTable.scan()
    assert eliminatedResponse['Items'][0]['CurrentPick'] == 'Eliminated'
    assert updateSuccessful_func_response == 'Successfully updated successful player'
    assert updateEliminated_func_response == 'Successfully updated eliminated player'