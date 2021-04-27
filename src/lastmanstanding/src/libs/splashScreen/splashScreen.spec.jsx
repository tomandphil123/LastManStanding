import React from 'react';
import { shallow } from 'enzyme';
import SplashScreen from './splashScreen';

describe('Splash Screen', () => {
    describe('Snapshot', () => {
        it('renders', () => {
          const component = shallow(
            <SplashScreen/>,
          );
          expect(component).toMatchSnapshot();
        });
    });
});