import { useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';

export const useRotationAnimation = () => {
  const rotation = useRef(new Animated.Value(0)).current;
  const [isRotated, setIsRotated] = useState(false);

  const rotateIcon = () => {
    const toValue = isRotated ? 0 : 1;
    Animated.timing(rotation, {
      toValue,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
    setIsRotated(!isRotated);
  };

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return { rotateIcon, rotate, isRotated };
};
