import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Switch, FlatList, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import api from '../services/api';
import { RootStackParamList } from '../navigation/types';
import { StackNavigationProp } from '@react-navigation/stack';

type MealMatchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MealMatch'>;

const MealMatchScreen = () => {
  const navigation = useNavigation<MealMatchScreenNavigationProp>();

  const [isAvailable, setIsAvailable] = useState(false);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFindingMatch, setIsFindingMatch] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken'); // Changed to 'authToken' to match previous screens
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const userResponse = await api.get('api/users/profile');
        setIsAvailable(userResponse.data.isAvailableForMeal);
      } else {
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
      setIsFindingMatch(true);
      const response = await api.post('api/match/match-for-meal');
      setMatches(response.data.matches);
      // Save matches to AsyncStorage
      await AsyncStorage.setItem('mealMatches', JSON.stringify(response.data.matches));
      Alert.alert('Match found!', 'You have new matches to review.');
    } catch (error) {
      console.error('Error finding match:', error);
      Alert.alert('Error', 'Failed to find a match');
    } finally {
      setIsFindingMatch(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meal Match</Text>
      <View style={styles.availabilityContainer}>
        <Text>Available for meal:</Text>
        <Switch value={isAvailable} onValueChange={toggleAvailability} />
      </View>
      <Button
        title={isFindingMatch ? "Finding Match..." : "Find Match"}
        onPress={findMatch}
        disabled={!isAvailable || isFindingMatch}
      />
      <FlatList
        data={matches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.matchItem}>
            <Text style={styles.matchText}>Name: {item.name}</Text>
            <Text style={styles.matchText}>Faith: {item.faith}</Text>
            <Text style={styles.matchText}>Location: {item.location}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noMatchesText}>No matches found. Try again later.</Text>}
      />
    </View>
  );
};

// Define styles for MealMatchScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
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
  matchText: {
    fontSize: 16,
  },
  noMatchesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});

export default MealMatchScreen;
