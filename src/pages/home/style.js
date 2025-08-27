import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: '#2b6cb0',
    },
    backButton: {
        position: 'absolute',
        left: 15,
        padding: 5,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 24,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    gridContainer: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    serviceButton: {
        backgroundColor: '#fff',
        borderRadius: 15,
        width: '48%', // 48% para ter um espaço entre os botões
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    serviceIcon: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    serviceLabel: {
        marginTop: 5,
        fontSize: 16,
        color: '#333',
    },
});
export default styles;