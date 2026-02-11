import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

export const FadeInView = (props: any) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ ...props.style, opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
      {props.children}
    </Animated.View>
  );
};