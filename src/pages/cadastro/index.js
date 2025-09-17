import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, SafeAreaView } from "react-native";
import axios from 'axios';
import styles from './style';

const API_URL = 'http://10.67.5.83:8000/api/users';

export default function Cadastro({ navigation }) {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    nome: "",
    email: "",
    senha: "",
    cep: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
  });

  const [loadingCep, setLoadingCep] = useState(false);
  const [cepError, setCepError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleCepBlur = async () => {
    const cep = userData.cep.replace(/\D/g, '');
    if (cep.length !== 8) {
      setCepError("CEP inválido. Deve conter 8 dígitos.");
      setUserData({ ...userData, logradouro: "", bairro: "", cidade: "", uf: "" });
      return;
    }

    setLoadingCep(true);
    setCepError("");

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setCepError("CEP não encontrado.");
        setUserData({ ...userData, logradouro: "", bairro: "", cidade: "", uf: "" });
      } else {
        setUserData({
          ...userData,
          logradouro: response.data.logradouro,
          bairro: response.data.bairro,
          cidade: response.data.localidade,
          uf: response.data.uf,
        });
      }
    } catch (error) {
      setCepError("Erro ao buscar o CEP. Verifique sua conexão.");
    } finally {
      setLoadingCep(false);
    }
  };

  const handleRegister = async () => {
    for (const key in userData) {
      if (key !== 'numero' && !userData[key]) {
        Alert.alert("Erro", "Por favor, preencha todos os campos.");
        return;
      }
    }

    setIsRegistering(true);

    const apiPayload = {
      name: userData.nome,
      email: userData.email,
      password: userData.senha,
      cep: userData.cep,
      logradouro: userData.logradouro,
      numero: userData.numero,
      bairro: userData.bairro,
      cidade: userData.cidade,
      uf: userData.uf,
    };

    try {
      await axios.post(`${API_URL}/users`, apiPayload, {
        headers: {
          'Accept': 'application/json',
        }
      });

      Alert.alert("Sucesso!", "Cadastro realizado com sucesso!");
      navigation.navigate("Login");

    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        let errorMessage = 'Corrija os seguintes erros:\n';
        for (const key in errors) {
          errorMessage += `- ${errors[key][0]}\n`;
        }
        Alert.alert('Erro de Validação', errorMessage);
      } else {
        console.error('Erro ao cadastrar:', error);
        Alert.alert('Erro no Cadastro', 'Não foi possível realizar o cadastro. Verifique sua conexão e tente novamente.');
      }
    } finally {
      setIsRegistering(false);
    }
  };

  const nextStep = () => {
    if (!userData.nome || !userData.email || !userData.senha) {
      Alert.alert("Atenção", "Preencha seus dados pessoais primeiro.");
      return;
    }
    setStep(2);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} style={{ backgroundColor: '#FFFFFF' }}>
        <View style={styles.container}>

          <TouchableOpacity style={styles.voltarContainer} onPress={() => step === 1 ? navigation.goBack() : setStep(1)}>
            <View style={styles.voltarCircle}>
              <Text style={styles.voltarText}>←Voltar</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.formContainer}>
            <Text style={styles.titulo}>Cadastre-se</Text>

            {step === 1 ? (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>NOME</Text>
                  <TextInput style={styles.input} placeholder="Nome Completo" placeholderTextColor="#ffffffff" value={userData.nome} onChangeText={(text) => handleChange('nome', text)} />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>EMAIL</Text>
                  <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#ffffffff" value={userData.email} onChangeText={(text) => handleChange('email', text)} keyboardType="email-address" autoCapitalize="none" />
                </View>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>SENHA</Text>
                  <TextInput style={styles.input} placeholder="Senha" placeholderTextColor="#ffffffff" value={userData.senha} onChangeText={(text) => handleChange('senha', text)} secureTextEntry />
                </View>
                <TouchableOpacity style={styles.botao} onPress={nextStep}>
                  <Text style={styles.botaoTexto}>CONTINUAR</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.inputGroup}><Text style={styles.label}>CEP</Text><TextInput style={styles.input} placeholder="CEP" value={userData.cep} onChangeText={(text) => handleChange('cep', text)} keyboardType="numeric" onBlur={handleCepBlur} maxLength={9} />{loadingCep && <ActivityIndicator size="small" color="#fff" style={{ marginTop: 5 }} />}{cepError ? <Text style={styles.errorText}>{cepError}</Text> : null}</View>
                <View style={styles.inputGroup}><Text style={styles.label}>RUA</Text><TextInput style={styles.input} placeholder="Rua / Logradouro" value={userData.logradouro} onChangeText={(text) => handleChange('logradouro', text)} /></View>
                <View style={styles.inputGroup}><Text style={styles.label}>NÚMERO</Text><TextInput style={styles.input} placeholder="Número" value={userData.numero} onChangeText={(text) => handleChange('numero', text)} keyboardType="numeric" /></View>
                <View style={styles.inputGroup}><Text style={styles.label}>BAIRRO</Text><TextInput style={styles.input} placeholder="Bairro" value={userData.bairro} onChangeText={(text) => handleChange('bairro', text)} /></View>
                <View style={styles.inputGroup}><Text style={styles.label}>CIDADE</Text><TextInput style={styles.input} placeholder="Cidade" value={userData.cidade} onChangeText={(text) => handleChange('cidade', text)} /></View>
                <View style={styles.inputGroup}><Text style={styles.label}>UF</Text><TextInput style={styles.input} placeholder="UF" value={userData.uf} onChangeText={(text) => handleChange('uf', text)} maxLength={2} autoCapitalize="characters" /></View>

                <TouchableOpacity style={styles.botao} onPress={handleRegister} disabled={isRegistering}>
                  {isRegistering ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.botaoTexto}>Finalizar Cadastro</Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            <View style={styles.loginContainer}>
              <Text style={styles.possuiContaText}>ja possui conta?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}