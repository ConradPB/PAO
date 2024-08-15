import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const DiscoverScreen = () => {
  // Sample data for discovery (this can be fetched from a backend API later)
  const discoverItems = [
    { id: '1', title: 'Faith and Food Festival', description: 'Explore different cuisines while discussing spirituality.' },
    { id: '2', title: 'Spiritual Music Night', description: 'Join us for an evening of uplifting music and discussions.' },
    { id: '3', title: 'Cultural Exchange Dinner', description: 'Share your culture and learn about others.' },
  ];

  // Render each discovery item
  const renderDiscoverItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.discoverItem}>
      <Text style={styles.discoverTitle}>{item.title}</Text>
      <Text style={styles.discoverDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Discover</Text>
      <FlatList 
        data={discoverItems}
        renderItem={renderDiscoverItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  discoverItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 10,
  },
  discoverTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  discoverDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default DiscoverScreen;
