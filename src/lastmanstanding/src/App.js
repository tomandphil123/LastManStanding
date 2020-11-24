import React, { Component } from 'react';
import Navbar from './libs/navbar/navbar';
import './App.css';
import { Auth } from 'aws-amplify';

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true,
    user: null
  }

  setAuthStatus = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  setUser = user => {
    this.setState({ user: user });
  }

  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      console.log(session);
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
    } catch(error) {
      if (error !== 'No current user') {
        console.log(error);
      }
    }
  
    this.setState({ isAuthenticating: false });
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
    }
    
    return (
      <div className="App">
        <header className="App-header">
          <div className="header h1">
            <h1>Last Man Standing</h1>
          </div>
        </header>
        <Navbar auth={authProps}/>
      </div>
    );
  }
}
export default App;