import React, { useEffect } from 'react';
import { View, Image, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';


export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 7500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.fundo}>
        
        <Image
          source={require('../../../assets/Lo.gif')} 
          style={styles.logo}
          
        />

    </View>
  );
}
