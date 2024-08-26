import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from 'navigation/types';
import { useNavigation } from '@react-navigation/native';

// Define the type for the navigation prop
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to PÃO</Text>
      <Text style={styles.subtitle}>Your hub for meaningful connections.</Text>

      <Button 
        title="Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <Button 
        title="Create New Event"
        onPress={() => navigation.navigate('CreateEvent')}
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
        onPress={() => navigation.navigate('Settings')}
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
