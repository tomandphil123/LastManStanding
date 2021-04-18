import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.deadlineReminder.src.index import queryDB, scanDB

# mock AWS services
@mock_dynamodb2
def test_scanDB():
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
    fixturesTable = dynamodb.Table(table_name)
    fixturesTable.put_item(
			Item={
				'LeaguePlayerID': 'test#4553/134563',
			})

    # call the function on mock table
    func_response = scanDB(fixturesTable)
    
    # check it worked correctly
    assert func_response[0]['LeaguePlayerID'] == 'test#4553/134563'

# mock AWS services
@mock_dynamodb2
def test_queryDB():
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

    sub = '984785'
    tableName = dynamodb.Table(table_name)

    # add item to mock table to query
    tableName.put_item(
        Item={
            'Sub': '984785',
            'email': 'test@gmail.com'
        })
    
    # call the function and pass in the above mock input
    func_response = queryDB(tableName, sub)
    
    # check it worked correctly 
    assert func_response == 'test@gmail.com'