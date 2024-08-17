import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from 'services/api';
import { RootStackParamList } from 'navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type AccountSettingsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'AccountSettings'>;

const AccountSettingsScreen = () => {
  const navigation = useNavigation<AccountSettingsScreenNavigationProp>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          const response = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const user = response.data;
          setName(user.name);
          setEmail(user.email);
          setLocation(user.location);
        } else {
          navigation.navigate('Login'); // Redirect to login if no token
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await api.put(
          '/auth/update',
          { name, email, password, location },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          Alert.alert('Success', 'Account updated successfully!');
        } else {
          Alert.alert('Error', 'Failed to update account.');
        }
      }
    } catch (error) {
      console.error('Error updating account:', error);
      Alert.alert('Error', 'An error occurred while updating the account.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token'); // Remove token from storage
    navigation.navigate('Login'); // Redirect to login
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Account Settings</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        autoCapitalize="none"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter your location"
      />

      <Button title={isLoading ? 'Updating...' : 'Update'} onPress={handleUpdate} disabled={isLoading} />
      <Button title="Logout" onPress={handleLogout} color="red" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default AccountSettingsScreen;
