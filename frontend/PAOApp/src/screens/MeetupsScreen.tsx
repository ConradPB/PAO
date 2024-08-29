import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for events and matches
interface Event {
  _id: string;
  title: string;
  description: string;
  date: string; // ISO string format
  recurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly';
}

interface Match {
  _id: string;
  name: string;
  faith: string;
  location: string;
}

// Update the type definition to include a common ID and a union type
type ItemType = { type: 'event' | 'match' } & (Event | Match);

const UpcomingMeetupsScreen: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Function to fetch events from the backend
  const fetchEvents = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await AsyncStorage.getItem('authToken');

      if (!token) {
        Alert.alert('Error', 'You are not logged in. Please log in first.');
        return;
      }

      const response = await axios.get('http://10.0.2.2:7000/api/events', {
        params: {
          page: 1,
          limit: 10
        },
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      setEvents(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch matches from AsyncStorage
  const fetchMatches = async () => {
    try {
      const matchesData = await AsyncStorage.getItem('mealMatches');
      if (matchesData) {
        setMatches(JSON.parse(matchesData));
      }
    } catch (error) {
      console.error('Failed to fetch matches from AsyncStorage', error);
    }
  };

  // Combine events and matches for display
  const combinedData: ItemType[] = [
    ...events.map(event => ({ ...event, type: 'event' as const })),
    ...matches.map(match => ({ ...match, type: 'match' as const }))
  ];

  // Fetch events and matches on component mount
  useEffect(() => {
    fetchEvents();
    fetchMatches();
  }, []);

  // Function to handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    Promise.all([fetchEvents(), fetchMatches()]).finally(() => setRefreshing(false));
  };

  // Type guard function to check if item is an Event
  const isEvent = (item: ItemType): item is Event & { type: 'event' } => item.type === 'event';

  // Type guard function to check if item is a Match
  const isMatch = (item: ItemType): item is Match & { type: 'match' } => item.type === 'match';

  // Render each item (either event or match)
  const renderItem = ({ item }: { item: ItemType }) => {
    if (isEvent(item)) {
      // Render Event item
      return (
        <TouchableOpacity style={styles.eventCard} onPress={() => alert(`Event ID: ${item._id}`)}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDescription}>{item.description}</Text>
          <Text style={styles.eventDate}>{new Date(item.date).toLocaleDateString()}</Text>
          {item.recurring && (
            <Text style={styles.eventRecurring}>
              Recurring: {item.frequency ? item.frequency.charAt(0).toUpperCase() + item.frequency.slice(1) : 'N/A'}
            </Text>
          )}
        </TouchableOpacity>
      );
    } else if (isMatch(item)) {
      // Render Match item
      return (
        <View style={styles.matchCard}>
          <Text style={styles.matchText}>Name: {item.name}</Text>
          <Text style={styles.matchText}>Faith: {item.faith}</Text>
          <Text style={styles.matchText}>Location: {item.location}</Text>
        </View>
      );
    } else {
      // This should never happen, but adding a fallback for safety
      return <Text style={styles.errorText}>Unknown item type</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={combinedData}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={<Text style={styles.emptyText}>No upcoming events or matches found.</Text>}
        />
      )}
    </View>
  );
};

// Define styles for UpcomingMeetupsScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#888',
  },
  eventCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDescription: {
    fontSize: 14,
    color: '#666',
  },
  eventDate: {
    fontSize: 14,
    color: '#888',
  },
  eventRecurring: {
    fontSize: 14,
    color: '#00f',
  },
  matchCard: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#e7e7e7',
    marginBottom: 10,
  },
  matchText: {
    fontSize: 16,
  },
});

export default UpcomingMeetupsScreen;
