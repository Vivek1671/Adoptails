import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from 'react-navigation' or 'react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Adopimg from '../../assets/background-3.jpg';
import profile from '../../assets/profile.jpg';

const Profile = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem('token');
        // Replace with your backend API URL and user token
        const apiUrl = 'https://adoptails-server.onrender.com/';
        const userToken = token;

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserDetails(data);
        } else {
          console.error('Error fetching user details:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }

    fetchData();
  }, []);

  const handleLogout = async () => {
    navigation.navigate('Welcome'); 
  };

  return (
    <View style={styles.container}>
      <Image style={styles.backgroundImage} source={Adopimg} />
      <View style={styles.contentContainer}>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={profile} />
        </View>
        <View style={styles.profileInfoContainer}>
          <Text style={styles.title}>User Profile</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userInfoText}>Name: {userDetails.name}</Text>
            <Text style={styles.userInfoText}>Email: {userDetails.email}</Text>
            <Text style={styles.userInfoText}>Mobile: {userDetails.phone}</Text>
            <Text style={styles.userInfoText}>Address: {userDetails.address}</Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    width: '100%',
    height: '40%',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    marginTop: -15,
  },
  profileImageContainer: {
    marginTop: '-30%',
    alignItems: 'center',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 70,
    top: '-100%',
    borderWidth: 8,
    borderColor: 'black',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  userInfo: {
    marginTop: 10,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 10,
    padding:10,
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 40,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Profile;
