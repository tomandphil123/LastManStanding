import React, { Component } from 'react';
import Navbar from './libs/navbar/navbar';
import './App.css';
import { Auth } from 'aws-amplify';
import { Route, BrowserRouter,Switch } from 'react-router-dom';
import LoggedInHomePage from './libs/homePage/loggedInHomePage';
import SignIn from './libs/signIn/signIn';
import SignUp from './libs/signUp/signUp';
import ForgotPassword from './libs/forgotPassword/forgotPassword';
import axios from 'axios';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null,
    response: {}
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      this.setAuthStatus(true);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch(error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
    axios.get('https://8yo67af9d5.execute-api.eu-west-1.amazonaws.com/dev/premierLeagueInfo')
    .then(response => {
        this.setState({response: response})
    })
    this.setState({ isAuthenticating: false });
  }
  
  setIsLoggedIn = async => {
    this.setAuthStatus(true);
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }

    return (
      <BrowserRouter>
          <Navbar auth={authProps} />
          <div>
            <Switch>
              <Route exact path="/">
                <LoggedInHomePage results={this.state.response}/>
              </Route>
              <Route path="/SignIn">
                <SignIn isLoggedIn = {this.setIsLoggedIn}/>
              </Route>
              <Route path="/SignUp">
                <SignUp/>
              </Route>
              <Route path="/Profile">
                <h1>Profile</h1>
              </Route>
              <Route path="/MyLeagues">
                <Leagues user={authProps.user}/>
              </Route>
              <Route path="/ContactUs">
                <h1>Contact Us</h1>
              </Route>
              <Route path="/ForgotPassword">
                <ForgotPassword/>
              </Route>
            </Switch>
          </div>
      </BrowserRouter>
    );
  }
}
export default App;