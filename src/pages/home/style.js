import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    greetingText: {
        fontSize: 22,
        fontWeight: '300',
        color: '#E1E1E6',
    },
    userNameText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    menuButton: {
        padding: 10,
    },
    menuBar: {
        width: 25,
        height: 3,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
        marginVertical: 2,
    },
    gridContainer: {
        paddingHorizontal: 10,
        paddingTop: 20,
    },
    serviceButtonContainer: { 
        flex: 1,
        maxWidth: '50%', 
        padding: 8,
    },
    serviceButton: {
        width: '100%', 
        aspectRatio: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    serviceButtonPressed: {
        transform: [{ scale: 0.96 }],
        shadowOpacity: 0.05,
        elevation: 2,
    },
    serviceIcon: {
        width: '45%',
        height: '45%',
        resizeMode: 'contain',
        marginBottom: 10,
    },
    serviceLabel: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#363F5F',
        textAlign: 'center',
    },
    logoutButton: {
        marginHorizontal: 8,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#E74C3C',
        paddingVertical: 15,
        borderRadius: 20,
        alignItems: 'center',
    },
    logoutButtonText: {
        color: '#E74C3C',
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
        padding: 25,
        paddingBottom: 40,
        alignItems: 'center',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalLabel: {
        width: '80%',
        alignSelf: 'center',
        color: '#555',
        marginBottom: 5,
        fontSize: 14,
    },
    modalInput: {
        width: '80%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        fontSize: 16,
        borderRadius: 10,
        marginBottom: 15,
    },
    modalButtonSave: {
        width: '80%',
        backgroundColor: '#0d214f',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modalButtonClose: {
        width: '80%',
        backgroundColor: '#aaa',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalButtonCloseText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    deleteAccountButton: {
        marginTop: 30,
        padding: 10,
    },
    deleteAccountButtonText: {
        color: '#e74c3c',
        fontSize: 14,
        textDecorationLine: 'underline',
    }
});

export default styles;