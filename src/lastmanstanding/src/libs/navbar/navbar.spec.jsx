import React from 'react';
import { shallow } from 'enzyme';
import Navbar from './navbar';

describe('Navbar', () => {

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
});