import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import paologo from '../assets/images/PAOlogo.jpg';
import { RootStackParamList } from 'navigation/types';
import api from 'services/api';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

type SignUpScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUpScreen = () => {
  const navigation = useNavigation<SignUpScreenNavigationProp>();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState<Date | null>(null);  // Updated state to store date of birth
  const [location, setLocation] = useState('');
  const [faith, setFaith] = useState(''); 
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = useState('');
  const [customGender, setCustomGender] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);  

  const handleSignUp = async () => {
    if (!name || !email || !password || !dob || !location || !faith) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post('http://10.0.2.2:7000/api/users/register', {
        name,
        email,
        password,
        dateOfBirth: dob?.toISOString(),
        location,
        faith, 
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Account created successfully!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') },
        ]);
      } else {
        Alert.alert('Error', 'Failed to create account.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred during sign-up.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);  // Hide date picker after selection
    if (selectedDate) {
      setDob(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        source={paologo} 
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Create Account</Text>
      
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      
      {/* Date of Birth Picker */}
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
        <Text style={{ color: dob ? '#333' : '#999' }}>
          {dob ? dob.toDateString() : 'Select Date of Birth'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={dob || new Date(2000, 0, 1)}  // Default to a reasonable date
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}  // Prevent selecting future dates
        />
      )}

      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={styles.input}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
          mode="dropdown"
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
          <Picker.Item label="Non-binary" value="Non-binary" />
          <Picker.Item label="Prefer not to say" value="Prefer not to say" />
          <Picker.Item label="Other" value="Other" />
        </Picker>
      </View>

      {/* Conditionally render the custom gender input if "Other" is selected */}
      {gender === 'Other' && (
        <TextInput
          placeholder="Please specify"
          value={customGender}
          onChangeText={setCustomGender}
          style={styles.input}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 150,  
    height: 150, 
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  datePicker: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    justifyContent: 'center',
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    ...Platform.select({
      android: {
        color: '#666',
      },
      ios: {
        color: '#333',
      },
    }),
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
