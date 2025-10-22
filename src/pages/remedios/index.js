import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Image, Alert, Modal, ScrollView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import api from '../../services/api';
import Header from '../../components/Header';
import styles from './style';

const REMEDIOS_DISPONIVEIS = [
    { id: 1, nome: 'Paracetamol' },
    { id: 2, nome: 'Dipirona' },
    { id: 3, nome: 'Ibuprofeno' },
];

const RemediosScreen = ({ navigation }) => {
    const [remedioSelecionado, setRemedioSelecionado] = useState(null);
    const [ubsProximas, setUbsProximas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [isUbsModalVisible, setUbsModalVisible] = useState(false);
    const [ubsSelecionada, setUbsSelecionada] = useState(null);

    const buscarUbs = async (remedio) => {
        setLoading(true);
        setRemedioSelecionado(remedio);
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("Permissão Negada", "Precisamos da sua localização para encontrar farmácias próximas.");
            setLoading(false);
            return;
        }
        try {
            const location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
            const response = await api.get(`/remedios/${remedio.id}/ubs`, {
                params: {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }
            });
            if (response.data.length === 0) {
                Alert.alert("Nenhum resultado", "Nenhuma unidade de saúde com este remédio foi encontrada em um raio de 30km.");
                setRemedioSelecionado(null);
            } else {
                setUbsProximas(response.data);
            }
        } catch (error) {
            console.error("Erro ao buscar UBS:", error.response);
            Alert.alert("Erro", "Não foi possível buscar as unidades de saúde.");
            setRemedioSelecionado(null);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (ubs) => {
        setUbsSelecionada(ubs);
        setUbsModalVisible(true);
    };

    const renderSelecaoRemedio = () => (
        <View style={styles.listContainer}>
            <Text style={styles.title}>Qual remédio você procura?</Text>
            {REMEDIOS_DISPONIVEIS.map((remedio) => (
                <TouchableOpacity
                    key={remedio.id}
                    style={styles.remedioButton}
                    onPress={() => buscarUbs(remedio)}
                >
                    <Text style={styles.remedioButtonText}>{remedio.nome}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );

    const renderMapa = () => (
        <View style={styles.mapContainer}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                }}
            >
                <Marker coordinate={userLocation} title="Sua Localização" pinColor="blue" />
                {ubsProximas.map(ubs => (
                    <Marker
                        key={ubs.id}
                        coordinate={{
                            latitude: parseFloat(ubs.latitude),
                            longitude: parseFloat(ubs.longitude),
                        }}
                        onPress={() => handleOpenModal(ubs)}
                    >
                        <Image source={require('../../../assets/hospital_pin.png')} style={styles.markerIcon} />
                    </Marker>
                ))}
            </MapView>
            <TouchableOpacity style={styles.backToSelectionButton} onPress={() => { setUbsProximas([]); setRemedioSelecionado(null); }}>
                <Text style={styles.backToSelectionButtonText}>← Voltar para seleção</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Farmácias Próximas" navigation={navigation} />
            
            {loading ? (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#0d214f" />
                    <Text style={{ marginTop: 10, color: '#363F5F' }}>Buscando sua localização...</Text>
                </View>
            ) : (
                remedioSelecionado ? renderMapa() : renderSelecaoRemedio()
            )}

            <Modal
                animationType="slide"
                transparent={true}
                visible={isUbsModalVisible}
                onRequestClose={() => setUbsModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        {ubsSelecionada && (
                            <>
                                {ubsSelecionada.foto_url && (
                                    <Image 
                                        source={{ uri: `${api.defaults.baseURL.replace('/api', '')}/storage/${ubsSelecionada.foto_url}` }} 
                                        style={styles.modalImage} 
                                    />
                                )}
                                <Text style={styles.modalTitle}>{ubsSelecionada.nome}</Text>
                                <ScrollView style={{ width: '100%' }}>
                                    <View style={styles.modalRow}>
                                        <Text style={styles.modalLabel}>Remédio:</Text>
                                        <Text style={styles.modalValue}>{remedioSelecionado?.nome}</Text>
                                    </View>
                                    <View style={styles.modalRow}>
                                        <Text style={styles.modalLabel}>Estoque:</Text>
                                        <Text style={styles.modalValue}>{ubsSelecionada.pivot?.quantidade ?? 'N/D'}</Text>
                                    </View>
                                    <Text style={styles.modalDescription}>{ubsSelecionada.descricao}</Text>
                                </ScrollView>
                                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setUbsModalVisible(false)}>
                                    <Text style={styles.modalCloseButtonText}>Fechar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default RemediosScreen;  