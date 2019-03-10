import React, {Component} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner, Card, CardSection } from './components/common'; // common is a folder of components. look to index.js to find other components
import LoginForm from './components/LoginForm';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp(
      {
        apiKey:  'AIzaSyC8Pjv_OXDvOkUhLL0uwhsCmoafX3tnaok',
        authDomain: 'auth-3f319.firebaseapp.com',
        databaseURL: 'https://auth-3f319.firebaseio.com',
        projectId: 'auth-3f319',
        storageBucket: 'auth-3f319.appspot.com',
        messagingSenderId: '993900234206'
      }
    );

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true })
        } else {
          this.setState({ loggedIn: false })
        }
    });
  }

  renderContent () {
    switch (this.state.loggedIn) {
      case true:
        return <Button onPress={ () => firebase.auth().signOut() }> Log Out </Button>            
      case false:
        return <LoginForm />;
      default:
        return <Spinner size='large' />
    }
  }

  render () {
    return (
      <View>
        <Header headerText="Authentication" />
        <Card><CardSection></CardSection>
          {this.renderContent()}
        </Card>
      </View>
    );
  }
}

export default App;
