import React from 'react';
import {shallow} from 'enzyme';
import Leagues from './leagues';
import renderer from "react-test-renderer";
import axios from 'axios';

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

  const props = {
    user: {
      attributes: {
        sub: 'ecbc56df-d81a-410d-b399-4421b55ced32',
      },
    },
    results: {},
  };
  describe('Snapshot', () => {
    it('renders undefined user', () => {
      const props = {
        user: {},
        results: {},
      };
      const component = shallow(
          <Leagues {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  it('renders defined user', async () => {
    const myLeaguesInfo = [
      [
        {
          Admin: 'Yes',
          CurrentPick: 'Everton FC',
          LeagueID: 'Plips League#283625',
          // eslint-disable-next-line max-len
          LeaguePlayerID: 'Plips League#283625/ecbc56df-d81a-410d-b399-4421b55ced32',
          PickedTeams: ['Everton FC'],
          // eslint-disable-next-line max-len
          UnpickedTeams: ['Manchester United FC', 'Manchester City FC', 'Leicester City FC'],
          Username: 'philip',
          createdTime: '2021-02-22 16:46:34.558082',
          fullName: 'philip donnelly',
          playerStatus: 'In',
        },
      ],
    ];
    axios.get.mockImplementationOnce(() => Promise.resolve(
        {data: myLeaguesInfo},
    ));
    const tree = renderer.create(<Leagues {...props}/>);
    await Promise.resolve();
    expect(tree.toJSON()).toMatchSnapshot();
  });

  describe('Button Clicks', () => {
    it('updates join league button', () => {
      const component = shallow(
          <Leagues {...props}/>,
      );
      component.find('[data-automation="JoinLeague"]').simulate('click');
      expect(mockSetState).toHaveBeenCalled();
    });
    it('updates create league button', () => {
      const component = shallow(
          <Leagues {...props}/>,
      );
      component.find('[data-automation="CreateLeague"]').simulate('click');
      expect(mockSetState).toHaveBeenCalled();
    });
  });
});
