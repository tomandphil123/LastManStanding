import React from 'react';
import {shallow} from 'enzyme';
import CrestBar from './crestBar';

describe('crestBar', () => {
  describe('Snapshot', () => {
    it('renders', () => {
      const component = shallow(
          <CrestBar/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
});