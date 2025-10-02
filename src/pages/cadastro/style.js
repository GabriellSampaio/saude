import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'flex-end',
    },
    voltarContainer: {
        position: 'absolute',
        top: -45,
        left: -45,
        zIndex: 10,
    },
    voltarCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#0158c8',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    voltarText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    formContainer: {
        backgroundColor: '#0158c8',
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        padding: 25,
        paddingTop: 40,
        width: '101%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#fff",
        marginBottom: 30,
        alignSelf: 'center',
    },
    inputGroup: {
        width: "100%",
        marginBottom: 20,
    },
    label: {
        color: '#E0E0E0',
        fontSize: 12,
        marginBottom: 5,
        marginLeft: 5,
    },
    input: {
        backgroundColor: "#8f8e8e84",
        padding: 15,
        borderRadius: 20,
        color: '#fff',
        fontSize: 16,
    },
    botao: {
        backgroundColor: "#fff",
        padding: 18,
        borderRadius: 25,
        width: "100%",
        alignItems: "center",
        marginTop: 10,
    },
    botaoTexto: {
        color: "#0a66c2",
        fontWeight: "bold",
        fontSize: 18,
    },
    loginContainer: {
        marginTop: 25,
        alignItems: 'center',
    },
    possuiContaText: {
        color: '#E0E0E0',
        fontSize: 14,
    },
    loginLink: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
    },
    errorText: {
        color: '#ffdddd',
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 14,
    },
});

export default styles;