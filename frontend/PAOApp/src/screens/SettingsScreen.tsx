import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types'; 

const SettingsScreen = () => {
  // Typed useNavigation hook
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.option}
        onPress={() => navigation.navigate('AccountSettings')}
      >
        <Text style={styles.optionText}>Account Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.option}
        onPress={() => navigation.navigate('PrivacySettings')}
      >
        <Text style={styles.optionText}>Privacy Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.option}
        onPress={() => navigation.navigate('NotificationSettings')}
      >
        <Text style={styles.optionText}>Notification Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.option}
        onPress={() => navigation.navigate('LanguageRegionSettings')}
      >
        <Text style={styles.optionText}>Language and Region Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  optionText: {
    fontSize: 18,
  },
});

export default SettingsScreen;
