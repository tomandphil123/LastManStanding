import React from 'react';
import {shallow} from 'enzyme';
import PickTeam from './pickTeam';

const mockSetSelectedTeam = jest.fn();
const mockSubmitTeam = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial) => [initial, mockSetSelectedTeam],
}));

describe('pickTeam', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    setPick: jest.fn(),
    sub: 'mockSub',
    leagueID: 'mockLeagueId',
    teams: [
      'Manchester United FC',
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
    it('renders select when team is selected', () => {
      const component = shallow(
          <PickTeam {...props}/>,
      );
      component.find(
          '[data-automation="Manchester United FC"]',
      ).simulate('click');
      expect(component).toMatchSnapshot();
    });
  });
  describe('submit Team', () => {
    it('selects correct team', () => {
      const component = shallow(
          <PickTeam {...props}/>,
      );
      component.find(
          '[data-automation="Manchester United FC"]',
      ).simulate('click');
      expect(mockSetSelectedTeam).toHaveBeenCalledWith('Manchester United FC');
    });
  });
});
