import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,Image} from 'react-native';
import { createStackNavigator, createAppContainer,StackActions, NavigationActions,createBottomTabNavigator} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';

import { mainHome as mainHome} from "./MainViews/home.js";
import { cardOne as cardOne} from "./MainViews/home.js";
import { cardTwo as cardTwo} from "./MainViews/home.js";
import { Profile as Profile} from "./MainViews/profile.js";
import { Progress as Progress} from "./MainViews/progress.js";

// GETS THE CURRENT SCREEN FROM NAVIGATION STATE
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}

export class MainView extends Component{

  static navigationOptions = {
    header:null
}

  // IF THERE ARE NO USERS IT WILL REDIRECT TO LOGIN
  // USED IN CONJUNCTION WITH THE LOG OUT BUTTON IN THE PROFILE SCREEN

  componentWillMount(){
    
  }

  logOut = async () =>{
    try {
      const value = await AsyncStorage.getItem('userbase');
      var users = JSON.parse(value);
      var counter = users.length;
      while(counter--){
          if(users[counter].loggedIn === true){

            break;
          }else if(counter === 0){
              const resetAction = StackActions.reset({
                  index: 0,
                  actions: [NavigationActions.navigate({ routeName: 'Login' })],
                });
                this.props.navigation.dispatch(resetAction);
          }
      }
    } catch (error) {
      console.log(error);
    }
  }

  render(){
    return (
      <AppContainer
      onNavigationStateChange={(prevState, currentState, action) => {
        const currentScreen = getActiveRouteName(currentState);
        const prevScreen = getActiveRouteName(prevState);
        if(prevScreen != currentScreen){
         if(currentScreen == 'main'){
          this.logOut();
        }
        }
      }}
        
      />
    );
  }
}

// THE NAVIGATOR INSIDE OF THE HOME "SCREEN"

var HomeStackNavigator = createStackNavigator({
  main: mainHome,
  cardOne:cardOne,
  cardTwo:cardTwo
});

// THE TAB NAVIGATOR 

const TabStack = createBottomTabNavigator({
    Home:HomeStackNavigator,
    Progress: Progress,
    Profile: Profile
},{
  
  // SETTING THE 
    defaultNavigationOptions:({navigation})=>({
        tabBarIcon:()=>{
          const { routeName } = navigation.state;
          if(routeName === 'Home'){
            return <Image style = {{ width: 25, height: 25, marginTop: 10, marginBottom: 12}} source={require('./icons/baseline_home_black_18dp.png')} />
          }else if(routeName === 'Progress'){
            return <Image style = {{ width: 25, height: 25, marginTop: 10, marginBottom: 12}} source={require('./icons/goal.png')} />
          }else{
            return <Image style = {{ width: 25, height: 25, marginTop: 10, marginBottom: 12}} source={require('./icons/baseline_account_circle_black_18dp.png')} />
          }
      },
      tabBarOptions:{
        activeTintColor:'white',
        activeBackgroundColor:'rgb(126,174,252)',
        activeColor:'white',
        showIcon:true,
        style:{
          borderTopWidth: 0,
          // borderTopColor:'white'
          // borderStyle: 'solid',
          // borderTopWidth: 5,
          // backgroundColor:'white',
          // fontColor:'white'
      },
      }
    })
});

var AppContainer = createAppContainer(TabStack);

