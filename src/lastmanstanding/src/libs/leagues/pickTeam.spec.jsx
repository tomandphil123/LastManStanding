import React from 'react';
import {mount, shallow} from 'enzyme';
import PickTeam from './pickTeam';

const mockSetSelectedTeam = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial) => [initial, mockSetSelectedTeam],
}));

describe('pickTeam', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    fixtures: {
      data: [
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
        [],
      ]},
    setPick: jest.fn(),
    sub: 'mockSub',
    leagueID: 'mockLeagueId',
    teams: [
      'Arsenal FC',
      'Manchester City FC',
      'Liverpool FC',
      'Everton FC',
      'Chelsea FC',
      'Southampton FC',
      'West Ham United FC',
      'Arsenal FC',
      'Aston Villa FC',
      'Crystal Palace FC',
      'Newcastle United FC',
      'Brighton & Hove Albion FC',
      'Burnley FC',
      'Fulham FC',
      'West Bromwich Albion FC',
    ],
    setPermPick: jest.fn(),
  };
  describe('Snapshot', () => {
    it('renders teams', () => {
      const component = shallow(
          <PickTeam {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('submit Team', () => {
    it('selects correct team', () => {
      const component = shallow(
          <PickTeam {...props}/>,
      );
      component.find(
          '[data-automation="Arsenal FC"]',
      ).simulate('click');
      expect(mockSetSelectedTeam).toHaveBeenCalledWith('Arsenal FC');
    });
    it('sets submitToggle to true', () => {
      const setSubmitToggle = jest.fn();
      const component = mount(<PickTeam {...props}/>);
      const handleClick = jest.spyOn(React, 'useState');
      handleClick.mockImplementation((submitToggle) =>
        [submitToggle, setSubmitToggle]);
      component.find(
          '[data-automation="Arsenal FC"]',
      ).at(0).simulate('click');
      expect(setSubmitToggle).toBeTruthy();
    });
  });
});
