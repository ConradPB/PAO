import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import axios from 'axios';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string; // Using string because it will be received as ISO string from the backend
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
      const response = await axios.get('/api/events', {
        params: {
          page: 1,
          limit: 10
        },
        withCredentials: true,  // Include credentials if needed
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
    </TouchableOpacity>
  );

  // Main render function
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upcoming Meetups</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  eventCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDescription: {
    marginTop: 4,
    fontSize: 14,
    color: '#6c757d',
  },
  eventDate: {
    marginTop: 8,
    fontSize: 12,
    color: '#007bff',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#6c757d',
  },
});

export default UpcomingMeetupsScreen;
