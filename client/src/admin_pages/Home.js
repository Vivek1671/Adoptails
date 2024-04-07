// Home.js

import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

const Home = ({ navigation }) => {
  const [petName, setPetName] = useState('');
  const [petCategory, setPetCategory] = useState(''); 
  const [petAge, setPetAge] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petAmount, setPetAmount] = useState('');
  const [petImage, setPetImage] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerMobile, setOwnerMobile] = useState('');
  const [ownerAddress, setOwnerAddress] = useState('');
  const [ownerDescription, setOwnerDescription] = useState('');
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  
  const buttonStyles = isButtonPressed
    ? [styles.button, styles.buttonPressed]
    : styles.button;

  const handleSubmit = async () => {
    const petData = {
      petName,
      petCategory,
      petAge,
      petImage,
      petGender,
      petAmount,
      ownerName,
      ownerMobile,
      ownerAddress,
      ownerDescription,
    };

    if (
      !petName ||
      !petCategory ||
      !petAge ||
      !petGender ||
      !petImage ||
      !petAmount ||
      !ownerName ||
      !ownerMobile ||
      !ownerAddress ||
      !ownerDescription
    ) {
      Alert.alert('Please fill in all fields');
      return;
    } else if (!/^\d{10}$/.test(ownerMobile)) {
      Alert.alert('Mobile number must be a 10-digit number.');
      return;
    } else {
      try {
        // Make your axios post request here
        // ... (existing code)
        const response = await axios.post('https://adoptails-server.onrender.com/addpet', petData);
        if (response.status === 200) {
          if (response.data.message === 'Event with the same name already exists') {
            Alert.alert('Event with the same name already exists');
          } else {
            Alert.alert('Details added successfully');
            setPetName('');
            setPetCategory(''); // Reset to an empty string
            setPetAge('');
            setPetGender('');
            setPetImage('');
            setPetAmount('');
            setOwnerName('');
            setOwnerMobile('');
            setOwnerAddress('');
            setOwnerDescription('');

            // After successfully adding data, navigate to the List page and pass the data as params
            navigation.navigate('List', { petData });
          }
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data.message === 'Name already exists'
        ) {
          Alert.alert('Name already exists');
        } else {
          Alert.alert('Error creating event: ' + error.message);
        }
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.text}>ADD NEW PET</Text>
        <TextInput
          placeholder="Pet Name"
          placeholderTextColor="black"
          value={petName}
          onChangeText={setPetName}
          required
          style={styles.input}
        />
        <Picker
          selectedValue={petCategory}
          style={styles.input}
          onValueChange={(itemValue) => setPetCategory(itemValue)}
        >
          <Picker.Item label="Please choose Pet" value="" />
          <Picker.Item label="Dog" value="Dog" />
          <Picker.Item label="Cat" value="Cat" />
          <Picker.Item label="Rabbit" value="Rabbit" />
          <Picker.Item label="Parrot" value="Parrot" />
          <Picker.Item label="Fish" value="Fish" />
        </Picker>
        <Picker
          selectedValue={petGender}
          style={styles.input}
          onValueChange={(itemValue) => setPetGender(itemValue)}
        >
          <Picker.Item label="Please Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
        <TextInput
          placeholder="Pet Age"
          placeholderTextColor="black"
          value={petAge}
          onChangeText={setPetAge}
          required
          style={styles.input}
        />
        <TextInput
          placeholder="Pet Image"
          placeholderTextColor="black"
          value={petImage}
          onChangeText={setPetImage}
          required
          style={styles.input}
        />
         <TextInput
          placeholder="Pet Amount"
          placeholderTextColor="black"
          value={petAmount}
          onChangeText={setPetAmount}
          required
          style={styles.input}
        />
        <Text style={styles.text}>OWNER DETAILS</Text>
        <TextInput
          placeholder="Owner Name"
          placeholderTextColor="black"
          value={ownerName}
          onChangeText={setOwnerName}
          required
          style={styles.input}
        />
        <TextInput
          placeholder="Owner Mobile"
          placeholderTextColor="black"
          value={ownerMobile}
          onChangeText={setOwnerMobile}
          required
          style={styles.input}
        />
        <TextInput
          placeholder="Owner Address"
          placeholderTextColor="black"
          value={ownerAddress}
          onChangeText={setOwnerAddress}
          required
          style={styles.input}
        />
        <TextInput
          placeholder="Description"
          placeholderTextColor="black"
          value={ownerDescription}
          onChangeText={setOwnerDescription}
          required
          multiline
          style={styles.input}
        />
        <TouchableOpacity
          style={buttonStyles}
          onPress={handleSubmit}
          onPressIn={() => setIsButtonPressed(true)}
          onPressOut={() => setIsButtonPressed(false)}
        >
          <Text style={styles.buttonText}>ADD</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop:50,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#0a7e8c',
    borderRadius: 5,
    color: 'black',
  },
  text: {
    paddingBottom: 15,
    fontWeight: '700',
    fontSize: 30,
    color: '#0a7e8c',
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#0a7e8c',
    borderWidth: 3,
    borderColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    width: 150,
  },
  buttonPressed: {
    borderColor: 'dodgerblue',
    backgroundColor: 'transparent',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default Home;
