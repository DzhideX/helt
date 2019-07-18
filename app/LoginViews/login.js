import React, {Component} from 'react';
import {TouchableOpacity, StyleSheet, Text, View,Button, TextInput} from 'react-native';
import {StackActions,NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-crop-picker';


export class Login extends Component{

    constructor(props){
        super(props)
        this.state={
          firstName:'',lastName:'',login:false
        };
      }

    static navigationOptions = {
        header:null
    }

    login = async () => {
        const {firstName,lastName} = this.state;
        try {
                const value = await AsyncStorage.getItem('userbase');
                var users = JSON.parse(value);
                counter = users.length;
                while(counter--){
                    console.log(counter);
                    if(users[counter].username === firstName && users[counter].password === lastName){
                        users[counter].loggedIn = true;
                        var data = JSON.stringify(users);
                        console.log(data);
                        try{
                            const value = await AsyncStorage.setItem('userbase',data);
                            const resetAction = StackActions.reset({
                                index: 0,
                                actions: [NavigationActions.navigate({ routeName: 'MainView' })],
                              });
                              this.props.navigation.dispatch(resetAction);
                        }catch (error) {
                            console.log(error);
                          }
                          break;
                    }else if(counter===0){
                        alert("Wrong credentials! ");
                    }
                }
              } catch (error) {
                console.log(error);
              }
    }


    register = async () => {
        function User(username,password){
            this.username = username;
            this.password = password;
            this.loggedIn = false;
            this.height = '';
            this.weight = [];
            this.sex = '';
            this.BMI = '';
            this.waist=[];
          }
        const {firstName,lastName} = this.state;
          var user = new User(firstName,lastName);
        try {
            const value = await AsyncStorage.getItem('userbase');
            var users = JSON.parse(value);
            if(users === null){
                    var arr = [];
                    arr.push(user);
                    var data = JSON.stringify(arr);
                    console.log(data);
                    try {
                          const value = await AsyncStorage.setItem('userbase',data);
                            console.log(`It was null but succesfully signed up as ${user.username} with password ${user.password}!`);
                        } catch (error) {
                          console.log(error);
                        }
            }
            var counter = users.length;
            while(counter--){
                if(users[counter].username === firstName){
                    alert(`There exists an account with the name: ${firstName}`);
                    break;
                }else if(counter === 0){
                    users.push(user);
                    var data = JSON.stringify(users);
                    console.log(data);
                    try {
                          const value = await AsyncStorage.setItem('userbase',data);
                            console.log(`Succesfully signed up as ${user.username} with password ${user.password}!`);
                        } catch (error) {
                          console.log(error);
                        }
                        break;
                }
            }
            
          } catch (error) {
            console.log(error);
          }
        }

    render(){
      return(
          <View style={{height:'100%',alignItems:'center',justifyContent:'center',backgroundColor:'rgb(126,174,252)'}}>
            <Text style={{marginBottom:20,fontSize:70,color:'white',fontFamily:'PermanentMarker-Regular'}}> HELT </Text>
            <View style={{width:'100%',flexDirection:'row',justifyContent:'center'}}>
                <TouchableOpacity onPress = {()=>this.setState({login:true})} style={[styles.card,{width:'23%',marginTop:0,marginRight:10}]}>
                    <Text style={this.state.login === true ? [styles.stateOfLogin,{color:'rgba(255,255,255,0.5)'}] : styles.stateOfLogin } >
                        LOGIN
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {()=>this.setState({login:false})}  style={[styles.card,{width:'23%',marginTop:0,marginLeft:10}]}>
                    <Text style={this.state.login === false ? [styles.stateOfLogin,{color:'rgba(255,255,255,0.5)'}] : styles.stateOfLogin }>
                        SIGNUP
                    </Text>
                </TouchableOpacity>
            </View>
            <TextInput placeholder="Username" onChangeText = {firstName => this.setState({firstName})} style={[styles.input,{marginTop:10}]}></TextInput>
            <TextInput secureTextEntry={true} placeholder="Password" onChangeText = {lastName => this.setState({lastName})} style={[styles.input,{marginTop:10,marginBottom:10}]}></TextInput>            
            <TouchableOpacity style={[styles.card]} onPress={()=>{this.state.login=== true ? this.login() : this.register()}} >
            <Text style={{color:'white'}}>{this.state.login === true ? 'Login!' : 'Sign up!'}</Text> 
            </TouchableOpacity>
            </View>

      );
    }
  }
  
const styles = StyleSheet.create({
    input:{
        width:'75%',
        borderStyle: 'solid',
        borderBottomWidth: 3,
        borderBottomColor: 'white',
        fontFamily:'Acme-Regular'
    },
    stateOfLogin:{
        color:'white',
        fontFamily:'Acme-Regular',
        fontSize:20,
        alignItems: 'center',
        justifyContent: 'center',
    },  
    card:{
        backgroundColor:'rgb(126,174,252)',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        marginTop: 30,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10    
    }
})
