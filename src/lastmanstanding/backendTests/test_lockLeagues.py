import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.lockLeagues.src.index import scanTable, updateLeaguePlayerPicks, updateLeagueStatus

@mock_dynamodb2
def test_ScanTableAndUpdateDB():
    # set up DB
    table_name = 'leaguesDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'LeagueID', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'LeagueID','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    leaguesTable = dynamodb.Table(table_name)
    leaguesTable.put_item(
			Item={
				'LeagueID': 'TestingScan',
                'LeagueStatus': 'Open'
			})

    leagues = [{'LeagueID': 'TestingScan'}]

    updateLeagueStatus_func_response = updateLeagueStatus(leaguesTable, leagues)
    scanDB_func_response = scanTable(leaguesTable)

    assert scanDB_func_response[0]['LeagueID'] == 'TestingScan'
    assert scanDB_func_response[0]['LeagueStatus'] == 'Closed'
    assert updateLeagueStatus_func_response == 'Successfuly updated league status'

@mock_dynamodb2
def test_updateLeaguePlayerPicks():
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
				'LeaguePlayerID': 'Testing123/124567',
                'UnpickedTeams': ['Manchester United', 'Manchester City'],
                'PickedTeams': ['Aston Villa'],
                'CurrentPick': 'Aston Villa'
			})
    player={
        'LeaguePlayerID': 'Testing123/124567'
    }

    updateLeaguePlayerPicks_func_response = updateLeaguePlayerPicks(LeaguePlayerTable, player, 'Manchester United', ['Aston Villa', 'Manchester United'], ['Manchester City'])

    response = LeaguePlayerTable.scan()

    assert updateLeaguePlayerPicks_func_response == 'Successfully updated players picks'
    assert response['Items'][0]['UnpickedTeams'] == ['Manchester City']

