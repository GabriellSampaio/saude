import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
    },
    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0a66c2',
        marginTop: 20,
        marginBottom: 8,
    },
    subtitulo: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    previewContainer: {
        width: '100%',
        height: 250,
        backgroundColor: '#f0f8ff',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#d1e8ff',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        overflow: 'hidden',
    },
    placeholderContainer: {
        alignItems: 'center',
    },
    placeholderIcon: {
        fontSize: 50,
        color: '#0a66c2',
        opacity: 0.5,
    },
    placeholderText: {
        fontSize: 16,
        color: '#0a66c2',
        opacity: 0.7,
        marginTop: 10,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    botoesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 40,
    },
    botaoAcao: {
        backgroundColor: '#0a66c2',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    botaoAcaoTexto: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
    botaoSalvar: {
        backgroundColor: "#fff",
        paddingVertical: 18,
        width: "100%",
        alignItems: "center",
        borderRadius: 30,
        borderWidth: 2,
        borderColor: '#0a66c2',
    },
    botaoSalvarDesabilitado: {
        backgroundColor: '#e9ecef',
        borderColor: '#ced4da',
    },
    botaoSalvarTexto: {
        color: "#0a66c2",
        fontWeight: "bold",
        fontSize: 18,
    },
});

export default styles;