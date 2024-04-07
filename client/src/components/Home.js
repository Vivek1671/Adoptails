import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { card, card1, gridCard, gridCard2, gridContainer } from '../common/card';
import Dogs from '../pets/Dogs';
import dog from '../../assets/dog.png';
import cat from '../../assets/cat.png';
import parrot from '../../assets/parrot.png';
import fish from '../../assets/fish.png';
import rabbit from '../../assets/rabbit.png';
import gridData from '../datas/GridData';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FontAwesome } from '@expo/vector-icons';


const Home = ({ navigation }) => {
  // const [searchText, setSearchText] = useState('');

  const [imageIndex, setImageIndex] = useState(0);
  const images = [
    require('../../assets/slide3.webp'),
    require('../../assets/slide1.webp'),
    require('../../assets/slide2.webp'),
    require('../../assets/slide4.webp'),
    require('../../assets/slide5.webp'),
    // Add more images as needed
  ];

  const changeImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  useEffect(() => {
    const imageInterval = setInterval(changeImage, 2000);

    return () => {
      clearInterval(imageInterval);
    };
  }, []);

  const handlePetPress = (petType) => {
    if (petType === 'Dog') {
      navigation.navigate('Dogs');
    }
    if(petType === 'Cat'){
      navigation.navigate('Cats');
    }
    if(petType === 'Bird'){
      navigation.navigate('Birds');
    }
    if(petType === 'Rabbit'){
      navigation.navigate('Rabbits');
    }
    if(petType === 'Fish'){
      navigation.navigate('Fishes');
    }
    console.log(`Pressed on ${petType}`);
  };
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        const token = await AsyncStorage.getItem('token');
        console.log(token, "get success");
        // Replace with your backend API URL and user token
        const apiUrl = 'https://adoptails-server.onrender.com/';
        // const userToken = 'your-token-here';
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
          setUserDetails(data); // Store user details in state
        } else {
          console.error('Error fetching user details:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
  
    fetchData();
  }, []);
  
  

  return (
    <View style={styles.container}>
      <View style={card1}>
        <Text style={styles.title}> ADOPTAILS </Text>
      </View>
      <Text style={styles.description}>
        <FontAwesome name="user" size={30} color="white" style={styles.searchIcon} />&nbsp;&nbsp;
        {userDetails.name}
        </Text>
      <Text style={styles.descrip}>
        <FontAwesome name="map-marker" size={30} color="white" style={styles.searchIcon} />&nbsp;&nbsp;
        {userDetails.address}
        </Text>
      
        <ScrollView horizontal={true} style={styles.scroll}>
        <Image source={images[imageIndex]} style={styles.image} />
      </ScrollView>

      <Text style={styles.text1}>Categories</Text>
      <FontAwesome name="arrow-right" size={20} color="white" style={styles.arrow} />

      <ScrollView horizontal={true} style={styles.scrollView}>  
          <View style={card}>
        <TouchableOpacity onPress={() => handlePetPress('Dog')}>
            <Image style={styles.pet} source={dog} />
        </TouchableOpacity>
          </View>
          <View style={card}>
        <TouchableOpacity onPress={() => handlePetPress('Cat')}>
            <Image style={styles.pet} source={cat} />
        </TouchableOpacity>
          </View>
          <View style={card}>
        <TouchableOpacity onPress={() => handlePetPress('Bird')}>
            <Image style={styles.pet} source={parrot} />
        </TouchableOpacity>
          </View>
          <View style={card}>
        <TouchableOpacity onPress={() => handlePetPress('Rabbit')}>
            <Image style={styles.pet} source={rabbit} />
        </TouchableOpacity>
          </View>
          <View style={card}>
        <TouchableOpacity onPress={() => handlePetPress('Fish')}>
            <Image style={styles.pet} source={fish} />
        </TouchableOpacity>
          </View>
      </ScrollView>

      <Text style={styles.text2}>New</Text>
      <FontAwesome name="arrow-down" size={20} color="white" style={styles.arrow2} />

      <View style={gridContainer}>
  {gridData.map((item) => (
    <View key={item.id} style={gridCard}>   
      <Image source={item.image} style={styles.gridImage} />
    </View>
  ))} 
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top: 50,
  },
  scrollView: {
    flexDirection: 'row', 
    top: -40,
    padding: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 2,
    textAlign:'left',
    top:'-6%',
    color:'#500b20'
  },
  scroll: {
    flexDirection: 'row',
    top: -15,
    padding: 16,
  },
  image: {
    width: 330, // Adjust the width and height as needed
    height: 200,
    borderRadius: 10,
    // top:-10
    // Other image styles
  },
  description: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 40,
    // marginBottom: 2,
    top:5,
  },
  descrip: {
    fontSize: 18,
    fontWeight: '400',
    marginLeft: '63%',
    // marginBottom: 2,
    top:-25,
  },
  // searchBarContainer: {
  //   flexDirection: 'row', // Arrange TextInput and FontAwesome horizontally
  //   alignItems: 'center', // Center vertically
  //   margin: 10,
  //   top: 20,
  // },
  // searchBar: {
  //   flex: 1, // Allow TextInput to take the remaining space
  //   height: 45,
  //   paddingLeft: 10,
  //   paddingRight: 10,
  //   borderRadius: 5,
  //   shadowColor: '#000',
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.2,
  //   elevation: 4,
  //   textAlign: 'center',
  // },
  searchIcon: {
    // marginRight: -40,
    // marginLeft: 50,
    color: '#0a7e8c',
  },
  arrow: {
    // marginRight: 10,
    marginLeft: '85%',
    color: 'black',
    top: -45,
  },
  arrow2: {
    // marginRight: 10,
    marginLeft: '85%',
    color: 'black',
    top: -60,
  },
  text1: {
    top: -15,
    fontWeight: "bold",
    fontSize: 28,
    marginLeft: 10,
  },
  text2: {
    top: -35,
    fontWeight: "bold",
    fontSize: 30,
    marginLeft: 10,
  },
  pet: {
    maxWidth: 50,
    maxHeight: 50,
    marginTop: -5,
  },
  gridImage:{
    width:'100%',
    height:'100%',
    borderRadius: 5,
  }
});

export default Home;
