import React, {useState} from 'react';
import {
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  TextInput,
} from 'react-native';
import {tailwind} from '../tailwind';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type KeyboardType = 'default' | 'email-address' | 'visible-password';
type Props = {
  title: string;
  placeholder: string;
  value: string;
  keyboardType: KeyboardType;
  onChangeText: (text: string) => void;
};

const CustomInput: React.FC<Props> = ({
  title,
  value,
  placeholder,
  keyboardType,
  onChangeText,
}) => {
  const [isHidePassword, setHidePassword] = useState(true);

  return (
    <View style={tailwind('p-4')}>
      <TouchableHighlight>
        <Text style={tailwind('text-gray-900 font-medium')}>{title}</Text>
      </TouchableHighlight>
      <View
        style={tailwind(
          'bg-gray-200 mt-2 rounded-lg flex-row justify-between',
        )}>
        <TextInput
          style={tailwind('p-4 flex-1')}
          placeholder={placeholder}
          value={value}
          keyboardType={
            keyboardType == 'email-address' ? 'email-address' : 'default'
          }
          secureTextEntry={
            keyboardType === 'visible-password' && isHidePassword
          }
          onChangeText={onChangeText}
        />
        {keyboardType === 'visible-password' && (
          <TouchableOpacity
            style={tailwind('p-4')}
            onPress={() => {
              setHidePassword(!isHidePassword);
            }}>
            <MaterialCommunityIcons
              style={tailwind('')}
              name={isHidePassword ? 'eye-off' : 'eye'}
              size={22}
              color={'#87999A'}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;
