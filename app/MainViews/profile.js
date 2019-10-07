import React, {Component} from 'react';
import {Text, View,Image,Button,StyleSheet,TouchableOpacity,TextInput,Picker} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';

export class Profile extends Component{

  static navigationOptions = {
    header:null
}
  constructor(props){
    super(props)
    this.state={
      imageUri:'file:///storage/emulated/0/Pictures/7f713e0f-3d4c-4220-91f3-5da8fc14210c.jpg',
      username:'',height:'',weight:'',sex:'',profile:true,
      tempHeight:'',tempWeight:'',tempSex:'male',tempDate:''
    };
  }

  componentWillMount = () => {
    console.log('stuff');
    const { profile } = this.state;
    this.setState({profile:true});
  }

  // SETTING UP THE PAGE

  componentDidMount = async () => {
    const { username,sex,imageUri } = this.state;
    console.log(sex);
    try {
      const value = await AsyncStorage.getItem('userbase');
      var users = JSON.parse(value);
      counter = users.length;
      while(counter--){
          if(users[counter].loggedIn === true){
            if((users[counter].weight).length === 0){
              var lastWeight = '';
            }else{
              var lastWeight = ((users[counter].weight)[(users[counter].weight).length-1]).value;
            }
            this.setState({username: users[counter].username});
            this.setState({height: users[counter].height});
            this.setState({weight: lastWeight});
            this.setState({sex: users[counter].sex});
            break;
          }
      }
    } catch (error) {
      console.log(error);
    }
  }

  // FUNCTION FOR PICKING PROFILE IMAGE

  // pickImage = async () => {
  //   var picture = '';
  //   const{imageUri} = this.state;
  //     ImagePicker.openPicker({
  //           width: 250,
  //           height: 250,
  //           borderRadius:50,
  //           cropping: true
  //         }).then(image => {
  //           picture = image;
  //         });
  //         console.log(picture);
  //         try {
  //           const value = await AsyncStorage.getItem('userbase');
  //           var users = JSON.parse(value);
  //           counter = users.length;
  //           while(counter--){
  //               if(users[counter].loggedIn === true){
  //                 users[counter].profilePic = picture.path;
  //                 var data = JSON.stringify(users);
  //                 console.log(data);
  //                 try {
  //                   const value = await AsyncStorage.setItem('userbase',data);
  //                   this.setState({imageUri:`${picture.path}`});
  //                     console.log(`Successfully updated the profile picture of the user:  ${users[counter].username} with password ${users[counter].password}!`);
  //                 } catch (error) {
  //                   console.log(error);
  //                 }
  //                 break;
  //               }
  //           }
  //         } catch (error) {
  //           console.log(error);
  //         }
  // }
  
  // LOG OUT BUTTON

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

  // CHANGE CARD

  changeCard = () => {
    const { profile } = this.state;
    if(profile === true){
      this.setState({profile:false});
    }else{
      this.setState({profile:true});
    }
  }

  // UPDATE PROFILE

  updateProfile = async () => {
      function Weight(date,value){
        this.date = date;
        this.value = value;
      }
      const { tempSex,tempHeight,tempWeight } = this.state;
      console.log(tempSex,tempHeight,tempWeight);
      if(tempHeight === '' || tempWeight === ''){
        alert("One of the fields is empty!")
      }else{
        var date = JSON.stringify(new Date());
        console.log(date);
        var newDate = '';
        for(var i = 6; i<=10;i++){
            newDate += date[i];
        }
        var split = newDate.split('-');
        newDate = `${split[1]}.${split[0]}`
        var newWeight = new Weight(newDate,parseInt(tempWeight));
        try {
          const value = await AsyncStorage.getItem('userbase');
          var users = JSON.parse(value);
          counter = users.length;
          while(counter--){
              if(users[counter].loggedIn === true){
                // if((users[counter].weight).date === newDate){
                //   alert("You can not update your profile more than once per day!")
                // }else{
                  users[counter].sex = tempSex;
                users[counter].height = parseInt(tempHeight);
                (users[counter].weight).push(newWeight);
                var num = tempWeight/((tempHeight/100)*(tempHeight/100));
                users[counter].BMI = Math.round(num * 10) / 10;
                var data = JSON.stringify(users);
                console.log(data);
                try {
                  const value = await AsyncStorage.setItem('userbase',data);
                    console.log(`Successfully updated information of the user:  ${users[counter].username} with password ${users[counter].password}!`);
                    this.setState({sex:tempSex});
                    this.setState({height:tempHeight});
                    this.setState({weight:tempWeight});
                    this.setState({profile:true});
                } catch (error) {
                  console.log(error);
                }
                break;
                // }
              }
          }
        } catch (error) {
          console.log(error);
        }
      }
  }


