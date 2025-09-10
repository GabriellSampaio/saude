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
  
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        alignSelf: 'flex-start',
    },
    botaoSelecionarTipo: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        paddingVertical: 15,
        paddingHorizontal: 12,
        width: '100%',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    botaoSelecionarTipoTexto: {
        fontSize: 16,
        color: '#555',
    },

    
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escurecido
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    flatList: {
        width: '100%',
    },
    itemModal: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
    },
    itemModalTexto: {
        fontSize: 18,
    },
    botaoFecharModal: {
        marginTop: 15,
        backgroundColor: '#2196F3',
        borderRadius: 10,
        padding: 10,
        elevation: 2,
    },
    botaoFecharModalTexto: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;