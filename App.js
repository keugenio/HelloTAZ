import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TextInput, FlatList} from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import moment from 'moment';
import firebaseConfig from './firebaseAuth.json';

const today= moment().format('MMM-DD-YY')

export default class App extends React.Component {
  state = { 
    name: null, 
    email: null ,
    localContacts:[],
  }

  onChange = (value) => {
    this.setState({value});
    console.log(this.state.value);
  }
  clearForm() {
    // clear content from all textbox
    this.setState({ name: null });
    this.setState({ email: null });
  }
  handleUploadContact = (newPaddler) => {
    const today= moment().format('MMM-DD-YY')
    firebase.database().ref(today + '/'+ newPaddler.name).set({
      name:newPaddler.name,
      email:newPaddler.email
    })
    .catch((error)=>{
      console.log(error);
      
    })    
  }
  handleUploadContacts = () => {
    this.state.localContacts.map( (contact) => {
      this.handleUploadContact(contact)
    })
    this.setState({localContacts: []})
    console.log("local contacts after upload", this.state.localContacts);
    
  }
  handleSubmit = () => {
    const newPaddler = {name: this.state.name, email:this.state.email};
    this.state.localContacts.push(newPaddler);
    alert("Mahalo for signing up! we'll email you with more details for our open house!");
    this.clearForm();
    console.log("local contacts", this.state.localContacts);
    
  }

  componentWillMount(){
    const config = firebaseConfig.config

    firebase.initializeApp(config);

    console.log(firebase);
    
    firebase.database().ref('users/001').set({
      name:'pepe',
      email:'email@email.com'
    })
    .then( ()=>{
      console.log('inserted')
    })
    .catch((error)=>{
      console.log(error);
      
    })
  }

  render() {
    return (
      <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: 'space-between'
        }}>
        <View style={[styles.container]}>
            <View style={styles.headerStyle}>
              <Image source={require('./src/images/header_copy.png')} style={styles.logoStyle}/>
              <View style={styles.headerTextStyle}>
                <Text style={{textAlign:'center', fontSize:20, fontWeight:'700', color:'white'}}>Team Arizona Outrigger Canoe Club</Text>
              </View>
              <View style={styles.headerTextStyle}>
                <Text style={{fontSize:18, fontWeight:'100', color:'white'}}> Sign up for more details on paddling with us</Text>
              </View>
            </View>
            <View style={styles.formStyle}>
                <View style={styles.inputGroupStyle}>
                  <Text style={styles.textStyle}>Name</Text>
                  <TextInput 
                    style={styles.inputStyle}
                    onChangeText={(name) => this.setState({name})}
                    value={this.state.name}
                    autoCorrect={false}
                    autoFocus
                  />
                </View>
                <View style={styles.inputGroupStyle}>
                  <Text style={styles.textStyle}>Email</Text>
                  <TextInput 
                    style={styles.inputStyle}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.email}   
                    placeholder="email@gmail.com"  
                    placeholderTextColor='rgba(255,255,255,.5)'       
                  />
                </View>
                <View style={{marginHorizontal:50}}>
                  <Button
                    title="Sign Up!"
                    onPress={this.handleSubmit}
                    style={styles.buttonStyle}
                    backgroundColor={'#e74c3c'}
                    color={'#FF0000'}
                    fontSize={50}
                  />
                </View>
                <View style={{marginHorizontal:50}}>
                  <Button
                    title="Upload Local Contacts to database"
                    onPress={this.handleUploadContacts}
                    style={styles.buttonStyle}
                    backgroundColor={'#e74c3c'}
                    color={'#FF0000'}
                    fontSize={50}
                  />
                </View> 
                                  
            </View>
          </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    flex:1,
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#0d47a1',
  },
  headerStyle:{
    alignItems:'center',
    justifyContent:'center',
    flexGrow:1,
    flex:1
  },
  headerTextStyle:{
    flexGrow:1, 
    marginHorizontal:60
  },
  formStyle: {
    flexGrow:1
  },
  logoStyle: {
    width:300,
    height:75,
    tintColor:'#44a4f2',
  },
  textStyle:{
    color:'#FFFFFF',
    fontSize:20,
  },
  inputGroupStyle: {
    flexDirection:'row', 
    alignItems:'center', 
    justifyContent:'flex-start',
    marginBottom:25
  },
  inputStyle: {
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1, 
    color:'white', 
    fontSize:20, 
    paddingHorizontal:10,
    flexGrow:1,
    marginHorizontal:10
  },
  buttonStyle: {
    borderColor: '#2ecc71',
    borderWidth:1,
    borderRadius:10
  }
});
