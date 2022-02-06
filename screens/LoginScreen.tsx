/*
 * ログイン画面
 */

import React, {useContext, useEffect} from 'react';
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

const LoginScreen = ({navigation}) => {
  //ログイン認証用State
  const {state, dispatch} = useContext(AppStore);
  //バリデート関連用State
  const [store, dispatch_store] = useLoginReducer();

  //アクセストークンの更新のタイミングで画面遷移

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

  const fetchData = async (email: string, password: string) => {
    try {
      //login 処理
      //匿名ログイン処理
    } catch (error) {
      //通信失敗時の処理
      console.log('ログイン失敗:', error);

      //失敗
      //2.存在するアカウントでなければアラート
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
            ログイン
          </Text>
          <View style={tailwind('')}>
            <CustomInput
              title="メールアドレス"
              placeholder="your_address@example.com"
              value={store.user?.email ?? ''}
              keyboardType={'email-address'}
              onChangeText={text => {
                dispatch_store({
                  type: 'CHANGE_VALUE',
                  data: {
                    email: text,
                    password: store.user?.password ?? '',
                  },
                });
              }}
            />
          </View>
          <View style={tailwind('mb-2')}>
            <CustomInput
              title="パスワード"
              placeholder="小文字・大文字・数字を含めた8桁"
              //?? typescript
              value={store.user?.password ?? ''}
              keyboardType={'visible-password'}
              onChangeText={text => {
                dispatch_store({
                  type: 'CHANGE_VALUE',
                  data: {
                    password: text,
                    email: store.user?.email ?? '',
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
            disabled={store.user?.email && store.user?.password ? false : true}
            onPress={() => {
              const email = store.user?.email ?? '';
              const password = store.user?.password ?? '';
              //   fetchData(email, password);
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
