import boto3
import pytest
from moto import mock_dynamodb2
import sys
sys.path.insert(1,'../amplify/backend/function/adminActions/src')
from index import *


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


