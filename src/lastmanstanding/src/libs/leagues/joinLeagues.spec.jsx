import React from 'react';
import {shallow} from 'enzyme';
import JoinLeagues from './joinLeagues';
import {fireEvent, render} from '@testing-library/react';

describe('joinLeagues', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    user: {
      attributes: {
        sub: 'ecbc56df-d81a-410d-b399-4421b55ced32',
        email_verified: true,
        email: 'philip.donnelly28@mail.dcu.ie',
      },
    },
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
  describe('submit Button', () => {
    it('calls handleSubmit', () => {
      const {getByTestId} = render(<JoinLeagues {...props}/>);
      const button = getByTestId('joinLeague');
      fireEvent.click(button);
      // expect(element).toHaveValue('mockFirstName');
    });
  });
});
