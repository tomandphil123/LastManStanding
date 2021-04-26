import React from 'react';
import {shallow} from 'enzyme';
import IndividualLeague from './individualLeague';

describe('Individual League', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    username: "mockUsername",
    sub: "mockSub",
    leagueId: "mockLeagueId",
    individualLeague: true,
    setIndividualLeague: jest.fn(),
    fixtures: {
      data: [
        [],
        [
          {
            'AwayScore': '0',
            'AwayTeam': 'Arsenal FC',
            'AwayTeamCrest': 'https://crests.football-data.org/57.svg',
            'createdTime': '2021-02-11 12:40:00.561002',
            'GameWeek': '24',
            'HomeScore': '1',
            'HomeTeam': 'Aston Villa FC',
            'HomeTeamCrest': 'https://crests.football-data.org/58.svg',
            'MatchID': 'Aston Villa FC-Arsenal FC',
            'Winner': 'Aston Villa FC',
          },
          {
            'AwayScore': '1',
            'AwayTeam': 'Brighton FC',
            'AwayTeamCrest': 'https://crests.football-data.org/397.svg',
            'createdTime': '2021-02-11 12:40:00.654459',
            'GameWeek': '24',
            'HomeScore': '1',
            'HomeTeam': 'Burnley FC',
            'HomeTeamCrest': 'https://crests.football-data.org/328.svg',
            'MatchID': 'Burnley FC-Brighton FC',
            'Winner': 'Draw',
          },
          {
            'AwayScore': '0',
            'AwayTeam': 'West Ham United FC',
            'AwayTeamCrest': 'https://crests.football-data.org/563.svg',
            'createdTime': '2021-02-11 12:40:00.694246',
            'GameWeek': '24',
            'HomeScore': '0',
            'HomeTeam': 'Fulham FC',
            'HomeTeamCrest': 'https://crests.football-data.org/63.svg',
            'MatchID': 'Fulham FC-West Ham United FC',
            'Winner': 'Draw',
          },
        ],
        [
            {
            'AwayTeam': 'Leeds United FC',
            'AwayTeamCrest': 'https://crests.football-data.org/341.svg',
            'createdTime': '2021-02-11 12:40:01.254269',
            'FixtureID': 'Arsenal FC-Leeds United FC',
            'GameWeek': '24',
            'HomeTeam': 'Arsenal FC',
            'HomeTeamCrest': 'https://crests.football-data.org/57.svg',
            },
            {
            'AwayTeam': 'Aston Villa FC',
            'AwayTeamCrest': 'https://crests.football-data.org/58.svg',
            'createdTime': '2021-02-11 12:40:01.134268',
            'FixtureID': 'Brighton FC-Aston Villa FC',
            'GameWeek': '24',
            'HomeTeam': 'Brighton FC',
            'HomeTeamCrest': 'https://crests.football-data.org/397.svg',
            },
            {
            'AwayTeam': 'Newcastle United FC',
            'AwayTeamCrest': 'https://crests.football-data.org/67.svg',
            'createdTime': '2021-02-11 12:40:01.374223',
            'FixtureID': 'Chelsea FC-Newcastle United FC',
            'GameWeek': '24',
            'HomeTeam': 'Chelsea FC',
            'HomeTeamCrest': 'https://crests.football-data.org/61.svg',
            },
        ],]
    },
  };

  describe('Snapshot', () => {
    it('renders correctly', () => {
      const leagueInfo = {data: []}
      const component = shallow(
          <IndividualLeague {...props} leagueInfo={leagueInfo}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
});