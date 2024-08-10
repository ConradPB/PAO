import React from 'react';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator'; 
import paologo from '../assets/images/PAOlogo.jpg';

// Define the type for the navigation prop
type WelcomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>(); // Use the defined type

  return (
    <View style={styles.container}>
      <Image source={paologo} style={styles.logo} />
      <Text style={styles.title}>Welcome to PÃO!</Text>
      <Text style={styles.subtitle}>Connect, share, and break bread with others.</Text>
      
      <Button 
        title="Get Started"
        onPress={() => navigation.navigate('Home')} 
      />

      <Button 
        title="Log Out"
        onPress={() => navigation.navigate('Login')} 
        color="#FF6347"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 66,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#555',
  },
});

export default WelcomeScreen;
