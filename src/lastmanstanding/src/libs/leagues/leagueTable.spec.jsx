import React from 'react';
import {shallow} from 'enzyme';
import LeagueTable from './leagueTable';

const mockSetState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial) => [initial, mockSetState],
}));

describe('leagueTable', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  const props = {
    table: [[{"Admin": "Yes",
    "CurrentPick": "Eliminated",
    "LeagueID": "Plips League#283625",
    "LeaguePlayerID": "Plips League#283625/ecbc56df-d81a-410d-b399-4421b55ced32",
    "PickedTeams": ["Arsenal FC"],
    "UnpickedTeams": [
    "Manchester United FC",
    "Manchester City FC",
    "Leicester City FC",
    "Liverpool FC",
    "Tottenham Hotspur FC",
    "Everton FC",
    "Chelsea FC",
    "Southampton FC",
    "West Ham United FC",
    "Sheffield United FC",
     "Aston Villa FC",
     "Leeds United FC",
     "Crystal Palace FC",
     "Wolves FC",
     "Newcastle United FC",
     "Brighton FC",
     "Burnley FC",
     "Fulham FC",
     "West Brom FC",
    ],
    "Username": "philip",
    "createdTime": "2021-02-22 16:46:34.558082",
    "fullName": "philip donnelly",
    "playerStatus": "Out",
    }]],
    setLeagueId: jest.fn(),
    setIndividualLeague: jest.fn()
  };
  describe('Snapshot', () => {
    it('renders correctly', () => {
      const component = shallow(
          <LeagueTable {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('League Click', () => {
    it('calls setIndividualLeague', () => {
      const component = shallow(
          <LeagueTable {...props}/>,
      );
      component.find('[data-automation="IndividualLeagueLink"]').simulate('click');
      expect(props.setIndividualLeague).toHaveBeenCalled();
    });
    it('calls setIndividualLeague', () => {
      const component = shallow(
          <LeagueTable {...props}/>,
      );
      component.find('[data-automation="IndividualLeagueLink"]').simulate('click');
      expect(props.setLeagueId).toHaveBeenCalled();
    });
  });
});