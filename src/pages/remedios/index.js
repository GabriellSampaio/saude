import React, { useState, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator, Image, Alert, Modal, ScrollView, Animated } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import api from '../../services/api';
import Header from '../../components/Header';
import styles from './style';

const REMEDIOS_DISPONIVEIS = [
    { 
        id: 1, 
        nome: 'Paracetamol', 
        icon: '💊',
        descricao: 'Analgésico e antipirético',
        cor: '#FF6B9D'
    },
    { 
        id: 2, 
        nome: 'Dipirona', 
        icon: '💊',
        descricao: 'Analgésico e antitérmico',
        cor: '#4ECDC4'
    },
    { 
        id: 3, 
        nome: 'Ibuprofeno', 
        icon: '💊',
        descricao: 'Anti-inflamatório',
        cor: '#95E1D3'
    },
];

const CUSTOM_MAP_STYLE = [
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "featureType": "transit",
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    }
];

const RemediosScreen = ({ navigation }) => {
    const [remedioSelecionado, setRemedioSelecionado] = useState(null);
    const [ubsProximas, setUbsProximas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [isUbsModalVisible, setUbsModalVisible] = useState(false);
    const [ubsSelecionada, setUbsSelecionada] = useState(null);
    
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(300)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current;

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
        
        // Animações do modal
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(slideAnim, {
                toValue: 0,
                tension: 50,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            })
        ]).start();
    };

    const handleCloseModal = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 300,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 0.9,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => {
            setUbsModalVisible(false);
            fadeAnim.setValue(0);
            slideAnim.setValue(300);
            scaleAnim.setValue(0.9);
        });
    };

    const calcularDistancia = (lat1, lon1, lat2, lon2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                  Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return (R * c).toFixed(1);
    };

    const renderSelecaoRemedio = () => (
        <View style={styles.listContainer}>
            <View style={styles.headerSection}>
                <Text style={styles.mainTitle}>🏥 Farmácia Popular</Text>
                <Text style={styles.subtitle}>Encontre medicamentos gratuitos perto de você</Text>
            </View>
            
            <Text style={styles.sectionTitle}>Selecione o medicamento:</Text>
            
            <View style={styles.remediosGrid}>
                {REMEDIOS_DISPONIVEIS.map((remedio) => (
                    <TouchableOpacity
                        key={remedio.id}
                        style={[styles.remedioCard, { borderLeftColor: remedio.cor }]}
                        onPress={() => buscarUbs(remedio)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.remedioIconContainer, { backgroundColor: remedio.cor + '20' }]}>
                            <Text style={styles.remedioIcon}>{remedio.icon}</Text>
                        </View>
                        <View style={styles.remedioInfo}>
                            <Text style={styles.remedioNome}>{remedio.nome}</Text>
                            <Text style={styles.remedioDescricao}>{remedio.descricao}</Text>
                        </View>
                        <Text style={styles.remedioArrow}>→</Text>
                    </TouchableOpacity>
                ))}
            </View>
            
            <View style={styles.infoBox}>
                <Text style={styles.infoIcon}>ℹ️</Text>
                <Text style={styles.infoText}>
                    Todos os medicamentos são disponibilizados gratuitamente pelo SUS
                </Text>
            </View>
        </View>
    );

    const renderMapa = () => (
        <View style={styles.mapContainer}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                customMapStyle={CUSTOM_MAP_STYLE}
                initialRegion={{
                    latitude: userLocation.latitude,
                    longitude: userLocation.longitude,
                    latitudeDelta: 0.15,
                    longitudeDelta: 0.15,
                }}
                showsUserLocation={true}
                showsMyLocationButton={false}
            >
                {ubsProximas.map(ubs => (
                    <Marker
                        key={ubs.id}
                        coordinate={{
                            latitude: parseFloat(ubs.latitude),
                            longitude: parseFloat(ubs.longitude),
                        }}
                        onPress={() => handleOpenModal(ubs)}
                    >
                        <View style={styles.customMarker}>
                            <View style={[styles.markerPulse, { backgroundColor: remedioSelecionado?.cor }]} />
                            <View style={[styles.markerPin, { backgroundColor: remedioSelecionado?.cor }]}>
                                <Text style={styles.markerText}>{remedioSelecionado?.icon}</Text>
                            </View>
                        </View>
                    </Marker>
                ))}
            </MapView>
            
            {/* Info Card Flutuante */}
            <View style={styles.floatingInfoCard}>
                <View style={[styles.floatingDot, { backgroundColor: remedioSelecionado?.cor }]} />
                <Text style={styles.floatingCardTitle}>{remedioSelecionado?.nome}</Text>
                <Text style={styles.floatingCardSubtitle}>{ubsProximas.length} locais encontrados</Text>
            </View>
            
            {/* Botão Voltar */}
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => { 
                    setUbsProximas([]); 
                    setRemedioSelecionado(null); 
                }}
                activeOpacity={0.8}
            >
                <Text style={styles.backButtonIcon}>←</Text>
                <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
            
            {/* Lista de UBS na parte inferior */}
            <View style={styles.ubsListContainer}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.ubsListContent}
                >
                    {ubsProximas.map((ubs) => {
                        const distancia = calcularDistancia(
                            userLocation.latitude,
                            userLocation.longitude,
                            parseFloat(ubs.latitude),
                            parseFloat(ubs.longitude)
                        );
                        
                        return (
                            <TouchableOpacity
                                key={ubs.id}
                                style={styles.ubsListCard}
                                onPress={() => handleOpenModal(ubs)}
                                activeOpacity={0.9}
                            >
                                <View style={styles.ubsListCardHeader}>
                                    <View style={[styles.ubsListDot, { backgroundColor: remedioSelecionado?.cor }]} />
                                    <Text style={styles.ubsListDistance}>{distancia} km</Text>
                                </View>
                                <Text style={styles.ubsListName} numberOfLines={2}>{ubs.nome}</Text>
                                <View style={styles.ubsListFooter}>
                                    <Text style={styles.ubsListStock}>
                                        Estoque: <Text style={styles.ubsListStockValue}>{ubs.pivot?.quantidade ?? 'N/D'}</Text>
                                    </Text>
                                    <Text style={styles.ubsListArrow}>→</Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Farmácias Próximas" navigation={navigation} />
            
            {loading ? (
                <View style={styles.loadingContainer}>
                    <View style={styles.loadingCard}>
                        <ActivityIndicator size="large" color="#4A90E2" />
                        <Text style={styles.loadingText}>Buscando farmácias próximas...</Text>
                        <Text style={styles.loadingSubtext}>Aguarde um momento</Text>
                    </View>
                </View>
            ) : (
                remedioSelecionado ? renderMapa() : renderSelecaoRemedio()
            )}

            <Modal
                animationType="none"
                transparent={true}
                visible={isUbsModalVisible}
                onRequestClose={handleCloseModal}
            >
                <Animated.View 
                    style={[
                        styles.modalOverlay,
                        { opacity: fadeAnim }
                    ]}
                >
                    <TouchableOpacity 
                        style={styles.modalBackdrop} 
                        activeOpacity={1} 
                        onPress={handleCloseModal}
                    />
                    
                    <Animated.View 
                        style={[
                            styles.modalContainer,
                            {
                                transform: [
                                    { translateY: slideAnim },
                                    { scale: scaleAnim }
                                ]
                            }
                        ]}
                    >
                        <View style={styles.modalHandle} />
                        
                        {ubsSelecionada && (
                            <>
                                {ubsSelecionada.foto_url ? (
                                    <Image 
                                        source={{ uri: `${api.defaults.baseURL.replace('/api', '')}/storage/${ubsSelecionada.foto_url}` }} 
                                        style={styles.modalImage} 
                                    />
                                ) : (
                                    <View style={[styles.modalImagePlaceholder, { backgroundColor: remedioSelecionado?.cor + '20' }]}>
                                        <Text style={styles.modalImagePlaceholderText}>🏥</Text>
                                    </View>
                                )}
                                
                                <ScrollView 
                                    style={styles.modalScroll}
                                    showsVerticalScrollIndicator={false}
                                >
                                    <Text style={styles.modalTitle}>{ubsSelecionada.nome}</Text>
                                    
                                    <View style={styles.modalInfoGrid}>
                                        <View style={[styles.modalInfoCard, { borderLeftColor: remedioSelecionado?.cor }]}>
                                            <Text style={styles.modalInfoLabel}>Medicamento</Text>
                                            <View style={styles.modalInfoValueContainer}>
                                                <Text style={styles.modalInfoIcon}>{remedioSelecionado?.icon}</Text>
                                                <Text style={styles.modalInfoValue}>{remedioSelecionado?.nome}</Text>
                                            </View>
                                        </View>
                                        
                                        <View style={[styles.modalInfoCard, { borderLeftColor: '#27AE60' }]}>
                                            <Text style={styles.modalInfoLabel}>Estoque Disponível</Text>
                                            <Text style={styles.modalInfoValue}>
                                                {ubsSelecionada.pivot?.quantidade ?? 'N/D'} unidades
                                            </Text>
                                        </View>
                                        
                                        {userLocation && (
                                            <View style={[styles.modalInfoCard, { borderLeftColor: '#3498DB' }]}>
                                                <Text style={styles.modalInfoLabel}>Distância</Text>
                                                <Text style={styles.modalInfoValue}>
                                                    {calcularDistancia(
                                                        userLocation.latitude,
                                                        userLocation.longitude,
                                                        parseFloat(ubsSelecionada.latitude),
                                                        parseFloat(ubsSelecionada.longitude)
                                                    )} km
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                    
                                    {ubsSelecionada.descricao && (
                                        <View style={styles.modalDescriptionContainer}>
                                            <Text style={styles.modalDescriptionLabel}>ℹ️ Informações</Text>
                                            <Text style={styles.modalDescription}>{ubsSelecionada.descricao}</Text>
                                        </View>
                                    )}
                                </ScrollView>
                                
                                <TouchableOpacity 
                                    style={[styles.modalCloseButton, { backgroundColor: remedioSelecionado?.cor }]} 
                                    onPress={handleCloseModal}
                                    activeOpacity={0.8}
                                >
                                    <Text style={styles.modalCloseButtonText}>Fechar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </Animated.View>
                </Animated.View>
            </Modal>
        </SafeAreaView>
    );
};

export default RemediosScreen;