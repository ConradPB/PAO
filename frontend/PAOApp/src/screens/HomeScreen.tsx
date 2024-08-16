import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PÃO</Text>
      <Text style={styles.subtitle}>Your hub for meaningful connections.</Text>

      <Button 
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button 
        title="Upcoming Meetups"
        onPress={() => navigation.navigate('Meetups')}
      />
      <Button 
        title="Discover"
        onPress={() => navigation.navigate('Discover')}
      />
      <Button 
        title="Notifications"
        onPress={() => navigation.navigate('Notifications')}
      />
      <Button 
        title="Settings"
        onPress={() => navigation.navigate('SettingsScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666',
  },
});

export default HomeScreen;
