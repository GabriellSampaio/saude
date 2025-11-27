import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable, Image, FlatList, Alert, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import api from '../../services/api';
import styles from './style';

const servicos = [
    { label: 'SANGUE', icon: require('../../../assets/sangue.png'), screen: 'Sangue' },
    { label: 'ÁGUA', icon: require('../../../assets/agua.png'), screen: 'Agua' },
    { label: 'REMÉDIOS', icon: require('../../../assets/remedio.png'), screen: 'Remedios' },
    { label: 'ALERGIAS', icon: require('../../../assets/alergia.png'), screen: 'Alergias' },
    { label: 'SINTOMAS', icon: require('../../../assets/sintomas.png'), screen: 'Sintomas' },
    { label: 'EXAMES', icon: require('../../../assets/exame.png'), screen: 'Exames' },
    { label: 'VACINAS', icon: require('../../../assets/vacina.png'), screen: 'Vacinas' },
    { label: 'GLICEMIA', icon: require('../../../assets/glicemia.png'), screen: 'Glicemia' },
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
    const [userData, setUserData] = useState(null);
    const [greeting, setGreeting] = useState('');
    const [isProfileModalVisible, setProfileModalVisible] = useState(false);

    const loadUserData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('user_data');
            if (userDataString) {
                const user = JSON.parse(userDataString);
                setUserData(user);
                const greetingMsg = getGreetingMessage(user.name);
                setGreeting(greetingMsg);
            }
        } catch (error) {
            console.error("Erro ao carregar usuário:", error);
        }
    };

    const getGreetingMessage = (name = '') => {
        const hour = new Date().getHours();
        const firstName = name.split(' ')[0];
        if (hour < 12) return `Bom dia, ${firstName}`;
        if (hour < 18) return `Boa tarde, ${firstName}`;
        return `Boa noite, ${firstName}`;
    };

    // Recarrega os dados sempre que a tela ganhar foco (para atualizar avatar/nome se mudar no perfil)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            loadUserData();
        });
        return unsubscribe;
    }, [navigation]);

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

    const getInitials = (name) => {
        if (!name) return '?';
        const names = name.trim().split(' ');
        if (names.length === 1) return names[0].charAt(0).toUpperCase();
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient colors={['#0d214f', '#2a5a8a']} style={styles.header}>
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.greetingText}>{greeting || "Olá"}</Text>
                    </View>
                    
                    {/* Botão Avatar/Menu */}
                    <TouchableOpacity onPress={() => setProfileModalVisible(true)} style={styles.profileButton}>
                        {userData?.avatar ? (
                            <Image 
                                source={{ uri: `${api.defaults.baseURL.replace('/api', '')}/storage/${userData.avatar}` }} 
                                style={styles.headerAvatar} 
                            />
                        ) : (
                            <View style={styles.headerAvatarPlaceholder}>
                                <Text style={styles.headerAvatarText}>
                                    {getInitials(userData?.name)}
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
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
            />

            {/* Modal Lateral (Drawer) */}
            <Modal
                animationType="none"
                transparent={true}
                visible={isProfileModalVisible}
                onRequestClose={() => setProfileModalVisible(false)}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setProfileModalVisible(false)}
                >
                    <Animatable.View
                        animation="slideInRight"
                        duration={300}
                        style={styles.drawerContainer}
                    >
                        <LinearGradient
                            colors={['#0d214f', '#2a5a8a']} 
                            style={styles.drawerGradient}
                        >
                            <View style={styles.drawerHeader}>
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setProfileModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>✕</Text>
                                </TouchableOpacity>

                                <View style={styles.profileSection}>
                                    <View style={styles.avatarContainer}>
                                        {userData?.avatar ? (
                                            <Image 
                                                source={{ uri: `${api.defaults.baseURL.replace('/api', '')}/storage/${userData.avatar}` }} 
                                                style={styles.drawerAvatar} 
                                            />
                                        ) : (
                                            <Text style={styles.avatarText}>
                                                {getInitials(userData?.name)}
                                            </Text>
                                        )}
                                    </View>
                                    <Text style={styles.profileName}>{userData?.name || 'Usuário'}</Text>
                                    <Text style={styles.profileLocation}>{userData?.email || ''}</Text>
                                </View>
                            </View>

                            <View style={styles.menuSection}>
                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={() => {
                                        setProfileModalVisible(false);
                                        navigation.navigate('Perfil'); // <-- Navega para a tela Perfil
                                    }}
                                >
                                    <Text style={styles.menuIcon}>👤</Text>
                                    <Text style={styles.menuText}>MEU PERFIL / PRONTUÁRIO</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.menuItem}
                                    onPress={handleLogout}
                                >
                                    <Text style={styles.menuIcon}>🚪</Text>
                                    <Text style={styles.menuText}>SAIR</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </Animatable.View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView >
    );
};
export default Home;