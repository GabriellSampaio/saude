import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    listContainer: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#363F5F',
        marginBottom: 30,
        textAlign: 'center',
    },
    remedioButton: {
        width: '90%',
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        borderRadius: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    remedioButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#0d214f',
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerIcon: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
    },
    backToSelectionButton: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: '#e74c3c',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    backToSelectionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '60%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    modalImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
        marginBottom: 15,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    modalRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    modalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#555',
        marginRight: 5,
    },
    modalValue: {
        fontSize: 16,
        color: '#333',
    },
    modalDescription: {
        fontSize: 15,
        color: '#666',
        marginTop: 10,
        lineHeight: 22,
    },
    modalCloseButton: {
        marginTop: 20,
        backgroundColor: '#0d214f',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
    },
    modalCloseButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;