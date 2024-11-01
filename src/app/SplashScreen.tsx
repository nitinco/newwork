import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, Animated, Text } from 'react-native';
import { Div } from 'react-native-magnus';
import { useTheme } from '../context/ThemeContext';

const SplashScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const textFadeAnim = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.timing(textFadeAnim, {
        toValue: 1,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 1000,
        delay: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: useTheme().theme === 'DARK' ? 'black' : 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 200,
      height: 200,
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      marginTop: 20,
    },
  });

  return (
    <Div style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Image
          source={require('../../assets/splash.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
      <Animated.View
        style={{
          opacity: textFadeAnim,
          transform: [{ translateY: textTranslateY }],
        }}
      >
        <Text style={styles.welcomeText}>Welcome to Our App</Text>
      </Animated.View>
    </Div>
  );
};



export default SplashScreen;
