import { StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    container: {
        flex: 1,
    },
    headerGradient: {
        padding: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFF',
        marginBottom: 4,
    },
    headerSub: {
        fontSize: 14,
        color: '#E1E1E6',
        fontWeight: '500',
    },
    
    // TIMELINE & LISTA
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    timelineRow: {
        flexDirection: 'row',
        marginBottom: 0, // Espaço entre itens
    },
    timelineTime: {
        width: 50,
        alignItems: 'flex-end',
        marginRight: 10,
        paddingTop: 15,
    },
    timeText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2C3E50',
    },
    dateText: {
        fontSize: 11,
        color: '#95A5A6',
    },
    timelineLineContainer: {
        alignItems: 'center',
        width: 20,
    },
    timelineDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginTop: 18,
        zIndex: 2,
    },
    timelineLine: {
        flex: 1,
        width: 2,
        backgroundColor: '#E0E6ED',
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 1,
    },
    
    // CARD DO SINTOMA
    card: {
        flex: 1,
        backgroundColor: '#FFF',
        borderRadius: 16,
        marginBottom: 16,
        marginLeft: 10,
        flexDirection: 'row',
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 3,
    },
    intensityBar: {
        width: 6,
        height: '100%',
    },
    cardContent: {
        flex: 1,
        padding: 15,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    cardIcon: {
        fontSize: 22,
        marginRight: 8,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#34495E',
    },
    cardBadges: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    badge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    badgeText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    cardNotes: {
        fontSize: 13,
        color: '#7F8C8D',
        fontStyle: 'italic',
    },

    // FAB
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        shadowColor: "#0d214f",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 12,
        elevation: 10,
    },
    fabGradient: {
        width: 64,
        height: 64,
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fabIcon: {
        color: '#FFF',
        fontSize: 36,
        marginTop: -4,
    },

    // MODAL
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        padding: 25,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: '800',
        color: '#2C3E50',
    },
    closeButton: {
        fontSize: 20,
        color: '#95A5A6',
        padding: 5,
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
        color: '#7F8C8D',
        marginBottom: 10,
        marginTop: 10,
        textTransform: 'uppercase',
    },
    symptomsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    symptomButton: {
        width: '31%',
        backgroundColor: '#F8F9FA',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    symptomButtonSelected: {
        backgroundColor: '#E8F4F8',
        borderColor: '#3498DB',
    },
    symptomIcon: {
        fontSize: 24,
        marginBottom: 5,
    },
    symptomLabel: {
        fontSize: 11,
        color: '#363F5F',
        fontWeight: '600',
        textAlign: 'center',
    },
    symptomLabelSelected: {
        color: '#2980B9',
        fontWeight: '700',
    },
    input: {
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E0E6ED',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: '#2C3E50',
        marginBottom: 10,
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    intensityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    intensityButton: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        borderRadius: 10,
        borderWidth: 2,
        marginHorizontal: 4,
        backgroundColor: '#FFF',
    },
    intensityText: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: '#0d214f',
        borderRadius: 16,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
        shadowColor: "#0d214f",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 60,
    },
    emptyEmoji: {
        fontSize: 50,
        marginBottom: 15,
        opacity: 0.6,
    },
    emptyText: {
        color: '#95A5A6',
        fontSize: 16,
    },
});

export default styles;