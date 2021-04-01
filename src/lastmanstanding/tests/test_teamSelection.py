import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.teamSelection.src.index import selectTeam

# mock AWS services
@mock_dynamodb2
def test_getTeams():
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

    # mock inputs
    primaryKey = 'Plips League#283625/e08bc6ed-e7da-4737-b0cf-64aa25364288'
    selectedTeam = 'Manchester United FC'
    selectionTable = dynamodb.Table(table_name)

    # call the function on mock table
    func_response = selectTeam(primaryKey, selectionTable, selectedTeam)
    
    # check it worked correctly
    assert func_response == 'Successful Team Selection'