    render(){
      return(
        <View style={{alignItems: 'center',justifyContent:'center',width:'100%',height:'100%',backgroundColor:'rgb(126,174,252)'}}>
            
  {/*------------------------------------------------------------------------------------ */}

            {/* IF INFORMATION IS BEING SHOWN: */}

            {this.state.profile && <View style = {{
              marginTop:'10.0em',
              backgroundColor:'white',
              width: '85%',
              alignItems: 'center',
              justifyContent:'center',
              height:'75%',
              marginTop: 0,  
              borderRadius:5 
          }} >

            <Text style={[styles.text,{marginTop:30}]}> Username:   {this.state.username} </Text>
            <Text style={styles.text}> Height:   {this.state.height === '' ? '' : this.state.height+'cm' }  </Text>
            <Text style={styles.text}> Weight:   {this.state.weight === '' ? '' : this.state.weight+'kg' } </Text>
            <Text style={[styles.text,{marginBottom:25}]}> Gender:   {this.state.sex} </Text>
            
            <TouchableOpacity
            onPress={()=>{this.state.profile === true ? this.changeCard() : this.updateProfile()}}
            style={[styles.updateProfile,{backgroundColor:'white',borderColor:'rgb(126,174,252)',borderRadius:5}]}>
              <Text style={{color:'rgb(126,174,252)'}}> {this.state.profile === true ? 'Update profile' : 'Update info'} </Text>
            </TouchableOpacity>

            </View>}
  {/*------------------------------------------------------------------------------------ */}

            {/* IF INFORMATION IS BEING UPDATED: */}

            {this.state.profile === false && <View style = {{
          marginTop:'10.0em',
          backgroundColor:'white',
          width: '85%',
          alignItems: 'center',
          justifyContent:'center',
          height:'75%',
          marginTop: 0,  
          borderRadius:5 
      }} >

      {/* PROFILE PICTURES */}

        <TextInput placeholder="Height"  onChangeText = {tempHeight => this.setState({tempHeight})} style={[styles.input,{marginTop:10}]}></TextInput>
        <TextInput placeholder="Weight:" onChangeText = {tempWeight => this.setState({tempWeight})} style={[styles.input,{marginTop:10}]} ></TextInput> 
        <Picker
        selectedValue={this.state.tempSex}
        itemStyle={{fontFamily:'Acme-Regular'}}
        style={{height: 50, width: 135,marginTop:10,}}
        onValueChange={(itemValue) =>
        this.setState({tempSex: itemValue})}>
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
        </Picker>
        
        <TouchableOpacity
        onPress={()=>{this.state.profile === true ? this.changeCard() : this.updateProfile()}}
        style={[styles.updateProfile,{backgroundColor:'white',borderColor:'rgb(126,174,252)',borderRadius:5}]}>
          <Text style={{color:'rgb(126,174,252)'}}> {this.state.profile === true ? 'Update profile' : 'Update info'} </Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={()=>{this.changeCard()}}
        style={[styles.updateProfile,{backgroundColor:'white',borderColor:'rgb(126,174,252)',borderRadius:5}]}>
          <Text style={{color:'rgb(126,174,252)'}}> Go Back </Text>
        </TouchableOpacity>

        </View> }
  {/*------------------------------------------------------------------------------------ */}
            
            {/* LOG OUT BUTTON HERE */}

            <TouchableOpacity
            style={styles.updateProfile}
            onPress={() => this.logOut()}
            >
              <Text style={{color:'white'}}> Log out! </Text>
            </TouchableOpacity>
        </View>
      );
    }
  }


  const styles=StyleSheet.create({
    input:{
      width:'75%',
      borderStyle: 'solid',
      borderBottomWidth: 3,
      borderBottomColor: 'rgb(126,174,252)',
      fontFamily:'Acme-Regular'
  },
    card:{
      backgroundColor:'white',
      width: '85%',
      alignItems: 'center',
      height:'75%',
      marginTop: 0,  
      borderRadius:5 
  },
  image:{
    marginTop:-30,
    height:'100%',
    width:'100%',
    borderWidth:3,
    borderRadius:150,
    borderColor:'white'
  },
    updateProfile:{
      backgroundColor:'rgb(126,174,252)',
      alignItems: 'center',
      justifyContent:'center',
      borderColor:'white',
      borderWidth:2,
      marginTop: 35,  
      borderRadius:30,
      width:200,
      height:35
    },
    text:{
      fontFamily:'Acme-Regular',//PermanentMarker-Regular
      marginTop:10,
      marginBottom:10,
      fontSize:30,
      color:'rgb(80,80,80)',
      // borderWidth:1,
      // borderColor:'blue'
      // textShadowColor:'#214AA9',
      // textShadowOffset:{width:0, height:0},
      // textShadowRadius:10
    }
  })