import React from 'react';
import {shallow} from 'enzyme';
import AdminSystem from './adminSystem';
import axios from 'axios';

const mockSetState = jest.fn();
global.scrollTo = jest.fn()
const alertify = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial) => [initial, mockSetState],
}));

jest.mock('axios', () => ({
  post: jest.fn((_url, _body) => {
    return new Promise((resolve) => {
      url = '';
      body = {};
      resolve(true);
    });
  }),
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
        setIndividualLeague: jest.fn(),
        setIndividualRender: jest.fn(),
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
        setIndividualLeague: jest.fn(),
        setIndividualRender: jest.fn(),
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
        setIndividualLeague: jest.fn(),
        setIndividualRender: jest.fn(),
      };
      const component = shallow(
          <AdminSystem {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('Button Clicks', () => {
    it('unlock league', async () => {
      const props = {
        leagueStatus: true,
        leagueID: 'TestID',
        playerRemoval: false,
        leaguePlayerID: 'TestplayerID',
        setRender: jest.fn(),
        setIndividualLeague: jest.fn(),
        setIndividualRender: jest.fn(),
      };
      const component = shallow(
          <AdminSystem {...props}/>,
      );
      const response = 'Successfully unlocked League';
      axios.post.mockImplementationOnce(() => Promise.resolve(response));
      component.find('[data-automation="unlockLeague"]').simulate('click');
      expect(axios.post).toHaveBeenCalled();
    });
    it('lock league', async () => {
      const props = {
        leagueStatus: false,
        leagueID: 'TestID',
        playerRemoval: false,
        leaguePlayerID: 'TestplayerID',
        setRender: jest.fn(),
        setIndividualLeague: jest.fn(),
        setIndividualRender: jest.fn(),
      };
      const component = shallow(
          <AdminSystem {...props}/>,
      );
      const response = 'Successfully locked League';
      axios.post.mockImplementationOnce(() => Promise.resolve(response));
      component.find('[data-automation="lockLeague"]').simulate('click');
      expect(axios.post).toHaveBeenCalled();
    });
    it('Reset league', async () => {
      const props = {
        leagueStatus: true,
        leagueID: 'TestID',
        playerRemoval: false,
        leaguePlayerID: 'TestplayerID',
        setRender: jest.fn(),
        setIndividualLeague: jest.fn(),
        setIndividualRender: jest.fn(),
      };
      const component = shallow(
          <AdminSystem {...props}/>,
      );
      const response = 'Successfully Reset League';
      axios.post.mockImplementationOnce(() => Promise.resolve(response));
      component.find('[data-automation="ResetLeague"]').simulate('click');
      expect(axios.post).toHaveBeenCalled();
    });
    it('Deletes league', async () => {
      const props = {
        leagueStatus: true,
        leagueID: 'TestID',
        playerRemoval: false,
        leaguePlayerID: 'TestplayerID',
        setRender: jest.fn(),
        setIndividualLeague: jest.fn(),
        setIndividualRender: jest.fn(),
      };
      const component = shallow(
          <AdminSystem {...props}/>,
      );
      const response = 'Successfully Delete League';
      axios.post.mockImplementationOnce(() => Promise.resolve(response));
      component.find('[data-automation="DeleteLeague"]').simulate('click');
      expect(axios.post).toHaveBeenCalled();
    });
    it('Removes player', async () => {
      const props = {
        leagueStatus: true,
        leagueID: 'TestID',
        playerRemoval: true,
        leaguePlayerID: 'TestplayerID',
        setRender: jest.fn(),
        setIndividualLeague: jest.fn(),
        setIndividualRender: jest.fn(),
      };
      const component = shallow(
          <AdminSystem {...props}/>,
      );
      const response = 'Successfully Removes Player';
      axios.post.mockImplementationOnce(() => Promise.resolve(response));
      component.find('[data-automation="removePlayer"]').simulate('click');
      expect(axios.post).toHaveBeenCalled();
    });
  });
});
