import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button} from 'react-native';
import { createStackNavigator, createAppContainer,StackActions, NavigationActions,createBottomTabNavigator} from 'react-navigation';

export class Progress extends Component{

    static navigationOptions = {
        header:null
    }

    render(){
      return(
        <View style={{justifyContent:'center',alignItems: 'center',height:'100%',backgroundColor:'rgb(126,174,252)'}}>
            <Text style={{color:'white',fontSize:30,fontFamily:'Acme-Regular'}}> Future progress view content!  </Text>
        </View>
      );
    }
  }
