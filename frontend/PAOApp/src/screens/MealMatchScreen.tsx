import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Switch, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from 'services/api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'navigation/types';

type MealMatchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MealMatch'>;


const MealMatchScreen = () => {
  const navigation = useNavigation<MealMatchScreenNavigationProp>();

  const [isAvailable, setIsAvailable] = useState(false);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // Set the token for API calls
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Fetch user's current availability status
        const userResponse = await api.get('api/users/profile');
        setIsAvailable(userResponse.data.isAvailableForMeal);
      } else {
        // If no token is found, redirect to login
        Alert.alert('Please log in to use this feature');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAvailability = async () => {
    try {
      await api.put('api/users/update-availability', { isAvailableForMeal: !isAvailable });
      setIsAvailable(!isAvailable);
    } catch (error) {
      console.error('Error updating availability:', error);
      Alert.alert('Error', 'Failed to update availability');
    }
  };

  const findMatch = async () => {
    try {
      const response = await api.post('api/match/match-for-meal');
      setMatches(response.data.matches);
    } catch (error) {
      console.error('Error finding match:', error);
      Alert.alert('Error', 'Failed to find a match');
    }
  };

  if (isLoading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Match</Text>
      <View style={styles.availabilityContainer}>
        <Text>Available for meal:</Text>
        <Switch value={isAvailable} onValueChange={toggleAvailability} />
      </View>
      <Button title="Find Match" onPress={findMatch} disabled={!isAvailable} />
      <FlatList
        data={matches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.matchItem}>
            <Text>{item.name}</Text>
            <Text>{item.faith}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  availabilityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  matchItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default MealMatchScreen;