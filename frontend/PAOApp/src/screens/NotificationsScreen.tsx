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


export default NotificationsScreen;
