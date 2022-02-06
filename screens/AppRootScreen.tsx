/*
 * ゲストキー画面
 */
import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {AppStore} from '../hooks/AppStore';
import {storage} from '../storages/Storage';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';

import LoginScreen from '../screens/LoginRootScreen';
import HomeScreen from '../screens/HomeScreen';
import CallsScreen from '../screens/CallsScreen';
import SettingsScreen from '../screens/SettingsRootScreen';

import CustomToast from '../components/CustomToast';

const Tab = createBottomTabNavigator();

const AppRootScreen = () => {
  //
  const {state} = useContext(AppStore);
  return (
    <>
      {state.hasUserAuth ? (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#128AB2',
            tabBarInactiveTintColor: '#87999A',
          }}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerTitle: 'ホーム',
              tabBarLabel: 'ホーム',
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <MaterialCommunityIcons
                    name={'home'}
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="CallRegister"
            component={CallsScreen}
            options={{
              headerTitle: '通話記録',
              tabBarLabel: '通話記録',
              tabBarIcon: ({focused, color, size}) => {
                return (
                  <MaterialIcons
                    name={'phone-callback'}
                    size={size}
                    color={color}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              headerShown: false,
              tabBarLabel: '設定',
              tabBarIcon: ({focused, color, size}) => {
                return <Octicons name={'gear'} size={size} color={color} />;
              },
            }}
          />
        </Tab.Navigator>
      ) : (
        <LoginScreen />
      )}
      {state.toast && (
        <CustomToast type={state.toast.code} title={state.toast.message} />
      )}
    </>
  );
};

export default AppRootScreen;
