import React, {Component} from 'react';
import {Keyboard, StyleSheet, Text, View,Button,TouchableOpacity,TouchableWithoutFeedback,ScrollView} from 'react-native';
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

       newDate = () => {
        var date = JSON.stringify(new Date());
        console.log(date);
        var newDate = '';
        for(var i = 12; i<=16;i++){
            newDate += date[i];
        }
        console.log(newDate);
        return newDate;
    }

    styleCard = () => {
        const { BMI } = this.state;
        if(BMI >= 0 && BMI <= 16){
            return {borderColor:'red'}
           }else if(BMI >= 16.1 && BMI <= 17){
            return {borderColor:'orange'}
           }else if(BMI >= 17.1 && BMI <= 18.5){
            return {borderColor:'#F8EC00'}
           }else if(BMI >= 18.6 && BMI <= 25){
            return {borderColor:'rgb(0, 214, 64)'}
           }else if(BMI >= 25.1 && BMI <= 30){
            return {borderColor:'#F8EC00'}
           }else if(BMI >= 30.1 && BMI <= 35){
            return {borderColor:'orange'}
           }else if(BMI >= 35.1){
            return {borderColor:'red'}
           }
    }

    returnText = () => {
        const { BMI } = this.state;
        if(BMI >= 0 && BMI <= 16){
            return "severely thin";
           }else if(BMI >= 16.1 && BMI <= 17){
            return "moderately thin";
           }else if(BMI >= 17.1 && BMI <= 18.5){
            return "mildly thin";
           }else if(BMI >= 18.6 && BMI <= 25){
            return "normal";
           }else if(BMI >= 25.1 && BMI <= 30){
            return "overweight";
           }else if(BMI >= 30.1 && BMI <= 35){
            return "obese class I";
           }else if(BMI >= 35.1){
            return "obese class II";
           }
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
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("cardOne")} style={[styles.card,{height:'10%',borderWidth:3,backgroundColor:'white'},this.styleCard()]}>
            <Text style = {{fontSize:27,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>You are {this.returnText()}! </Text> 
            {/* <Text style = {{fontSize:25}}> Your specific BMI is: {this.state.BMI} </Text>
            <Text> To learn more about what this means click this box! </Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card,{height:'10%'}]}>
            <Text style = {{fontSize:23,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}} onPress={()=>alert(new Date())}> Current waist size is: {this.newDate()} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card,{height:'65%'}]}>
            </TouchableOpacity>
        </View> }

        {this.state.view === false &&  <View style={{height:'100%',width:'100%',alignItems: 'center',justifyContent:'center',backgroundColor:'rgb(126,174,252)'}}>
        <Text style={{color:'white',fontSize:30,fontFamily:'Acme-Regular',textAlign:'center'}}> 
        Update your information in the profile tab! 
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
        <Text> Your current waist size is: </Text>
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
        height: '15%',
        marginTop: 15,
        borderRadius: 10    
    }
})