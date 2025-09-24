import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ScrollView, Animated, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import styles from './style';

const AGUA_STORAGE_KEY = '@agua_data';

const AguaScreen = ({ navigation }) => {
    const [peso, setPeso] = useState('');
    const [altura, setAltura] = useState('');
    const [metaDiaria, setMetaDiaria] = useState(0);
    const [aguaConsumida, setAguaConsumida] = useState(0);
    const [metaBatidaHoje, setMetaBatidaHoje] = useState(false);

    const waterLevel = useRef(new Animated.Value(0)).current;

    const loadData = async () => {
        try {
            const storedData = await AsyncStorage.getItem(AGUA_STORAGE_KEY);
            if (storedData) {
                const data = JSON.parse(storedData);
                const hoje = new Date().toLocaleDateString();
                setPeso(data.peso || '');
                setAltura(data.altura || '');
                setMetaDiaria(data.metaDiaria || 0);
                if (data.date !== hoje) {
                    setAguaConsumida(0);
                    setMetaBatidaHoje(false);
                } else {
                    setAguaConsumida(data.aguaConsumida || 0);
                    setMetaBatidaHoje(data.metaBatidaHoje || false);
                }
            }
        } catch (e) { console.error("Erro ao carregar dados", e); }
    };
    useFocusEffect(useCallback(() => { loadData(); }, []));

    useEffect(() => {
        const saveData = async () => {
            try {
                const data = { peso, altura, metaDiaria, aguaConsumida, metaBatidaHoje, date: new Date().toLocaleDateString() };
                await AsyncStorage.setItem(AGUA_STORAGE_KEY, JSON.stringify(data));
            } catch (e) { console.error("Erro ao salvar dados", e); }
        };
        saveData();
    }, [peso, altura, metaDiaria, aguaConsumida, metaBatidaHoje]);

    useEffect(() => {
        const progress = metaDiaria > 0 ? aguaConsumida / metaDiaria : 0;
        Animated.timing(waterLevel, {
            toValue: progress > 1 ? 1 : progress,
            duration: 1000,
            useNativeDriver: false,
        }).start();
    }, [aguaConsumida, metaDiaria]);

    const calcularMeta = () => {
        if (peso && parseFloat(peso) > 0) {
            const pesoKg = parseFloat(peso.replace(',', '.'));
            const metaCalculada = Math.round(pesoKg * 35);
            setMetaDiaria(metaCalculada);
            Keyboard.dismiss();
            Alert.alert("Meta Definida!", `Sua meta diária é de ${metaCalculada} ml.`);
        } else {
            Alert.alert("Atenção", "Por favor, insira um peso válido.");
        }
    };

    const adicionarAgua = (mililitros) => {
        const novoConsumo = aguaConsumida + mililitros;
        setAguaConsumida(novoConsumo);
        if (novoConsumo >= metaDiaria && !metaBatidaHoje && metaDiaria > 0) {
            Alert.alert("Parabéns!", "Você atingiu sua meta de hidratação de hoje! 🎉");
            setMetaBatidaHoje(true);
        }
    };

    const handleResetContagem = () => {
        Alert.alert(
            "Zerar Contagem",
            "Você tem certeza que deseja zerar a quantidade de água consumida hoje?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sim, zerar",
                    onPress: () => {
                        setAguaConsumida(0);
                        setMetaBatidaHoje(false); // Também reseta o alerta de meta batida
                    },
                    style: "destructive"
                }
            ]
        );
    };
    
    const animatedHeight = waterLevel.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });
    
    const metaRestante = metaDiaria - aguaConsumida > 0 ? metaDiaria - aguaConsumida : 0;

    return (
        <SafeAreaView style={styles.safeArea}>
            <Animated.View style={[styles.waterBackground, { height: animatedHeight }]} />

            <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}><Text style={styles.backButton}>←</Text></TouchableOpacity>
                    <Text style={styles.headerTitle}>Hidratação Diária</Text>
                </View>

                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Seu peso (kg)"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={peso}
                            onChangeText={setPeso}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Sua altura (cm)"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            value={altura}
                            onChangeText={setAltura}
                        />
                        <TouchableOpacity style={styles.calculateButton} onPress={calcularMeta}>
                            <Text style={styles.calculateButtonText}>Calcular Meta</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.progressContainer}>
                        <Text style={styles.consumedText}>{aguaConsumida} ml</Text>
                        <Text style={styles.goalText}>Meta: {metaDiaria} ml</Text>
                        {metaDiaria > 0 && (
                            <Text style={styles.remainingText}>
                                {metaRestante > 0 ? `Faltam ${metaRestante} ml` : 'Parabéns, você atingiu sua meta!'}
                            </Text>
                        )}
                    </View>

                    <View style={styles.bottomContainer}>
                        <Text style={styles.addActionTitle}>Adicionar consumo:</Text>
                        <View style={styles.actionsContainer}>
                            <TouchableOpacity style={styles.actionButton} onPress={() => adicionarAgua(350)}>
                                <Text style={styles.actionButtonText}>Copo (350ml)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton} onPress={() => adicionarAgua(500)}>
                                <Text style={styles.actionButtonText}>Garrafa (500ml)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.actionButton} onPress={() => adicionarAgua(1000)}>
                                <Text style={styles.actionButtonText}>Garrafa (1L)</Text>
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity style={styles.resetButton} onPress={handleResetContagem}>
                            <Text style={styles.resetButtonText}>Zerar contagem</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default AguaScreen;