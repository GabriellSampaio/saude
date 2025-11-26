import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    container: {
        flex: 1,
    },
    // DASHBOARD (HERO)
    heroContainer: {
        padding: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 10,
        marginBottom: 10,
    },
    shieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    shieldRing: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginRight: 20,
    },
    shieldIcon: {
        fontSize: 30,
    },
    statsContainer: {
        flex: 1,
    },
    statsLabel: {
        color: '#B0C4DE',
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 1,
        fontWeight: '600',
    },
    statsValue: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: '800',
        marginBottom: 5,
    },
    progressBarBg: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 3,
        width: '100%',
    },
    progressBarFill: {
        height: '100%',
        borderRadius: 3,
    },
    miniStatsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0,0,0,0.2)',
        borderRadius: 15,
        padding: 15,
    },
    miniStat: {
        alignItems: 'center',
    },
    miniStatValue: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    miniStatLabel: {
        color: '#B0C4DE',
        fontSize: 12,
    },
    divider: {
        width: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },

    // LISTA
    listContent: {
        padding: 20,
        paddingBottom: 100,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        marginBottom: 16,
        padding: 20,
        borderLeftWidth: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: '#2C3E50',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
    },
    cardDetails: {
        marginBottom: 12,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 4,
        alignItems: 'center',
    },
    detailLabel: {
        fontSize: 14,
        color: '#7F8C8D',
        width: 50,
    },
    detailValue: {
        fontSize: 14,
        color: '#34495E',
        fontWeight: '600',
        flex: 1,
    },
    batchContainer: {
        backgroundColor: '#F8F9FA',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    batchText: {
        fontSize: 11,
        color: '#95A5A6',
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    // EMPTY STATE
    emptyContainer: {
        alignItems: 'center',
        marginTop: 50,
    },
    emptyEmoji: {
        fontSize: 50,
        marginBottom: 10,
        opacity: 0.5,
    },
    emptyText: {
        color: '#95A5A6',
        fontSize: 16,
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
        marginBottom: 25,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: '800',
        color: '#2C3E50',
    },
    closeButton: {
        padding: 5,
    },
    label: {
        fontSize: 13,
        fontWeight: '700',
        color: '#7F8C8D',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: '#F8F9FA',
        borderWidth: 1,
        borderColor: '#E0E6ED',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: '#2C3E50',
        marginBottom: 20,
    },
    rowInputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textArea: {
        height: 80,
        textAlignVertical: 'top',
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    statusOption: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#E0E6ED',
        marginHorizontal: 4,
        backgroundColor: '#FFF',
    },
    statusOptionText: {
        fontSize: 14,
        color: '#7F8C8D',
    },
    saveButton: {
        marginTop: 10,
        marginBottom: 20,
        shadowColor: "#0d214f",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    saveButtonGradient: {
        paddingVertical: 16,
        borderRadius: 16,
        alignItems: 'center',
    },
    saveButtonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '800',
    },
 
    selectionItem: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    selectionItemText: {
        fontSize: 16,
        color: '#333',
    }
});

export default styles;