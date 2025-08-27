import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async () => {
    const emailTratado = email.trim().toLowerCase();
    const senhaTratada = senha.trim();

    if (!emailTratado || !senhaTratada) {
      Alert.alert("Atenção", "Por favor, preencha o email e a senha.");
      return;
    }

    try {
      const jsonValue = await AsyncStorage.getItem('@user_data');
      
      if (jsonValue != null) {
        const userData = JSON.parse(jsonValue);

        if (userData.email.trim().toLowerCase() === emailTratado && userData.senha.trim() === senhaTratada) {
          
 
          console.log("Login BEM-SUCEDIDO. Navegando DIRETAMENTE para Home...");
          navigation.navigate("Home");
          // --------------------

        } else {
          Alert.alert("Erro", "Email ou senha incorretos.");
        }
      } else {
        Alert.alert("Erro", "Nenhum usuário cadastrado. Por favor, realize o cadastro primeiro.");
      }
    } catch (e) {
      Alert.alert("Erro", "Não foi possível realizar o login.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{backgroundColor: '#FFFFFF'}}>
        <View style={styles.container}>
          
          <TouchableOpacity style={styles.voltarContainer} onPress={() => navigation.goBack()}>
            <View style={styles.voltarCircle}>
              <Text style={styles.voltarText}>←</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.formContainer}>
            <Text style={styles.titulo}>Login</Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder="Seu email"
                placeholderTextColor="#A0A0A0"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>SENHA</Text>
              <TextInput
                style={styles.input}
                placeholder="Sua senha"
                placeholderTextColor="#A0A0A0"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.botao} onPress={handleLogin}>
              <Text style={styles.botaoTexto}>Entrar</Text>
            </TouchableOpacity>

            <View style={styles.cadastroContainer}>
              <Text style={styles.naoPossuiContaText}>não possui conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Cadastro")}>
                <Text style={styles.cadastroLink}>cadastre-se</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
