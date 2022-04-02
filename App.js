import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './app/navigation/AuthNavigator';
import route from './app/navigation/routes';
import {f, auth, database} from './app/config/config.js';


export default function App(){
  return(
    <NavigationContainer>
      <AuthNavigator/>
    </NavigationContainer>
  );
}
