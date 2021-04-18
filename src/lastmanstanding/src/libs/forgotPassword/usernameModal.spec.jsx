import React from 'react';
import {shallow} from 'enzyme';
import UsernameModal from './usernameModal';

describe('usernameModal', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    getBack: jest.fn(),
    handleCodeSent: jest.fn(),
    username: 'mockUsername',
    setUsername: jest.fn(),
  };

  describe('Snapshot', () => {
    it('renders correctly', () => {
      const component = shallow(
          <UsernameModal />,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('interactions', () => {
    it('calls setUsername()', () => {
      const event = {target: {name: "username", value: "mockUsername"}};
      const component = shallow(
          <UsernameModal {...props}/>,
      );
      component.find("WithStyles(ForwardRef(TextField))").simulate('change', event);
      expect(props.setUsername).toHaveBeenCalled();
    });
    it('calls getBack()', () => {
        const component = shallow(
            <UsernameModal {...props}/>,
        );
        component.find("Link").simulate('click');
        expect(props.getBack).toHaveBeenCalled();
    });
  });
});