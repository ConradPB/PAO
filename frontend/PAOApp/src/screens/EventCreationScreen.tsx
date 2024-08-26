import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const CreateEventScreen: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(''); // Consider using a date picker here
  const [recurring, setRecurring] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'monthly' | undefined>(undefined);

  const handleCreateEvent = async () => {
    if (!title || !description || !date) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }

    try {
      const response = await axios.post('/api/events/create', {
        title,
        description,
        date,
        recurring,
        frequency
      }, {
        withCredentials: true,  // Include credentials if needed
      });

      Alert.alert('Success', 'Event created successfully!');
      // Clear the form fields
      setTitle('');
      setDescription('');
      setDate('');
      setRecurring(false);
      setFrequency(undefined);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create event.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Event</Text>
      <TextInput
        style={styles.input}
        placeholder="Event Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Event Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Event Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <View style={styles.switchContainer}>
        <Text>Recurring Event?</Text>
        <Button title={recurring ? 'Yes' : 'No'} onPress={() => setRecurring(!recurring)} />
      </View>
      {recurring && (
        <View style={styles.frequencyContainer}>
          <Text>Select Frequency:</Text>
          <Button title="Daily" onPress={() => setFrequency('daily')} />
          <Button title="Weekly" onPress={() => setFrequency('weekly')} />
          <Button title="Monthly" onPress={() => setFrequency('monthly')} />
        </View>
      )}
      <Button title="Create Event" onPress={handleCreateEvent} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  frequencyContainer: {
    marginBottom: 15,
  },
});

export default CreateEventScreen;
