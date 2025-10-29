import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert, ActivityIndicator, ScrollView, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import Header from '../../components/Header';
import styles from './style';

const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const SangueScreen = ({ navigation }) => {
    const [userData, setUserData] = useState(null);
    const [selectedBloodType, setSelectedBloodType] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadUserData = async () => {
        setIsLoading(true);
        try {
            const userDataString = await AsyncStorage.getItem('user_data');
            if (userDataString) {
                const user = JSON.parse(userDataString);
                setUserData(user);
                setSelectedBloodType(user.blood_type);
            }
        } catch (error) {
            console.error("Erro ao carregar dados do usuário:", error);
            Alert.alert("Erro", "Não foi possível carregar seus dados.");
        } finally {
            setIsLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadUserData();
        }, [])
    );

    const handleSelectBloodType = (type) => {
        setSelectedBloodType(type);
    };

    const handleSave = async () => {
        setIsLoading(true);
        try {
            const response = await api.put('/user/profile', {
                name: userData.name,
                email: userData.email,
                altura: userData.altura,
                peso: userData.peso,
                blood_type: selectedBloodType,
            });
            await AsyncStorage.setItem('user_data', JSON.stringify(response.data));
            setUserData(response.data);
            Alert.alert("Sucesso", "Tipo sanguíneo salvo com sucesso!");
        } catch (error) {
            console.error("Erro ao salvar tipo sanguíneo:", error.response?.data || error);
            Alert.alert("Erro", "Não foi possível salvar o tipo sanguíneo.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                 <Header title="Tipo Sanguíneo" navigation={navigation} />
                 <View style={styles.loadingContainer}>
                     <ActivityIndicator size="large" color="#c0392b"/>
                 </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Tipo Sanguíneo" navigation={navigation} />
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <View style={styles.content}>

                    <View style={styles.bloodBagContainer}>
                        <View style={styles.bloodBag}>
                            <View style={styles.bloodBagTop}></View>
                            <Text style={styles.bloodTypeText}>{selectedBloodType || '?'}</Text>
                        </View>
                    </View>

                    <Text style={styles.infoText}>Selecione seu tipo sanguíneo:</Text>

                    <View style={styles.buttonGrid}>
                        {BLOOD_TYPES.map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.bloodTypeButton,
                                    selectedBloodType === type && styles.selectedButton
                                ]}
                                onPress={() => handleSelectBloodType(type)}
                            >
                                <Text style={[
                                    styles.bloodTypeButtonText,
                                    selectedBloodType === type && styles.selectedButtonText
                                ]}>
                                    {type}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity 
                        style={[styles.saveButton, !selectedBloodType && styles.saveButtonDisabled]} 
                        onPress={handleSave}
                        disabled={!selectedBloodType || isLoading}
                    >
                        <Text style={styles.saveButtonText}>Salvar Tipo Sanguíneo</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SangueScreen;