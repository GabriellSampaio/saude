import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable, Image, FlatList, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import styles from './style';

const icons = {
    defaultIcon: require('../../../assets/sangue.png'),
};

const servicos = [
    { label: 'Sangue', icon: icons.defaultIcon, onPress: () => console.log('Sangue Pressionado') },
    { label: 'Água', icon: icons.defaultIcon, screen: 'Agua' },
    { label: 'Remédios', icon: icons.defaultIcon, screen: 'Remedios' },
    { label: 'Alergias', icon: icons.defaultIcon, screen: 'Alergias' },
    { label: 'Sintomas', icon: icons.defaultIcon, onPress: () => console.log('Sintomas Pressionado') },
    { label: 'Exames', icon: icons.defaultIcon, screen: 'Exames' },
    { label: 'Vacinas', icon: icons.defaultIcon, onPress: () => console.log('Vacinas Pressionado') },
    { label: 'Meditação', icon: icons.defaultIcon, onPress: () => console.log('Meditação Pressionado') },
    { label: 'Frutas', icon: icons.defaultIcon, onPress: () => console.log('Frutas Pressionado') },
    { label: 'Dicas', icon: icons.defaultIcon, onPress: () => console.log('Dicas Pressionado') },
    { label: 'Emergência', icon: icons.defaultIcon, onPress: () => console.log('Emergência Pressionado') },
    { label: 'Pressão', icon: icons.defaultIcon, onPress: () => console.log('Pressão Pressionado') },
    { label: 'Glicemia', icon: icons.defaultIcon, onPress: () => console.log('Glicemia Pressionado') },
    { label: 'Dica do Dia', icon: icons.defaultIcon, onPress: () => console.log('Dica do Dia Pressionado') },
];

const ServiceButton = ({ icon, label, onPress, index }) => (
    <Animatable.View
        animation="zoomIn"
        duration={500}
        delay={index * 100}
        style={styles.serviceButtonContainer}
    >
        <Pressable
            style={({ pressed }) => [
                styles.serviceButton,
                pressed && styles.serviceButtonPressed
            ]}
            onPress={onPress}
        >
            {icon && <Image source={icon} style={styles.serviceIcon} />}
            <Text style={styles.serviceLabel}>{label}</Text>
        </Pressable>
    </Animatable.View>
);

const Home = ({ navigation }) => {
    const [userName, setUserName] = useState('');
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const loadUserData = async () => {
            const userDataString = await AsyncStorage.getItem('user_data');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                setUserName(userData.name.split(' ')[0]);
            }
        };

        const getGreetingMessage = () => {
            const hour = new Date().getHours();
            if (hour < 12) return 'Bom dia';
            if (hour < 18) return 'Boa tarde';
            return 'Boa noite';
        };

        loadUserData();
        setGreeting(getGreetingMessage());
    }, []);
    
    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user_token');
            await AsyncStorage.removeItem('user_data');
            navigation.replace('Login'); 
        } catch (e) {
            Alert.alert("Erro", "Não foi possível fazer o logout.");
        }
    };

    const handlePress = (servico) => {
        if (servico.screen) {
            navigation.navigate(servico.screen);
        } else if (servico.onPress) {
            servico.onPress();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#0d214f', '#2a5a8a']}
                style={styles.header}
            >
                <Text style={styles.greetingText}>{greeting},</Text>
                <Text style={styles.userNameText}>{userName}</Text>
            </LinearGradient>

            <FlatList
                data={servicos}
                renderItem={({ item, index }) => (
                    <ServiceButton
                        icon={item.icon}
                        label={item.label}
                        onPress={() => handlePress(item)}
                        index={index}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
                contentContainerStyle={styles.gridContainer}
                ListFooterComponent={
                    <Animatable.View animation="fadeInUp" duration={800} delay={500}>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Deslogar</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                }
            />
        </SafeAreaView>
    );
}

export default Home;