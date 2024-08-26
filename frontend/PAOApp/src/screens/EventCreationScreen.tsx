import React, { useState } from 'react';
import { View, Text, TextInput, Button, Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

const EventCreationScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState('daily'); // Default frequency

  const handleCreateEvent = async () => {
    try {
      const response = await axios.post('/api/events', {
        title,
        description,
        date,
        recurring,
        frequency,
      });

      if (response.status === 201) {
        alert('Event created successfully!');
      } else {
        alert('Failed to create event.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the event.');
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

      <Button title="Create Event" onPress={handleCreateEvent} />
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
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default EventCreationScreen;
