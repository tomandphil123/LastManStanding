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
    it('sets submitToggle to true', () => {
      const setSubmitToggle = jest.fn();
      const component = mount(<PickTeam {...props}/>);
      const handleClick = jest.spyOn(React, 'useState');
      handleClick.mockImplementation((submitToggle) =>
        [submitToggle, setSubmitToggle]);
      component.find(
          '[data-automation="Manchester United FC"]',
      ).at(0).simulate('click');
      expect(setSubmitToggle).toBeTruthy();
    });
  });
});
