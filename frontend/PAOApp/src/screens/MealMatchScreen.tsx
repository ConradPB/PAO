import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Switch, FlatList } from 'react-native';
import api from 'services/api';

const MealMatchScreen = () => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [matches, setMatches] = useState([]);

  const toggleAvailability = async () => {
    try {
      await api.put('api/users/update-availability', { isAvailableForMeal: !isAvailable });
      setIsAvailable(!isAvailable);
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const findMatch = async () => {
    try {
      const response = await api.post('api/match/match-for-meal');
      setMatches(response.data.matches);
    } catch (error) {
      console.error('Error finding match:', error);
    }
  };

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