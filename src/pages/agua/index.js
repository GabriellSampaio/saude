import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ScrollView, Animated, Keyboard, ActivityIndicator, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import Header from '../../components/Header';
import styles from './style';

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

    const waterLevel = useRef(new Animated.Value(0)).current;
    const waveAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(1)).current;

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
        
        // Animação da altura da água (sem native driver)
        Animated.timing(waterLevel, {
            toValue: progress > 1 ? 1 : progress,
            duration: 1000,
            useNativeDriver: false, // IMPORTANTE: false para height
        }).start();

        // Animação de onda contínua (com native driver)
        Animated.loop(
            Animated.sequence([
                Animated.timing(waveAnim, {
                    toValue: 1,
                    duration: 2000,
                    useNativeDriver: true, // OK para transform
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

        // Animação de pulso ao adicionar água
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
                                {/* Água com altura animada */}
                                <Animated.View 
                                    style={[
                                        styles.waterFill, 
                                        { height: animatedHeight }
                                    ]} 
                                >
                                    {/* Onda com transform animado */}
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

                        {/* Informações de Consumo */}
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
                                <Text style={styles.actionEmoji}>🥤</Text>
                                <Text style={styles.actionButtonText}>Copo</Text>
                                <Text style={styles.actionButtonValue}>350ml</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.actionButton, styles.actionButtonHighlight]} onPress={() => adicionarAgua(500)}>
                                <Text style={styles.actionEmoji}>🍶</Text>
                                <Text style={styles.actionButtonText}>Garrafa</Text>
                                <Text style={styles.actionButtonValue}>500ml</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton} onPress={() => adicionarAgua(1000)}>
                                <Text style={styles.actionEmoji}>🧴</Text>
                                <Text style={styles.actionButtonText}>Garrafa</Text>
                                <Text style={styles.actionButtonValue}>1L</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity style={styles.resetButton} onPress={handleResetContagem}>
                            <Text style={styles.resetButtonText}>🔄 Zerar contagem</Text>
                        </TouchableOpacity>
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
        </SafeAreaView>
    );
};

export default AguaScreen;