import React, { useState, useCallback } from 'react';
import { 
    View, Text, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, 
    ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import api from '../../services/api';
import Header from '../../components/Header';
import styles from './style';

const SEVERITY_LEVELS = ['Leve', 'Moderada', 'Grave'];
const ALLERGY_TYPES = ['Alimentar', 'Medicamento', 'Ambiental', 'Insetos', 'Outro'];

const COMMON_ALLERGIES = {
    'Alimentar': ['Leite', 'Ovo', 'Amendoim', 'Nozes', 'Trigo', 'Soja', 'Peixe', 'Mariscos', 'Glúten', 'Lactose'],
    'Medicamento': ['Penicilina', 'Aspirina', 'Dipirona', 'Ibuprofeno', 'Sulfa', 'Amoxicilina', 'Anestesia'],
    'Ambiental': ['Pólen', 'Ácaros', 'Mofo', 'Pelo de Gato', 'Pelo de Cachorro', 'Látex', 'Poeira'],
    'Insetos': ['Abelha', 'Vespa', 'Formiga', 'Pernilongo', 'Aranha'],
    'Outro': []
};

const AlergiasScreen = ({ navigation }) => {
    const [allergies, setAllergies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [newName, setNewName] = useState('');
    const [newSeverity, setNewSeverity] = useState('Leve');
    const [newType, setNewType] = useState('Alimentar');
    const [newNotes, setNewNotes] = useState('');

    const fetchAllergies = async () => {
        setLoading(true);
        try {
            const response = await api.get('/allergies');
            setAllergies(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível carregar suas alergias.");
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { fetchAllergies(); }, []));

    const handleAddAllergy = async () => {
        if (!newName.trim()) {
            Alert.alert("Ops!", "Por favor, informe o nome da alergia.");
            return;
        }
        setIsSaving(true);
        try {
            await api.post('/allergies', {
                name: newName,
                severity: newSeverity,
                type: newType,
                notes: newNotes
            });
            setModalVisible(false);
            setNewName('');
            setNewNotes('');
            setNewSeverity('Leve');
            fetchAllergies();
            Alert.alert("Sucesso", "Alergia adicionada ao seu perfil.");
        } catch (error) {
            Alert.alert("Erro", "Falha ao salvar alergia.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = (id) => {
        Alert.alert("Remover", "Tem certeza que deseja remover esta alergia?", [
            { text: "Cancelar", style: "cancel" },
            { 
                text: "Remover", style: "destructive", 
                onPress: async () => {
                    try {
                        await api.delete(`/allergies/${id}`);
                        setAllergies(prev => prev.filter(item => item.id !== id));
                    } catch (error) {
                        Alert.alert("Erro", "Não foi possível remover.");
                    }
                }
            }
        ]);
    };

    const handleTypeSelect = (type) => {
        setNewType(type);
        setNewName(''); 
    };

    const handleSuggestionSelect = (suggestion) => {
        setNewName(suggestion);
    };

    const getSeverityColor = (severity) => {
        switch(severity) {
            case 'Leve': return styles.badgeGreen;
            case 'Moderada': return styles.badgeOrange;
            case 'Grave': return styles.badgeRed;
            default: return styles.badgeGray;
        }
    };

    const getSeverityTextColor = (severity) => {
         switch(severity) {
            case 'Leve': return '#27AE60';
            case 'Moderada': return '#E67E22';
            case 'Grave': return '#C0392B';
            default: return '#7F8C8D';
        }
    };

    const renderItem = ({ item, index }) => (
        <Animatable.View animation="fadeInUp" delay={index * 100} duration={600}>
            <View style={styles.card}>
                <View style={[styles.severityStripe, getSeverityColor(item.severity)]} />
                <View style={styles.cardContent}>
                    <View style={styles.cardHeader}>
                        <View>
                            <Text style={styles.cardTitle}>{item.name}</Text>
                            <Text style={styles.cardType}>{item.type}</Text>
                        </View>
                        <View style={[styles.severityBadge, getSeverityColor(item.severity, true)]}>
                            <Text style={[styles.severityText, { color: getSeverityTextColor(item.severity) }]}>
                                {item.severity}
                            </Text>
                        </View>
                    </View>
                    {item.notes ? <Text style={styles.cardNotes}>“{item.notes}”</Text> : null}
                    
                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                        <Text style={styles.deleteButtonText}>Remover</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Animatable.View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Minhas Alergias" navigation={navigation} />
            
            <View style={styles.container}>
                {loading ? (
                    <ActivityIndicator size="large" color="#0d214f" style={{marginTop: 50}} />
                ) : (
                    <FlatList
                        data={allergies}
                        renderItem={renderItem}
                        keyExtractor={item => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyEmoji}>🍃</Text>
                                <Text style={styles.emptyTitle}>Nenhuma alergia registrada</Text>
                                <Text style={styles.emptySub}>Toque no botão + para adicionar.</Text>
                            </View>
                        }
                    />
                )}

                <TouchableOpacity 
                    style={styles.fab} 
                    activeOpacity={0.8}
                    onPress={() => setModalVisible(true)}
                >
                    <Text style={styles.fabText}>+</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.modalContainer}
                >
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Nova Alergia</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Text style={styles.closeIcon}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            
                            <Text style={styles.inputLabel}>1. Qual o tipo?</Text>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
                                {ALLERGY_TYPES.map(type => (
                                    <TouchableOpacity 
                                        key={type} 
                                        style={[styles.chip, newType === type && styles.chipSelected]}
                                        onPress={() => handleTypeSelect(type)}
                                    >
                                        <Text style={[styles.chipText, newType === type && styles.chipTextSelected]}>{type}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {COMMON_ALLERGIES[newType] && COMMON_ALLERGIES[newType].length > 0 && (
                                <>
                                    <Text style={styles.inputSubLabel}>Sugestões comuns:</Text>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsContainer}>
                                        {COMMON_ALLERGIES[newType].map(suggestion => (
                                            <TouchableOpacity 
                                                key={suggestion}
                                                style={[styles.suggestionChip, newName === suggestion && styles.suggestionChipSelected]}
                                                onPress={() => handleSuggestionSelect(suggestion)}
                                            >
                                                <Text style={[styles.suggestionText, newName === suggestion && styles.suggestionTextSelected]}>
                                                    {suggestion}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </ScrollView>
                                </>
                            )}

                            <Text style={styles.inputLabel}>2. Nome da Alergia</Text>
                            <TextInput 
                                style={styles.input} 
                                placeholder="Ou digite aqui se não estiver acima..." 
                                value={newName}
                                onChangeText={setNewName}
                            />

                            <Text style={styles.inputLabel}>3. Severidade</Text>
                            <View style={styles.severitySelector}>
                                {SEVERITY_LEVELS.map(level => (
                                    <TouchableOpacity 
                                        key={level} 
                                        style={[
                                            styles.severityOption, 
                                            newSeverity === level && styles.severityOptionSelected,
                                            newSeverity === level && { borderColor: getSeverityTextColor(level) }
                                        ]}
                                        onPress={() => setNewSeverity(level)}
                                    >
                                        <View style={[styles.severityDot, { backgroundColor: getSeverityTextColor(level) }]} />
                                        <Text style={[
                                            styles.severityOptionText,
                                            newSeverity === level && { color: getSeverityTextColor(level), fontWeight: 'bold' }
                                        ]}>{level}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <Text style={styles.inputLabel}>4. Observações (Opcional)</Text>
                            <TextInput 
                                style={[styles.input, styles.textArea]} 
                                placeholder="Ex: Causa inchaço, falta de ar..." 
                                multiline
                                numberOfLines={3}
                                value={newNotes}
                                onChangeText={setNewNotes}
                            />

                            <TouchableOpacity 
                                style={styles.saveButton} 
                                onPress={handleAddAllergy}
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <ActivityIndicator color="#FFF" />
                                ) : (
                                    <Text style={styles.saveButtonText}>Salvar Alergia</Text>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        </SafeAreaView>
    );
};

export default AlergiasScreen;