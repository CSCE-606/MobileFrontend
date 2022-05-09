import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WelcomeScreen from "../screens/WelcomeScreen";
import FriendList from "../screens/FriendList";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import Notification from "../api/Notification";
import AddFriend from "../screens/AddFriend";
import Profile from '../screens/ProfileScreen';
import FallDetector from '../screens/FallDetector';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Map from "../screens/Map";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function Home() {
    return (
      <Tab.Navigator       screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Friend') {
            iconName = focused
              ? 'person-outline'
              : 'person-outline';
          } else if (route.name === 'Map'){
            iconName = focused ? 'earth-outline' : 'earth-outline'
          } else if (route.name === 'Profile'){
            iconName = focused ? 'people-circle-outline' : 'people-circle-outline'
          } else if (route.name === 'Add Friend'){
            iconName = focused ? 'person-add-outline' : 'person-add-outline'
          }  else if (route.name === 'Fall Detect'){
            iconName = focused ? 'pulse-outline' : 'pulse-outline'
          } 

            
          

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
        <Tab.Screen name = "Friend" component={FriendList} options={{headerShown: false} }/>        
        <Tab.Screen name = "Add Friend" component={AddFriend} options={{headerShown: false } }/>
        <Tab.Screen name = "Profile" component={Profile} options={{headerShown: false } }/>
        <Tab.Screen name = "Map" component  = {Map} options={{headerShown: false }}/>
        <Tab.Screen name = "Fall Detect" component  = {FallDetector} options={{headerShown: false }}/>
      </Tab.Navigator>
    );
  }

const AuthNavigator = () => (
    <Stack.Navigator>
       
        <Stack.Screen name = "Welcome" component  = {WelcomeScreen} options = {{headerShown: false}}/>
        <Stack.Screen name = "Profile" component  = {Profile} />
        <Stack.Screen name = "Friend" component  = {FriendList} />
        <Stack.Screen name = "Login" component  = {LoginScreen} />
        <Tab.Screen
          name="Home"
          component={Home}
          options={{headerShown: false } }
        />
        <Stack.Screen name = "Register" component  = {RegisterScreen} />
        <Stack.Screen name = "Notification" component  = {Notification} />
        <Stack.Screen name = "AddFriend" component  = {AddFriend} />
    </Stack.Navigator>
);

export default AuthNavigator;