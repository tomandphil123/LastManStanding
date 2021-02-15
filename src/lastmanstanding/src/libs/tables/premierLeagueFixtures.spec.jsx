import React from 'react';
import {shallow} from 'enzyme';
import PremierLeagueFixtures from './premierLeagueFixtures';

describe('premierLeagueFixtures', () => {
  const props = {
    results: {
      data: [
        [],
        [],
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
        ],
      ]},
  };
  describe('Snapshot', () => {
    it('renders', () => {
      const component = shallow(
          <PremierLeagueFixtures {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
