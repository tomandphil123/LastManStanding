import React from 'react';
import {shallow} from 'enzyme';
import AdminSystem from './adminSystem';
import axios from 'axios';
import alertify from 'alertifyjs';

const mockSetState = jest.fn();
global.scrollTo = jest.fn()

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
});
