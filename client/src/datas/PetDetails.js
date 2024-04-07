// PetDetails.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';

const PetDetails = ({ route, navigation }) => {
  // Get the selected pet's data from the route parameters
  const { petData, userData } = route.params;
  const [showOwnerDetails, setShowOwnerDetails] = useState(false);

  const toggleOwnerDetails = () => {
    setShowOwnerDetails(!showOwnerDetails);
  };
  
  const handleAdoptButton = () => {
    // Display a success message using Alert
    Alert.alert(
      'Ready To Adopt',
      'Now You Need To Fill The Adoption Form',
      [ 
        {
          text: 'OK',
          onPress: () => {
            console.log('OK Pressed');
            navigation.navigate('AdopForm', { petData, userData });
          },
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: petData.petImage }} style={styles.petImage} />
      <Text style={styles.petName}>{petData.petName}</Text>
      <Text style={styles.petCategory}>{petData.petCategory}</Text>
      <Text style={styles.petAge}>Age: {petData.petAge}</Text>
      <Text style={styles.petAge}>Gender: {petData.petGender}</Text>
      <Text style={styles.petGender}>Amount: ₹{petData.petAmount}</Text>
      <TouchableOpacity onPress={toggleOwnerDetails}>
        <Text style={styles.ownerDetailsButton}>
          {showOwnerDetails ? 'Hide Owner Details' : 'Show Owner Details'}
        </Text>
      </TouchableOpacity>
      {showOwnerDetails && (
        <View>
          <Text style={styles.ownerName}>Name: {petData.ownerName}</Text>
          <Text style={styles.ownerName}>Mobile: {petData.ownerMobile}</Text>
          <Text style={styles.ownerName}>Address: {petData.ownerAddress}</Text>
          <Text style={styles.ownerName}>Description: {petData.ownerDescription}</Text>
          {/* Add more owner details here */}
        </View>
      )}
      <TouchableOpacity style={styles.adoptButton} onPress={handleAdoptButton}>
        <Text style={styles.adoptButtonText}>Adopt</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
    paddingBottom: 100, // Ensure space for the Adopt button
  },
  petImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: 'center',
    marginTop: 20,
  },
  petName: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  petCategory: {
    fontSize: 18,
    textAlign: 'center',
  },
  petAge: {
    fontSize: 16,
    marginTop: 10,
  },
  petGender: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  ownerDetailsButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 15,
    fontWeight: 'bold',
  },
  ownerName: {
    fontSize: 16,
    padding: '1%',
    marginTop: 10,
    marginLeft: 20,
  },
  adoptButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#0a7e8c',
    padding: 10,
    borderRadius: 50,
    minWidth: 160,
  },
  adoptButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
  // Add more styles for other owner details as needed
});

export default PetDetails;
