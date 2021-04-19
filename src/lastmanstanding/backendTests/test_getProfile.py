import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.getProfile.src.index import queryDB

# mock AWS services
@mock_dynamodb2
def test_queryDB():
    # set up DB
    table_name = 'ProfileDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'Sub', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'Sub','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    sub = '14532'
    tableName = dynamodb.Table(table_name)

    # add item to mock table to query
    tableName.put_item(
        Item={
            'Sub': '14532',
            'favouriteTeam': 'manchesterunited'
        })
    
    # call the function and pass in the above mock input
    func_response = queryDB(tableName, sub)
    
    # check it worked correctly 
    assert func_response[0]['favouriteTeam'] == 'manchesterunited'