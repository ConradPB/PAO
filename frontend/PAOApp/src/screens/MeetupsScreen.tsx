import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const MeetupsScreen = () => {
  // Sample data for meetups (this can be fetched from a backend API later)
  const meetups = [
    { id: '1', title: 'Dinner with Faith', date: '2024-08-10' },
    { id: '2', title: 'Sunday Brunch', date: '2024-08-12' },
    { id: '3', title: 'Interfaith Dialogue', date: '2024-08-15' },
  ];

  // Render each meetup item
  const renderMeetupItem = ({ item }: { item: any }) => (
    <View style={styles.meetupItem}>
      <Text style={styles.meetupTitle}>{item.title}</Text>
      <Text style={styles.meetupDate}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Meetups</Text>
      <FlatList 
        data={meetups}
        renderItem={renderMeetupItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};



export default MeetupsScreen;