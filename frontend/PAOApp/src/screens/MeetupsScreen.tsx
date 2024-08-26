import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string; // ISO string format
  recurring: boolean;
  frequency?: 'daily' | 'weekly' | 'monthly';
}

const UpcomingMeetupsScreen: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
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

  // Fetch events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  // Function to handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchEvents().finally(() => setRefreshing(false));
  };

  // Render each event item
  const renderItem = ({ item }: { item: Event }) => (
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

  // Main render function
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Meetups</Text>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={<Text style={styles.emptyText}>No upcoming meetups.</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  eventCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  eventDescription: {
    marginTop: 6,
    fontSize: 14,
    color: '#6c757d',
  },
  eventDate: {
    marginTop: 8,
    fontSize: 14,
    color: '#495057',
  },
  eventRecurring: {
    marginTop: 8,
    fontSize: 12,
    color: '#28a745',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6c757d',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UpcomingMeetupsScreen;
