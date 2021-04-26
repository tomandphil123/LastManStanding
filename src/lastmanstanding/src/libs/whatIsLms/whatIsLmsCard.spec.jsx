import React from 'react';
import { shallow } from 'enzyme';
import WhatIsLmsCard from './whatIsLmsCard';

describe('Splash Screen', () => {
    describe('Snapshot', () => {
        it('renders', () => {
          const component = shallow(
            <WhatIsLmsCard/>,
          );
          expect(component).toMatchSnapshot();
        });
    });
});