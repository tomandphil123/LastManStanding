import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './signIn';
import { jssPreset } from '@material-ui/core';

describe('SignIn', () => {
    const props = {
        username: 'username',
        password: 'password',
        isLoggedIn: jest.fn(),
        setUser: jest.fn(),
    };
    describe('Snapshot', () => {
        it('renders', () => {
          const component = shallow(
            <SignIn {...props}/>,
          );
          expect(component).toMatchSnapshot();
        });
    });
});