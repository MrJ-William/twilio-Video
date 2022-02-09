import React, {useContext} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {tailwind} from '../tailwind';

const HomeScreen = () => {
  return (
    <SafeAreaView style={tailwind('flex-1')}>
      <View
        style={tailwind(
          'absolute pt-20 top-0 left-0 right-0 flex justify-center items-center',
        )}>
        <Text style={tailwind('text-2xl font-medium pb-2 text-gray-700')}>
          ビデオ通話
        </Text>
        <Text style={tailwind('font-medium text-gray-700')}>
          通話を発信する
        </Text>
      </View>
      <View style={tailwind('flex-1 flex justify-center items-center')}>
        <TouchableOpacity style={tailwind('py-6 ')} onPress={() => {}}>
          <View
            style={tailwind(
              'p-8 border rounded-full w-48 h-48 border-gray-200 flex items-center justify-center',
            )}>
            <Icon name="lock" size={80} style={tailwind('text-gray-400')} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
