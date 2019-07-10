import React, {Component} from 'react';
import {Text, View,Image,Button,StyleSheet,TouchableOpacity,AsyncStorage} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      imageUri:'file:///storage/emulated/0/Pictures/7f713e0f-3d4c-4220-91f3-5da8fc14210c.jpg'
    };
  }

  lol = 'stuff';

  pickImage=()=>{
    const{imageUri} = this.state;
      ImagePicker.openPicker({
            width: 250,
            height: 250,
            borderRadius:50,
            cropping: true
          }).then(image => {
            console.log(image)
           this.setState({imageUri:`${image.path}`});
          });
  }

  logOut = async () => {
    try {
      const value = await AsyncStorage.getItem('userbase');
      var users = JSON.parse(value);
      counter = users.length;
      while(counter--){
          if(users[counter].loggedIn === true){
            users[counter].loggedIn = false;
            var data = JSON.stringify(users);
            console.log(data);
            try {
                  const value = await AsyncStorage.setItem('userbase',data);
                    console.log(`Succesfully logged a user out!`);
                    this.props.navigation.navigate('main',{
                      loggedOut:'this is from profile.js',
                    });
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

    static navigationOptions = {
        header:null
    }

    render(){
      return(
        <View style={{alignItems: 'center',justifyContent:'center',width:'100%',height:'100%',backgroundColor:'rgb(126,174,252)'}}>
            <View style={[styles.card,{zIndex:-1}]}>
            <TouchableOpacity style={{marginTop:50,height:175,width:175,borderRadius:150,borderWidth:3,borderColor:'white',borderStyle:'solid'}}>
              <Image style={{height:'100%',width:'100%',borderRadius:150}} source={{uri:`${this.state.imageUri}`,
            width:'100%',height:'100%'}}/>
            </TouchableOpacity>  
            <Text> stuff</Text>
            <TouchableOpacity
          onPress={() => this.logOut()}
            style={[styles.card,{marginTop:15,width:150,height:50,borderWidth:2,borderColor:'rgb(126,174,252)',justifyContent:'center'}]}>
              <Text> Log out! </Text>
            </TouchableOpacity>
            <Button title="stuff" onpress={()=>this.pickImage()}/>
            </View>   
        </View>
      );
    }
  }

  styles=StyleSheet.create({
    card:{
      backgroundColor:'white',
      width: '85%',
      alignItems: 'center',
      height:'85%',
      marginTop: 0,  
      borderRadius:5 
  }
  })