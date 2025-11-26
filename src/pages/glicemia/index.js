import React, { useState, useCallback } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, FlatList, Modal, Dimensions, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';
import api from '../../services/api';
import Header from '../../components/Header';
import styles from './style';

const { width } = Dimensions.get('window');

const CONTEXT_OPTIONS = [
    { id: 'jejum', label: 'Em Jejum', icon: '🌅' },
    { id: 'pre_refeicao', label: 'Antes de Comer', icon: '🍽️' },
    { id: 'pos_refeicao', label: 'Depois de Comer', icon: '😋' },
    { id: 'antes_dormir', label: 'Antes de Dormir', icon: '🌙' },
];

const GlicemiaScreen = ({ navigation }) => {
    const [readings, setReadings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [newLevel, setNewLevel] = useState('');
    const [selectedContext, setSelectedContext] = useState('jejum');

    const fetchReadings = async () => {
        setLoading(true);
        try {
            const response = await api.get('/glucose');
            setReadings(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { fetchReadings(); }, []));

    const handleSave = async () => {
        if (!newLevel || isNaN(newLevel)) {
            Alert.alert("Erro", "Insira um valor válido.");
            return;
        }
        try {
            await api.post('/glucose', {
                level: parseInt(newLevel),
                context: selectedContext
            });
            setModalVisible(false);
            setNewLevel('');
            fetchReadings();
        } catch (error) {
            Alert.alert("Erro", "Não foi possível salvar.");
        }
    };

    const handleDelete = (id) => {
        Alert.alert("Excluir", "Deseja apagar este registro?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Sim", style: "destructive", onPress: async () => {
                try {
                    await api.delete(`/glucose/${id}`);
                    fetchReadings();
                } catch (error) {}
            }}
        ]);
    };

    const getStatusColor = (level) => {
        if (level < 70) return '#F1C40F'; 
        if (level <= 140) return '#2ECC71'; 
        if (level <= 180) return '#E67E22'; 
        return '#E74C3C'; 
    };

    const getStatusMessage = (level) => {
        if (level < 70) return 'Hipoglicemia';
        if (level <= 140) return 'Normal';
        if (level <= 180) return 'Alerta';
        return 'Hiperglicemia';
    };

    const latestReading = readings.length > 0 ? readings[0] : null;
    const currentLevel = latestReading ? latestReading.level : 0;
    const statusColor = getStatusColor(currentLevel);
    
    const chartData = {
        labels: readings.slice(0, 6).reverse().map(r => ''), 
        datasets: [{
            data: readings.length > 0 ? readings.slice(0, 6).reverse().map(r => r.level) : [0],
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            strokeWidth: 3 
        }]
    };

    const renderHistoryItem = ({ item, index }) => (
        <Animatable.View animation="fadeInUp" delay={index * 100} style={styles.historyItem}>
            <View style={[styles.historyIndicator, { backgroundColor: getStatusColor(item.level) }]} />
            <View style={styles.historyContent}>
                <Text style={styles.historyContext}>
                    {CONTEXT_OPTIONS.find(c => c.id === item.context)?.icon} {CONTEXT_OPTIONS.find(c => c.id === item.context)?.label}
                </Text>
                <Text style={styles.historyDate}>{new Date(item.created_at).toLocaleDateString('pt-BR')} às {new Date(item.created_at).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</Text>
            </View>
            <Text style={[styles.historyValue, { color: getStatusColor(item.level) }]}>{item.level}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteBtn}>
                <Text style={styles.deleteBtnText}>✕</Text>
            </TouchableOpacity>
        </Animatable.View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Monitor de Glicemia" navigation={navigation} />
            
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <LinearGradient colors={[statusColor, '#0d214f']} style={styles.heroContainer}>
                    <View style={styles.gaugeContainer}>
                         <Svg height="200" width="200" viewBox="0 0 100 100">
                            <Circle cx="50" cy="50" r="45" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
                            <Circle 
                                cx="50" cy="50" r="45" stroke="#FFFFFF" strokeWidth="8" fill="none" 
                                strokeDasharray={`${(currentLevel / 200) * 280}, 280`} 
                                strokeLinecap="round" rotation="-90" origin="50, 50"
                            />
                         </Svg>
                         <View style={styles.gaugeTextContainer}>
                             <Text style={styles.gaugeValue}>{currentLevel}</Text>
                             <Text style={styles.gaugeUnit}>mg/dL</Text>
                             <Text style={styles.gaugeStatus}>{getStatusMessage(currentLevel)}</Text>
                         </View>
                    </View>

                    <View style={styles.chartContainer}>
                        <LineChart
                            data={chartData}
                            width={width - 40}
                            height={140}
                            chartConfig={{
                                backgroundColor: "transparent",
                                backgroundGradientFrom: "transparent",
                                backgroundGradientTo: "transparent",
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                propsForDots: { r: "4", strokeWidth: "2", stroke: statusColor }
                            }}
                            bezier
                            style={styles.chart}
                            withInnerLines={false}
                            withOuterLines={false}
                        />
                    </View>
                </LinearGradient>

                <View style={styles.historySection}>
                    <Text style={styles.sectionTitle}>Histórico Recente</Text>
                    <FlatList
                        data={readings}
                        renderItem={renderHistoryItem}
                        keyExtractor={item => item.id.toString()}
                        scrollEnabled={false}
                        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum registro ainda.</Text>}
                    />
                </View>
            </ScrollView>

            <TouchableOpacity style={[styles.fab, { backgroundColor: statusColor }]} onPress={() => setModalVisible(true)}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Nova Medição</Text>
                        
                        <TextInput
                            style={styles.input}
                            placeholder="000"
                            keyboardType="numeric"
                            value={newLevel}
                            onChangeText={setNewLevel}
                            autoFocus
                        />
                        <Text style={styles.inputUnit}>mg/dL</Text>

                        <Text style={styles.label}>Momento:</Text>
                        <View style={styles.contextGrid}>
                            {CONTEXT_OPTIONS.map((opt) => (
                                <TouchableOpacity
                                    key={opt.id}
                                    style={[styles.contextOption, selectedContext === opt.id && styles.contextOptionSelected]}
                                    onPress={() => setSelectedContext(opt.id)}
                                >
                                    <Text style={styles.contextIcon}>{opt.icon}</Text>
                                    <Text style={[styles.contextLabel, selectedContext === opt.id && styles.contextLabelSelected]}>{opt.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <TouchableOpacity style={[styles.saveButton, { backgroundColor: statusColor }]} onPress={handleSave}>
                            <Text style={styles.saveButtonText}>Registrar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default GlicemiaScreen;