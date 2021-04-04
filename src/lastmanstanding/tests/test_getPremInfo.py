import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.getPremierLeagueInfo.src.index import scanTable

# mock AWS services
@mock_dynamodb2
def test_scanTable():
    # set up DB
    table_name = 'PLFixturesDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'FixtureID', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'FixtureID','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    fixturesTable = dynamodb.Table(table_name)
    fixturesTable.put_item(
			Item={
				'FixtureID': 'Arsenal FC-Liverpool FC',
                'position': '1'
			})
    
    fixturesTable.put_item(
			Item={
				'FixtureID': 'Aston Villa FC-Fulham FC',
                'position': '2'
			})


    sorter = 'position'
    # call the function on mock table
    func_response = scanTable(fixturesTable, sorter)
    
    # check it worked correctly
    assert func_response[0]['FixtureID'] == 'Arsenal FC-Liverpool FC'

    # check if the sorting worked correctly 
    assert func_response[1]['FixtureID'] == 'Aston Villa FC-Fulham FC'