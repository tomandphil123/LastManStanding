import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.teamInfo.src.index import getTeams

# mock AWS services
@mock_dynamodb2
def test_getTeams():
    # set up DB
    table_name = 'PlTeamsDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'TeamName', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'TeamName','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    teamsTable = dynamodb.Table(table_name)
    teamsTable.put_item(
			Item={
				'TeamName': 'Manchester United FC'
			})

    # call the function on mock table
    func_response = getTeams(teamsTable)
    
    # check it worked correctly
    assert func_response[0]['TeamName'] == 'Manchester United FC'