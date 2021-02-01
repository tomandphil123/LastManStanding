import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './navbar';
import { jssPreset } from '@material-ui/core';

describe('Navbar', () => {
    beforeAll(() => {
        jest.resetAllMocks();
    });

    describe('Snapshot', () => {
        it('renders when signed out', () => {
			const props = {
				auth: {
					isAuthenticated: false,
				}
			}
			const component = shallow(
				<Navbar {...props}/>,
			);
			expect(component).toMatchSnapshot();
		});
		it('renders when signed in', () => {
			const props = {
				auth: {
					isAuthenticated: true,
				}
			}
			const component = shallow(
				<Navbar {...props}/>,
			);
			expect(component).toMatchSnapshot();
        });
    });
    describe('navbar', () => {
        it('initial tab is /', () => {
			const props = {
				auth: {
					isAuthenticated: true,
				}
			}
			const component = shallow(
				<Navbar {...props}/>,
			);
            expect(component.find('WithStyles(ForwardRef(Tab))').at(0).props().to).toEqual('/')
        });
	});
});