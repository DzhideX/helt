import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Button,Dimensions} from 'react-native';
import { createStackNavigator, createAppContainer,StackActions, NavigationActions,createBottomTabNavigator} from 'react-navigation';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
import { NavigationEvents } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';



export class Progress extends Component{

  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('userbase');
      var users = JSON.parse(value);
      counter = users.length;
      while(counter--){
          if(users[counter].loggedIn === true){
            var weightArr =[], waistArr=[];
            for(var i = 0;i < (users[counter].weight).length;i++){
              weightArr[i] = ((users[counter].weight)[i]).value;
            }
            for(var i = 0;i < (users[counter].waist).length;i++){
              waistArr[i] = ((users[counter].waist)[i]).value;
            }
            console.log(weightArr,waistArr);
              console.log("PROGRESS SCREEN:"+JSON.stringify(users[counter]));
              this.setState({weight:weightArr});
              this.setState({waist:waistArr});
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

    constructor(props){
      super(props)
      this.state={weight:[0,0],waist:[0,0],weightDate:[0,0],waistDate:[0,0]
    };
  }
//rgb(126,174,252)
    render(){
      return(
        <View style={{justifyContent:'center',alignItems: 'center',height:'100%',backgroundColor:'#7eaefc'}}>

        <NavigationEvents
          onWillFocus={async () => {
            
            try {
                const value = await AsyncStorage.getItem('userbase');
                var users = JSON.parse(value);
                counter = users.length;
                while(counter--){
                    if(users[counter].loggedIn === true){
                      var weightArr =[], waistArr=[],weightArrDate=[],waistArrDate=[];
                      for(var i = 0;i < (users[counter].weight).length;i++){
                        weightArr[i] = ((users[counter].weight)[i]).value;
                        weightArrDate[i] =((users[counter].weight)[i]).date;
                      }
                      for(var i = 0;i < (users[counter].waist).length;i++){
                        waistArr[i] = ((users[counter].waist)[i]).value;
                        waistArrDate[i] =((users[counter].waist)[i]).date;
                      }
                      console.log(weightArr,waistArr);
                        console.log("PROGRESS SCREEN:"+JSON.stringify(users[counter]));
                        this.setState({weight:weightArr});
                        this.setState({waist:waistArr});
                        this.setState({weightDate:weightArrDate});
                        this.setState({waistDate:waistArrDate});
                      break;
                    }
                }
              } catch (error) {
                console.log(error);
              }
              console.log(waistArrDate);
              console.log(weightArrDate);
          }}
        />

          {/* THIS SHOWS THE GRAPH, THERE ARE MORE THAN 2 RESULTS */}

          {/* -------------------------------------------------------
          ------------------------------------------------------- */}

      {(this.state.weight).length >= 2 && 
      // style={{height:'100%',width:'100%'}}
        <View style={{alignItems:'center'}}> 
          <Text style={{marginBottom:30,color:'white',fontSize:15,fontFamily:'Acme-Regular'}}>
            This is your weight progress:
          </Text>
          <LineChart
    data={{
      labels: this.state.weightDate,
      datasets: [{
        data: this.state.weight
      }]
    }}
    width={Dimensions.get('window').width - 30} // from react-native
    height={220}
    yAxisLabel={''}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: 'white',
      backgroundGradientTo: 'white',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: () => `rgb(80, 80, 80)`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
        </View>
      }

        {/* THIS DOESN'T SHOW THE GRAPH, THERE ARE LESS THAN 2 RESULTS */}

        {/* -------------------------------------------------------
          ------------------------------------------------------- */}

      {(this.state.weight).length < 2 &&  
      // style={{height:'100%',width:'100%'}}
      <View style={{margin:10}}> 
        <Text style={{marginTop:30,justifyContent:'center',marginBottom:30,color:'white',fontSize:15,fontFamily:'Acme-Regular'}}>
          To be able to see your progress you need wait until you have updated your weight at least 2 times!
        </Text>
      </View>
    }

    {/* THIS SHOWS THE GRAPH, THERE ARE MORE THAN 2 RESULTS */}

    {/* -------------------------------------------------------
          ------------------------------------------------------- */}

      {(this.state.waist).length >= 2 
       && 
        <View style={{alignItems:'center'}}> 
          <Text style={{marginTop:30,marginBottom:30,color:'white',fontSize:15,fontFamily:'Acme-Regular'}}>
            This is your waist progress:
          </Text>
          <LineChart
    data={{
      labels: this.state.waistDate,
      datasets: [{
        data: this.state.waist
      }]
    }}
    width={Dimensions.get('window').width - 30} // from react-native
    height={220}
    yAxisLabel={''}
    chartConfig={{
      backgroundColor: '#e26a00',
      backgroundGradientFrom: 'white',
      backgroundGradientTo: 'white',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: () => `rgb(80, 80, 80)`,
      style: {
        borderRadius: 16
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
        </View>
      }

      {/* THIS DOESN'T SHOW THE GRAPH, THERE ARE LESS THAN 2 RESULTS */}

      {/* -------------------------------------------------------
          ------------------------------------------------------- */}

      {(this.state.waist).length < 2 &&
      <View style={{alignItems:'center',justifyContent:'center',margin:10}}> 
      <Text style={{marginTop:30,marginBottom:15,color:'white',fontSize:15,fontFamily:'Acme-Regular'}}>
        To be able to see your progress you need wait until you have updated your waist at least 2 times!
      </Text>
    </View>
    }

      
        </View>
      );
    }
  }
