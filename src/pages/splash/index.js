import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- Importação necessária
import styles from './style';

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLogin = async () => {
      // 1. Espera um tempinho para exibir a sua logo/GIF (coloquei 3000ms = 3s)
      await new Promise(resolve => setTimeout(resolve, 3000));

      try {
        // 2. Verifica se existe o token salvo
        const userToken = await AsyncStorage.getItem('user_token');

        if (userToken) {
          // Se tem token, o usuário já logou antes -> Vai para Home
          navigation.replace('Home');
        } else {
          // Se não tem token -> Vai para Login
          navigation.replace('Login');
        }
      } catch (error) {
        // Se der qualquer erro na leitura, manda pro Login por segurança
        navigation.replace('Login');
      }
    };

    checkLogin();
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