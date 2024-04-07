import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import AdminLogin from './src/screens/Admin_Login';
import Signup from './src/screens/Signup';
import MainScreen from './src/screens/MainScreen';
// import Home from './src/components/Home';
// import Home from './src/components/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homes from './src/components/HomeScreen';
import Dogs from './src/pets/Dogs';
import Cats from './src/pets/Cats';
import Birds from './src/pets/Birds';
import Fishes from './src/pets/Fishes';
import Rabbits from './src/pets/Rabbits';
import PetDetails from './src/datas/PetDetails';
import Dashboard from './src/admin_pages/Dashboard';
import Home from './src/admin_pages/Home';
import List from './src/admin_pages/List';
import AdopForm from './src/datas/AdopForm';
import User from './src/screens/User'

const Stack = createNativeStackNavigator();

export default function App() {
  return (

<NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="MainScreen" component={MainScreen} 
           options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="AdminLogin" component={AdminLogin} 
           options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Welcome" component={Welcome} 
          options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="User" component={User} 
           options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Login" component={Login} 
           options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Signup" component={Signup} 
           options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Homescreen" component={Homes} 
           options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} 
           options={{
            headerShown:false
          }}
        />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="List" component={List} />
        <Stack.Screen name="Dogs" component={Dogs}/>
        <Stack.Screen name="Cats" component={Cats}/>
        <Stack.Screen name="Birds" component={Birds}/>
        <Stack.Screen name="Fishes" component={Fishes}/>
        <Stack.Screen name="Rabbits" component={Rabbits}/>
        <Stack.Screen name="PetDetails" component={PetDetails}/>
        <Stack.Screen name="AdopForm" component={AdopForm}/>
      </Stack.Navigator>
    </NavigationContainer>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
