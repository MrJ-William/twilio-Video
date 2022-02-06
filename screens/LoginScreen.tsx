/*
 * ログイン画面
 */

import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {AppStore} from '../hooks/AppStore';
import useLoginReducer from '../hooks/LoginReducer';
import storage from '../storages/Storage';
import {tailwind} from '../tailwind';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  //ログイン認証用State
  const {state, dispatch} = useContext(AppStore);
  //バリデート関連用State
  const [store, dispatch_store] = useLoginReducer();

  //   // Set an initializing state whilst Firebase connects
  //   const [initializing, setInitializing] = useState(true);
  //   const [user, setUser] = useState();

  //   // Handle user state changes
  //   function onAuthStateChanged(user) {
  //     setUser(user);
  //     if (initializing) setInitializing(false);
  //   }

  //   useEffect(() => {
  //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //     return subscriber; // unsubscribe on unmount
  //   }, []);

  //   if (initializing) return null;

  const loadStorage = async () => {
    try {
      // react-native-storageにデータを格納
      const appData = await storage.load({key: 'appData'});
      console.log('アプリケーションデータ :', appData);

      if (appData) {
        dispatch({
          type: 'SUCCESS_AUTHENTICATION',
          payload: {
            auth: appData.auth,
            user: appData.user,
          },
        });
      }
    } catch (error) {
      console.log('データベースには保存されていません :', error);
    }
  };

  useEffect(() => {
    if (!state.auth) {
      loadStorage();
    }
  }, []);

  //login function
  const fetchData = (password: string) => {
    try {
      //firebase signInAnonymously
      auth()
        .signInAnonymously()
        .then(() => {
          console.log('User signed in anonymously');
        })
        .catch(error => {
          if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.');
          }

          console.error(error);
        });
    } catch (error) {
      console.log('ログイン失敗:', error);
      dispatch({
        type: 'FAIL_AUTHENTICATION',
        payload: {
          code: 'fail',
          message: 'ログイン情報が間違っています。',
        },
      });
    }
  };

  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <ScrollView scrollEnabled={false}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={tailwind('text-lg font-bold text-center mt-8 mb-16')}>
            サインイン
          </Text>
          {/* 匿名ログイン */}
          <View style={tailwind('mb-2')}>
            <CustomInput
              title="パスワード"
              placeholder="小文字・大文字・数字を含めた8桁"
              value={store.user?.password ?? ''}
              keyboardType={'visible-password'}
              onChangeText={text => {
                dispatch_store({
                  type: 'CHANGE_VALUE',
                  data: {
                    password: text,
                  },
                });
              }}
            />
          </View>

          <TouchableOpacity
            style={tailwind('py-6')}
            onPress={() => {
              navigation.navigate('ForgetScreen');
            }}>
            <Text style={tailwind('text-sm text-blue text-center')}>
              パスワードを忘れた方はこちら
            </Text>
          </TouchableOpacity>

          <CustomButton
            title="ログイン"
            disabled={store.user?.password ? false : true}
            onPress={() => {
              const password = store.user?.password ?? '';
              fetchData(password);
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
