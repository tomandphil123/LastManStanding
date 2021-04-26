import React from 'react';
import {shallow} from 'enzyme';
import UserInfo from './userInfo';

describe('UserInfo', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    myInfo: [
      {
        "Sub": "ecbc56df-d81a-410d-b399-4421b55ced32",
        "Username": "philip",
        "email": "philip.donnelly28@mail.dcu.ie",
        "favouriteTeam": "manchesterunited",
        "leagueIDs": [
          "Plips League#283625",
          "Glenn's Last Man Standing#522084",
          "Ladyboys Inc#819148",
          "The Last man standing#984785",
        ],
        "losses": "5",
        "wins": "0",
      }
    ],
    setmyTeam: jest.fn(),
  };

  describe('Snapshot', () => {
    it('renders correctly', () => {
      const component = shallow(
          <UserInfo {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('change team', () => {
    it('sets setmyTeam to true', () => {
      const component = shallow(
          <UserInfo {...props}/>,
      );
      component.find("WithStyles(ForwardRef(Button))").simulate("click");
      expect(props.setmyTeam).toHaveBeenCalledWith(true);
    });
  });
});