import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import paologo from '../assets/images/paologo.jpg';

const LoginScreen = () => {
  const navigation = useNavigation(); // Get navigation instance

  return (
    <View style={styles.container}>
      <Image source={paologo} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <TextInput 
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input}
        placeholder="Password"
        secureTextEntry
      />
      <Button title="Login" onPress={() => {}} />
      <Button 
        title="Sign Up" 
        onPress={() => navigation.navigate('SignUp')} // Navigate to SignUpScreen
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100, 
    height: 66,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
