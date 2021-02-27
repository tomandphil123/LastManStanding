import React from 'react';
import {shallow} from 'enzyme';
import Leagues from './leagues';

describe('leagues', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    user: {},
    results: {},
  };
  describe('Snapshot', () => {
    it('renders teams', () => {
      const component = shallow(
          <Leagues {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
