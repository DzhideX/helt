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

export class Progress extends Component{

    static navigationOptions = {
        header:null
    }
//rgb(126,174,252)
    render(){
      return(
        <View style={{justifyContent:'center',alignItems: 'center',height:'100%',backgroundColor:'#7eaefc'}}>
            <Text style={{color:'white',fontSize:20,fontFamily:'Acme-Regular'}}> Your weight progress: </Text>
            <LineChart
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ]
      }]
    }}
    width={Dimensions.get('window').width-20} // from react-native
    height={250}
    yAxisLabel={'$'}
    chartConfig={{
      backgroundGradientFrom: 'white',
      backgroundGradientTo: 'white',
      // backgroundColor: 'white',
      decimalPlaces: 1, // optional, defaults to 2dp
      color:()=> 'rgb(80,80,80)',
      style: {
        borderRadius: 16,
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  <Text style={{color:'white',fontSize:20,fontFamily:'Acme-Regular'}}> Your waist progress: </Text>
  <LineChart
    data={{
      labels: ['January', 'February', 'March', 'April', 'May', 'June'],
      datasets: [{
        data: [
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
          Math.random() * 100,
        ]
      }]
    }}
    width={Dimensions.get('window').width-20} // from react-native
    height={250}
    yAxisLabel={'$'}
    chartConfig={{
      backgroundGradientFrom: 'white',
      backgroundGradientTo: 'white',
      // backgroundColor: 'white',
      decimalPlaces: 1, // optional, defaults to 2dp
      color:()=> 'rgb(80,80,80)',
      style: {
        borderRadius: 16,
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
  
        </View>
      );
    }
  }
