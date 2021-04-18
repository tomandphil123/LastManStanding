import React from 'react';
import {shallow} from 'enzyme';
import ForgotPassword from './forgotPassword';

describe('forgotPassword', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  describe('Snapshot', () => {
    it('renders correctly', () => {
      const component = shallow(
          <ForgotPassword />,
      );
      expect(component).toMatchSnapshot();
    });
  });
});
