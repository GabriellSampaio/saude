import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
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
            
            setUbsProximas(response.data);

        } catch (error) {
            console.error("Erro ao buscar UBS:", error);
            Alert.alert("Erro", "Não foi possível buscar as unidades de saúde.");
        } finally {
            setLoading(false);
        }
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
                // REMOVIDO o provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.2,
                    longitudeDelta: 0.2,
                }}
            >
                <Marker
                    coordinate={userLocation}
                    title="Sua Localização"
                    pinColor="blue"
                />
                {ubsProximas.map(ubs => (
                    <Marker
                        key={ubs.id}
                        coordinate={{
                            latitude: parseFloat(ubs.latitude),
                            longitude: parseFloat(ubs.longitude),
                        }}
                    >
                        <Callout tooltip>
                            <View style={styles.calloutContainer}>
                                <Text style={styles.calloutTitle}>{ubs.nome}</Text>
                                {ubs.foto_url && <Image source={{ uri: `${api.defaults.baseURL.replace('/api', '')}/storage/${ubs.foto_url}` }} style={styles.calloutImage} />}
                                <Text style={styles.calloutText}>Remédio: {remedioSelecionado.nome}</Text>
                                <Text style={styles.calloutText}>Estoque: {ubs.pivot.quantidade}</Text>
                                <Text style={styles.calloutDescription}>{ubs.descricao}</Text>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
            <TouchableOpacity style={styles.backToSelectionButton} onPress={() => setRemedioSelecionado(null)}>
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
        </SafeAreaView>
    );
};

export default RemediosScreen;