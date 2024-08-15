import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const AccountSettingsScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Account Settings</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter your name"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry
      />

      <Text style={styles.label}>Location</Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter your location"
      />

      <Button title="Update" onPress={() => {}} />
    </ScrollView>
  );
};



export default AccountSettingsScreen;
