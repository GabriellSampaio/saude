import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },

    // ============ TELA DE SELEÇÃO ============
    listContainer: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    headerSection: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 10,
    },
    mainTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#2C3E50',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#7F8C8D',
        fontWeight: '500',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        paddingHorizontal: 24,
        marginTop: 24,
        marginBottom: 16,
    },
    remediosGrid: {
        paddingHorizontal: 16,
    },
    remedioCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 8,
        marginVertical: 8,
        padding: 20,
        borderRadius: 20,
        borderLeftWidth: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 5,
    },
    remedioIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    remedioIcon: {
        fontSize: 28,
    },
    remedioInfo: {
        flex: 1,
    },
    remedioNome: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 4,
    },
    remedioDescricao: {
        fontSize: 14,
        color: '#7F8C8D',
        fontWeight: '500',
    },
    remedioArrow: {
        fontSize: 24,
        color: '#BDC3C7',
        fontWeight: '300',
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F4F8',
        margin: 24,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#B0D4E3',
    },
    infoIcon: {
        fontSize: 24,
        marginRight: 12,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: '#2C3E50',
        lineHeight: 20,
        fontWeight: '500',
    },

    // ============ LOADING ============
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    loadingCard: {
        backgroundColor: '#FFFFFF',
        padding: 40,
        borderRadius: 24,
        alignItems: 'center',
        shadowColor: "#4A90E2",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
        elevation: 10,
    },
    loadingText: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
    },
    loadingSubtext: {
        marginTop: 8,
        fontSize: 14,
        color: '#7F8C8D',
        fontWeight: '500',
    },

    // ============ MAPA ============
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    
    // Marcador customizado
    customMarker: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerPulse: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderRadius: 25,
        opacity: 0.3,
    },
    markerPin: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    markerText: {
        fontSize: 20,
    },

    // Card flutuante de info
    floatingInfoCard: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    floatingDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 12,
    },
    floatingCardTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
    },
    floatingCardSubtitle: {
        fontSize: 13,
        color: '#7F8C8D',
        fontWeight: '600',
    },

    // Botão voltar
    backButton: {
        position: 'absolute',
        top: 90,
        left: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    backButtonIcon: {
        fontSize: 18,
        marginRight: 8,
        color: '#2C3E50',
    },
    backButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#2C3E50',
    },

    // Lista horizontal de UBS
    ubsListContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'transparent',
        paddingTop: 12,
        paddingBottom: 20,
    },
    ubsListContent: {
        paddingHorizontal: 16,
    },
    ubsListCard: {
        backgroundColor: '#FFFFFF',
        width: width * 0.7,
        marginHorizontal: 8,
        padding: 16,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },
    ubsListCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    ubsListDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 8,
    },
    ubsListDistance: {
        fontSize: 13,
        fontWeight: '700',
        color: '#7F8C8D',
    },
    ubsListName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 12,
        lineHeight: 22,
    },
    ubsListFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ubsListStock: {
        fontSize: 13,
        color: '#7F8C8D',
        fontWeight: '600',
    },
    ubsListStockValue: {
        fontWeight: '700',
        color: '#27AE60',
    },
    ubsListArrow: {
        fontSize: 20,
        color: '#BDC3C7',
    },

    // ============ MODAL ============
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
    },
    modalBackdrop: {
        ...StyleSheet.absoluteFillObject,
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        maxHeight: height * 0.85,
        paddingBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.25,
        shadowRadius: 20,
        elevation: 20,
    },
    modalHandle: {
        width: 50,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 16,
    },
    modalImage: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalImagePlaceholder: {
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    modalImagePlaceholderText: {
        fontSize: 64,
    },
    modalScroll: {
        paddingHorizontal: 24,
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: '800',
        color: '#2C3E50',
        marginTop: 20,
        marginBottom: 20,
        lineHeight: 32,
    },
    modalInfoGrid: {
        marginBottom: 20,
    },
    modalInfoCard: {
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderLeftWidth: 4,
    },
    modalInfoLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#7F8C8D',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 8,
    },
    modalInfoValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalInfoIcon: {
        fontSize: 20,
        marginRight: 8,
    },
    modalInfoValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2C3E50',
        flex: 1,
    },
    modalDescriptionContainer: {
        marginTop: 8,
        marginBottom: 20,
    },
    modalDescriptionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: '#2C3E50',
        marginBottom: 12,
    },
    modalDescription: {
        fontSize: 15,
        color: '#5D6D7E',
        lineHeight: 24,
        fontWeight: '500',
    },
    modalCloseButton: {
        marginHorizontal: 24,
        marginTop: 12,
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    modalCloseButtonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});

export default styles;