import React, { useState, useCallback, useRef } from 'react';
import { 
    View, Text, SafeAreaView, TouchableOpacity, FlatList, Modal, TextInput, 
    ActivityIndicator, ScrollView, Alert, Animated 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import api from '../../services/api';
import Header from '../../components/Header';
import styles from './style';

const STATUS_OPTIONS = [
    { id: 'tomada', label: 'Tomada', color: '#27AE60', icon: '🛡️' },
    { id: 'pendente', label: 'Agendada', color: '#3498DB', icon: '📅' },
    { id: 'atrasada', label: 'Atrasada', color: '#E74C3C', icon: '⚠️' },
];

// Lista de Vacinas Comuns
const VACINA_TYPES = [
    'BCG', 'Hepatite B', 'Penta', 'Polio (VIP)', 'Polio (VOP)', 
    'Rotavírus', 'Pneumocócica 10', 'Meningocócica C', 'Febre Amarela', 
    'Tríplice Viral (Sarampo, Caxumba, Rubéola)', 'Tetra Viral', 'Hepatite A', 
    'DTP', 'Varicela', 'HPV', 'Influenza (Gripe)', 'Covid-19'
];

// Lista de UBSs (Grande SP)
const UBS_LOCATIONS = [
    'UBS Jardim Etelvina', 'UBS Guaianases I', 'AMA/UBS Integrada Cidade Tiradentes',
    'UBS Fazenda do Carmo', 'UBS Jardim Soares', 'UBS Vila Curuçá Velha',
    'UBS Itaim Paulista', 'UBS Cidade Kemel (Poá)', 'UBS Vila Margarida (Ferraz)',
    'UBS Jardim Rosana (Ferraz)', 'UBS Jardim São Paulo', 'UBS Profeta Jeremias',
    'UBS Gráficos', 'UBS Jardim Brasília', 'UBS Jardim Nélia'
];

const VacinasScreen = ({ navigation }) => {
    const [vaccines, setVaccines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    // Estados do Formulário
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('tomada');
    const [batch, setBatch] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');

    // Estados para Modais de Seleção
    const [selectionModalVisible, setSelectionModalVisible] = useState(false);
    const [selectionData, setSelectionData] = useState([]);
    const [selectionTitle, setSelectionTitle] = useState('');
    const [selectionTarget, setSelectionTarget] = useState(null); // 'name' ou 'location'

    const fetchVaccines = async () => {
        setLoading(true);
        try {
            const response = await api.get('/vaccines');
            setVaccines(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(useCallback(() => { fetchVaccines(); }, []));

    // Função de Máscara de Data
    const handleDateChange = (text) => {
        // Remove tudo que não é número
        let cleaned = text.replace(/[^0-9]/g, '');
        
        // Aplica a máscara DD/MM/AAAA
        if (cleaned.length > 2) {
            cleaned = cleaned.substring(0, 2) + '/' + cleaned.substring(2);
        }
        if (cleaned.length > 5) {
            cleaned = cleaned.substring(0, 5) + '/' + cleaned.substring(5, 9);
        }
        
        // Limita a 10 caracteres (10/10/2024)
        if (cleaned.length > 10) {
            cleaned = cleaned.substring(0, 10);
        }
        
        setDate(cleaned);
    };

    const openSelectionModal = (type) => {
        setSelectionTarget(type);
        if (type === 'name') {
            setSelectionData(VACINA_TYPES);
            setSelectionTitle('Selecione a Vacina');
        } else {
            setSelectionData(UBS_LOCATIONS);
            setSelectionTitle('Selecione a Unidade');
        }
        setSelectionModalVisible(true);
    };

    const handleSelection = (item) => {
        if (selectionTarget === 'name') {
            setName(item);
        } else {
            setLocation(item);
        }
        setSelectionModalVisible(false);
    };

    const handleSave = async () => {
        if (!name || !date) {
            Alert.alert("Erro", "Nome e Data são obrigatórios.");
            return;
        }
        
        // Validação simples da data (deve ter 10 caracteres)
        if (date.length !== 10) {
            Alert.alert("Data Inválida", "Por favor, preencha a data completa (Dia/Mês/Ano).");
            return;
        }

        // Converte DD/MM/AAAA para AAAA-MM-DD
        const parts = date.split('/');
        const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;

        const payload = { name, date: formattedDate, status, batch, location, notes };

        try {
            if (isEditing) {
                await api.put(`/vaccines/${selectedId}`, payload);
            } else {
                await api.post('/vaccines', payload);
            }
            closeModal();
            fetchVaccines();
            Alert.alert("Sucesso", isEditing ? "Vacina atualizada!" : "Vacina registrada!");
        } catch (error) {
            console.error(error.response?.data);
            Alert.alert("Erro", "Falha ao salvar.");
        }
    };

    const handleDelete = (id) => {
        Alert.alert("Remover", "Apagar este registro?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Apagar", style: "destructive", onPress: async () => {
                try {
                    await api.delete(`/vaccines/${id}`);
                    fetchVaccines();
                } catch (e) {}
            }}
        ]);
    };

    const openModal = (vaccine = null) => {
        if (vaccine) {
            setIsEditing(true);
            setSelectedId(vaccine.id);
            setName(vaccine.name);
            const dateObj = new Date(vaccine.date);
            const dateParts = vaccine.date.split('-'); 
            const visualDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
            setDate(visualDate);
            setStatus(vaccine.status);
            setBatch(vaccine.batch || '');
            setLocation(vaccine.location || '');
            setNotes(vaccine.notes || '');
        } else {
            setIsEditing(false);
            resetForm();
        }
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        resetForm();
    };

    const resetForm = () => {
        setName(''); setDate(''); setStatus('tomada'); setBatch(''); setLocation(''); setNotes('');
    };

    const totalVaccines = vaccines.length;
    const takenVaccines = vaccines.filter(v => v.status === 'tomada').length;
    const protectionRate = totalVaccines > 0 ? Math.round((takenVaccines / totalVaccines) * 100) : 0;

    const renderItem = ({ item, index }) => {
        const statusConfig = STATUS_OPTIONS.find(s => s.id === item.status);
        const dateParts = item.date.split('-');
        const displayDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        
        return (
            <Animatable.View animation="fadeInUp" delay={index * 100} duration={600}>
                <TouchableOpacity 
                    style={[styles.card, { borderLeftColor: statusConfig.color }]} 
                    activeOpacity={0.9}
                    onPress={() => openModal(item)}
                    onLongPress={() => handleDelete(item.id)}
                >
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardTitle}>{item.name}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: statusConfig.color + '20' }]}>
                            <Text style={[styles.statusText, { color: statusConfig.color }]}>
                                {statusConfig.icon} {statusConfig.label}
                            </Text>
                        </View>
                    </View>
                    
                    <View style={styles.cardDetails}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Data:</Text>
                            <Text style={styles.detailValue}>{displayDate}</Text>
                        </View>
                        {item.location && (
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Local:</Text>
                                <Text style={styles.detailValue} numberOfLines={1}>{item.location}</Text>
                            </View>
                        )}
                    </View>
                    
                    {item.batch && (
                        <View style={styles.batchContainer}>
                            <Text style={styles.batchText}>LOTE: {item.batch}</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </Animatable.View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Carteira de Vacinação" navigation={navigation} />
            
            <View style={styles.container}>
                <LinearGradient
                    colors={['#0d214f', '#1F4068']}
                    style={styles.heroContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <View style={styles.shieldContainer}>
                        <View style={[styles.shieldRing, { borderColor: protectionRate === 100 ? '#27AE60' : '#F1C40F' }]}>
                            <Text style={styles.shieldIcon}>🛡️</Text>
                        </View>
                        <View style={styles.statsContainer}>
                            <Text style={styles.statsLabel}>Nível de Proteção</Text>
                            <Text style={styles.statsValue}>{protectionRate}%</Text>
                            <View style={styles.progressBarBg}>
                                <View style={[styles.progressBarFill, { width: `${protectionRate}%`, backgroundColor: protectionRate === 100 ? '#27AE60' : '#F1C40F' }]} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.miniStatsRow}>
                        <View style={styles.miniStat}>
                            <Text style={styles.miniStatValue}>{takenVaccines}</Text>
                            <Text style={styles.miniStatLabel}>Tomadas</Text>
                        </View>
                        <View style={styles.divider} />
                        <View style={styles.miniStat}>
                            <Text style={styles.miniStatValue}>{totalVaccines - takenVaccines}</Text>
                            <Text style={styles.miniStatLabel}>Pendentes</Text>
                        </View>
                    </View>
                </LinearGradient>

                <FlatList
                    data={vaccines}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        !loading && (
                            <View style={styles.emptyContainer}>
                                <Text style={styles.emptyEmoji}>💉</Text>
                                <Text style={styles.emptyText}>Nenhuma vacina registrada.</Text>
                            </View>
                        )
                    }
                />

                <TouchableOpacity 
                    style={styles.fab} 
                    onPress={() => openModal()}
                    activeOpacity={0.8}
                >
                    <LinearGradient colors={['#0d214f', '#3498DB']} style={styles.fabGradient}>
                        <Text style={styles.fabIcon}>+</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            {/* MODAL PRINCIPAL (FORMULÁRIO) */}
            <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={closeModal}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{isEditing ? 'Editar Vacina' : 'Nova Vacina'}</Text>
                            <TouchableOpacity onPress={closeModal}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.label}>Nome da Vacina</Text>
                            <TouchableOpacity onPress={() => openSelectionModal('name')}>
                                <View pointerEvents="none">
                                    <TextInput 
                                        style={styles.input} 
                                        value={name} 
                                        placeholder="Toque para selecionar" 
                                        editable={false}
                                    />
                                </View>
                            </TouchableOpacity>

                            <Text style={styles.label}>Data (DD/MM/AAAA)</Text>
                            <TextInput 
                                style={styles.input} 
                                value={date} 
                                onChangeText={handleDateChange} 
                                placeholder="01/01/2024" 
                                keyboardType="numeric" 
                                maxLength={10}
                            />

                            <Text style={styles.label}>Status</Text>
                            <View style={styles.statusRow}>
                                {STATUS_OPTIONS.map(opt => (
                                    <TouchableOpacity
                                        key={opt.id}
                                        style={[
                                            styles.statusOption,
                                            status === opt.id && { backgroundColor: opt.color + '20', borderColor: opt.color }
                                        ]}
                                        onPress={() => setStatus(opt.id)}
                                    >
                                        <Text style={[styles.statusOptionText, status === opt.id && { color: opt.color, fontWeight: 'bold' }]}>
                                            {opt.label}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>

                            <View style={styles.rowInputs}>
                                <View style={{flex: 1, marginRight: 10}}>
                                    <Text style={styles.label}>Lote (Opcional)</Text>
                                    <TextInput style={styles.input} value={batch} onChangeText={setBatch} placeholder="Ex: AB123" />
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={styles.label}>Local (Opcional)</Text>
                                    <TouchableOpacity onPress={() => openSelectionModal('location')}>
                                        <View pointerEvents="none">
                                            <TextInput 
                                                style={styles.input} 
                                                value={location} 
                                                placeholder="Toque para selecionar" 
                                                editable={false} 
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={styles.label}>Observações</Text>
                            <TextInput 
                                style={[styles.input, styles.textArea]} 
                                value={notes} 
                                onChangeText={setNotes} 
                                multiline 
                                numberOfLines={3} 
                                placeholder="Reações, data da próxima dose..."
                            />

                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <LinearGradient colors={['#0d214f', '#2a5a8a']} style={styles.saveButtonGradient}>
                                    <Text style={styles.saveButtonText}>Salvar Registro</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* MODAL DE SELEÇÃO (LISTA) */}
            <Modal visible={selectionModalVisible} animationType="fade" transparent onRequestClose={() => setSelectionModalVisible(false)}>
                <View style={styles.modalOverlay}>
                    <View style={[styles.modalContent, { maxHeight: '70%' }]}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>{selectionTitle}</Text>
                            <TouchableOpacity onPress={() => setSelectionModalVisible(false)}>
                                <Text style={styles.closeButton}>✕</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={selectionData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.selectionItem} onPress={() => handleSelection(item)}>
                                    <Text style={styles.selectionItemText}>{item}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default VacinasScreen;