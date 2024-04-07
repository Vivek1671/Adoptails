import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from './Home';
import List from './List';
import Adoptee from './Adoptees';
// import Profile from './Profiles';

const CustomTabLabel = ({ label, focused, fontSize,fontWeight }) => (
  <Text style={{ fontSize, color: focused ? '#34495E' : '#A9CCE3', fontWeight:"bold" }}>{label}</Text>
);



const Tab = createBottomTabNavigator();

export default function Dashboard() {
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconSize=30;
          let iconColor='#0a7e8c';

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'List') {
            iconName = focused ? 'md-list-circle' : 'md-list-circle';
          } else if (route.name === 'Adoptee') {
            iconName = focused ? 'ios-person-circle' : 'ios-person-circle';
          } 

          return <Ionicons name={iconName} size={iconSize} color={iconColor} />;
        },
        tabBarLabel: ({ focused }) => {
          const fontSize = focused ? 15 : 15; // Adjust the font size here
          return <CustomTabLabel label={route.name} focused={focused} fontSize={fontSize} />;
        },
        // tabBarInactiveTintColor: 'indigo',
        // tabBarActiveTintColor: 'orangered',
      })}>
      <Tab.Screen name="Home" component={Home} 
        options={{
            headerShown:false
          }} 
      />
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Adoptee" component={Adoptee} 
        options={{
            headerShown:false
          }} 
      />
    </Tab.Navigator>
  );
}


