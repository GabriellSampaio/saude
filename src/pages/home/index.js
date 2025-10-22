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
    { label: 'SINTOMAS', icon: require('../../../assets/sintomas.png'), onPress: () => console.log('Sintomas Pressionado') },
    { label: 'EXAMES', icon: require('../../../assets/exame.png'), screen: 'Exames' },
    { label: 'VACINAS', icon: require('../../../assets/vacina.png'), onPress: () => console.log('Vacinas Pressionado') },
    { label: 'FRUTAS', icon: require('../../../assets/fruta.png'), onPress: () => console.log('Frutas Pressionado') },
    { label: 'PRESSÃO', icon: require('../../../assets/pressao.png'), onPress: () => console.log('Pressão Pressionado') },
    { label: 'GLICEMIA', icon: require('../../../assets/glicemia.png'), onPress: () => console.log('Glicemia Pressionado') },
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
                console.log("Usuário carregado:", user);
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
            const response = await api.put(`/users/${userData.id}`, {
                name: userData.name,
                email: userData.email,
            });

            console.log("Perfil atualizado:", response.data);

            await AsyncStorage.setItem('user_data', JSON.stringify(response.data));
            loadUserData();
            setProfileModalVisible(false);
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
                            await api.delete(`/users/${userData.id}`);
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
                ListFooterComponent={
                    <Animatable.View animation="fadeInUp" duration={800} delay={500}>
                        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                            <Text style={styles.logoutButtonText}>Deslogar</Text>
                        </TouchableOpacity>
                    </Animatable.View>
                }
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={isProfileModalVisible}
                onRequestClose={() => setProfileModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Meu Perfil</Text>

                        <ScrollView style={{ width: '100%' }}>
                            <View style={{ alignItems: 'center' }}>
                                <Text style={styles.modalLabel}>Nome Completo</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={userData?.name ?? ""}
                                    onChangeText={(text) => setUserData({ ...userData, name: text })}
                                />

                                <Text style={styles.modalLabel}>Email</Text>
                                <TextInput
                                    style={styles.modalInput}
                                    value={userData?.email ?? ""}
                                    onChangeText={(text) => setUserData({ ...userData, email: text })}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </ScrollView>

                        <TouchableOpacity style={styles.modalButtonSave} onPress={handleUpdateProfile}>
                            <Text style={styles.modalButtonText}>Salvar Alterações</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modalButtonClose} onPress={() => setProfileModalVisible(false)}>
                            <Text style={styles.modalButtonCloseText}>Fechar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.deleteAccountButton} onPress={handleDeleteProfile}>
                            <Text style={styles.deleteAccountButtonText}>Desativar minha conta</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default Home;
