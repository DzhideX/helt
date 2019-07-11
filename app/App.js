import React, {Component} from 'react';
import { createStackNavigator, createAppContainer,StackActions,NavigationActions,WithNavigation } from 'react-navigation';
import {View,Text,AsyncStorage,StyleSheet,TouchableOpacity} from 'react-native';

import { MainView as MainView } from "./main.js";
import { Login as Login } from './LoginViews/login.js';

export default class App extends Component{
  render() {
    return (
      <AppContainer/>
    );
  }
}


//THE LOADING SCREEN:

class SplashScreen extends Component {

  static navigationOptions = {
    header:null
}

  state = {
    isLoading: true
  };

  // THIS FINDS A USER IN THE DATABASE AND IF THERE IS ONE
  // WITH loggedIn=true IT REDIRECTS TO MAIN, IF NOT IT REDIRECTS TO LOGIN

  componentDidMount = async () => {
    // try{
    //   var user ={
    //     username: 'Edvin',
    //     password: 'nivde',
    //     loggedIn:'false'
    //   }
    //   var arr = [user];
    //   var data = JSON.stringify(arr);
    //   const value = await AsyncStorage.removeItem('userbase');
    //   console.log(value);
    // }catch(error){
    //   console.log(error);
    // }
    this.setState({
      isLoading: false
    });
    try {
      const value = await AsyncStorage.getItem('userbase');
      var users = JSON.parse(value);
      if(users === null){
        setTimeout(() => {
          this.props.navigation.replace("Login");
          },1000);
      }
      var counter = users.length;
      while(counter--){
          if(users[counter].loggedIn === true){
            console.log(users[counter]);
            setTimeout(() => {
              this.props.navigation.replace("MainView");
            },1000);
            break;
          }else if(counter === 0){
            setTimeout(() => {
              this.props.navigation.replace("Login");
              },1000);
          }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    // if(this.state.isLoading){
    //   return(
    //     <View style={{height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgb(126,174,252)'}}>
    //       <Text style={{marginBottom:20,fontSize:70,color:'white',fontFamily:'PermanentMarker-Regular'}}> HELT </Text>
    //     </View>
    //   )
    // }
    return(
      <View style={{height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgb(126,174,252)'}}>
          <Text style={{marginBottom:20,fontSize:70,color:'white',fontFamily:'PermanentMarker-Regular'}}> HELT </Text>
      </View>
    )
  }
}

// THE MAIN NAVIGATOR

const AppStackNavigator = createStackNavigator({
  Splash:{
    screen:SplashScreen
  },
  Login:{
    screen: Login
  },
  MainView:{
    screen: MainView
  }
});

var AppContainer = createAppContainer(AppStackNavigator);

styles=StyleSheet.create({
  card:{
    backgroundColor:'white',
    width: '85%',
    alignItems: 'center',
    height:'85%',
    marginTop: 0,  
    borderRadius:5 
}
});