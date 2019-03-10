import React, {Component} from 'react';
import {Text} from 'react-native';
import {Button, Card, CardSection, Input, Spinner} from './common';
import firebase from 'firebase';

class LoginForm extends Component {
    state = {email:'',password:'', error:'' , loading: false };
        
    onButtonPress () {
        const { email, password } = this.state;
        this.setState({error:'', loading: true});

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then( this.onLoginSuccess.bind(this))
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then( this.onLoginSuccess.bind(this))
            .catch( this.onLoginFail.bind(this));
        });
    };

    onLoginFail () {
        this.setState({error:'Authentication failed.', loading: false});
    }
    onLoginSuccess () {
        this.setState({
            email: '',
            password: '',
            error:'',
            loading: false
        });
    }
    renderButton() {
            if (this.state.loading) {
                return <Spinner size='large' />
            }
            return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>  
    };

    render(){
        return(
            <Card>
                <CardSection>
                    <Input 
                        label='Email:'
                        value = {this.state.email}
                        onChangeText = {email => this.setState({ email })} 
                        placeholder = 'user@gmail.com'
                    />
                </CardSection>
                <CardSection>
                    <Input 
                        label='password:'
                        value = {this.state.password}
                        onChangeText = {password => this.setState({ password })} 
                        placeholder = 'password'
                        secureTextEntry
                    />                
                </CardSection>
                <Text style={styles.errorTextStyles}>{this.state.error}</Text>
                <CardSection>
                    {this.renderButton()}    
                </CardSection>
            </Card>
        );
    }
}

const styles = {
    errorTextStyles: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
};

export default LoginForm;