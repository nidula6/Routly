import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, FONTS, SIZES } from '../constants/theme';

// Auth screens
import WelcomeScreen from '../screens/auth/WelcomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RoleSelectionScreen from '../screens/auth/RoleSelectionScreen';

// Home screens
import SenderDashboard from '../screens/home/SenderDashboard';
import DriverDashboard from '../screens/home/DriverDashboard';

// Flow screens
import CourierBookingScreen from '../screens/flows/CourierBookingScreen';
import DirectionalBookingScreen from '../screens/flows/DirectionalBookingScreen';
import RoutePlanningScreen from '../screens/flows/RoutePlanningScreen';
import PickupVerificationScreen from '../screens/flows/PickupVerificationScreen';
import DeliveryConfirmationScreen from '../screens/flows/DeliveryConfirmationScreen';
import PaymentScreen from '../screens/flows/PaymentScreen';
import RatingScreen from '../screens/flows/RatingScreen';

// Other screens
import TrackOrderScreen from '../screens/TrackOrderScreen';
import OrdersScreen from '../screens/OrdersScreen';
import EarningsScreen from '../screens/EarningsScreen';
import ProcessFlowScreen from '../screens/ProcessFlowScreen';
import FlowDetailScreen from '../screens/FlowDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const SenderTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Orders') iconName = focused ? 'cube' : 'cube-outline';
        else if (route.name === 'Track') iconName = focused ? 'location' : 'location-outline';
        else if (route.name === 'Flows') iconName = focused ? 'git-network' : 'git-network-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.gray500,
      tabBarStyle: {
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.gray100,
        paddingBottom: 6,
        paddingTop: 6,
        height: 60,
      },
      tabBarLabelStyle: { fontSize: 11, ...FONTS.medium },
    })}
  >
    <Tab.Screen name="Home" component={SenderDashboard} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
    <Tab.Screen name="Track" component={TrackOrderScreen} />
    <Tab.Screen name="Flows" component={ProcessFlowScreen} />
  </Tab.Navigator>
);

const DriverTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
        else if (route.name === 'Route') iconName = focused ? 'map' : 'map-outline';
        else if (route.name === 'Earnings') iconName = focused ? 'cash' : 'cash-outline';
        else if (route.name === 'Flows') iconName = focused ? 'git-network' : 'git-network-outline';
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: COLORS.secondary,
      tabBarInactiveTintColor: COLORS.gray500,
      tabBarStyle: {
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.gray100,
        paddingBottom: 6,
        paddingTop: 6,
        height: 60,
      },
      tabBarLabelStyle: { fontSize: 11, ...FONTS.medium },
    })}
  >
    <Tab.Screen name="Home" component={DriverDashboard} />
    <Tab.Screen name="Route" component={RoutePlanningScreen} />
    <Tab.Screen name="Earnings" component={EarningsScreen} />
    <Tab.Screen name="Flows" component={ProcessFlowScreen} />
  </Tab.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth Stack */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />

        {/* Main Tabs */}
        <Stack.Screen name="SenderTabs" component={SenderTabs} />
        <Stack.Screen name="DriverTabs" component={DriverTabs} />

        {/* Flow Screens (accessible from both roles) */}
        <Stack.Screen name="CourierBooking" component={CourierBookingScreen} />
        <Stack.Screen name="DirectionalBooking" component={DirectionalBookingScreen} />
        <Stack.Screen name="RoutePlanning" component={RoutePlanningScreen} />
        <Stack.Screen name="PickupVerification" component={PickupVerificationScreen} />
        <Stack.Screen name="DeliveryConfirmation" component={DeliveryConfirmationScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Rating" component={RatingScreen} />

        {/* Utility Screens */}
        <Stack.Screen name="TrackOrder" component={TrackOrderScreen} />
        <Stack.Screen name="AllOrders" component={OrdersScreen} />
        <Stack.Screen name="DriverEarnings" component={EarningsScreen} />
        <Stack.Screen name="ProcessFlow" component={ProcessFlowScreen} />
        <Stack.Screen name="FlowDetail" component={FlowDetailScreen} />

        {/* Dashboard access shortcuts */}
        <Stack.Screen name="SenderDashboard" component={SenderDashboard} />
        <Stack.Screen name="DriverDashboard" component={DriverDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
