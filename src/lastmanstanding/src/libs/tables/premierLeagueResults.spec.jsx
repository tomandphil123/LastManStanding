import React from 'react';
import {shallow} from 'enzyme';
import PremierLeagueResults from './premierLeagueResults';

describe('loggedInHomePage', () => {
  const props = {
    results: {
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
        [],
      ]},
  };
  describe('Snapshot', () => {
    it('renders', () => {
      const component = shallow(
          <PremierLeagueResults {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
