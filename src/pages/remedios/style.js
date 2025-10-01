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
    backToSelectionButton: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        backgroundColor: '#e74c3c',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
    },
    backToSelectionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    calloutContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        width: 250,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    calloutTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    calloutImage: {
        width: '100%',
        height: 100,
        borderRadius: 5,
        marginBottom: 5,
    },
    calloutText: {
        fontSize: 14,
    },
    calloutDescription: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
});

export default styles;