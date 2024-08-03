import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/LoginScreen';
import SignUpScreen from 'screens/SignUpScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
