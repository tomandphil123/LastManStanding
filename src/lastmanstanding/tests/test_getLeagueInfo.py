import boto3
import pytest
from moto import mock_dynamodb2
import sys
sys.path.insert(1,'../amplify/backend/function/getLeagueInfo/src/')
from index import *

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
    func_response = queryDB(tableName, leagueID)
    
    # check it worked correctly 
    assert func_response[0]['LeagueID'] == 'The Last man standing#984785'


