import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { Alert, TextInput, Button } from 'react-native';

const List = () => {
  const [loading, setLoading] = useState(true);
  const [petData, setPetData] = useState([]);
 

  useEffect(() => {
    fetchData();
    // Set up a refresh interval
    const refreshInterval = setInterval(fetchData, 5000); 

    // Clean up the interval on unmount
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const fetchData = () => {
    setLoading(true);
    axios.get('https://adoptails-server.onrender.com/getPets')
      .then((response) => {
        setPetData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleDeleteItem = (itemId) => {
    axios.delete(`https://adoptails-server.onrender.com/deletePet/${itemId}`)
      .then(() => {
        setPetData((prevData) => prevData.filter((item) => item._id !== itemId));
        Alert.alert('Success', 'Pet deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        Alert.alert('Error', 'Failed to delete pet');
      });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0a7e8c" />
      </View>
    );
  }

  return (
    <ScrollView>
      <Text style={styles.title}>List of Pets</Text>
      <View style={styles.cardContainer}>
        {petData.map((item) => (
          <View style={styles.card} key={item._id}>
            <View style={styles.column}>
              <Text style={styles.cardTitle}>Pet Details</Text>
              <Text>Name: {item.petName}</Text>
              <Text>Category: {item.petCategory}</Text>
              <Text>Age: {item.petAge}</Text>
              <Text>Gender: {item.petGender}</Text>
              <Text style={styles.petAmount}>₹{item.petAmount}</Text>
              <Image source={{ uri: item.petImage }} style={styles.petImage} />
            </View>
            <View style={styles.column2}>
              <Text style={styles.cardTitle}>Owner Details</Text>
              <Text>Name: {item.ownerName}</Text>
              <Text>Mobile: {item.ownerMobile}</Text>
              <Text>Address: {item.ownerAddress}</Text>
              <Text>Description: {item.ownerDescription}</Text>
              <TouchableOpacity onPress={() => handleDeleteItem(item._id)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#0a7e8c',
    marginBottom: 10,
  },
  cardContainer: {
    padding: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  column: {
    flex: 1,
    padding: 10,
  },
  column2: {
    flex: 1,
    marginLeft: '15%',
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  petImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: '70%',
    marginTop: '-80%',
  },
  petAmount: {
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default List;
