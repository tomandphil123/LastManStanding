import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.adminActions.src.index import toggleLeague, queryDB, deleteLeagueFromDB

# mock AWS services
@mock_dynamodb2
def test_toggleLeague():
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
    # check lock leagues with True input
    mock_input_true = {
        'leagueID': 'TomsLeague',
        'lockLeague': True
    }

    # call the function and pass in the above mock_input
    func_response_true = toggleLeague(mock_input_true)
    
    # check it worked correctly (True)
    assert func_response_true == 'Successfully Set League to Joinable'

    # check lock leagues with False input
    mock_input_false = {
        'leagueID': 'TestLeague',
        'lockLeague': False
    }

    # call the function and pass in the above mock_input
    func_response_false = toggleLeague(mock_input_false)

    # check it worked correctly (False)
    assert func_response_false == 'Successfully Set League to Not Joinable'

# mock AWS services
@mock_dynamodb2
def test_queryDB():
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

    leagueID = 'The Last man standing#984785'
    tableName = dynamodb.Table(table_name)

    # add item to mock table to query
    tableName.put_item(
        Item={
            'LeagueID': leagueID
        })
    
    # call the function and pass in the above mock input
    func_response = queryDB(tableName, 'LeagueID', leagueID)
    
    # check it worked correctly 
    assert func_response[0]['LeagueID'] == 'The Last man standing#984785'

# mock AWS services
@mock_dynamodb2
def test_deleteLeagueFromDB():
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

    leagueID = 'The Last man standing#984785'

    tableName = dynamodb.Table(table_name)
    # add item to mock table to query
    tableName.put_item(
        Item={
            'LeagueID': 'The Last man standing#984785'
        })
    
    # call the function and pass in the above mock input
    func_response = deleteLeagueFromDB(tableName, 'LeagueID', leagueID)

    resp = tableName.scan()
    
    # check it worked correctly 
    assert func_response == 'Successfully removed from League'
    assert resp['Items'] == []
