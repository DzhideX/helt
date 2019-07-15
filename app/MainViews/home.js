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

    returnBMI = () => {
        const { BMI } = this.state;
        var normalWeight = "The answer is different for each person, but generally. To keep your weight the same, you need to burn the same number of calories as you eat and drink.\nTo lose weight, burn more calories than you eat and drink.\nTo gain weight, burn fewer calories than you eat and drink.";
    var underWeight = "Add healthy calories.\nYou don’t need to drastically change your diet.\nYou can increase calories by adding nut or seed toppings, cheese, and healthy side dishes.\nTry almonds, sunflower seeds, fruit, or whole-grain, wheat toast. Go nutrient dense.\nInstead of eating empty calories and junk food, eat foods that are rich in nutrients. Consider high-protein meats, which can help you to build muscle.\nAlso, choose nutritious carbohydrates, such as brown rice and other whole grains. This helps ensure your body is receiving as much nourishment as possible, even if you’re dealing with a reduced appetite.\nSnack away. Enjoy snacks that contain plenty of protein and healthy carbohydrates.\nConsider options like trail mix, protein bars or drinks, and crackers with hummus or peanut butter. Also, enjoy snacks that contain \“good fats,\” which are important for a healthy heart. Examples include nuts and avocados. Eat mini-meals.\nIf you’re struggling with a poor appetite, due to medical or emotional issues, eating large amounts of food may not seem appealing.\nConsider eating smaller meals throughout the day to increase your calorie intake.\nBulk up. While too much aerobic exercise will burn calories and work against your weight goal, strength training can help. This includes weightlifting or yoga. You gain weight by building muscle.";
    var overWeight = "Make fresh, organic foods the priority.\nEliminate or greatly reduce canned or processed foods, particularly those with a high GI, such as table sugar and flour-based foods, including bread and pastry.\nAvoid deep-fried foods, which have high fat content, and items such as ice cream and cheese that are made from dairy fat.\nFast food is packed with salt and non-healthy fats, so always favor homemade meals.\nRemember, drinks like soda are a huge source of calories in your diet. ";
    var obese = "Eat five to six servings of fruits and vegetables daily. A vegetable serving is one cup of raw vegetables or one-half cup of cooked vegetables or vegetable juice.\nA fruit serving is one piece of small to medium fresh fruit, one-half cup of canned or fresh fruit or fruit juice, or one-fourth cup of dried fruit. \nChoose whole grain foods such as brown rice and whole wheat bread. Avoid highly processed foods made with refined white sugar, flour and saturated fat. \nWeigh and measure food to gain an understanding of portion sizes. For example, a three-ounce serving of meat is the size of a deck of cards. \nAvoid super-sized menu items particularly at fast-food restaurants. You can achieve a lot just with proper choices in serving sizes. Avoid foods that are high in \"energy density\" or that have a lot of calories in a small amount of food. For example, a large cheeseburger and a large order of fries may have almost 1,000 calories and 30 or more grams of fat. By ordering a grilled chicken sandwich or a plain hamburger and a small salad with low-fat dressing, you can avoid hundreds of calories and eliminate much of the fat intake. \nFor dessert, have fruit or a piece of angel food cake rather than the \"death by chocolate\" special or three pieces of home-made pie.";
    console.log("STUFF" + BMI);    
    if(BMI >= 0 && BMI <= 16){
            return {label:"severely thin",text:underWeight};
           }else if(BMI >= 16.1 && BMI <= 17){
            return {label:"moderately thin",text:underWeight};
           }else if(BMI >= 17.1 && BMI <= 18.5){
            return {label:"mildly thin",text:underWeight};;
           }else if(BMI >= 18.6 && BMI <= 25){
            return {label:"normal",text:normalWeight};
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
                        console.log(users[counter]);
                        console.log('whoa');
                        var lastWeight = ((users[counter].weight)[(users[counter].weight).length-1]).value;
                        console.log(lastWeight);
                        if(lastWeight === '' ||users[counter].height === '' ||users[counter].sex === ''){
                            this.setState({view:false});
                        }else{
                            this.setState({height:parseInt(users[counter].height)});
                            this.setState({weight:lastWeight});
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
         
          {this.state.view && <View style={{alignItems: 'center',backgroundColor:'rgb(126,174,252)'}}> 
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("cardOne")} style={[styles.card,{height:80,borderWidth:3,backgroundColor:'white'},this.styleCard()]}>
            <Text onPress={()=>console.log(this.returnBMI())} style = {{fontSize:27,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>You are {JSON.stringify(this.returnBMI())}! </Text> 
            {/* <Text style = {{fontSize:25}}> Your specific BMI is: {this.state.BMI} </Text>
            <Text> To learn more about what this means click this box! </Text> */}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.card,{height:80}]}>
            <Text style = {{fontSize:23,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}> Current waist size is: {this.newDate()} </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.textCard]}>
            <Text style = {{fontFamily:'Acme-Regular',margin:15,color:'rgb(30,30,30)',fontSize:17}}> {this.returnText()} </Text>
            </TouchableOpacity>
        </View> }

        {this.state.view === false &&  <View style={{height:'100%',width:'100%',alignItems: 'center',justifyContent:'center',backgroundColor:'rgb(126,174,252)'}}>
        <Text style={{color:'white',fontSize:30,fontFamily:'Acme-Regular',textAlign:'center'}}> 
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

    render(){
        return( 
        <View style={{alignItems: 'center',height:'100%',backgroundColor:'rgb(126,174,252)'}}> 
        <TouchableOpacity style={[styles.card,{}]}>
            <Text style = {{margin:12,fontSize:15,fontFamily:'FugazOne-Regular',color:'rgb(30,30,30)'}}>
            Body mass index (BMI) is a measure of body fat based on height and weight that applies to adult men and women.
            </Text>
            </TouchableOpacity>
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
    textCard:{backgroundColor:'white',
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
    }
})