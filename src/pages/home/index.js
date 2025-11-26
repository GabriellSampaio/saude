import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, Pressable, Image, FlatList, Alert, TouchableOpacity, Modal, TextInput, ScrollView } from 'react-native';
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
    const [isEditMode, setEditMode] = useState(false);

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

    useEffect(() => {
        loadUserData();
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

    const handleUpdateProfile = async () => {
        if (!userData?.name || !userData?.email) {
            Alert.alert("Erro", "Nome e email não podem ser vazios.");
            return;
        }

        try {
            const response = await api.put(`/user/profile`, {
                name: userData.name,
                email: userData.email,
            });

            await AsyncStorage.setItem('user_data', JSON.stringify(response.data));
            loadUserData();
            setEditMode(false);
            Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
        } catch (error) {
            console.error("Erro ao atualizar perfil:", error.response?.data || error);
            Alert.alert("Erro", "Não foi possível atualizar o perfil.");
        }
    };

    const handleDeleteProfile = () => {
        Alert.alert(
            "Desativar Conta",
            "Você tem certeza? Esta ação fará o logout e inativará sua conta.",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sim, desativar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await api.delete(`/user/profile`);
                            await AsyncStorage.clear();
                            navigation.replace('Login');
                        } catch (error) {
                            console.error("Erro ao excluir conta:", error);
                            Alert.alert("Erro", "Não foi possível desativar a conta.");
                        }
                    }
                }
            ]
        );
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
                    <TouchableOpacity onPress={() => setProfileModalVisible(true)} style={styles.menuButton}>
                        <View style={styles.menuBar} />
                        <View style={styles.menuBar} />
                        <View style={styles.menuBar} />
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

            <Modal
                animationType="none"
                transparent={true}
                visible={isProfileModalVisible}
                onRequestClose={() => {
                    setProfileModalVisible(false);
                    setEditMode(false);
                }}
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => {
                        setProfileModalVisible(false);
                        setEditMode(false);
                    }}
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
                                    onPress={() => {
                                        setProfileModalVisible(false);
                                        setEditMode(false);
                                    }}
                                >
                                    <Text style={styles.closeButtonText}>✕</Text>
                                </TouchableOpacity>

                                <View style={styles.profileSection}>
                                    <View style={styles.avatarContainer}>
                                        <Text style={styles.avatarText}>
                                            {getInitials(userData?.name)}
                                        </Text>
                                    </View>
                                    <Text style={styles.profileName}>{userData?.name || 'Usuário'}</Text>
                                    <Text style={styles.profileLocation}>{userData?.email || ''}</Text>
                                </View>
                            </View>
                            {!isEditMode ? (
                                <View style={styles.menuSection}>
                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        onPress={() => {
                                            setEditMode(true);
                                        }}
                                    >
                                        <Text style={styles.menuIcon}>👤</Text>
                                        <Text style={styles.menuText}>MEU PERFIL</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.menuItem}
                                        onPress={handleLogout}
                                    >
                                        <Text style={styles.menuIcon}>🚪</Text>
                                        <Text style={styles.menuText}>SAIR</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.menuItem, styles.menuItemDanger]}
                                        onPress={handleDeleteProfile}
                                    >
                                        <Text style={styles.menuIcon}>⚠️</Text>
                                        <Text style={[styles.menuText, styles.menuTextDanger]}>DESATIVAR CONTA</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <ScrollView style={styles.editSection} showsVerticalScrollIndicator={false}>
                                    <Text style={styles.editTitle}>Editar Perfil</Text>

                                    <Text style={styles.inputLabel}>Nome Completo</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={userData?.name ?? ""}
                                        onChangeText={(text) => setUserData({ ...userData, name: text })}
                                        placeholder="Digite seu nome"
                                        placeholderTextColor="#7a8599"
                                    />

                                    <Text style={styles.inputLabel}>Email</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={userData?.email ?? ""}
                                        onChangeText={(text) => setUserData({ ...userData, email: text })}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        placeholder="Digite seu email"
                                        placeholderTextColor="#7a8599"
                                    />

                                    <TouchableOpacity
                                        style={styles.saveButton}
                                        onPress={handleUpdateProfile}
                                    >
                                        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={styles.cancelButton}
                                        onPress={() => {
                                            setEditMode(false);
                                            loadUserData();
                                        }}
                                    >
                                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            )}
                        </LinearGradient>
                    </Animatable.View>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView >
    );
};
export default Home;