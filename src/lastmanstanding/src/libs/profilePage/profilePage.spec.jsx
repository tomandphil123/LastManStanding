import React from 'react';
import {shallow} from 'enzyme';
import ProfilePage from './profilePage';
import axios from 'axios';

describe('profilePage', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    user: {
      username: 'philip',
      attributes: {
        'sub': "ecbc56df-d81a-410d-b399-4421b55ced32",
        'email': "philip.donnelly28@mail.dcu.ie",
        'email_verified': true,
      },
    }
  };

  describe('Snapshot', () => {
    it('renders correctly', () => {
      const component = shallow(
          <ProfilePage {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
});