import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Paw = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://adoptails-server.onrender.com/getAdoptionRequests');
      if (response.ok) {
        const data = await response.json();
        setAdoptionRequests(data);
      } else {
        console.error('Error fetching adoption requests');
      }
    } catch (error) {
      console.error('Error fetching adoption requests:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const refreshInterval = setInterval(fetchData, 10000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Paws</Text>
      <Text style={styles.subtitle}>Adoptee Details:</Text>
      {adoptionRequests.length > 0 ? (
        adoptionRequests.map((request) => (
          <View key={request._id} style={styles.card}>
            <Text style={styles.cardTitle}>Adoptee Name: {request.adopteeName}</Text>
            <Text style={styles.cardText}>Adoptee Mobile: {request.adopteeMobile}</Text>
            <Text style={styles.cardText}>Adoptee Email: {request.adopteeEmail}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No adoptees available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  cardText: {
    marginVertical: 5,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
});

export default Paw;
