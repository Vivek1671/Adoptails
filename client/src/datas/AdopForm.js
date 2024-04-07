import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation from React Navigation

const AdopForm = ({ route }) => {
  const { petData, userData } = route.params;
  const [adopteeName, setAdopteeName] = useState('');
  const [adopteeMobile, setAdopteeMobile] = useState();
  const [adopteeEmail, setAdopteeEmail] = useState();
  const navigation = useNavigation(); // Get the navigation object

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://adoptails-server.onrender.com/AdoptionRequest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          petData: JSON.stringify(petData),
          adopteeName,
          adopteeMobile,
          adopteeEmail
        }),
      });

      if (response.ok) {
        // Request successful, show an alert with a success message
        Alert.alert('Adopted successfully', '', [
          {
            text: 'OK',
            onPress: () => {
              // Navigate back to the Home page after a successful adoption
              navigation.navigate("Paw");
            },
          },
        ]);
      } else {
        // Request failed, show an alert with an error message
        Alert.alert('Error submitting adoption request: ' + response.status + ' ' + response.statusText);
      }
    } catch (error) {
      // An error occurred, show an alert with the error message
      Alert.alert('Error submitting adoption request: ' + error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.title}>Adoption Form</Text>
      <Text style={styles.petDetails}>
        {"\n"}<Text style={{ fontWeight: 'bold', fontSize: 18, color: 'blue' }}>Pet Details</Text>
        {"\n"}Pet Name: {petData?.petName}
        {"\n"}Pet Category: {petData?.petCategory}
        {"\n"}Age: {petData?.petAge}
        {"\n"}Gender: {petData?.petGender}
        {"\n"}Amount: ₹{petData?.petAmount}
        {"\n"}<Text style={{ fontWeight: 'bold', fontSize: 18, color: 'blue' }}>Owner Details</Text>
        {"\n"}Name: {petData?.ownerName}
        {"\n"}Mobile: {petData?.ownerMobile}
      </Text>
      <Text style={styles.formLabel}>Your Name:</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Enter your name"
        value={adopteeName}
        onChangeText={(text) => setAdopteeName(text)}
      />
      <Text style={styles.formLabel}>Your Mobile:</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Enter your mobile number"
        value={adopteeMobile}
        onChangeText={(text) => setAdopteeMobile(text)}
      />
      <Text style={styles.formLabel}>Your Email:</Text>
      <TextInput
        style={styles.inputField}
        placeholder="Enter your mobile number"
        value={adopteeEmail}
        onChangeText={(text) => setAdopteeEmail(text)}
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: '-30%',
  },
  petDetails: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 34,
  },
  formLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#0a7e8c',
    padding: 10,
    borderRadius: 10,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default AdopForm;
