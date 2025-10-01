import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F0F4F8',
    },
    waterBackground: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#3498db',
        opacity: 0.7,
        zIndex: -1,
    },
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-between',
    },
    inputContainer: {
        alignItems: 'center',
        paddingTop: 20,
    },
    input: {
        width: '80%',
        borderBottomWidth: 2,
        borderBottomColor: '#363F5F',
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#363F5F',
    },
    calculateButton: {
        backgroundColor: '#0d214f',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    calculateButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    progressContainer: {
        alignItems: 'center',
    },
    consumedText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#0d214f',
    },
    goalText: {
        fontSize: 18,
        color: '#555',
    },
    remainingText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#0d214f',
    },
    bottomContainer: {
        paddingBottom: 20,
    },
    addActionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#363F5F',
        marginBottom: 15,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        padding: 15,
        borderRadius: 15,
        alignItems: 'center',
        width: '30%',
    },
    actionButtonText: {
        color: '#0d214f',
        fontWeight: 'bold',
    },
    resetButton: {
        marginTop: 20,
        alignSelf: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    resetButtonText: {
        color: '#c0392b',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;