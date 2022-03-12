import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from "../screens/WelcomeScreen";
import FriendList from "../screens/FriendList";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name = "Welcome" component  = {WelcomeScreen} options = {{headerShown: false}}/>
        <Stack.Screen name = "Friend" component  = {FriendList} />
        <Stack.Screen name = "Login" component  = {LoginScreen} />
        <Stack.Screen name = "Register" component  = {RegisterScreen} />
    </Stack.Navigator>
);

export default AuthNavigator;