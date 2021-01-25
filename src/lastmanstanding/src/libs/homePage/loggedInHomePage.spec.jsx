import React from 'react';
import { shallow } from 'enzyme';
import LoggedInHomePage from './loggedInHomePage';

describe('loggedInHomePage', () => {

    describe('Snapshot', () => {
        it('renders', () => {
          const component = shallow(
            <LoggedInHomePage />,
          );
          expect(component).toMatchSnapshot();
        });
    });
});