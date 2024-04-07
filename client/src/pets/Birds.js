import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Parrots = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [petData, setPetData] = useState([]);

  useEffect(() => {
    // Fetch data on the initial load
    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      // Fetch data when the screen comes into focus
      fetchData();
    }, [])
  );

  const fetchData = () => {
    setLoading(true);
    axios.get('https://adoptails-server.onrender.com/getPets').then((response) => {
      // Filter for only Parrots (you may need to adjust the condition)
      const Parrots = response.data.filter((pet) => pet.petCategory === 'Parrot');
      setPetData(Parrots);
      setLoading(false);
    });
  };

  const goToPetDetails = (item) => {
    // Pass the selected pet data to the pet details screen
    navigation.navigate('PetDetails', { petData: item });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {petData.length === 0 ? (
          <View style={styles.noPetsContainer}>
            <Text style={styles.noPetsText}>No Parrots available</Text>
          </View>
        ) : (
          petData.map((item) => (
            <View key={item._id} style={styles.cardContainer}>
              <TouchableOpacity style={styles.cardContent} onPress={() => goToPetDetails(item)}>
                <Image source={{ uri: item.petImage }} style={styles.gridImage} />
              </TouchableOpacity>
              <View style={styles.cardFooter}>
                <Text style={styles.title}>{item.petName}</Text>
                <Text style={{ fontSize: 20 }}>{item.petAge}</Text>
                <Text style={{ fontSize: 18 }}>{item.petGender}</Text>
                <Text style={{ fontSize: 18 }}>₹{item.petAmount}</Text>
              </View>
             
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  scrollView: {
    padding: 10,
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 10,
    height: 125,
    flexDirection: 'column',
  },
  cardContent: {
    width: '100%',
    height: '70%',
  },
  cardFooter: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft: '45%',
    top: '-65%',
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
  },

  gridImage: {
    width: '50%',
    height: '142%',
    borderRadius: 5,
    backgroundColor: 'black',
  },
  noPetsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPetsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
  },
});

export default Parrots;
