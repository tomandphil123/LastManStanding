import boto3
import pytest
from moto import mock_dynamodb2
from amplify.backend.function.LeagueInfoLambda.src.index import scanTable, removeExistingDbItems, updatedStandingsDB, updateSchedulerDB, addFixtures, addResults, getProbability

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
			})

    # call the function on mock table
    func_response = scanTable(fixturesTable)
    
    # check it worked correctly
    assert func_response[0]['FixtureID'] == 'Arsenal FC-Liverpool FC'

# mock AWS services
@mock_dynamodb2
def test_removeExisting():
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
			})

    # call the function on mock table
    func_response = removeExistingDbItems(fixturesTable, scanTable(fixturesTable), 'FixtureID')

    tableData = fixturesTable.scan()

    # check it worked correctly
    assert func_response == 'Removed all items from DB'
    assert tableData['Items'] == []

# mock AWS services
@mock_dynamodb2
def test_updateStandingsDB():
    # set up DB
    table_name = 'PLStandingsDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'TeamName', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'TeamName','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    StandingsTable = dynamodb.Table(table_name)

    team = {
        'position': 1,
        'team': {
            'crestUrl': 'https://crests.football-data.org/65.svg'
        },
		'playedGames': 18,
		'won': 10,
		'draw': 2,
		'lost': 3,
		'points': 32,
		'goalDifference': 14,
    }

    # call the function on mock table
    func_response = updatedStandingsDB(StandingsTable, team, 'Manchester United FC')

    tableData = StandingsTable.scan()

    # check it worked correctly
    assert func_response == 'Successfully updated standings'
    assert tableData['Items'][0]['lost'] == '3'

# mock AWS services
@mock_dynamodb2
def test_updateSchedulerDB():
    # set up DB
    table_name = 'SchedulerDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'GamePeriod', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'GamePeriod','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    SchedulerTable = dynamodb.Table(table_name)

    SchedulerTable.put_item(
        Item={
            'GamePeriod': 'Testing',
            'CurrentGameWeek':'29',
            'FirstGameTime':'14:00', 
            'NextGameWeek':'30', 
            'PreviousGameWeek':'28', 
            'LastGame':'Manchester United FC',
            'LastMatchStartTime':'19:00',
            'Deadline':'15:00 14/04/2021'
        })

    # call the function on mock table
    func_response = updateSchedulerDB(SchedulerTable, 31, 30, '14:00', '19:00', 'Manchester United FC', '15:00', '21/04/2021')

    tableData = SchedulerTable.scan()

    # check it worked correctly
    assert func_response == 'Successfully updated scheduler'
    assert tableData['Items'][0]['Deadline'] == '15:00 21/04/2021'

# mock AWS services
@mock_dynamodb2
def test_addResults():
    # set up DB
    table_name = 'PLResultsDB-develop'
    dynamodb = boto3.resource('dynamodb', 'eu-west-1')
    
    # create DB
    dynamodb.create_table(
        TableName=table_name,
        KeySchema=[{'AttributeName': 'MatchID', 'KeyType': 'HASH'}],
        AttributeDefinitions=[{'AttributeName': 'MatchID','AttributeType': 'S'}],
        ProvisionedThroughput={'ReadCapacityUnits': 5, 'WriteCapacityUnits': 5}
    )

    # Add item to mock table for test
    ResultsTable = dynamodb.Table(table_name)

    match={
        'score':{
            'fullTime':{
                'homeTeam': 0,
                'awayTeam': 2
            }
        }
    }

    crests = {
		'Manchester United FC':'https://crests.football-data.org/66.svg',
		'Liverpool FC':'https://crests.football-data.org/64.svg',
	}
    # call the function on mock table
    func_response = addResults(ResultsTable, match, 'Manchester United FC', 'Liverpool FC','0','1', crests, 30, 'Manchester United FC')

    tableData = ResultsTable.scan()

    # check it worked correctly
    assert func_response == 'Added results'
    assert tableData['Items'][0]['Winner'] == 'Manchester United FC'
    assert tableData['Items'][0]['Winner'] == tableData['Items'][0]['HomeTeam']

# mock AWS services
@mock_dynamodb2
def test_addFixtures():
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
    FixturesTable = dynamodb.Table(table_name)

    crests = {
		'Manchester United FC':'https://crests.football-data.org/66.svg',
		'Liverpool FC':'https://crests.football-data.org/64.svg',
	}
    # call the function on mock table
    func_response = addFixtures(FixturesTable, 'Manchester United FC', 'Liverpool FC', crests, 30, '15:00', '14/04/2021', [50.23,20.22,30.22])

    tableData = FixturesTable.scan()

    # check it worked correctly
    assert func_response == 'Added fixtures'
    assert tableData['Items'][0]['drawProb'] == '20'

def test_getProbabilities():
    # mock input
    match={
        'odds':{
            'homeWin': 2.22,
            'draw': 3.5,
            'awayWin': 3.7
        }
    }

    # call function
    probabilities = getProbability(match)
    assert probabilities[0] == 44.75517989031502
    assert probabilities[1] == 28.3875712447141
    assert probabilities[2] == 26.853107934189012
    assert probabilities[0] + probabilities[1] + probabilities[2] >= 1