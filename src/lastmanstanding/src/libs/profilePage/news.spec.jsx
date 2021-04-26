import React from 'react';
import {shallow} from 'enzyme';
import News from './news';

describe('News', () => {
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
    teamInfo: [
      {
        "imgsrc": "https://e0.365dm.com/21/04/384x216/skysports-marcus-rashford-luke-ayling_5355568.jpg?20210425142012",
        "link": "https://www.skysports.com/football/leeds-united-vs-manchester-united/report/429160",
        "shortdesc": "Manchester City only require two wins from their final five matches in order to clinch the Premier League title after Manchester United and Leeds played out a 0-0 draw.",
        "title": " Leeds and Man Utd frustrated in stalemate ",
      },
      {
        "imgsrc": "https://e1.365dm.com/21/04/384x216/skysports-man-utd-leeds-premier-league_5355777.jpg?20210425165240",
        "link": "https://www.skysports.com/football/news/11661/12286631/ole-gunnar-solskjaer-disappointed-as-man-utd-drop-two-points-at-leeds",
        "shortdesc": "Ole Gunnar Solskjaer felt it was two points dropped after Manchester United were held 0-0 by Leeds in an intense game of few chances at Elland Road.",
        "title": " Ole: Two points dropped | Bielsa: It was a demanding game",
      }
    ],
    setmyTeam: jest.fn(),
  };

  describe('Snapshot', () => {
    it('renders correctly', () => {
      const component = shallow(
          <News {...props}/>,
      );
      expect(component).toMatchSnapshot();
    });
    it('renders loading', () => {
      const prop = {
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
        teamInfo: undefined,
        setmyTeam: jest.fn(),
      }
      const component = shallow(
          <News {...prop}/>,
      );
      expect(component).toMatchSnapshot();
    });
    it('renders selectFavouriteTeam button', () => {
      const prop = {
        myInfo: [
          {
            "Sub": "ecbc56df-d81a-410d-b399-4421b55ced32",
            "Username": "philip",
            "email": "philip.donnelly28@mail.dcu.ie",
            "favouriteTeam": "-",
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
        teamInfo: undefined,
        setmyTeam: jest.fn(),
      }
      const component = shallow(
          <News {...prop}/>,
      );
      expect(component).toMatchSnapshot();
    });
  });
  describe('button click', () => {
    it('renders selectFavouriteTeam button', () => {
      const prop = {
        myInfo: [
          {
            "Sub": "ecbc56df-d81a-410d-b399-4421b55ced32",
            "Username": "philip",
            "email": "philip.donnelly28@mail.dcu.ie",
            "favouriteTeam": "-",
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
        teamInfo: undefined,
        setmyTeam: jest.fn(),
      }
      const component = shallow(
          <News {...prop}/>,
      );
      component.find("WithStyles(ForwardRef(Button))").simulate("click");
      expect(prop.setmyTeam).toHaveBeenCalledWith(true);
    });
  });
});