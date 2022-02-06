import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';
import {tailwind} from '../tailwind';

const CallsScreen = () => {
  return (
    <SafeAreaView style={tailwind('flex-1')}>
      {loading && (
        <View style={tailwind('flex-1 flex justify-center items-center')}>
          <ActivityIndicator size="large" />
        </View>
      )}

      {!loading &&
        (calls.length === 0 ? (
          <View style={tailwind('flex-1 flex justify-center items-center')}>
            <Text>通話記録がありません。</Text>
          </View>
        ) : (
          <FlatList
            data={calls}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            style={tailwind('flex-1')}
          />
        ))}
    </SafeAreaView>
  );
};

export default CallsScreen;
