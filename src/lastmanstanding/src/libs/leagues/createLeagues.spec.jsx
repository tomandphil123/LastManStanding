import React from 'react';
import {shallow} from 'enzyme';
import CreateLeagues from './createLeagues';
import {fireEvent, render} from '@testing-library/react';

describe('CreateLeagues', () => {
  const props = {
    user: {},
    setCreateLeague: jest.fn(),
    setRender: jest.fn(),
  }
  describe('Snapshot', () => {
    it('renders', () => {
      const component = shallow(
          <CreateLeagues {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('textFields', () => {
    it('updates first name', () => {
      const {getByTestId} = render(<CreateLeagues {...props}/>);
      const element = getByTestId('firstName');
      fireEvent.change(element, {target: {value: 'mockFirstName'}});
      expect(element).toHaveValue('mockFirstName');
    });
    it('updates last name', () => {
      const {getByTestId} = render(<CreateLeagues {...props}/>);
      const element = getByTestId('lastName');
      fireEvent.change(element, {target: {value: 'mockLastName'}});
      expect(element).toHaveValue('mockLastName');
    });
    it('updates league code', () => {
      const {getByTestId} = render(<CreateLeagues {...props}/>);
      const element = getByTestId('leagueName');
      fireEvent.change(element, {target: {value: 'mockLeagueCode'}});
      expect(element).toHaveValue('mockLeagueCode');
    });
  });
});