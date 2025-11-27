import React, { useState, useCallback, useRef } from 'react';
import { 
    View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView, TextInput, 
    Alert, ActivityIndicator, Modal, Animated
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import api from '../../services/api';
import Header from '../../components/Header';
import styles from './style';

const PerfilScreen = ({ navigation }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('dados');
    const [showSUSCard, setShowSUSCard] = useState(false);

    // Estados de Edição
    const [name, setName] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // Visibilidade de senhas
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Dados Médicos
    const [medicalData, setMedicalData] = useState(null);
    
    // Animações
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const cardFlipAnim = useRef(new Animated.Value(0)).current;

    const loadData = async () => {
        setLoading(true);
        try {
            const userDataString = await AsyncStorage.getItem('user_data');
            if (userDataString) {
                const u = JSON.parse(userDataString);
                setUser(u);
                setName(u.name);
            }

            const response = await api.get('/user/medical-record');
            setMedicalData(response.data);
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
            quality: 0.8,
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
                const newUser = { ...user, avatar: response.data.avatar_url };
                setUser(newUser);
                await AsyncStorage.setItem('user_data', JSON.stringify(newUser));
                
                Animated.sequence([
                    Animated.timing(scaleAnim, { toValue: 1.2, duration: 200, useNativeDriver: true }),
                    Animated.timing(scaleAnim, { toValue: 1, duration: 200, useNativeDriver: true })
                ]).start();
                
                Alert.alert("✨ Perfeito!", "Foto de perfil atualizada com sucesso!");
            } catch (error) {
                Alert.alert("❌ Ops!", "Não foi possível enviar a foto.");
            }
        }
    };

    const handleSaveData = async () => {
        if (!name.trim()) {
            Alert.alert("⚠️ Atenção", "O nome não pode estar vazio.");
            return;
        }

        const payload = { name };
        
        // Se está tentando trocar a senha
        if (password || oldPassword) {
            if (!oldPassword) {
                Alert.alert("🔒 Senha Atual", "Digite sua senha atual para alterar a senha.");
                return;
            }
            if (!password) {
                Alert.alert("🔒 Nova Senha", "Digite a nova senha.");
                return;
            }
            if (password !== confirmPassword) {
                Alert.alert("❌ Erro", "As senhas não coincidem.");
                return;
            }
            if (password.length < 8) {
                Alert.alert("⚠️ Senha Fraca", "A senha deve ter no mínimo 8 caracteres.");
                return;
            }
            payload.old_password = oldPassword;
            payload.password = password;
        }

        try {
            const response = await api.put('/user/profile', payload);
            await AsyncStorage.setItem('user_data', JSON.stringify(response.data));
            Alert.alert("✅ Sucesso!", "Dados atualizados com sucesso!");
            setOldPassword('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            const msg = error.response?.data?.message || "Falha ao atualizar perfil.";
            Alert.alert("❌ Erro", msg);
        }
    };

    const flipCard = () => {
        Animated.spring(cardFlipAnim, {
            toValue: cardFlipAnim._value === 0 ? 1 : 0,
            friction: 8,
            tension: 10,
            useNativeDriver: true,
        }).start();
    };

    const generateSUSPDF = async () => {
        Alert.alert(
            "🎉 Cartão SUS Digital",
            "Seu cartão está pronto para visualização. Em breve você poderá exportar como PDF!",
            [
                { text: "Cancelar", style: "cancel" },
                { text: "Visualizar", onPress: () => setShowSUSCard(true) }
            ]
        );
    };

    const renderSUSCard = () => {
        const frontRotate = cardFlipAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
        });
        
        const backRotate = cardFlipAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['180deg', '360deg']
        });

        return (
            <Modal visible={showSUSCard} transparent animationType="fade" onRequestClose={() => setShowSUSCard(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeModal} onPress={() => setShowSUSCard(false)}>
                            <Ionicons name="close-circle" size={36} color="#FFF" />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Cartão Nacional de Saúde</Text>
                        <Text style={styles.modalSubtitle}>Toque no cartão para virar</Text>

                        <TouchableOpacity onPress={flipCard} activeOpacity={0.9}>
                            {/* FRENTE DO CARTÃO */}
                            <Animated.View style={[styles.susCard, { transform: [{ rotateY: frontRotate }], backfaceVisibility: 'hidden' }]}>
                                <LinearGradient colors={['#1e88e5', '#1565c0', '#0d47a1']} style={styles.susCardGradient}>
                                    <View style={styles.susCardHeader}>
                                      
                                        <Text style={styles.susCardTitle}>CARTÃO NACIONAL DE SAÚDE</Text>
                                    </View>

                                    <View style={styles.susCardBody}>
                                        <View style={styles.susAvatarContainer}>
                                            {user?.avatar ? (
                                                <Image 
                                                    source={{ uri: `${api.defaults.baseURL.replace('/api', '')}/storage/${user.avatar}` }} 
                                                    style={styles.susAvatar} 
                                                />
                                            ) : (
                                                <View style={styles.susAvatarPlaceholder}>
                                                    <Text style={styles.susAvatarInitials}>{name.charAt(0)}</Text>
                                                </View>
                                            )}
                                        </View>

                                        <View style={styles.susInfo}>
                                            <Text style={styles.susLabel}>NOME DO CIDADÃO</Text>
                                            <Text style={styles.susValue}>{user?.name?.toUpperCase()}</Text>

                                            <Text style={[styles.susLabel, {marginTop: 15}]}>Nº DO CARTÃO</Text>
                                            <Text style={styles.susNumber}>123.456.765</Text>
                                        </View>
                                    </View>

                                    <View style={styles.susCardFooter}>
                                        <MaterialCommunityIcons name="shield-check" size={20} color="rgba(255,255,255,0.9)" />
                                        <Text style={styles.susFooterText}>MINISTÉRIO DA SAÚDE</Text>
                                    </View>

                                    {/* Chip decorativo */}
                                    <View style={styles.chipDecoration}>
                                        <View style={styles.chipLines} />
                                    </View>
                                </LinearGradient>
                            </Animated.View>

                            {/* VERSO DO CARTÃO */}
                            <Animated.View style={[styles.susCard, styles.susCardBack, { transform: [{ rotateY: backRotate }] }]}>
                                <LinearGradient colors={['#0d47a1', '#1565c0', '#1e88e5']} style={styles.susCardGradient}>
                                    <View style={styles.susBackStripe} />
                                    
                                    <View style={styles.susBackContent}>
                                        <Text style={styles.susBackTitle}>INFORMAÇÕES MÉDICAS</Text>

                                        <View style={styles.medicalInfo}>
                                            <View style={styles.medicalRow}>
                                                <Ionicons name="water" size={20} color="#e74c3c" />
                                                <Text style={styles.medicalLabel}>Tipo Sanguíneo:</Text>
                                                <Text style={styles.medicalValue}>{medicalData?.blood_type || 'N/D'}</Text>
                                            </View>

                                            <View style={styles.medicalRow}>
                                                <Ionicons name="warning" size={20} color="#f39c12" />
                                                <Text style={styles.medicalLabel}>Alergias:</Text>
                                                <Text style={styles.medicalValue}>
                                                    {medicalData?.allergies?.length > 0 
                                                        ? medicalData.allergies.slice(0, 2).map(a => a.name).join(', ')
                                                        : 'Nenhuma'}
                                                </Text>
                                            </View>

                                            <View style={styles.medicalRow}>
                                                <MaterialCommunityIcons name="needle" size={20} color="#27ae60" />
                                                <Text style={styles.medicalLabel}>Vacinas:</Text>
                                                <Text style={styles.medicalValue}>
                                                    {medicalData?.vaccines?.length || 0} registradas
                                                </Text>
                                            </View>
                                        </View>

                                        <View style={styles.qrCodePlaceholder}>
                                            <MaterialCommunityIcons name="qrcode" size={80} color="rgba(255,255,255,0.3)" />
                                            <Text style={styles.qrText}>QR CODE</Text>
                                        </View>
                                    </View>
                                </LinearGradient>
                            </Animated.View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.downloadButton}>
                            <Feather name="download" size={20} color="#FFF" />
                            <Text style={styles.downloadButtonText}>Baixar PDF</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        );
    };

    const renderProntuario = () => (
        <Animatable.View animation="fadeInUp" duration={500} style={styles.tabContent}>
            {/* Cartão Principal de Identificação */}
            <Animatable.View animation="pulse" iterationCount="infinite" duration={3000}>
                <LinearGradient colors={['#e74c3c', '#c0392b']} style={styles.medicalIdCard}>
                    <View style={styles.medicalIdHeader}>
                        <MaterialCommunityIcons name="water" size={24} color="#FFF" />
                        <View style={{marginLeft: 10}}>
                            <Text style={styles.medicalIdLabel}>TIPO SANGUÍNEO</Text>
                            <Text style={styles.medicalIdValue}>{medicalData?.blood_type || 'N/D'}</Text>
                        </View>
                    </View>
                    <View style={styles.medicalIdRow}>
                        <View style={styles.statBox}>
                            <Ionicons name="resize" size={20} color="rgba(255,255,255,0.9)" />
                            <Text style={styles.medicalIdLabel}>ALTURA</Text>
                            <Text style={styles.medicalIdSubValue}>{medicalData?.altura ? `${medicalData.altura} cm` : '--'}</Text>
                        </View>
                        <View style={styles.statBox}>
                            <MaterialCommunityIcons name="weight-kilogram" size={20} color="rgba(255,255,255,0.9)" />
                            <Text style={styles.medicalIdLabel}>PESO</Text>
                            <Text style={styles.medicalIdSubValue}>{medicalData?.peso ? `${medicalData.peso} kg` : '--'}</Text>
                        </View>
                    </View>

                    <View style={styles.hexPattern}>
                        {[...Array(6)].map((_, i) => (
                            <View key={i} style={[styles.hexagon, {opacity: 0.1, left: i * 40}]} />
                        ))}
                    </View>
                </LinearGradient>
            </Animatable.View>

            {/* Alergias com design melhorado */}
            <Animatable.View animation="fadeInLeft" delay={200} style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                    <Ionicons name="warning" size={24} color="#f39c12" />
                    <Text style={styles.sectionTitle}>Alergias Registradas</Text>
                </View>
                {medicalData?.allergies?.length > 0 ? (
                    medicalData.allergies.slice(0, 3).map((a, index) => (
                        <Animatable.View 
                            key={a.id} 
                            animation="fadeInUp" 
                            delay={index * 100}
                            style={styles.listItem}
                        >
                            <View style={styles.listItemLeft}>
                                <View style={[styles.severityDot, {backgroundColor: a.severity === 'Grave' ? '#e74c3c' : '#f39c12'}]} />
                                <Text style={styles.listItemTitle}>{a.name}</Text>
                            </View>
                            <View style={[styles.severityBadge, {backgroundColor: a.severity === 'Grave' ? '#ffe5e5' : '#fff3e0'}]}>
                                <Text style={[styles.severityText, {color: a.severity === 'Grave' ? '#e74c3c' : '#f39c12'}]}>
                                    {a.severity}
                                </Text>
                            </View>
                        </Animatable.View>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="checkmark-circle" size={48} color="#27ae60" />
                        <Text style={styles.emptyText}>Nenhuma alergia registrada</Text>
                    </View>
                )}
            </Animatable.View>

            {/* Vacinas com design melhorado */}
            <Animatable.View animation="fadeInRight" delay={400} style={styles.sectionCard}>
                <View style={styles.sectionHeader}>
                    <MaterialCommunityIcons name="needle" size={24} color="#27ae60" />
                    <Text style={styles.sectionTitle}>Vacinas Recentes</Text>
                </View>
                {medicalData?.vaccines?.length > 0 ? (
                    medicalData.vaccines.slice(0, 3).map((v, index) => (
                        <Animatable.View 
                            key={v.id} 
                            animation="fadeInUp" 
                            delay={index * 100}
                            style={styles.listItem}
                        >
                            <View style={styles.listItemLeft}>
                                <View style={styles.vaccineDot} />
                                <View>
                                    <Text style={styles.listItemTitle}>{v.name}</Text>
                                    <Text style={styles.listItemSub}>
                                        {new Date(v.date).toLocaleDateString('pt-BR')}
                                    </Text>
                                </View>
                            </View>
                            <Ionicons name="checkmark-circle" size={24} color="#27ae60" />
                        </Animatable.View>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <MaterialCommunityIcons name="needle" size={48} color="#95a5a6" />
                        <Text style={styles.emptyText}>Nenhuma vacina registrada</Text>
                    </View>
                )}
            </Animatable.View>

            <Animatable.View animation="bounceIn" delay={600}>
                <TouchableOpacity style={styles.pdfButton} onPress={generateSUSPDF}>
                    <LinearGradient colors={['#3498db', '#2980b9']} style={styles.pdfButtonGradient}>
                        <MaterialCommunityIcons name="card-account-details" size={24} color="#FFF" />
                        <Text style={styles.pdfButtonText}>Gerar Cartão SUS Digital</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </Animatable.View>
        </Animatable.View>
    );

    const renderDados = () => (
        <Animatable.View animation="fadeInUp" duration={500} style={styles.tabContent}>
            <View style={styles.formCard}>
                <View style={styles.formGroup}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="person" size={18} color="#3498db" />
                        <Text style={styles.label}>Nome Completo</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input} 
                            value={name} 
                            onChangeText={setName}
                            placeholderTextColor="#95a5a6"
                        />
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="mail" size={18} color="#95a5a6" />
                        <Text style={[styles.label, {color: '#95a5a6'}]}>Email (não editável)</Text>
                    </View>
                    <View style={[styles.inputContainer, styles.inputDisabled]}>
                        <TextInput 
                            style={[styles.input, {color: '#95a5a6'}]} 
                            value={user?.email} 
                            editable={false}
                        />
                        <Ionicons name="lock-closed" size={20} color="#95a5a6" />
                    </View>
                </View>
            </View>

            <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>SEGURANÇA</Text>
                <View style={styles.dividerLine} />
            </View>

            <View style={styles.formCard}>
                <View style={styles.formGroup}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="lock-closed" size={18} color="#e74c3c" />
                        <Text style={styles.label}>Senha Atual</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input} 
                            value={oldPassword} 
                            onChangeText={setOldPassword} 
                            secureTextEntry={!showOldPassword}
                            placeholder="Digite sua senha atual"
                            placeholderTextColor="#95a5a6"
                        />
                        <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)}>
                            <Ionicons 
                                name={showOldPassword ? "eye-off" : "eye"} 
                                size={22} 
                                color="#95a5a6" 
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="key" size={18} color="#27ae60" />
                        <Text style={styles.label}>Nova Senha</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input} 
                            value={password} 
                            onChangeText={setPassword} 
                            secureTextEntry={!showPassword}
                            placeholder="Mínimo 8 caracteres"
                            placeholderTextColor="#95a5a6"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons 
                                name={showPassword ? "eye-off" : "eye"} 
                                size={22} 
                                color="#95a5a6" 
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.formGroup}>
                    <View style={styles.labelContainer}>
                        <Ionicons name="shield-checkmark" size={18} color="#3498db" />
                        <Text style={styles.label}>Confirmar Nova Senha</Text>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input} 
                            value={confirmPassword} 
                            onChangeText={setConfirmPassword} 
                            secureTextEntry={!showConfirmPassword}
                            placeholder="Digite novamente"
                            placeholderTextColor="#95a5a6"
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Ionicons 
                                name={showConfirmPassword ? "eye-off" : "eye"} 
                                size={22} 
                                color="#95a5a6" 
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {password.length > 0 && (
                    <Animatable.View animation="fadeIn" style={styles.passwordStrength}>
                        <View style={styles.strengthBar}>
                            <View 
                                style={[
                                    styles.strengthFill, 
                                    {
                                        width: `${Math.min((password.length / 12) * 100, 100)}%`,
                                        backgroundColor: password.length < 8 ? '#e74c3c' : password.length < 10 ? '#f39c12' : '#27ae60'
                                    }
                                ]} 
                            />
                        </View>
                        <Text style={styles.strengthText}>
                            {password.length < 8 ? '⚠️ Senha fraca' : password.length < 10 ? '✓ Senha média' : '✅ Senha forte'}
                        </Text>
                    </Animatable.View>
                )}
            </View>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveData}>
                <LinearGradient colors={['#0d214f', '#1a3a7a']} style={styles.saveButtonGradient}>
                    <Ionicons name="checkmark-circle" size={24} color="#FFF" />
                    <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                </LinearGradient>
            </TouchableOpacity>
        </Animatable.View>
    );

    if (loading) return (
        <SafeAreaView style={styles.loadingArea}>
            <ActivityIndicator size="large" color="#0d214f" />
            <Text style={styles.loadingText}>Carregando...</Text>
        </SafeAreaView>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Meu Perfil" navigation={navigation} />
            
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* HERO SECTION */}
                <Animatable.View animation="fadeIn" style={styles.hero}>
                    <View style={styles.heroBackground}>
                        <View style={styles.floatingCircle1} />
                        <View style={styles.floatingCircle2} />
                    </View>

                    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
                        <TouchableOpacity style={styles.avatarContainer} onPress={handleAvatarUpload}>
                            {user?.avatar ? (
                                <Image 
                                    source={{ uri: `${api.defaults.baseURL.replace('/api', '')}/storage/${user.avatar}` }} 
                                    style={styles.avatar} 
                                />
                            ) : (
                                <LinearGradient colors={['#0d214f', '#1a3a7a']} style={styles.avatarPlaceholder}>
                                    <Text style={styles.avatarInitials}>{name.charAt(0)}</Text>
                                </LinearGradient>
                            )}
                            <View style={styles.editIconContainer}>
                                <LinearGradient colors={['#27ae60', '#229954']} style={styles.editIconGradient}>
                                    <Ionicons name="camera" size={16} color="#FFF" />
                                </LinearGradient>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>

                    <Text style={styles.heroName}>{user?.name}</Text>
                    <View style={styles.heroEmailContainer}>
                        <Ionicons name="mail" size={14} color="#7F8C8D" />
                        <Text style={styles.heroEmail}>{user?.email}</Text>
                    </View>
                </Animatable.View>

                {/* TABS */}
                <Animatable.View animation="fadeInUp" delay={200} style={styles.tabsContainer}>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'dados' && styles.activeTab]} 
                        onPress={() => setActiveTab('dados')}
                        activeOpacity={0.7}
                    >
                        <Ionicons 
                            name="person" 
                            size={20} 
                            color={activeTab === 'dados' ? '#0d214f' : '#95A5A6'} 
                        />
                        <Text style={[styles.tabText, activeTab === 'dados' && styles.activeTabText]}>
                            MEUS DADOS
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.tab, activeTab === 'prontuario' && styles.activeTab]} 
                        onPress={() => setActiveTab('prontuario')}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons 
                            name="file-document" 
                            size={20} 
                            color={activeTab === 'prontuario' ? '#0d214f' : '#95A5A6'} 
                        />
                        <Text style={[styles.tabText, activeTab === 'prontuario' && styles.activeTabText]}>
                            PRONTUÁRIO
                        </Text>
                    </TouchableOpacity>
                </Animatable.View>

                {/* CONTEÚDO */}
                {activeTab === 'dados' ? renderDados() : renderProntuario()}

            </ScrollView>

            {renderSUSCard()}
        </SafeAreaView>
    );
};

export default PerfilScreen;