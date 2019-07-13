import React, {Component} from 'react';
import {Keyboard, StyleSheet, Text, View,Button,TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import { NavigationEvents,createStackNavigator, createAppContainer,StackActions, NavigationActions,createBottomTabNavigator} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';


export class mainHome extends Component{

    static navigationOptions = {
        header:null
    }

    constructor(props){
        super(props)
        this.state={height:'',weight:'',sex:'',view:true,
        BMI:''
        };
      }

    componentWillMount = async () => {
        
    }

    //rgb(0, 214, 64) -- GREEN

    render(){
      return(
    <View style={{width:'100%',height:'100%'}}>

    <NavigationEvents
          onWillFocus={async () => {
            
            try {
                const value = await AsyncStorage.getItem('userbase');
                var users = JSON.parse(value);
                counter = users.length;
                while(counter--){
                    if(users[counter].loggedIn === true){
                        console.log(users[counter]);
                        console.log('whoa');
                        if(users[counter].weight === '' ||users[counter].height === '' ||users[counter].sex === ''){
                            this.setState({view:false});
                        }else{
                            this.setState({height:parseInt(users[counter].height)});
                            this.setState({weight:parseInt(users[counter].weight)});
                            this.setState({sex:users[counter].sex});
                            this.setState({BMI:users[counter].BMI});
                            this.setState({view:true});
                        }
                      break;
                    }
                }
              } catch (error) {
                console.log(error);
              }
          }}
        />
         
          {this.state.view && <View style={{alignItems: 'center',height:'100%',backgroundColor:'rgb(126,174,252)'}}> 
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("cardOne")} style={[styles.card,{height:'40%',borderColor:'yellow',borderWidth:4}]}>
            <Text style = {{fontSize:20}}> Your BMI is: </Text>
            <Text style = {{fontSize:40}}> {this.state.BMI} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card]}>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card]}>
            </TouchableOpacity>
        </View> }

        {this.state.view === false &&  <View style={{height:'100%',width:'100%',alignItems: 'center',justifyContent:'center',backgroundColor:'rgb(126,174,252)'}}>
        <Text style={{color:'white',fontSize:30,fontFamily:'Acme-Regular',textAlign:'center'}}> 
        Update your inromation in the profile tab! 
        </Text>
        </View>
         }

        </View>
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