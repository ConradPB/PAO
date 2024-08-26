import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EventCreationScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState('daily'); // Default frequency
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateEvent = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      
      if (!token) {
        Alert.alert('Error', 'You are not logged in. Please log in first.');
        return;
      }

      setIsLoading(true);

      const response = await axios.post(
        'http://10.0.2.2:7000/api/events',
        {
          title,
          description,
          date,
          recurring,
          frequency,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      if (response.status === 201) {
        Alert.alert('Success', 'Event created successfully!');
        // Optionally reset form fields or navigate to another screen
        setTitle('');
        setDescription('');
        setDate('');
        setRecurring(false);
        setFrequency('daily');
      } else {
        Alert.alert('Error', 'Failed to create event.');
      }
    } catch (error) {
      console.error('Error creating event:', error);
      Alert.alert('Error', 'An error occurred while creating the event.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter event title"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter event description"
        multiline
      />

      <Text style={styles.label}>Date:</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Enter event date"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Recurring:</Text>
        <Switch
          value={recurring}
          onValueChange={setRecurring}
          thumbColor={recurring ? '#f5dd4b' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
        />
      </View>

      {recurring && (
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Frequency:</Text>
          <Picker
            selectedValue={frequency}
            style={styles.picker}
            onValueChange={(itemValue) => setFrequency(itemValue)}
          >
            <Picker.Item label="Daily" value="daily" />
            <Picker.Item label="Weekly" value="weekly" />
            <Picker.Item label="Monthly" value="monthly" />
          </Picker>
        </View>
      )}

      <Button title={isLoading ? 'Creating...' : 'Create Event'} onPress={handleCreateEvent} disabled={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 4,
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  pickerContainer: {
    marginBottom: 12,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default EventCreationScreen;
