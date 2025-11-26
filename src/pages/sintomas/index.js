import React, { useState, useCallback } from 'react';
import { 
    View, Text, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, 
    ActivityIndicator, ScrollView, Alert, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import api from '../../services/api';
import Header from '../../components/Header';
import styles from './style';

// Lista de sintomas comuns para seleção rápida
const COMMON_SYMPTOMS = [
    { id: 'dor_cabeca', label: 'Dor de Cabeça', icon: '🤯' },
    { id: 'febre', label: 'Febre', icon: '🤒' },
    { id: 'enjoo', label: 'Enjoo', icon: '🤢' },
    { id: 'cansaco', label: 'Cansaço', icon: '😩' },
    { id: 'dor_garganta', label: 'Dor Garganta', icon: '🧣' },
    { id: 'tosse', label: 'Tosse', icon: '😷' },
    { id: 'dor_barriga', label: 'Dor Barriga', icon: '🥴' },
    { id: 'tontura', label: 'Tontura', icon: '💫' },
    { id: 'ansiedade', label: 'Ansiedade', icon: '😰' },
    { id: 'alergia', label: 'Alergia', icon: '🤧' },
    { id: 'insonia', label: 'Insônia', icon: '👀' },
    { id: 'outro', label: 'Outro', icon: '📝' },
];

// Níveis de Intensidade
const INTENSITIES = [
    { level: 1, label: 'Leve', color: '#27AE60' },      // Verde
    { level: 2, label: 'Moderada', color: '#F1C40F' },  // Amarelo
    { level: 3, label: 'Forte', color: '#E67E22' },     // Laranja
    { level: 4, label: 'Intensa', color: '#C0392B' },   // Vermelho
];

const SintomasScreen = ({ navigation }) => {
    const [symptoms, setSymptoms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Estados do Formulário
    const [selectedSymptomName, setSelectedSymptomName] = useState('');
    const [customName, setCustomName] = useState('');
    const [selectedIntensity, setSelectedIntensity] = useState(2); // Começa em Moderada
    const [notes, setNotes] = useState('');

    const fetchSymptoms = async () => {
        setLoading(true);
        try {
            const response = await api.get('/symptoms');
            setSymptoms(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { fetchSymptoms(); }, []));

    const handleSave = async () => {
        const nameToSend = selectedSymptomName === 'Outro' ? customName : selectedSymptomName;

        if (!nameToSend.trim()) {
            Alert.alert("Atenção", "Selecione ou digite um sintoma.");
            return;
        }

        setIsSaving(true);
        
        // Formata data e hora atuais
        const now = new Date();
        const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
        const time = now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        try {
            await api.post('/symptoms', {
                name: nameToSend,
                intensity: selectedIntensity,
                date: date,
                time: time,
                notes: notes
            });
            setModalVisible(false);
            resetForm();
            fetchSymptoms();
            Alert.alert("Registrado", "Sintoma adicionado ao diário.");
        } catch (error) {
            Alert.alert("Erro", "Falha ao salvar sintoma.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = (id) => {
        Alert.alert("Remover", "Apagar este registro?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Apagar", style: "destructive", onPress: async () => {
                try {
                    await api.delete(`/symptoms/${id}`);
                    fetchSymptoms();
                } catch (e) {}
            }}
        ]);
    };

    const resetForm = () => {
        setSelectedSymptomName('');
        setCustomName('');
        setSelectedIntensity(2);
        setNotes('');
    };

    const handleSelectSymptom = (name) => {
        setSelectedSymptomName(name);
        if (name !== 'Outro') setCustomName('');
    };

    const getIntensityColor = (level) => {
        const intensity = INTENSITIES.find(i => i.level === level);
        return intensity ? intensity.color : '#999';
    };

    const getIntensityLabel = (level) => {
        const intensity = INTENSITIES.find(i => i.level === level);
        return intensity ? intensity.label : '?';
    };

    const renderItem = ({ item, index }) => {
        // Tenta achar o ícone na lista comum, se não achar usa um padrão
        const commonSym = COMMON_SYMPTOMS.find(s => s.label === item.name);
        const icon = commonSym ? commonSym.icon : '🩺';
        
        // Formatação de data para exibição
        const dateParts = item.date.split('-');
        const displayDate = `${dateParts[2]}/${dateParts[1]}`;

        return (
            <Animatable.View animation="fadeInRight" delay={index * 100} duration={600}>
                <View style={styles.timelineRow}>
                    <View style={styles.timelineTime}>
                        <Text style={styles.timeText}>{item.time}</Text>
                        <Text style={styles.dateText}>{displayDate}</Text>
                    </View>
                    
                    <View style={styles.timelineLineContainer}>
                        <View style={[styles.timelineDot, { backgroundColor: getIntensityColor(item.intensity) }]} />
                        <View style={styles.timelineLine} />
                    </View>

                    <TouchableOpacity 
                        style={styles.card} 
                        onLongPress={() => handleDelete(item.id)}
                        activeOpacity={0.9}
                    >
                        <View style={[styles.intensityBar, { backgroundColor: getIntensityColor(item.intensity) }]} />
                        <View style={styles.cardContent}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardIcon}>{icon}</Text>
                                <Text style={styles.cardTitle}>{item.name}</Text>
                            </View>
                            <View style={styles.cardBadges}>
                                <View style={[styles.badge, { backgroundColor: getIntensityColor(item.intensity) + '20' }]}>
                                    <Text style={[styles.badgeText, { color: getIntensityColor(item.intensity) }]}>
                                        {getIntensityLabel(item.intensity)}
                                    </Text>
                                </View>
                            </View>
                            {item.notes ? <Text style={styles.cardNotes}>{item.notes}</Text> : null}
                        </View>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Diário de Sintomas" navigation={navigation} />

            <View style={styles.container}>
                <LinearGradient
                    colors={['#0d214f', '#2a5a8a']}
                    style={styles.headerGradient}
                >
                    <Text style={styles.headerTitle}>Como você está hoje?</Text>
                    <Text style={styles.headerSub}>Registre o que sente para acompanhar sua saúde.</Text>
                </LinearGradient>

                <FlatList
                    data={symptoms}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        !loading && (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyEmoji}>📝</Text>
                                <Text style={styles.emptyText}>Seu diário está vazio.</Text>
                            </View>
                        )
                    }
                />

                <TouchableOpacity 
                    style={styles.fab} 
                    onPress={() => setModalVisible(true)}
                    activeOpacity={0.8}
                >
                    <LinearGradient colors={['#0d214f', '#3498DB']} style={styles.fabGradient}>
                        <Text style={styles.fabIcon}>+</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* MODAL DE REGISTRO */}
            <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalOverlay}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Registrar Sintoma</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.label}>O que você está sentindo?</Text>
                            <View style={styles.symptomsGrid}>
                                {COMMON_SYMPTOMS.map((sym) => (
                                    <TouchableOpacity
                                        key={sym.id}
                                        style={[
                                            styles.symptomButton,
                                            selectedSymptomName === sym.label && styles.symptomButtonSelected
                                        ]}
                                        onPress={() => handleSelectSymptom(sym.label)}
                                    >
                                        <Text style={styles.symptomIcon}>{sym.icon}</Text>
                                        <Text style={[
                                            styles.symptomLabel,
                                            selectedSymptomName === sym.label && styles.symptomLabelSelected
                                        ]}>{sym.label}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            {selectedSymptomName === 'Outro' && (
                                <TextInput
                                    style={styles.input}
                                    placeholder="Digite o sintoma..."
                                    value={customName}
                                    onChangeText={setCustomName}
                                />
                            )}

                            <Text style={styles.label}>Intensidade: {getIntensityLabel(selectedIntensity)}</Text>
                            <View style={styles.intensityContainer}>
                                {INTENSITIES.map((int) => (
                                    <TouchableOpacity
                                        key={int.level}
                                        style={[
                                            styles.intensityButton,
                                            { borderColor: int.color },
                                            selectedIntensity === int.level && { backgroundColor: int.color }
                                        ]}
                                        onPress={() => setSelectedIntensity(int.level)}
                                    >
                                        <Text style={[
                                            styles.intensityText,
                                            { color: selectedIntensity === int.level ? '#FFF' : int.color }
                                        ]}>{int.level}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.label}>Observações (Opcional)</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Ex: Começou após o almoço..."
                                multiline
                                numberOfLines={3}
                                value={notes}
                                onChangeText={setNotes}
                            />

                            <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isSaving}>
                                {isSaving ? (
                                    <ActivityIndicator color="#FFF" />
                                ) : (
                                    <Text style={styles.saveButtonText}>Salvar no Diário</Text>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
};

export default SintomasScreen;