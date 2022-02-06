import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {tailwind} from '../tailwind';

type Props = {
  title: string;
  disabled?: boolean;
  onPress: () => void;
};

const CustomButton = ({title, disabled, onPress}: Props) => {
  return (
    <TouchableOpacity
      style={{
        ...tailwind(
          `${
            disabled ? 'bg-gray-200 text-white' : 'bg-blue text-white shadow'
          }`,
        ),
        ...tailwind(`items-center justify-center rounded-lg m-4 py-4`),
      }}
      onPress={() => onPress()}
      disabled={disabled ? true : false}>
      <Text style={tailwind('text-base font-semibold text-white')}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
