import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, SafeAreaView, ScrollView, Image, ActivityIndicator } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api';
import styles from './style';

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !senha) {
            Alert.alert("Atenção", "Por favor, preencha o email e a senha.");
            return;
        }

        setIsLoading(true);

        const credentials = {
            email: email.trim().toLowerCase(),
            password: senha.trim(),
        };

        try {
            const response = await api.post('/login', credentials);

            const userToken = response.data.access_token;
            const user = response.data.user;

            if (userToken) {
                await AsyncStorage.setItem('user_token', userToken);
                await AsyncStorage.setItem('user_data', JSON.stringify(user));
                
                navigation.navigate("Home");
            } else {
                Alert.alert("Erro de Login", "A resposta da API não continha um token.");
            }

        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 422)) {
                Alert.alert("Erro de Login", "Email ou senha incorretos.");
            } else {
                console.error("Erro ao fazer login:", error);
                Alert.alert("Erro", "Não foi possível realizar o login. Verifique se o servidor local (artisan serve) está rodando.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ backgroundColor: '#FFFFFF' }}>
                <View style={styles.container}>
                    <View style={styles.imgContainer}> 
                        <View style={styles.imgCircle}>
                            <Image source={require('../../../assets/logo.png')} style={styles.logo} />
                        </View>
                    </View>
                    <View style={styles.formContainer}>
                        <Text style={styles.titulo}>Login</Text>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>EMAIL</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Seu email"
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
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry
                            />
                        </View>
                        
                        <TouchableOpacity style={styles.botao} onPress={handleLogin} disabled={isLoading}>
                            {isLoading ? (
                                <ActivityIndicator color="#FFFFFF" />
                            ) : (
                                <Text style={styles.botaoTexto}>Entrar</Text>
                            )}
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