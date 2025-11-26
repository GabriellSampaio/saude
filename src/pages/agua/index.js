import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ScrollView, Animated, Keyboard, ActivityIndicator, FlatList, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import * as Notifications from 'expo-notifications'; // Importação necessária
import api from '../../services/api';
import Header from '../../components/Header';
import styles from './style';

// Configuração para exibir notificação com o app aberto
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

// Opções de tempo para o lembrete
const REMINDER_OPTIONS = [
    { label: '⏱️ 1 segundos (Teste)', seconds: 1 },
    { label: '15 minutos', seconds: 15 * 60 },
    { label: '30 minutos', seconds: 30 * 60 },
    { label: '1 hora', seconds: 60 * 60 },
    { label: '2 horas', seconds: 120 * 60 },
];

const AguaScreen = ({ navigation }) => {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [metaDiaria, setMetaDiaria] = useState(0);
    const [aguaConsumida, setAguaConsumida] = useState(0);
    const [metaBatidaHoje, setMetaBatidaHoje] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [userData, setUserData] = useState(null);
    const [isEditingConsumo, setIsEditingConsumo] = useState(false);
    const [editedConsumo, setEditedConsumo] = useState('0');
    const [historicalData, setHistoricalData] = useState([]);

    // Estado para controlar o Modal de Lembrete
    const [reminderModalVisible, setReminderModalVisible] = useState(false);

    const waterLevel = useRef(new Animated.Value(0)).current;
    const waveAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Pede permissão para notificações ao abrir a tela
    useEffect(() => {
        const getPermissions = async () => {
            const { status } = await Notifications.getPermissionsAsync();
            if (status !== 'granted') {
                await Notifications.requestPermissionsAsync();
            }
        };
        getPermissions();
    }, []);

    const loadInitialData = async () => {
        setLoadingData(true);
        try {
            const userDataString = await AsyncStorage.getItem('user_data');
            if (userDataString) {
                const user = JSON.parse(userDataString);
                setUserData(user);
                setPeso(user.peso ? String(user.peso) : '');
                setAltura(user.altura ? String(user.altura) : '');
            }

            const intakeResponse = await api.get('/water-intake/today');
            const intakeData = intakeResponse.data;
            setAguaConsumida(intakeData.amount_consumed || 0);
            setMetaDiaria(intakeData.daily_goal || 0);
            setMetaBatidaHoje((intakeData.amount_consumed >= intakeData.daily_goal) && intakeData.daily_goal > 0);

            const historyResponse = await api.get('/water-intake/history');
            setHistoricalData(historyResponse.data);

        } catch (error) {
            console.error("Erro ao carregar dados:", error.response || error);
            Alert.alert("Erro", "Não foi possível carregar os dados de hidratação.");
        } finally {
            setLoadingData(false);
        }
    };

    useFocusEffect(useCallback(() => { loadInitialData(); }, []));

    useEffect(() => {
        const progress = metaDiaria > 0 ? aguaConsumida / metaDiaria : 0;
        
        Animated.timing(waterLevel, {
            toValue: progress > 1 ? 1 : progress,
            duration: 1000,
            useNativeDriver: false, 
        }).start();

        Animated.loop(
            Animated.sequence([
                Animated.timing(waveAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(waveAnim, {
                    toValue: 0,
                    duration: 2000,
                    useNativeDriver: true,
                })
            ])
        ).start();

    }, [aguaConsumida, metaDiaria]);

    const handleSalvarPesoAlturaECalcularMeta = async () => {
        const pesoValido = peso && parseFloat(peso.replace(',', '.')) > 0;
        const alturaValida = altura && parseInt(altura) > 0;

        if (!pesoValido || !alturaValida) {
            Alert.alert("Atenção", "Por favor, insira peso e altura válidos.");
            return;
        }

        const pesoFloat = parseFloat(peso.replace(',', '.'));
        const alturaInt = parseInt(altura);
        const metaCalculada = Math.round(pesoFloat * 35);

        Keyboard.dismiss();
        setLoadingData(true); 

        try {
            const profileUpdateResponse = await api.put('/user/profile', {
                name: userData.name, 
                email: userData.email, 
                peso: pesoFloat,
                altura: alturaInt,
            });
            
            await AsyncStorage.setItem('user_data', JSON.stringify(profileUpdateResponse.data));
            setUserData(profileUpdateResponse.data); 
            
            await api.put('/water-intake/today', {
                amount_consumed: aguaConsumida, 
                daily_goal: metaCalculada, 
            });

            setMetaDiaria(metaCalculada); 
            Alert.alert("Sucesso!", `Dados salvos e meta diária recalculada para ${metaCalculada} ml.`);

        } catch (error) {
            console.error("Erro ao salvar peso/altura ou meta:", error.response || error);
            Alert.alert("Erro", "Não foi possível salvar os dados ou calcular a meta.");
        } finally {
             setLoadingData(false);
        }
    };

    const updateConsumoNaAPI = async (novoConsumo, isReset = false) => {
         const consumoFinal = Math.max(0, novoConsumo); 
         try {
             const response = await api.put('/water-intake/today', { amount_consumed: consumoFinal });
             setAguaConsumida(response.data.amount_consumed);
             setMetaDiaria(response.data.daily_goal); 
             setMetaBatidaHoje((response.data.amount_consumed >= response.data.daily_goal) && response.data.daily_goal > 0);
             if (!isReset) {
                Alert.alert("Sucesso", "Consumo atualizado!");
             }
             loadInitialData(); 
         } catch(error) {
              console.error("Erro ao atualizar consumo:", error.response || error);
              Alert.alert("Erro", "Não foi possível salvar o consumo de água.");
              loadInitialData(); 
         }
    };

    const adicionarAgua = (mililitros) => {
        const novoConsumo = aguaConsumida + mililitros;
        setAguaConsumida(novoConsumo); 
        updateConsumoNaAPI(novoConsumo); 

        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.1,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            })
        ]).start();

        if (novoConsumo >= metaDiaria && !metaBatidaHoje && metaDiaria > 0) {
            Alert.alert("Parabéns!", "Você atingiu sua meta de hidratação de hoje! 🎉");
            setMetaBatidaHoje(true); 
        }
    };

    const handleResetContagem = () => {
        Alert.alert(
            "Zerar Contagem",
            "Tem certeza que deseja zerar a quantidade de água consumida hoje?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sim, zerar",
                    onPress: () => {
                        setAguaConsumida(0);
                        setMetaBatidaHoje(false);
                        updateConsumoNaAPI(0, true); 
                    },
                    style: "destructive"
                }
            ]
        );
    };

    // Função que agenda a notificação com base no tempo escolhido
    const handleScheduleReminder = async (seconds) => {
        setReminderModalVisible(false);
        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "💧 Hora de beber água!",
                    body: "Mantenha-se hidratado para atingir sua meta diária.",
                    sound: true,
                },
                trigger: { seconds: seconds },
            });
            Alert.alert("Lembrete Agendado", "Você será notificado em breve!");
        } catch (error) {
            Alert.alert("Erro", "Não foi possível agendar a notificação.");
        }
    };

    const toggleEditConsumo = () => {
        if (!isEditingConsumo) {
            setEditedConsumo(String(aguaConsumida));
        }
        setIsEditingConsumo(!isEditingConsumo);
    };

    const saveEditedConsumo = () => {
        const novoConsumoInt = parseInt(editedConsumo);
        if (!isNaN(novoConsumoInt) && novoConsumoInt >= 0) {
            setIsEditingConsumo(false);
            updateConsumoNaAPI(novoConsumoInt);
        } else {
            Alert.alert("Erro", "Por favor, insira um valor numérico válido.");
        }
    };
    
    const animatedHeight = waterLevel.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const waveTranslate = waveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -10],
    });
    
    const metaRestante = metaDiaria - aguaConsumida > 0 ? metaDiaria - aguaConsumida : 0;
    const porcentagem = metaDiaria > 0 ? Math.min(100, Math.round((aguaConsumida / metaDiaria) * 100)) : 0;

    const renderHistoryItem = ({ item }) => {
        const dataFormatada = new Date(item.date + 'T00:00:00').toLocaleDateString('pt-BR');
        const atingiuMeta = item.amount_consumed >= item.daily_goal && item.daily_goal > 0;
        const progresso = item.daily_goal > 0 ? Math.min(100, (item.amount_consumed / item.daily_goal) * 100) : 0;
        
        return (
            <View style={styles.historyItem}>
                <View style={styles.historyLeft}>
                    <Text style={styles.historyDate}>{dataFormatada}</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBarFill, { width: `${progresso}%` }]} />
                    </View>
                </View>
                <View style={styles.historyRight}>
                    <Text style={styles.historyConsumed}>{item.amount_consumed}</Text>
                    <Text style={styles.historyGoalSmall}>/{item.daily_goal || '0'}ml</Text>
                    {atingiuMeta && <Text style={styles.historyCheck}>✓</Text>}
                </View>
            </View>
        );
    };

    if (loadingData) {
        return (
            <SafeAreaView style={styles.safeArea}>
                 <Header title="Hidratação Diária" navigation={navigation} />
                 <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                     <ActivityIndicator size="large" color="#4A90E2"/>
                 </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Hidratação Diária" navigation={navigation} />
            
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
                <View style={styles.content}>
                    
                    {/* Card de Informações Pessoais */}
                    <View style={styles.infoCard}>
                        <Text style={styles.cardTitle}>📊 Suas Informações</Text>
                        <View style={styles.inputRow}>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Peso (kg)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="70"
                                    placeholderTextColor="#B0BEC5"
                                    keyboardType="numeric"
                                    value={peso}
                                    onChangeText={setPeso}
                                />
                            </View>
                            <View style={styles.inputWrapper}>
                                <Text style={styles.inputLabel}>Altura (cm)</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="170"
                                    placeholderTextColor="#B0BEC5"
                                    keyboardType="numeric"
                                    value={altura}
                                    onChangeText={setAltura}
                                />
                            </View>
                        </View>
                        <TouchableOpacity style={styles.calculateButton} onPress={handleSalvarPesoAlturaECalcularMeta}>
                            <Text style={styles.calculateButtonText}>💧 Calcular Minha Meta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Garrafa de Água Animada */}
                    <View style={styles.bottleContainer}>
                        <Animated.View 
                            style={[
                                styles.bottleWrapper,
                                { transform: [{ scale: scaleAnim }] }
                            ]}
                        >
                            <View style={styles.bottleCapTop} />
                            <View style={styles.bottleCapNeck} />
                            <View style={styles.bottle}>
                                <Animated.View 
                                    style={[
                                        styles.waterFill, 
                                        { height: animatedHeight }
                                    ]} 
                                >
                                    <Animated.View
                                        style={[
                                            styles.waveEffect,
                                            { transform: [{ translateY: waveTranslate }] }
                                        ]}
                                    />
                                </Animated.View>
                                <View style={styles.bottleOverlay}>
                                    <Text style={styles.percentageText}>{porcentagem}%</Text>
                                </View>
                            </View>
                        </Animated.View>

                        <View style={styles.consumptionInfo}>
                            {isEditingConsumo ? (
                                <View style={styles.editContainer}>
                                    <TextInput
                                        style={styles.editInput}
                                        value={editedConsumo}
                                        onChangeText={setEditedConsumo}
                                        keyboardType="numeric"
                                        autoFocus={true}
                                    />
                                    <Text style={styles.mlText}>ml</Text>
                                    <TouchableOpacity onPress={saveEditedConsumo} style={styles.editSaveButton}>
                                        <Text style={styles.editButtonText}>✓</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={toggleEditConsumo} style={styles.editCancelButton}>
                                        <Text style={styles.editButtonText}>✕</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={toggleEditConsumo} style={styles.consumedTouchable}>
                                    <Text style={styles.consumedText}>{aguaConsumida}</Text>
                                    <Text style={styles.mlText}>ml</Text>
                                </TouchableOpacity>
                            )}
                            <Text style={styles.goalText}>
                                Meta: <Text style={styles.goalValue}>{metaDiaria > 0 ? `${metaDiaria} ml` : 'Configure'}</Text>
                            </Text>
                            {metaDiaria > 0 && (
                                <View style={styles.remainingBadge}>
                                    <Text style={styles.remainingText}>
                                        {metaRestante > 0 ? `Faltam ${metaRestante} ml` : '🎉 Meta atingida!'}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Botões de Ação */}
                    <View style={styles.actionsCard}>
                        <Text style={styles.actionTitle}>💧 Adicionar água</Text>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity style={styles.actionButton} onPress={() => adicionarAgua(350)}>
                                <Text style={styles.actionEmoji}>🍶</Text>
                                <Text style={styles.actionButtonText}>Copo</Text>
                                <Text style={styles.actionButtonValue}>350ml</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionButton, styles.actionButtonHighlight]} onPress={() => adicionarAgua(500)}>
                                <Text style={styles.actionEmoji}>🍶</Text>
                                <Text style={styles.actionButtonText}>Garrafa</Text>
                                <Text style={styles.actionButtonValue}>500ml</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton} onPress={() => adicionarAgua(1000)}>
                                <Text style={styles.actionEmoji}>🍶</Text>
                                <Text style={styles.actionButtonText}>Garrafa</Text>
                                <Text style={styles.actionButtonValue}>1L</Text>
                            </TouchableOpacity>
                        </View>
                        
                        {/* Container dos Botões Extras: Notificação e Zerar */}
                        <View style={styles.extraButtonsContainer}>
                            <TouchableOpacity style={styles.notificationButton} onPress={() => setReminderModalVisible(true)}>
                                <Text style={styles.notificationButtonText}>🔔 Lembrete</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.resetButton} onPress={handleResetContagem}>
                                <Text style={styles.resetButtonText}>🔄 Zerar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Histórico */}
                    <View style={styles.historyCard}>
                        <Text style={styles.historyTitle}>📅 Últimos 7 dias</Text>
                        <FlatList
                            data={historicalData}
                            renderItem={renderHistoryItem}
                            keyExtractor={(item) => item.id.toString()}
                            ListEmptyComponent={
                                <View style={styles.emptyState}>
                                    <Text style={styles.emptyEmoji}>💧</Text>
                                    <Text style={styles.historyEmpty}>Comece a registrar seu consumo!</Text>
                                </View>
                            }
                            scrollEnabled={false} 
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Modal de Seleção de Tempo para Notificação */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={reminderModalVisible}
                onRequestClose={() => setReminderModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Agendar Lembrete</Text>
                        <Text style={styles.modalSubtitle}>Daqui a quanto tempo você quer ser lembrado de beber água?</Text>
                        
                        {REMINDER_OPTIONS.map((option, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={styles.timeOption} 
                                onPress={() => handleScheduleReminder(option.seconds)}
                            >
                                <Text style={styles.timeOptionText}>{option.label}</Text>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity style={styles.closeButton} onPress={() => setReminderModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default AguaScreen;