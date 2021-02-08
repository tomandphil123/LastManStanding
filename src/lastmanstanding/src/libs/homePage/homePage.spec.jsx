import React from 'react';
import {shallow} from 'enzyme';
import HomePage from './homePage';

describe('loggedInHomePage', () => {
  describe('Snapshot', () => {
    it('renders', () => {
      const component = shallow(
          <HomePage />,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
