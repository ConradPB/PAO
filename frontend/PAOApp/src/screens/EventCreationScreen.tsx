import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const CreateEventScreen: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState<string | null>(null);

  const handleFrequencySelect = (selectedFrequency: string) => {
    setFrequency(selectedFrequency);
  };

  const handleSubmit = async () => {
    if (!title || !description || !date) {
      Alert.alert('Please fill out all fields');
      return;
    }

    try {
      const response = await axios.post('http://10.0.2.2:7000/api/events', {
        title,
        description,
        date,
        recurring,
        frequency,
      });

      if (response.status === 201) {
        Alert.alert('Event created successfully');
        setTitle('');
        setDescription('');
        setDate('');
        setRecurring(false);
        setFrequency(null);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error creating event');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter event title"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter event description"
      />

      <Text style={styles.label}>Date</Text>
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Enter event date"
      />

      <View style={styles.frequencyContainer}>
        <Text style={styles.label}>Recurring Event?</Text>
        <TouchableOpacity onPress={() => setRecurring(!recurring)}>
          <Text style={styles.buttonText}>{recurring ? 'Yes' : 'No'}</Text>
        </TouchableOpacity>
      </View>

      {recurring && (
        <View style={styles.frequencyButtons}>
          <TouchableOpacity
            style={[styles.frequencyButton, frequency === 'daily' && styles.selectedButton]}
            onPress={() => handleFrequencySelect('daily')}
          >
            <Text style={styles.buttonText}>Daily</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.frequencyButton, frequency === 'weekly' && styles.selectedButton]}
            onPress={() => handleFrequencySelect('weekly')}
          >
            <Text style={styles.buttonText}>Weekly</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.frequencyButton, frequency === 'monthly' && styles.selectedButton]}
            onPress={() => handleFrequencySelect('monthly')}
          >
            <Text style={styles.buttonText}>Monthly</Text>
          </TouchableOpacity>
        </View>
      )}

      <Button title="Create Event" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  frequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  frequencyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  frequencyButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: '#007BFF',
  },
  buttonText: {
    color: '#fff',
  },
});

export default CreateEventScreen;
