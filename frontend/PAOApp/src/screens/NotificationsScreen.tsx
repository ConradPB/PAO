import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const NotificationsScreen = () => {
  // Sample data for notifications 

  const notifications = [
    { id: '1', title: 'New Meetup Available', description: 'A new meetup on modern spirituality is available.' },
    { id: '2', title: 'Reminder: Dinner Tomorrow', description: 'Don\'t forget about your dinner tomorrow at 7 PM.' },
    { id: '3', title: 'Profile Updated', description: 'Your profile has been successfully updated.' },
  ];

  // Render each notification item
  const renderNotificationItem = ({ item }: { item: any }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList 
        data={notifications}
        renderItem={renderNotificationItem}
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
  notificationItem: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    borderRadius: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  notificationDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default NotificationsScreen;
