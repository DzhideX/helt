import React, {Component} from 'react';
import {Keyboard, StyleSheet, Text, View,Button,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import { createStackNavigator, createAppContainer,StackActions, NavigationActions,createBottomTabNavigator} from 'react-navigation';


export class mainHome extends Component{

    static navigationOptions = {
        header:null
    }

    render(){
      return(
          <TouchableWithoutFeedback style={{height:'100%',width:'100%'}} onPress={Keyboard.dismiss} accessible={false}>
        <View style={{alignItems: 'center',height:'100%',backgroundColor:'rgb(126,174,252)'}}> 
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("cardOne")} style={[styles.card,{height:'40%'}]}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card]}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card]}>
            </TouchableOpacity>
        </View> 
        </TouchableWithoutFeedback>
      );
    }
  }


// REST OF THE CODE

export class cardOne extends Component{

    static navigationOptions = {
        header:null
    }

    render(){
        return( 
        <View style={{alignItems: 'center',height:'100%',backgroundColor:'rgb(126,174,252)'}}> 
        </View>
        );
    }
}

export class cardTwo extends Component{

    static navigationOptions = {
        header:null,
        tabBarVisible:false
    }

    render(){
        return(
        <View > 
        </View>
        );
    }


}

const styles = StyleSheet.create({
    card:{
        backgroundColor:'white',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '25%',
        marginTop: 15,
        borderRadius: 10    
    }
})