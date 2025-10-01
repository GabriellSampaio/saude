import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: '#0d214f', 
    },
    container: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        backgroundColor: '#0d214f',
    },
    backButton: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
    },
    backButtonText: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
});

export default styles;