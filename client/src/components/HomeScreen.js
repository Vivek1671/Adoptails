import React, {useState}from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './Home';
import Profile from './Profile';
import Paw from './Paw';


const CustomTabLabel = ({ label, focused, fontSize,fontWeight }) => (
  <Text style={{ fontSize, color: focused ? '#34495E' : '#A9CCE3', fontWeight:"bold" }}>{label}</Text>
);


const Tab = createBottomTabNavigator();

export default function Homes() {
  
  return (
    
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize=30;
          let iconColor='#0a7e8c';

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'Paw') {
            iconName = focused ? 'ios-paw' : 'ios-paw';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person';
          } 

          return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
        },
        tabBarLabel: ({ focused }) => {
          const fontSize = focused ? 15 : 15; // Adjust the font size here
          return <CustomTabLabel label={route.name} focused={focused} fontSize={fontSize} />;
        },
        // tabBarInactiveTintColor: 'indigo',
        // tabBarActiveTintColor: 'orangered',
      })}
      
    >
      <Tab.Screen name="Home" component={Home}
      options={{
            headerShown:false
          }} 
          />
     <Tab.Screen name="Paw" component={Paw} 
        options={{
            headerShown:false
          }}
      />
      <Tab.Screen name="Profile" component={Profile} 
        options={{
            headerShown:false
          }}
      />
      {/* <Tab.Screen name="User" component={UserProfile} /> */}
    </Tab.Navigator>
  );
}

