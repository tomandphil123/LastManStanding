import React from 'react';
import {shallow} from 'enzyme';
import PremierLeagueStandings from './premierLeagueStandings';

describe('loggedInHomePage', () => {
  const props = {
    results: {
      data: [
        [
          {
            'createdTime': '2021-02-11 12:39:57.315513',
            'crestUrl': 'https://crests.football-data.org/57.svg',
            'draw': '4',
            'gamesPlayed': '23',
            'goalDifference': '4',
            'lost': '10',
            'points': '31',
            'position': '11',
            'TeamName': 'Arsenal FC',
            'won': '9',
          },
          {
            'createdTime': '2021-02-11 12:39:56.814244',
            'crestUrl': 'https://crests.football-data.org/58.svg',
            'draw': '2',
            'gamesPlayed': '21',
            'goalDifference': '12',
            'lost': '8',
            'points': '35',
            'position': '9',
            'TeamName': 'Aston Villa FC',
            'won': '11',
          },
          {
            'createdTime': '2021-02-11 12:39:58.376315',
            'crestUrl': 'https://crests.football-data.org/397.svg',
            'draw': '10',
            'gamesPlayed': '23',
            'goalDifference': '-5',
            'lost': '8',
            'points': '25',
            'position': '15',
            'TeamName': 'Brighton FC',
            'won': '5',
          },
        ],
        [],
      ]},
  };
  describe('Snapshot', () => {
    it('renders', () => {
      const component = shallow(
          <PremierLeagueStandings {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
