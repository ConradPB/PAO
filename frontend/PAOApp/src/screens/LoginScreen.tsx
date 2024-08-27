import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }

    try {
      setIsLoading(true);
      console.log('Attempting login with:', { email, password });

      const response = await api.post('http://10.0.2.2:7000/api/users/login', {
        email,
        password,
      });

      console.log('Login response:', response.data);

      if (response.data && response.data.token) {
        try {
          await AsyncStorage.setItem('authToken', response.data.token);
          console.log('Token stored in AsyncStorage');
          navigation.navigate('Home');
        } catch (storageError) {
          console.error('Error storing token in AsyncStorage:', storageError);
          Alert.alert('Error', 'Failed to store token.');
        }
      } else {
        Alert.alert('Error', 'Invalid response from server. Token not received.');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        Alert.alert('Error', error.response.data.message || 'An error occurred during login.');
      } else if (error.request) {
        console.error('Error request:', error.request);
        Alert.alert('Error', 'No response received from server. Please check your connection.');
      } else {
        console.error('Error message:', error.message);
        Alert.alert('Error', 'An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={Keyboard.dismiss}
    >
      <Text style={styles.title}>Login</Text>
      <TextInput
        ref={emailInputRef}
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        autoComplete="email" 
        returnKeyType="next"
        onSubmitEditing={() => passwordInputRef.current?.focus()}
      />
      <TextInput
        ref={passwordInputRef}
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        textContentType="password"
        autoComplete="password" 
        returnKeyType="done"
        onSubmitEditing={handleLogin}
      />
      <Button
        title={isLoading ? "Logging in..." : "Login"}
        onPress={handleLogin}
        disabled={isLoading}
      />
      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.signupLink}>
          Don't have an account? Sign up.
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
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
  signupLink: {
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default LoginScreen;
