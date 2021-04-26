import React from 'react';
import {shallow} from 'enzyme';
import SelectFavouriteTeam from './selectFavouriteTeam';

describe('SelectFavouriteTeam', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    myTeam: true,
    setmyTeam: jest.fn(),
    teams: {
      'Arsenal FC': 'arsenal',
      'Aston Villa FC': 'astonvilla',
      'Brighton & Hove Albion FC': 'brightonandhovealbion',
      'Burnley FC': 'burnley',
      'Chelsea FC': 'chelsea',
      'Crystal Palace FC': 'crystalpalace',
      'Everton FC': 'everton',
      'Fulham FC' : 'fulham',
      'Leeds United FC': 'leedsunited',
      'Leicester City FC': 'leicestercity',
      'Liverpool FC': 'liverpool',
      'Manchester City FC': 'manchestercity',
      'Manchester United FC': 'manchesterunited',
      'Newcastle United FC': 'newcastleunited',
      'Sheffield United FC': 'sheffieldunited',
      'Southampton FC': 'southampton',
      'Totenham Hotspur FC': 'totenhamhotspur',
      'West Bromwich Albion FC': 'westbromwichalbion',
      'West Ham United FC': 'westhamunited',
      'Wolverhampton Wanderers FC': 'wolverhamptonwanderers',
    },
    selectTeam: jest.fn(),
  };

  describe('Snapshot', () => {
    it('renders correctly', () => {
      const component = shallow(
          <SelectFavouriteTeam {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('button clicks', () => {
    it('selects favourite team', () => {
      const component = shallow(
          <SelectFavouriteTeam {...props}/>,
      );
      component.find("WithStyles(WithStyles(ForwardRef(Button)))").at(0).simulate('click');
      expect(props.setmyTeam).toHaveBeenCalledWith(false)
      expect(props.selectTeam).toHaveBeenCalledWith('Arsenal FC')
    });
  });
});