import React, { useState } from 'react'; // <-- AQUI ESTÁ A CORREÇÃO
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Alert,
    Modal,
    FlatList,
    Platform // Certifique-se de que o Platform está sendo importado
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../services/api'; 
import styles from './style';

const TIPOS_DE_EXAME = [
    { id: '1', nome: 'Hemograma Completo' }, { id: '2', nome: 'Raio-X (Tórax)' }, { id: '3', nome: 'Raio-X (Abdômen)' }, { id: '4', nome: 'Tomografia Computadorizada' }, { id: '5', nome: 'Ressonância Magnética' }, { id: '6', nome: 'Eletrocardiograma (ECG)' }, { id: '7', nome: 'Ultrassonografia' }, { id: '8', nome: 'Exame de Urina' }, { id: '9', nome: 'Exame de Fezes' }, { id: '10', nome: 'Glicemia em Jejum' },
];

export default function ExamesScreen({ navigation }) {
    const [imagem, setImagem] = useState(null);
    const [tipoExame, setTipoExame] = useState(null);
    const [modalVisivel, setModalVisivel] = useState(false);
    const [loading, setLoading] = useState(false);

    const selecionarImagem = async (modo) => {
        try {
            let resultado;
            const opcoes = {
                mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [4, 3], quality: 1,
            };

            if (modo === 'galeria') {
                resultado = await ImagePicker.launchImageLibraryAsync(opcoes);
            } else if (modo === 'camera') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permissão necessária', 'Você precisa permitir o acesso à câmera para tirar uma foto.');
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
            Alert.alert("Campos incompletos", "Por favor, anexe uma imagem e selecione o tipo de exame.");
            return;
        }

        setLoading(true);

        try {
            const userToken = await AsyncStorage.getItem('user_token');

            if (!userToken) {
                Alert.alert("Erro de Autenticação", "Usuário não autenticado. Por favor, faça login novamente.");
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
                formData.append('image', { 
                    uri: imagem, 
                    name: nomeArquivo, 
                    type: tipoArquivo 
                });
            }
            
            formData.append('tipo_exame', tipoExame.nome);
            
            const response = await api.post('/exames', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            console.log('Upload com sucesso:', response.data);
            Alert.alert("Sucesso", `Exame "${tipoExame.nome}" salvo com sucesso!`);
            navigation.goBack();

        } catch (error) {
            console.error("Erro no upload: ", JSON.stringify(error.response, null, 2));
            if (error.response && error.response.status === 401) {
                Alert.alert("Erro de Autenticação", "Sua sessão expirou. Por favor, faça o login novamente.");
            } else if (error.response) {
                Alert.alert("Erro ao Salvar", error.response.data.message || "Não foi possível salvar o exame.");
            } else {
                Alert.alert("Erro de Conexão", "Não foi possível se conectar ao servidor.");
            }
        } finally {
            setLoading(false);
        }
    };

    const renderItemExame = ({ item }) => (
        <TouchableOpacity style={styles.itemModal} onPress={() => { setTipoExame(item); setModalVisivel(false); }}>
            <Text style={styles.itemModalTexto}>{item.nome}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
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
                    <Text style={styles.botaoSalvarTexto}>
                        {loading ? 'Salvando...' : 'Salvar Exame'}
                    </Text>
                </TouchableOpacity>
            </View>

            <Modal animationType="slide" transparent={true} visible={modalVisivel} onRequestClose={() => { setModalVisivel(!modalVisivel); }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitulo}>Selecione o Tipo de Exame</Text>
                        <FlatList
                            data={TIPOS_DE_EXAME}
                            renderItem={renderItemExame}
                            keyExtractor={(item) => item.id}
                            style={styles.flatList}
                        />
                        <TouchableOpacity style={styles.botaoFecharModal} onPress={() => setModalVisivel(false)} >
                            <Text style={styles.botaoFecharModalTexto}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}