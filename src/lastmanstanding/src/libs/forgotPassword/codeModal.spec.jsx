import React from 'react';
import {shallow} from 'enzyme';
import CodeModal from './codeModal';

describe('codeModal', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    getBack: jest.fn(),
    username: 'mockUsername',
    setUsername: jest.fn(),
  };

  describe('Snapshot', () => {
    it('renders correctly', () => {
      const component = shallow(
          <CodeModal {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('interactions', () => {
    it('calls setUsername()', () => {
      const event = {target: {name: "username", value: "mockUsername"}};
      const component = shallow(
          <CodeModal {...props}/>,
      );
      component.find("WithStyles(ForwardRef(TextField))").at(0).simulate('change', event);
      expect(props.setUsername).toHaveBeenCalled();
    });
    it('calls getBack()', () => {
        const component = shallow(
            <CodeModal {...props}/>,
        );
        component.find("Link").simulate('click');
        expect(props.getBack).toHaveBeenCalled();
    });
  });
});