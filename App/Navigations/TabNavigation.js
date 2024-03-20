import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import FeedBack from '../Screen/FeedBack';
import MyCourse from '../Screen/MyCourse';
import Profile from '../Screen/Profile';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import HomeScreenNavigation from './HomeScreenNavigation';

const Tab=createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown:false,
    }}>
        <Tab.Screen name="home" component={HomeScreenNavigation}
        options={{
          tabBarIcon:({color,size})=>(
            <FontAwesome name="home" size={size} color={color} />
          )
        }}/>
        <Tab.Screen name="my-course" component={MyCourse}
        options={{
          tabBarIcon:({color,size})=>(
            <FontAwesome5 name="book-open" size={size} color={color} />
          )
        }}/>
        <Tab.Screen name="feedback" component={FeedBack}
        options={{
          tabBarIcon:({color,size})=>(
            <MaterialIcons name="leaderboard" size={size} color={color} /> 
          )
        }}/>
        <Tab.Screen name="profile" component={Profile}
        options={{
          tabBarIcon:({color,size})=>(
            <MaterialIcons name="supervised-user-circle" size={size} color={color} />
          )
        }}/>
    </Tab.Navigator>
  );
}