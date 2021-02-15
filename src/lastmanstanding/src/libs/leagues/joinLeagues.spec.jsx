import React from 'react';
import {shallow} from 'enzyme';
import JoinLeagues from './joinLeagues';
import TextField from '@material-ui/core/TextField';
import { fireEvent, getByTestId, render } from '@testing-library/react';

describe('joinLeagues', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    user: {},
    setJoinLeague: jest.fn(),
    setRender: jest.fn(),
  };
  describe('Snapshot', () => {
    it('renders teams', () => {
      const component = shallow(
          <JoinLeagues {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('textFields', () => {
    it('updates first name', () => {
      const {getByTestId} = render(<JoinLeagues {...props}/>);
      const element = getByTestId('firstName');
      fireEvent.change(element, {target: {value: 'mockFirstName'}});
      expect(element).toHaveValue('mockFirstName');
    });
    it('updates last name', () => {
      const {getByTestId} = render(<JoinLeagues {...props}/>);
      const element = getByTestId('lastName');
      fireEvent.change(element, {target: {value: 'mockLastName'}});
      expect(element).toHaveValue('mockLastName');
    });
    it('updates league code', () => {
      const {getByTestId} = render(<JoinLeagues {...props}/>);
      const element = getByTestId('leagueCode');
      fireEvent.change(element, {target: {value: 'mockLeagueCode'}});
      expect(element).toHaveValue('mockLeagueCode');
    });
  });
});
