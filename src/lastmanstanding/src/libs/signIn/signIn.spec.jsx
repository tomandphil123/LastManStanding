import React from 'react';
import { shallow } from 'enzyme';
import SignIn from './signIn';

describe('SignIn', () => {
    const props = {
        username: 'username',
        password: 'password',
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