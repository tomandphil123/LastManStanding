import React, {Component} from 'react';
import Navbar from './libs/navbar/navbar';
import './App.css';
import {Auth} from 'aws-amplify';
import {Route, BrowserRouter,Switch} from 'react-router-dom';
import HomePage from './libs/homePage/homePage';
import SignIn from './libs/signIn/signIn';
import SignUp from './libs/signUp/signUp';
import ForgotPassword from './libs/forgotPassword/forgotPassword';
import axios from 'axios';
import Leagues from './libs/leagues/leagues';
import CrestBar from './libs/crestBar/crestBar';
import SplashScreen from './libs/splashScreen/splashScreen';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    premierLeagueInfo: {},
    gotUser: false,
    isLoading: true,
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
      this.setAuthStatus(true);
    } catch(error) {
      this.setUser(null);
    }
    axios.get('https://ida5es25ne.execute-api.eu-west-1.amazonaws.com/develop/premierLeagueInfo')
    .then(response => {
        this.setState({premierLeagueInfo: response, isLoading: false})
    })
  }
  setIsLoggedIn = async => {
    this.setAuthStatus(true);
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser,
      gotUser: this.state.gotUser
    }

  if (this.state.isLoading === false) 
    return (
      <>
      <CrestBar/>
      <BrowserRouter>
          <Navbar auth={authProps} />
          <div className="App">
            <Switch>
              <Route exact path="/">
                <HomePage results={this.state.premierLeagueInfo}/>
              </Route>
              <Route path="/SignIn">
                <SignIn isLoggedIn = {this.setIsLoggedIn} setUser = {this.setUser}/>
              </Route>
              <Route path="/SignUp">
                <SignUp/>
              </Route>
              <Route path="/Profile">
                <h1>My Profile</h1>
              </Route>
              <Route path="/MyLeagues">
                <Leagues user={authProps.user} results={this.state.premierLeagueInfo}/>
              </Route>
              <Route path="/ForgotPassword">
                <ForgotPassword/>
              </Route>
            </Switch>
          </div>
      </BrowserRouter>
      </>
    );
    return (
        <SplashScreen/>
    );
  }
}
export default App;