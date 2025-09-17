import React, { useState, useCallback } from 'react';

import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Alert,
    Modal,
    FlatList,
    Platform,
    TextInput,
    ActivityIndicator
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api'; 
import styles from './style';

const TIPOS_DE_EXAME = [
    { id: '1', nome: 'Hemograma Completo' }, { id: '2', nome: 'Raio-X (Tórax)' }, { id: '3', nome: 'Raio-X (Abdômen)' }, { id: '4', nome: 'Tomografia Computadorizada' }, { id: '5', nome: 'Ressonância Magnética' }, { id: '6', nome: 'Eletrocardiograma (ECG)' }, { id: '7', nome: 'Ultrassonografia' }, { id: '8', nome: 'Exame de Urina' }, { id: '9', nome: 'Exame de Fezes' }, { id: '10', nome: 'Glicemia em Jejum' },
];

export default function ExamesScreen({ navigation }) {
    // --- ESTADOS DO FORMULÁRIO DE UPLOAD ---
    const [imagem, setImagem] = useState(null);
    const [tipoExame, setTipoExame] = useState(null);
    const [modalVisivel, setModalVisivel] = useState(false);
    const [loading, setLoading] = useState(false);

    // --- NOVOS ESTADOS PARA A LISTA E EDIÇÃO ---
    const [listaExames, setListaExames] = useState([]);
    const [loadingExames, setLoadingExames] = useState(true);
    const [modalUpdateVisivel, setModalUpdateVisivel] = useState(false);
    const [exameSelecionado, setExameSelecionado] = useState(null);
    const [novoTipoExame, setNovoTipoExame] = useState('');

    // --- FUNÇÕES DE LÓGICA ---

    const buscarExames = async () => {
        setLoadingExames(true);
        try {
            const response = await api.get('/exames');
            setListaExames(response.data);
        } catch (error) {
            console.error("Erro ao buscar exames:", error);
            Alert.alert("Erro", "Não foi possível carregar seus exames.");
        } finally {
            setLoadingExames(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            buscarExames();
        }, [])
    );

    const selecionarImagem = async (modo) => {
        try {
            let resultado;
            const opcoes = {
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.6,
            };
            if (modo === 'galeria') {
                resultado = await ImagePicker.launchImageLibraryAsync(opcoes);
            } else if (modo === 'camera') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permissão necessária', 'Você precisa permitir o acesso à câmera.');
                    return;
                }
                resultado = await ImagePicker.launchCameraAsync(opcoes);
            }
            if (resultado && !resultado.canceled) {
                setImagem(resultado.assets[0].uri);
            }
        } catch (error) {
            console.error("Erro ao selecionar imagem: ", error);
            Alert.alert("Erro", "Não foi possível selecionar a imagem.");
        }
    };

    const handleSave = async () => {
        if (!imagem || !tipoExame) {
            Alert.alert("Campos incompletos", "Anexe uma imagem e selecione o tipo.");
            return;
        }
        setLoading(true);
        try {
            const userToken = await AsyncStorage.getItem('user_token');
            if (!userToken) {
                Alert.alert("Erro de Autenticação", "Usuário não autenticado.");
                setLoading(false);
                return;
            }
            const formData = new FormData();
            const nomeArquivo = `exame_${Date.now()}.jpg`;
            if (Platform.OS === 'web') {
                const response = await fetch(imagem);
                const blob = await response.blob();
                formData.append('image', blob, nomeArquivo);
            } else {
                const tipoArquivo = `image/${imagem.split('.').pop()}`;
                formData.append('image', { uri: imagem, name: nomeArquivo, type: tipoArquivo });
            }
            formData.append('tipo_exame', tipoExame.nome);
            await api.post('/exames', formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Bearer ${userToken}` },
            });
            Alert.alert("Sucesso", `Exame "${tipoExame.nome}" salvo com sucesso!`);
            setImagem(null);
            setTipoExame(null);
            buscarExames();
        } catch (error) {
            console.error("Erro no upload: ", JSON.stringify(error.response, null, 2));
            Alert.alert("Erro ao Salvar", error.response?.data?.message || "Não foi possível salvar o exame.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (exameId) => {
        Alert.alert("Confirmar Exclusão", "Deseja mover este exame para a lixeira?", [
            { text: "Cancelar", style: "cancel" },
            { text: "Sim, Excluir", style: "destructive",
                onPress: async () => {
                    try {
                        await api.delete(`/exames/${exameId}`);
                        Alert.alert("Sucesso", "Exame movido para a lixeira.");
                        buscarExames();
                    } catch (error) { Alert.alert("Erro", "Não foi possível excluir o exame."); }
                },
            },
        ]);
    };
    
    const handleUpdate = async () => {
        if (!novoTipoExame.trim()) {
            Alert.alert("Erro", "O tipo de exame não pode ser vazio.");
            return;
        }
        try {
            await api.put(`/exames/${exameSelecionado.id}`, { tipo_exame: novoTipoExame });
            setModalUpdateVisivel(false);
            Alert.alert("Sucesso", "Exame atualizado.");
            buscarExames();
        } catch (error) { Alert.alert("Erro", "Não foi possível atualizar o exame."); }
    };
    
    // --- COMPONENTES DE RENDERIZAÇÃO ---

    const renderUploadForm = () => (
        <View style={styles.container}>
            <Text style={styles.titulo}>Anexar Exame</Text>
            <Text style={styles.subtitulo}>Envie uma foto do seu documento para análise</Text>
            <Text style={styles.label}>Tipo de Exame</Text>
            <TouchableOpacity style={styles.botaoSelecionarTipo} onPress={() => setModalVisivel(true)} >
                <Text style={styles.botaoSelecionarTipoTexto}>
                    {tipoExame ? tipoExame.nome : 'Clique para selecionar'}
                </Text>
            </TouchableOpacity>
            <View style={styles.previewContainer}>
                {imagem ? (
                    <Image source={{ uri: imagem }} style={styles.previewImage} />
                ) : (
                    <View style={styles.placeholderContainer}>
                        <Text style={styles.placeholderIcon}>+</Text>
                        <Text style={styles.placeholderText}>Nenhum exame anexado</Text>
                    </View>
                )}
            </View>
            <View style={styles.botoesContainer}>
                <TouchableOpacity style={styles.botaoAcao} onPress={() => selecionarImagem('galeria')}>
                    <Text style={styles.botaoAcaoTexto}>Galeria</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoAcao} onPress={() => selecionarImagem('camera')}>
                    <Text style={styles.botaoAcaoTexto}>Câmera</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.botaoSalvar, (!imagem || !tipoExame || loading) && styles.botaoSalvarDesabilitado]}
                onPress={handleSave}
                disabled={!imagem || !tipoExame || loading}
            >
                <Text style={styles.botaoSalvarTexto}>{loading ? 'Salvando...' : 'Salvar Exame'}</Text>
            </TouchableOpacity>
            <View style={styles.separator}>
                <Text style={styles.separatorText}>Meus Exames Enviados</Text>
            </View>
        </View>
    );

    const renderExameItem = ({ item }) => (
        <View style={styles.exameItemContainer}>
            <Image source={{ uri: `http://SEU_IP_AQUI:8000/storage/${item.image_path}` }} style={styles.exameThumbnail} />
            <View style={styles.exameInfo}>
                <Text style={styles.exameTipo} numberOfLines={2}>{item.tipo_exame}</Text>
                <Text style={styles.exameData}>Enviado em: {new Date(item.created_at).toLocaleDateString('pt-BR')}</Text>
            </View>
            <View style={styles.exameActions}>
                <TouchableOpacity onPress={() => { setExameSelecionado(item); setNovoTipoExame(item.tipo_exame); setModalUpdateVisivel(true); }}>
                    <Text style={styles.actionTextEdit}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={styles.actionTextDelete}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {loadingExames ? (
                <ActivityIndicator size="large" color="#0d214f" style={{ flex: 1 }}/>
            ) : (
                <FlatList
                    data={listaExames}
                    renderItem={renderExameItem}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={renderUploadForm}
                    ListEmptyComponent={() => <Text style={styles.listaVazia}>Você ainda não enviou nenhum exame.</Text>}
                />
            )}

            {/* Modal para selecionar o tipo de exame (do formulário) */}
            <Modal animationType="slide" transparent={true} visible={modalVisivel} onRequestClose={() => setModalVisivel(false)}>
                {/* ... O JSX do seu modal de seleção de tipo de exame ... */}
            </Modal>
            
            {/* Modal para ATUALIZAR o exame */}
            <Modal visible={modalUpdateVisivel} transparent={true} animationType="slide" onRequestClose={() => setModalUpdateVisivel(false)}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitulo}>Editar Tipo de Exame</Text>
                        <TextInput style={styles.inputModal} value={novoTipoExame} onChangeText={setNovoTipoExame} placeholder="Novo tipo de exame" />
                        <View style={styles.modalButtonContainer}>
                            <TouchableOpacity style={styles.modalButton} onPress={handleUpdate}>
                                <Text style={styles.modalButtonText}>Salvar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.modalButtonCancel]} onPress={() => setModalUpdateVisivel(false)}>
                                <Text style={styles.modalButtonText}>Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}