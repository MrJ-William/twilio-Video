/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {AppStoreProvider} from './hooks/AppStore';
import AppRootScreen from './screens/AppRootScreen';


const App = () => {

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: 'white',
        },
      }}>
      <AppStoreProvider>
        <AppRootScreen />
      </AppStoreProvider>
    </NavigationContainer>
};
export default App;