// src/routers/Navigation.js
import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../components/AuthContext';

import LoginScreen from '../views/LoginScreen';
import RegisterScreen from '../views/RegisterScreen';
import HomeScreen from '../views/HomeScreen';
import AddExpenseScreen from '../views/AddExpenseScreen';
import ScanReceiptScreen from '../views/ScanReceiptScreen';
import ExpenseListScreen from '../views/ExpenseListScreen';
import SettingsScreen from '../views/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
      tabBarLabel: 'Home',
      tabBarIcon: ({ color, size }) => (
        <Ionicons name="home" size={size} color={color} />
      ),
    }} />
      <Tab.Screen name="Add" component={AddExpenseScreen} />
      <Tab.Screen name="Scanner" component={ScanReceiptScreen} />
      <Tab.Screen name="List" component={ExpenseListScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const { user, booted } = useContext(AuthContext);

  if (!booted) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
        />
      </Stack.Navigator>
    );
  }

  // If user is logged in, show MainTabs, else show Auth stack
  return user ? (
    <MainTabs />
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>);
}
