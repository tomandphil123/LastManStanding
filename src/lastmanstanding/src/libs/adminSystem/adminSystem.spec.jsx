import React from 'react';
import {shallow} from 'enzyme';
import AdminSystem from './adminSystem';
import axios from 'axios';
import { trackUpdate } from 'aws-amplify-react';

jest.mock('axios');

const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial) => [initial, mockSetState],
}));

describe('leagues', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  describe('Snapshot', () => {
    it('renders player removal', () => {
      const props = {
        leagueStatus: true,
        leagueID: 'TestID',
        playerRemoval: true,
        leaguePlayerID: 'TestplayerID',
        setRender: jest.fn(),
      };
      const component = shallow(
          <AdminSystem {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
    it('renders admin tools with league locked', () => {
      const props = {
        leagueStatus: true,
        leagueID: 'TestID',
        playerRemoval: false,
        leaguePlayerID: 'TestplayerID',
        setRender: jest.fn(),
      };
      const component = shallow(
          <AdminSystem {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
    it('renders admin tools with league unlocked', () => {
      const props = {
        leagueStatus: false,
        leagueID: 'TestID',
        playerRemoval: false,
        leaguePlayerID: 'TestplayerID',
        setRender: jest.fn(),
      };
      const component = shallow(
          <AdminSystem {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  // describe('Button Clicks', () => {
  //   it('deletes player', async () => {
  //     const props = {
  //       leagueStatus: true,
  //       leagueID: 'TestID',
  //       playerRemoval: false,
  //       leaguePlayerID: 'TestplayerID',
  //       setRender: jest.fn(),
  //     };
  //     const component = shallow(
  //         <AdminSystem {...props}/>,
  //     );
  //     global.confirm = () => true;
  //     component.find('[data-automation="unlockLeague"]').simulate('click');
  //     expect(mockSetState).toHaveBeenCalled();
  //   });
  // });
});
