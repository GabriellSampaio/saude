import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from './style';

export default function ExamesScreen({ navigation }) {
    const [imagem, setImagem] = useState(null);

    const solicitarPermissoes = async () => {
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        const { status: galeriaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraStatus !== 'granted' || galeriaStatus !== 'granted') {
            Alert.alert('Permissão negada', 'É necessário permitir acesso à câmera e galeria.');
            return false;
        }
        return true;
    };

    const escolherDaGaleria = async () => {
        const temPermissao = await solicitarPermissoes();
        if (!temPermissao) return;

        const resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!resultado.canceled) {
            setImagem(resultado.assets[0].uri);
        }
    };

    const tirarFoto = async () => {
        const temPermissao = await solicitarPermissoes();
        if (!temPermissao) return;

        const resultado = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!resultado.canceled) {
            setImagem(resultado.assets[0].uri);
        }
    };

    const handleSave = () => {
        if (imagem) {
            Alert.alert("Sucesso", "Exame salvo! (Lógica de upload a ser implementada)");
            navigation.goBack();
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.titulo}>Anexar Exame</Text>
                <Text style={styles.subtitulo}>Envie uma foto do seu documento para análise</Text>

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
                    <TouchableOpacity style={styles.botaoAcao} onPress={escolherDaGaleria}>
                        <Text style={styles.botaoAcaoTexto}>Galeria</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoAcao} onPress={tirarFoto}>
                        <Text style={styles.botaoAcaoTexto}>Câmera</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity 
                    style={[styles.botaoSalvar, !imagem && styles.botaoSalvarDesabilitado]} 
                    onPress={handleSave}
                    disabled={!imagem}
                >
                    <Text style={styles.botaoSalvarTexto}>Salvar Exame</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}