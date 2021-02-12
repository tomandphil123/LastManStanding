import React from 'react';
import {shallow} from 'enzyme';
import SelectTeam from './selectTeam';

describe('pickTeam', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    submitToggle: true,
    selectedTeam: 'Manchest United FC',
    sub: 'mockSub',
    leagueID: 'mockLeagueId',
    setPermPick: jest.fn(),
    submitTeam: jest.fn(),
  };
  describe('Snapshot', () => {
    it('renders teams', () => {
      const component = shallow(
          <SelectTeam {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
