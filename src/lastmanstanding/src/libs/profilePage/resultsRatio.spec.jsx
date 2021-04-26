import React from 'react';
import {shallow} from 'enzyme';
import ResultsRatio from './resultsRatio';

describe('ResultsRatio', () => {
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
  };

  describe('Snapshot', () => {
    it('renders correctly', () => {
      const component = shallow(
          <ResultsRatio {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
});