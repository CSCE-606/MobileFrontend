import React from 'react';
<<<<<<< HEAD

import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import route from './app/navigation/routes';

export default function App(){
  return(
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
  )
=======
import FriendList from './app/screens/friendlist';
import MessagesScreen from './app/screens/MessagesScreen';

export default function App(){
  return <MessagesScreen/>;
>>>>>>> 7c29fda91b1d7391a5f13e123adfd64d2eccc688
}
