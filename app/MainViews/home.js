import AsyncStorage from '@react-native-community/async-storage';
import EasyBluetooth from 'easy-bluetooth-classic';
import React, { Component } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import BluetoothSerial from 'react-native-bluetooth-serial';



export class mainHome extends Component{

    static navigationOptions = {
        header:null
    }

    constructor(props){
        super(props)
        this.state={height:'',weight:'',sex:'',view:true,
        BMI:'',waist:'',viewWaste:false,
        };
      }

       newDate = () => {
        var date = JSON.stringify(new Date());
        // console.log(date);
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

    returnBMI = () => {
        const { BMI } = this.state;
        var normalWeight = "The answer is different for each person, but generally. To keep your weight the same, you need to burn the same number of calories as you eat and drink.\nTo lose weight, burn more calories than you eat and drink.\nTo gain weight, burn fewer calories than you eat and drink.";
    var underWeight = "Add healthy calories.\nYou don’t need to drastically change your diet.\nYou can increase calories by adding nut or seed toppings, cheese, and healthy side dishes.\nTry almonds, sunflower seeds, fruit, or whole-grain, wheat toast. Go nutrient dense.\nInstead of eating empty calories and junk food, eat foods that are rich in nutrients. Consider high-protein meats, which can help you to build muscle.\nAlso, choose nutritious carbohydrates, such as brown rice and other whole grains. This helps ensure your body is receiving as much nourishment as possible, even if you’re dealing with a reduced appetite.\nSnack away. Enjoy snacks that contain plenty of protein and healthy carbohydrates.\nConsider options like trail mix, protein bars or drinks, and crackers with hummus or peanut butter. Also, enjoy snacks that contain \“good fats,\” which are important for a healthy heart. Examples include nuts and avocados. Eat mini-meals.\nIf you’re struggling with a poor appetite, due to medical or emotional issues, eating large amounts of food may not seem appealing.\nConsider eating smaller meals throughout the day to increase your calorie intake.\nBulk up. While too much aerobic exercise will burn calories and work against your weight goal, strength training can help. This includes weightlifting or yoga. You gain weight by building muscle.";
    var overWeight = "Make fresh, organic foods the priority.\nEliminate or greatly reduce canned or processed foods, particularly those with a high GI, such as table sugar and flour-based foods, including bread and pastry.\nAvoid deep-fried foods, which have high fat content, and items such as ice cream and cheese that are made from dairy fat.\nFast food is packed with salt and non-healthy fats, so always favor homemade meals.\nRemember, drinks like soda are a huge source of calories in your diet. ";
    var obese = "Eat five to six servings of fruits and vegetables daily. A vegetable serving is one cup of raw vegetables or one-half cup of cooked vegetables or vegetable juice.\nA fruit serving is one piece of small to medium fresh fruit, one-half cup of canned or fresh fruit or fruit juice, or one-fourth cup of dried fruit. \nChoose whole grain foods such as brown rice and whole wheat bread. Avoid highly processed foods made with refined white sugar, flour and saturated fat. \nWeigh and measure food to gain an understanding of portion sizes. For example, a three-ounce serving of meat is the size of a deck of cards. \nAvoid super-sized menu items particularly at fast-food restaurants. You can achieve a lot just with proper choices in serving sizes. Avoid foods that are high in \"energy density\" or that have a lot of calories in a small amount of food. For example, a large cheeseburger and a large order of fries may have almost 1,000 calories and 30 or more grams of fat. By ordering a grilled chicken sandwich or a plain hamburger and a small salad with low-fat dressing, you can avoid hundreds of calories and eliminate much of the fat intake. \nFor dessert, have fruit or a piece of angel food cake rather than the \"death by chocolate\" special or three pieces of home-made pie.";   
    console.log(BMI);
    if(BMI >= 0 && BMI <= 16){
            return {label:"severely thin",text:underWeight};
           }else if(BMI >= 16.1 && BMI <= 17){
            return {label:"moderately thin",text:underWeight};
           }else if(BMI >= 17.1 && BMI <= 18.5){
            return {label:"mildly thin",text:underWeight};;
           }else if(BMI >= 18.6 && BMI <= 25){
            return {label:"normal weight",text:normalWeight};
           }else if(BMI >= 25.1 && BMI <= 30){
            return {label:"overweight",text:overWeight};
           }else if(BMI >= 30.1 && BMI <= 35){
            return {label:"obese class I",text:obese};
           }else if(BMI >= 35.1){
            return {label:"obese class II",text:obese};
           }
    }

    returnText = () => {
        const { BMI } = this.state;
        var normalWeight = "The answer is different for each person, but generally. To keep your weight the same, you need to burn the same number of calories as you eat and drink.To lose weight, burn more calories than you eat and drink.To gain weight, burn fewer calories than you eat and drink.";
    var underWeight = "Add healthy calories.\nYou don’t need to drastically change your diet.\nYou can increase calories by adding nut or seed toppings, cheese, and healthy side dishes.\nTry almonds, sunflower seeds, fruit, or whole-grain, wheat toast. Go nutrient dense.\nInstead of eating empty calories and junk food, eat foods that are rich in nutrients. Consider high-protein meats, which can help you to build muscle.\nAlso, choose nutritious carbohydrates, such as brown rice and other whole grains. This helps ensure your body is receiving as much nourishment as possible, even if you’re dealing with a reduced appetite.\nSnack away. Enjoy snacks that contain plenty of protein and healthy carbohydrates.\nConsider options like trail mix, protein bars or drinks, and crackers with hummus or peanut butter. Also, enjoy snacks that contain \“good fats,\” which are important for a healthy heart. Examples include nuts and avocados. Eat mini-meals.\nIf you’re struggling with a poor appetite, due to medical or emotional issues, eating large amounts of food may not seem appealing.\nConsider eating smaller meals throughout the day to increase your calorie intake.\nBulk up. While too much aerobic exercise will burn calories and work against your weight goal, strength training can help. This includes weightlifting or yoga. You gain weight by building muscle.";
    var overWeight = "Make fresh, organic foods the priority.\nEliminate or greatly reduce canned or processed foods, particularly those with a high GI, such as table sugar and flour-based foods, including bread and pastry.\nAvoid deep-fried foods, which have high fat content, and items such as ice cream and cheese that are made from dairy fat.\nFast food is packed with salt and non-healthy fats, so always favor homemade meals.\nRemember, drinks like soda are a huge source of calories in your diet. ";
    var obese = "Eat five to six servings of fruits and vegetables daily. A vegetable serving is one cup of raw vegetables or one-half cup of cooked vegetables or vegetable juice.\nA fruit serving is one piece of small to medium fresh fruit, one-half cup of canned or fresh fruit or fruit juice, or one-fourth cup of dried fruit. \nChoose whole grain foods such as brown rice and whole wheat bread. Avoid highly processed foods made with refined white sugar, flour and saturated fat. \nWeigh and measure food to gain an understanding of portion sizes. For example, a three-ounce serving of meat is the size of a deck of cards. \nAvoid super-sized menu items particularly at fast-food restaurants. You can achieve a lot just with proper choices in serving sizes. Avoid foods that are high in \"energy density\" or that have a lot of calories in a small amount of food. For example, a large cheeseburger and a large order of fries may have almost 1,000 calories and 30 or more grams of fat. By ordering a grilled chicken sandwich or a plain hamburger and a small salad with low-fat dressing, you can avoid hundreds of calories and eliminate much of the fat intake. \nFor dessert, have fruit or a piece of angel food cake rather than the \"death by chocolate\" special or three pieces of home-made pie.";
    if(BMI >= 0 && BMI <= 16){
        return underWeight;
       }else if(BMI >= 16.1 && BMI <= 17){
        return underWeight;
       }else if(BMI >= 17.1 && BMI <= 18.5){
        return underWeight;
       }else if(BMI >= 18.6 && BMI <= 25){
        return normalWeight;
       }else if(BMI >= 25.1 && BMI <= 30){
        return overWeight;
       }else if(BMI >= 30.1 && BMI <= 35){
        return obese;
       }else if(BMI >= 35.1){
        return obese;
       }
}
    componentWillMount = async () => {
        
    }
    
    test = () => {
        const { weight, height, BMI} =this.state;
        console.log(weight,height,BMI);
    }

    render(){
      return(
    <View style = {{width:'100%',height:'100%',backgroundColor:'rgb(126,174,252)'}}>
    <ScrollView style={{width:'100%'}}>

    <NavigationEvents
          onWillFocus={async () => {
            
            try {
                const value = await AsyncStorage.getItem('userbase');
                var users = JSON.parse(value);
                counter = users.length;
                while(counter--){
                    if(users[counter].loggedIn === true){
                        console.log("Console logging the user before rendering the component:"+JSON.stringify(users[counter]));
                        // MAKING SURE THAT EDGE CASE WHEN FIRST LOADED IS CORRECT:
                        if((users[counter].weight).length === 0){
                            var lastWeight = '';
                            var lastWaist = '';
                        }else if((users[counter].waist).length === 0){
                            var lastWeight = ((users[counter].weight)[(users[counter].weight).length-1]).value;
                            var lastWaist = '';
                        }else {
                            this.setState({viewWaist:true});
                            var lastWeight = ((users[counter].weight)[(users[counter].weight).length-1]).value;
                            var lastWaist = ((users[counter].waist)[(users[counter].waist).length-1].value);
                        }
                        console.log(lastWeight);
                        if(lastWeight === '' || users[counter].height === '' ||users[counter].sex === ''){
                            this.setState({view:false});
                        }else{
                            this.setState({height:parseInt(users[counter].height)});
                            this.setState({weight:lastWeight});
                            this.setState({sex:users[counter].sex});
                            this.setState({BMI:users[counter].BMI});
                            this.setState({waist:lastWaist})
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
         
          {this.state.view && <View style={{alignItems: 'center',backgroundColor:'rgb(126,174,252)'}}> 
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("cardOne")} style={[styles.card,{height:80,borderWidth:3,backgroundColor:'white'},this.styleCard()]}>
            <Text  style = {{fontSize:27,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>You are {(this.returnBMI().label)}! </Text> 
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("cardTwo")} style={[styles.card,{height:80}]}>
            <Text style = {{fontSize:20,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Current waist size is: {this.state.waist === '' ? '' : this.state.waist+'cm' }  </Text>
            </TouchableOpacity>
            
        </View> }

        {this.state.viewWaist && 
        <View style={{width:'100%',alignItems:'center'}}>
            {/* <TouchableOpacity style={[styles.textCard]}>
                <Text style = {{fontFamily:'Acme-Regular',margin:15,color:'rgb(30,30,30)',fontSize:17}}> {this.returnText()} </Text>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("cardThree")} style={{backgroundColor:'white',borderRadius:100,padding:20,marginTop:25}}>
            <Image style={{width:100,height:100}} source={require('../icons/dish.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("cardFive")} style={{backgroundColor:'white',borderRadius:100,padding:20,marginTop:25}}>
            <Image style={{width:100,height:100}} source={require('../icons/care.png')}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("cardFour")} style={{backgroundColor:'white',borderRadius:100,padding:20,marginTop:25}}>
            <Image style={{width:100,height:100}} source={require('../icons/running.png')}/>
            </TouchableOpacity>
            </View>}

        {!this.state.viewWaist && 
            <View style={{width:'100%',alignItems:'center'}}>
<Text style = {{fontFamily:'Acme-Regular',margin:30,color:'white',fontSize:25,marginTop:120}}> You need to update your waist to get recommendations for your health! </Text>
    </View>
}

        {this.state.view === false &&  <View style={{height:'100%',width:'100%',alignItems: 'center',justifyContent:'center',backgroundColor:'rgb(126,174,252)'}}>
        <Text style={{color:'white',fontSize:30,fontFamily:'Acme-Regular',textAlign:'center',marginTop:300,margin:15}}> 
        Update your information in the profile tab! 
        </Text>
        </View>
         }

        </ScrollView>
        </View>
              );
    }
  }


// REST OF THE CODE

export class cardOne extends Component{


    static navigationOptions = {
        header:null
    }

    constructor(props){
        super(props)
        this.state={BMI:''};}


    render(){
        return( 
        <View style={{alignItems: 'center',height:'100%',backgroundColor:'rgb(126,174,252)'}}> 

            <NavigationEvents
          onWillFocus={async () => {
            
            try {
                const value = await AsyncStorage.getItem('userbase');
                var users = JSON.parse(value);
                counter = users.length;
                while(counter--){
                    if(users[counter].loggedIn === true){
                        console.log("BMI SCREEN:"+JSON.stringify(users[counter]));
                        this.setState({BMI:users[counter].BMI});
                      break;
                    }
                }
              } catch (error) {
                console.log(error);
              }
          }}
        />
        <View style={[styles.card,{height:50,marginTop:10}]}>
            <Text style = {{margin:12,fontSize:23,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                Your specific BMI is: {this.state.BMI}            
            </Text>
        </View>
        <View style={[styles.card,{marginTop:10}]}>
            <Text style = {{margin:12,fontSize:15,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
            Body mass index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.
            </Text>
        </View>
        <Image
        style={{height:320,width:'90%',margin:10}}
        source={require('../icons/stick3_cm-.jpg')}/>
        
        <View style={[styles.card,{height:95,marginTop:0}]}>
            <Text style = {{marginLeft:12,marginRight:12,fontSize:15,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                    The body mass index is not a perfect indicator of your health. For more specific information consult your physician!
            </Text>
        </View>

        </View>
        
        );
    }
}

    var beltPosition = 0;

export class cardTwo extends Component{

    static navigationOptions = {
        header:null,
        tabBarVisible:false
    }

    constructor(props){
        super(props)
        this.state={waist:''};}

    makeNewWaist = size => {
        var max,min;
        if(size == 's'){
            min = 76.1, max = 81;
            var value = (Math.floor(Math.random()*(max-min+1)+min));
            this.setState({waist:value});
        }else if(size=='m'){
            min = 81.1, max = 86;
            var value = (Math.floor(Math.random()*(max-min+1)+min));
            this.setState({waist:value});
        }else if(size=='l'){
            min = 86.1, max = 91;
            var value = (Math.floor(Math.random()*(max-min+1)+min));
            this.setState({waist:value});
        }
    }

    updateWaist = async () => {
        // const { waist } = this.state;
        try {
            function Waist(date,value){
                this.date = date;
                this.value = value;
              }
            const value = await AsyncStorage.getItem('userbase');
            var users = JSON.parse(value);
            counter = users.length;
            var date = JSON.stringify(new Date());
            var newDate = '';
            for(var i = 6; i<=10;i++){
                newDate += date[i];
            }
            var split = newDate.split('-');
            newDate = `${split[1]}.${split[0]}`;
            while(counter--){
                if(users[counter].loggedIn === true){
                  var newWaist = new Waist(newDate,(Math.round(beltPosition * 10) / 10));
                  (users[counter].waist).push(newWaist);
                  var data = JSON.stringify(users);
                  console.log(data);
                  try {
                        const value = await AsyncStorage.setItem('userbase',data);
                          console.log(`Succesfully logged the waist size!`);
                          alert('Succesfully updated the waist size.');
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

          enableBluetooth = async () => {
            
          }

          connectDevice = async () => {
            const response = await BluetoothSerial.connect('98:D3:31:F9:49:50');
            console.log(response);
            alert(response.message);
          }
          
          readDevice = async () => {
            try{
                console.log("log before reading:")
                // BluetoothSerial.readFromDevice().then((data) => {console.log(data)});
                BluetoothSerial.withDelimiter('\r').then(() => {
                    Promise.all([
                      BluetoothSerial.isEnabled(),
                      BluetoothSerial.list(),
                    ]).then(values => {
                      const [isEnabled, devices] = values;
                    });
                    BluetoothSerial.on('read', data => {
                        // console.log(`DATA FROM BLUETOOTH: ${(data.data)}`);
                        console.log(beltPosition);
                        beltPosition = 71 +(parseInt((data.data).split("#")[2])*.55);
                        // console.log(beltPosition);
                   });
              });
              }catch(err){
                  console.log(err);
              }
          }

          disconnectDevice = async () => {
            const device = await BluetoothSerial.disconnect(); //'98:D3:31:F9:49:50'
            console.log(device);
            beltPosition = 0;
            console.log('Set belt position to 0.');
            alert('Succesfully disconnected from the device!');
          }

    render(){
        return(
            <View style={{alignItems: 'center',justifyContent:'center',height:'100%',backgroundColor:'rgb(126,174,252)'}}> 

            <NavigationEvents
          onWillFocus={async () => {
            
            try {
                const value = await AsyncStorage.getItem('userbase');
                var users = JSON.parse(value);
                counter = users.length;
                while(counter--){
                    if(users[counter].loggedIn === true){
                        console.log("BMI SCREEN:"+users[counter]);
                        this.setState({BMI:users[counter].BMI});
                      break;
                    }
                }
              } catch (error) {
                console.log(error);
              }

              await BluetoothSerial.enable().then(async function(){
              });
          }}
        />

          {/* <Button style={{marginBottom:30}} onPress={()=>this.scanBluetooth()} title="Measure"/>
          <Button onPress={()=>this.updateWaist()} title="Update"/> */}
          {/* <TouchableOpacity onPress={() => this.makeNewWaist('s')} style = {styles.updateWaist}>
            <Text style={{color:'rgb(126,174,252)'}}>
                Pick one S size.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.makeNewWaist('m')} style = {styles.updateWaist}>
            <Text style={{color:'rgb(126,174,252)'}}>
                Pick one M size.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.makeNewWaist('l')} style = {[styles.updateWaist,{marginBottom:30}]}>
            <Text style={{color:'rgb(126,174,252)'}}>
                Pick one L size.
            </Text>
          </TouchableOpacity> */}

          {/*  THIS WAS THE RANDOM CODE */}

          <TouchableOpacity onPress={() => this.connectDevice()} style = {styles.updateWaist}>
            <Text style={{color:'rgb(50,50,50)',fontFamily:'FugazOne-Regular'}}>
                Connect to device
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.readDevice()} style = {styles.updateWaist}>
            <Text style={{color:'rgb(50,50,50)',fontFamily:'FugazOne-Regular'}}>
                Read size
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.updateWaist()} style = {[styles.updateWaist]}>
            <Text style={{color:'rgb(50,50,50)',fontFamily:'FugazOne-Regular'}}>
                Update waist size
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.disconnectDevice()} style = {[styles.updateWaist]}>
            <Text style={{color:'rgb(50,50,50)',fontFamily:'FugazOne-Regular'}}>
                Disconnect from device
            </Text>
          </TouchableOpacity>
        
        </View>
        );
    }


}


export class cardThree extends Component {

    static navigationOptions = {
        header:null
    }

    constructor(props){
        super(props)
        this.state={BMI:'',WoH:''};}

    render(){
        return(
            <View style={{width:'100%',height:'100%',backgroundColor:'rgb(126,174,252)'}}>
            <ScrollView style={{width:'100%'}}>

             <NavigationEvents
          onWillFocus={async () => {
            
            try {
                const value = await AsyncStorage.getItem('userbase');
                var users = JSON.parse(value);
                counter = users.length;
                while(counter--){
                    if(users[counter].loggedIn === true){
                        var height =  users[counter].height;
                        var lastWaist = ((users[counter].waist)[(users[counter].waist).length-1].value);
                        var waistOverHeight = Math.round((lastWaist/height) * 10) / 10;
                        console.log("BMI SCREEN:"+users[counter].BMI);
                        this.setState({BMI:users[counter].BMI});
                        this.setState({WoH:waistOverHeight});
                        console.log(waistOverHeight);
                      break;
                    }
                }
              } catch (error) {
                console.log(error);
              }
          }}
        />
          {this.state.BMI >=0 && this.state.BMI <=18.5 &&
        //   {/* {this.state.WoH <= 0.43 &&  */}
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center'}]}>
                    <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Add healthy calories. </Text>
                    <Text style = {{margin:12,marginTop:0,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                    Instead of eating empty calories and junk food, eat foods that are rich in nutrients. Consider high-protein meats, which can help you to build muscle. Also, choose nutritious carbohydrates, such as brown rice and other whole grains. This helps ensure your body is receiving as much nourishment as possible, even if you’re dealing with a reduced appetite.                    
                    </Text>

                    <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Go nutrient dense.  </Text>
                    <Text style = {{margin:12,marginTop:0,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                        You don’t need to drastically change your diet. You can increase calories by adding nut or seed toppings, cheese, and healthy side dishes. Try almonds, sunflower seeds, fruit, or whole-grain, wheat toast.                    
                    </Text>

                    <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Snack away.   </Text>
                    <Text style = {{margin:12,marginTop:0,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                    Also, enjoy snacks that contain “good fats,” which are important for a healthy heart                    </Text>

                    <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Eat mini-meals.    </Text>
                    <Text style = {{margin:12,marginTop:0,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                    Consider eating smaller meals throughout the day to increase your calorie intake.                   </Text>

            <View style={{flexDirection:'row',margin:15}}>
                    <Image style={{height:100,width:100,margin:5}} source={require('../images/Avocado.png')}/>
                    <Image style={{height:100,width:100,margin:5}} source={require('../images/Cheese.png')}/>
                    <Image style={{height:100,width:100,margin:5}} source={require('../images/DarkChocolate.png')}/>
                    
            </View>

            <View style={{flexDirection:'row'}}>
                    <Image style={{height:100,width:100,margin:5}} source={require('../images/Eggs.png')}/>
                    <Image style={{height:100,width:100,margin:5}} source={require('../images/Nuts.png')}/>   
            </View>

            
                </View>
            </View>
            }

            {this.state.BMI >=18.6 && this.state.BMI <=25 && 
            // {this.state.WoH >=0.44 && this.state.WoH <=0.52 &&
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center',height:570}]}>
            
            <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Energy in = Energy out </Text>
                <Text style = {{margin:12,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                The secret to maintaining a healthy weight is to balance "energy in" and "energy out." Energy in means the calories you get from the food and beverages you consume. Energy out means the calories you burn for basic body functions and during physical activity. 
                    </Text>
                    <Image source={require('../images/EnergyINOUT.png')} style={{width:300,height:200}}/>
                    </View>
                    </View>
            }
            
            {this.state.BMI >=25.1 && this.state.BMI <=30 && 
            // {this.state.BMI >=0.53 && this.state.BMI <=0.62 &&
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center',height:530}]}>
            

                <Text style = {{margin:12,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                Eliminate or greatly reduce canned or processed foods, particularly those with a high GI, such as table sugar and flour-based foods, including bread and pastry.
Avoid deep-fried foods, which have high fat content, and items such as ice cream and cheese that are made from dairy fat. 
Fast food is packed with salt and non-healthy fats, so always favor homemade meals. 
Remember, drinks like soda are a huge source of calories in your diet. 
                    </Text>
                        <View style={{flexDirection:'row'}}>
                            <Image source={require('../images/nofastfood.png')} style={{width:80,margin:10,height:80,marginTop:5,paddingBottom:10}}/>
                            <Image source={require('../images/nosoda1.png')} style={{width:80,margin:10,height:80,marginTop:0}}/>
                        </View>
                    </View>
                </View>
                    }

            {this.state.BMI >=30.1 && 
            // {/* {this.state.WoH >=0.63 && */}
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center'}]}>
            
            <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Be careful! </Text>
                    <Text style = {{margin:12,marginTop:0,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                    •	Eat five to six servings of fruits and vegetables daily. A vegetable serving is one cup of raw vegetables or one-half cup of cooked vegetables or vegetable juice. A fruit serving is one piece of small to medium fresh fruit, one-half cup of canned or fresh fruit or fruit juice, or one-fourth cup of dried fruit.
                    •	Weigh and measure food to gain an understanding of portion sizes. Avoid super-sized menu items particularly at fast-food restaurants. You can achieve a lot just with proper choices in serving sizes.
                    •	Avoid foods that have a lot of calories in a small amount of food. For example, a large cheeseburger and a large order of fries may have almost 1,000 calories and 30 or more grams of fat. For dessert, have fruit or a piece of angel food cake rather than the "death by chocolate" special or three pieces of home-made pie.
                    </Text>

                        <Image source={require('../images/MeasureFood.jpeg')} style={{width:240,margin:10,height:240,marginTop:5,paddingBottom:10}}/>

                </View>    
                </View>}

                
                
                    </ScrollView>
            </View>
        );
    }
}

export class cardFour extends Component{

    static navigationOptions = {
        header:null
    }

    constructor(props){
        super(props)
        this.state={BMI:'',WoH:''};}

    render(){
        return(
<View style={{width:'100%',height:'100%',backgroundColor:'rgb(126,174,252)'}}>
            <ScrollView style={{width:'100%'}}>

             <NavigationEvents
          onWillFocus={async () => {
            
            try {
                const value = await AsyncStorage.getItem('userbase');
                var users = JSON.parse(value);
                counter = users.length;
                while(counter--){
                    if(users[counter].loggedIn === true){
                        var height =  users[counter].height;
                        var lastWaist = ((users[counter].waist)[(users[counter].waist).length-1].value);
                        var waistOverHeight = Math.round((lastWaist/height) * 10) / 10;
                        console.log("BMI SCREEN:"+users[counter].BMI);
                        this.setState({BMI:users[counter].BMI});
                        this.setState({WoH:waistOverHeight});
                        console.log(waistOverHeight);
                      break;
                    }
                }
              } catch (error) {
                console.log(error);
              }
          }}
        />
          {this.state.BMI >=0 && this.state.BMI <=18.5 &&
        //   {this.state.WoH <= 0.43 && 
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center'}]}>
                    <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Bulk up. </Text>
                    <Text style = {{margin:12,marginTop:0,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                    While too much aerobic exercise will burn calories and work against your weight goal, strength training can help. This includes weightlifting or yoga. You gain weight by building muscle.                    
                    </Text>
            
                </View>
            </View>
            }

            {this.state.BMI >=18.6 && this.state.BMI <=25 && 
            // {/* {this.state.WoH >=0.44 && this.state.WoH <=0.52 && */}
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center',height:320}]}>
            
            <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Regular physical activity. </Text>
                <Text style = {{margin:12,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                Although any amount of regular physical activity is good for you, aim for at least 150 minutes of physical activity each week. Unless you are already that active, you won't do that much all at once—10-minute sessions several times a day on most days are fine.                    
                </Text>
                    </View>
                    </View>
            }
            
            {this.state.BMI >=25.1 && this.state.BMI <=30 && 
            // {/* {this.state.BMI >=0.53 && this.state.BMI <=0.62 && */}
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center',height:380}]}>
            
            <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Fat Burning. </Text>
                <Text style = {{margin:12,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                Physical activity is important because it reduces body fat and builds muscle. Exercise also has a direct effect in preventing diseases associated with overweight, such as cardiovascular disease, type 2 diabetes, and osteoporosis. It also helps regulate unhealthy fats, improves your mood, and even promotes better sleep.
                    </Text>
                        
                    </View>
                </View>
                    }

            {this.state.BMI >=30.1 && 
            // {this.state.WoH >=0.63 &&
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center'}]}>
            
            <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Fat Burning. </Text>
                    <Text style = {{margin:12,marginTop:0,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                    •	Crack a sweat: accumulate at least 30 minutes or more of moderate-intensity activity on most, or preferably, all days of the week. Examples include walking a 15-minute mile, or weeding and hoeing the garden.
•	Make opportunities during the day for even just 10 or 15 minutes of some calorie-burning activity, such as walking around the block or up and down a few flights of stairs at work. Again, every little bit helps. 
•	Weigh yourself regularly.

                    </Text>

                </View>    
                </View>}

                
                
                    </ScrollView>
            </View>
        );
    }
}

export class cardFive extends Component {

    static navigationOptions = {
        header:null
    }

    constructor(props){
        super(props)
        this.state={BMI:'',WoH:''};}
    
    render(){
        return(
            <View style={{width:'100%',height:'100%',backgroundColor:'rgb(126,174,252)'}}>
            <ScrollView style={{width:'100%'}}>

             <NavigationEvents
          onWillFocus={async () => {
            
            try {
                const value = await AsyncStorage.getItem('userbase');
                var users = JSON.parse(value);
                counter = users.length;
                while(counter--){
                    if(users[counter].loggedIn === true){
                        var height =  users[counter].height;
                        var lastWaist = ((users[counter].waist)[(users[counter].waist).length-1].value);
                        var waistOverHeight = Math.round((lastWaist/height) * 10) / 10;
                        console.log("BMI SCREEN:"+users[counter].BMI);
                        this.setState({BMI:users[counter].BMI});
                        this.setState({WoH:waistOverHeight});
                        console.log("sass"+waistOverHeight);
                      break;
                    }
                }
              } catch (error) {
                console.log(error);
              }
          }}
        />
          
          {this.state.BMI >=0 && this.state.BMI <=18.5 &&
        //   {/* {this.state.WoH <= 0.43 &&  */}
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center'}]}>
                    <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Health Risks. </Text>
                    <Text style = {{margin:12,marginTop:0,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                    Having a BMI of under 18.5 can increase the risk of : 
•	Osteoporosis.  Being underweight increases a  risk of osteoporosis, which is where the bones are brittle and more prone to breaking.
•	Skin, hair, or teeth problems. If a person does not get enough nutrients in their daily diet, they may display physical symptoms, such as thinning skin, hair loss, dry skin, or poor dental health.
•	Getting sick frequently. If a person does not get enough energy from their diet to maintain a healthy body weight, they may also not be getting enough nutrients to fight off infections. As a result, a person may get sick more frequently, and common illnesses, such as a cold, can last longer than they usually would.
•	Feeling tired all the time. Calories are a measurement of the energy a particular food can give a person. Not getting enough calories to maintain a healthy weight can make a person feel fatigued.
•	Anemia. A person who is underweight is more likely to have low blood counts, known as anemia, which causes dizziness, headaches, and fatigue.
•	Slow or impaired growth. Young people need nutrients to grow and develop healthy bones. Being underweight and not getting enough calories could mean a person may not develop as expected. Doctors call this a 'failure to thrive.'
                    </Text>
            
                </View>
            </View>
            }

            {this.state.BMI >=18.6 && this.state.BMI <=25 && 
            // {/* {this.state.WoH >=0.44 && this.state.WoH <=0.52 && */}
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center',justifyContent:'center',height:260}]}>
            
            <Text style={{margin:12,fontSize:21,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Check your waist and weight. </Text> 

               <Text style = {{margin:12,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                Check your waist and weight once a week. Then you'll know whether you are balancing the calories in and calories out or whether you need to be more active.                 </Text>
                    </View>
                    </View>
            }
            
            {this.state.BMI >=25.1 && this.state.BMI <=30 && 
            // {/* {this.state.BMI >=0.53 && this.state.BMI <=0.62 && */}
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center'}]}>
            
            <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> A good night’s sleep. </Text>
                <Text style = {{margin:12,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                Deep rest helps the entire body function properly. Sleep modulates neuroendocrine function and glucose metabolism. Poor quality sleep can result in metabolic alterations such as glucose intolerance and a variation in the appetite-regulating hormones.                    
                </Text>

                <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Manage stress. </Text>
                <Text style = {{margin:12,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                Stress is associated with an increase in hormones like cortisol and serotonin, which can lead to metabolic imbalances and accumulation of fat in the body, especially around the waist.                
                </Text>
                        
                    </View>
                </View>
                    }

            {this.state.BMI >=30.1 && 
            // {/* {this.state.WoH >=0.63 && */}
            <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
            <View style={[styles.textCard,{alignItems:'center'}]}>
            
            <Text style={{margin:12,fontSize:22,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Health Risks. </Text>
                    <Text style = {{margin:12,marginTop:0,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                    Obesity makes you more likely to have conditions including:
                    •	Heart disease and stroke
                    •	High blood pressure
                    •	Diabetes
                    •	Some cancers
                    •	Gallbladder disease and gallstones
                    •	Osteoarthritis
                    •	Gout
                    •	Breathing problems, such as sleep apnea (when a person stops breathing for short episodes during sleep) and asthma


                    </Text>

                </View>    
                </View>}


                {this.state.WoH <= 0.43 &&
                    <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
                    <View style={[styles.textCard,{alignItems:'center',justifyContent:'center'}]}>
                    
                    <Text style={{margin:12,fontSize:21,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Based on your Waist-to-height ratio: </Text> 
        
                       <Text style = {{margin:12,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                       A person should see their doctor if they have tried to gain weight but have not been able to. Anyone who is experiencing any effects of ill health due to being unable to gain weight, such as missed periods or infertility, should also see a doctor.                        </Text>
                            </View>
                            </View>
                }

                {this.state.WoH >= 0.44 && this.state.WoH <= 0.52 &&
                    <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
                    <View style={[styles.textCard,{alignItems:'center',justifyContent:'center'}]}>
                    
                    <Text style={{margin:12,fontSize:21,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Based on your Waist-to-height ratio: </Text> 
        
                       <Text style = {{margin:12,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                       Staying active burns calories and positively alters a person's metabolism, helping them to maintain an ideal weight. The U.S. government recommend that adults get 150 minutes of moderate exercise per week. This target might include brisk walking or playing tennis.                       </Text>
                            </View>
                            </View>
                }

                {this.state.WoH >= 0.53 && this.state.WoH <= 0.62 &&
                    <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
                    <View style={[styles.textCard,{alignItems:'center',justifyContent:'center'}]}>
                    
                    <Text style={{margin:12,fontSize:21,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Based on your Waist-to-height ratio: </Text> 
        
                       <Text style = {{margin:12,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                       Engaging in moderate physical activity, progressing to 30 minutes or more on most or preferably all days of the week.
Cutting back on dietary fat can help reduce calories and is heart-healthy. But reducing dietary fat alone- without reducing calories-will not produce weight loss.
                       </Text>
                            </View>
                            </View>
                }

                {this.state.WoH >= 0.63 &&
                    <View style={{width:'100%',alignItems:'center',paddingBottom:10}}>
                    <View style={[styles.textCard,{alignItems:'center',justifyContent:'center',height:260}]}>
                    
                    <Text style={{margin:12,fontSize:21,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Based on your Waist-to-height ratio: </Text> 
        
                       <Text style = {{margin:12,marginRight:12,fontSize:18,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
                       A reasonable time line for a 10 percent reduction in body weight is 6 months of treatment, with a weight loss of 1 to 2 pounds per week.
Weight maintenance should be a priority after the first 6 months of weight-loss therapy.
Patients should utilize lifestyle therapy for at least 6 months before considering drug therapy.
                       </Text>
                            </View>
                            </View>
                }
                
                
                    </ScrollView>
            </View>
        );
    }
}

// (BMI >= 0 && BMI <= 16){
//     return underWeight;
//    }else if(BMI >= 16.1 && BMI <= 17){
//     return underWeight;
//    }else if(BMI >= 17.1 && BMI <= 18.5){
//     return underWeight;
//    }else if(BMI >= 18.6 && BMI <= 25){
//     return normalWeight;
//    }else if(BMI >= 25.1 && BMI <= 30){
//     return overWeight;
//    }else if(BMI >= 30.1 && BMI <= 35){
//     return obese;
//    }else if(BMI >= 35.1){


const styles = StyleSheet.create({
    textCard:{
    backgroundColor:'white',
    width: '90%',
    marginTop: 15,
    borderRadius: 10
},
    card:{
        backgroundColor:'white',
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        height: '15%',
        marginTop: 15,
        borderRadius: 10    
    },
    updateWaist:{
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent:'center',
        borderColor:'white',
        borderWidth:1,
        marginTop: 35,  
        borderRadius:30,
        width:230,
        height:45,
        borderColor:'rgb(50,50,50)',
    }
})