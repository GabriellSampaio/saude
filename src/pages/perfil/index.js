import React, { useState, useCallback } from 'react';
import { 
    View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, 
    Alert, ActivityIndicator, Platform 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import api from '../../services/api';
import Header from '../../components/Header';
import styles from './style';

const PerfilScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dados'); // 'dados' ou 'prontuario'

    // Estados de Edição
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Dados Médicos (carregados do getMedicalRecord)
    const [medicalData, setMedicalData] = useState(null);

    const loadData = async () => {
        setLoading(true);
        try {
            // 1. Busca dados básicos e avatar
            const userDataString = await AsyncStorage.getItem('user_data');
            if (userDataString) {
                const u = JSON.parse(userDataString);
                setUser(u);
                setName(u.name);
                setEmail(u.email);
            }

            // 2. Busca o Prontuário Completo
            const response = await api.get('/user/medical-record');
            setMedicalData(response.data);
            
            // Atualiza dados locais se necessário
            setUser(response.data); 

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { loadData(); }, []));

    const handleAvatarUpload = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled) {
            const formData = new FormData();
            const uri = result.assets[0].uri;
            const type = `image/${uri.split('.').pop()}`;
            const name = `avatar_${Date.now()}.${uri.split('.').pop()}`;

            formData.append('avatar', { uri, name, type });

            try {
                const response = await api.post('/user/avatar', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                // Atualiza a imagem localmente
                const newUser = { ...user, avatar: response.data.avatar_url };
                setUser(newUser);
                await AsyncStorage.setItem('user_data', JSON.stringify(newUser));
                Alert.alert("Sucesso", "Foto de perfil atualizada!");
            } catch (error) {
                Alert.alert("Erro", "Não foi possível enviar a foto.");
            }
        }
    };

    const handleSaveData = async () => {
        const payload = { name, email };
        if (password) {
            if (password !== confirmPassword) {
                Alert.alert("Erro", "As senhas não coincidem.");
                return;
            }
            if (password.length < 8) {
                Alert.alert("Erro", "A senha deve ter no mínimo 8 caracteres.");
                return;
            }
            payload.password = password;
        }

        try {
            const response = await api.put('/user/profile', payload);
            await AsyncStorage.setItem('user_data', JSON.stringify(response.data));
            Alert.alert("Sucesso", "Dados atualizados!");
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            Alert.alert("Erro", "Falha ao atualizar perfil.");
        }
    };

    const renderProntuario = () => (
        <Animatable.View animation="fadeInUp" duration={500} style={styles.tabContent}>
            {/* Cartão Principal de Identificação */}
            <LinearGradient colors={['#e74c3c', '#c0392b']} style={styles.medicalIdCard}>
                <View style={styles.medicalIdHeader}>
                    <Text style={styles.medicalIdLabel}>TIPO SANGUÍNEO</Text>
                    <Text style={styles.medicalIdValue}>{medicalData?.blood_type || 'N/D'}</Text>
                </View>
                <View style={styles.medicalIdRow}>
                    <View>
                        <Text style={styles.medicalIdLabel}>ALTURA</Text>
                        <Text style={styles.medicalIdSubValue}>{medicalData?.altura ? `${medicalData.altura} cm` : '--'}</Text>
                    </View>
                    <View>
                        <Text style={styles.medicalIdLabel}>PESO</Text>
                        <Text style={styles.medicalIdSubValue}>{medicalData?.peso ? `${medicalData.peso} kg` : '--'}</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* Resumo de Alergias */}
            <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>⚠️ Alergias Registradas</Text>
                {medicalData?.allergies?.length > 0 ? (
                    medicalData.allergies.slice(0, 3).map(a => (
                        <View key={a.id} style={styles.listItem}>
                            <Text style={styles.listItemTitle}>{a.name}</Text>
                            <Text style={[styles.listItemBadge, {color: a.severity === 'Grave' ? 'red' : 'orange'}]}>{a.severity}</Text>
                        </View>
                    ))
                ) : <Text style={styles.emptyText}>Nenhuma alergia.</Text>}
            </View>

            {/* Resumo de Vacinas */}
            <View style={styles.sectionCard}>
                <Text style={styles.sectionTitle}>💉 Vacinas Recentes</Text>
                {medicalData?.vaccines?.length > 0 ? (
                    medicalData.vaccines.slice(0, 3).map(v => (
                        <View key={v.id} style={styles.listItem}>
                            <Text style={styles.listItemTitle}>{v.name}</Text>
                            <Text style={styles.listItemSub}>{new Date(v.date).toLocaleDateString('pt-BR')}</Text>
                        </View>
                    ))
                ) : <Text style={styles.emptyText}>Nenhuma vacina.</Text>}
            </View>

            <TouchableOpacity style={styles.pdfButton} onPress={() => Alert.alert("Em Breve", "Funcionalidade de PDF chegando!")}>
                <Text style={styles.pdfButtonText}>📄 Gerar PDF do Prontuário</Text>
            </TouchableOpacity>
        </Animatable.View>
    );

    const renderDados = () => (
        <Animatable.View animation="fadeInUp" duration={500} style={styles.tabContent}>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Nome Completo</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName} />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
            </View>

            <View style={styles.divider} />
            <Text style={styles.sectionHeader}>Alterar Senha</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Nova Senha</Text>
                <TextInput style={styles.input} value={password} onChangeText={setPassword} secureTextEntry placeholder="Deixe em branco para manter" />
            </View>
            <View style={styles.formGroup}>
                <Text style={styles.label}>Confirmar Senha</Text>
                <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry />
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveData}>
                <Text style={styles.saveButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>
        </Animatable.View>
    );

    if (loading) return <SafeAreaView style={styles.loadingArea}><ActivityIndicator size="large" color="#0d214f" /></SafeAreaView>;

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Meu Perfil" navigation={navigation} />
            
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* HERO SECTION */}
                <View style={styles.hero}>
                    <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarUpload}>
                        {user?.avatar ? (
                            <Image 
                                source={{ uri: `${api.defaults.baseURL.replace('/api', '')}/storage/${user.avatar}` }} 
                                style={styles.avatar} 
                            />
                        ) : (
                            <View style={styles.avatarPlaceholder}><Text style={styles.avatarInitials}>{name.charAt(0)}</Text></View>
                        )}
                        <View style={styles.editIconContainer}><Text style={styles.editIcon}>📷</Text></View>
                    </TouchableOpacity>
                    <Text style={styles.heroName}>{user?.name}</Text>
                    <Text style={styles.heroEmail}>{user?.email}</Text>
                </View>

                {/* TABS */}
                <View style={styles.tabsContainer}>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'dados' && styles.activeTab]} 
                        onPress={() => setActiveTab('dados')}
                    >
                        <Text style={[styles.tabText, activeTab === 'dados' && styles.activeTabText]}>MEUS DADOS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'prontuario' && styles.activeTab]} 
                        onPress={() => setActiveTab('prontuario')}
                    >
                        <Text style={[styles.tabText, activeTab === 'prontuario' && styles.activeTabText]}>PRONTUÁRIO</Text>
                    </TouchableOpacity>
                </View>

                {/* CONTEÚDO */}
                {activeTab === 'dados' ? renderDados() : renderProntuario()}

            </ScrollView>
        </SafeAreaView>
    );
};

export default PerfilScreen;