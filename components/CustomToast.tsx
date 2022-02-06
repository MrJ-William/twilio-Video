import React, {useContext, useRef, useEffect} from 'react';
import {Animated, Easing, View, Text} from 'react-native';
import {tailwind} from '../tailwind';
import {AppStore} from '../hooks/AppStore';

type ToastType = 'info' | 'fail' | 'none';

type Props = {
  type: ToastType;
  title: string;
};

const CustomToast: React.FC<Props> = ({type, title}) => {
  const {dispatch} = useContext(AppStore);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const interPolateOpacity = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
  });

  const interPolateTopPosition = animatedValue.interpolate({
    inputRange: [0, 150],
    outputRange: [-20, 0],
  });

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 150,
      easing: Easing.ease,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(animatedValue, {
          toValue: 0,
          easing: Easing.ease,
          duration: 300,
          useNativeDriver: true,
        }).start(({finished}) => {
          dispatch({type: 'DISSMISS_TOAST'});
        });
      }, 2500);
    });
  }, []);

  return (
    <Animated.View
      style={{
        ...tailwind('px-4 absolute w-full top-20'),
        ...{
          opacity: interPolateOpacity,
          transform: [{translateY: interPolateTopPosition}],
        },
      }}>
      <View
        style={tailwind(
          `${
            type === 'info'
              ? 'border-blue-400 bg-blue-100'
              : 'border-red-400 bg-red-100'
          } border items-center justify-center rounded-lg p-4 shadow`,
        )}>
        <Text style={tailwind('text-sm text-gray-600')}>{title}</Text>
      </View>
    </Animated.View>
  );
};

export default CustomToast;
