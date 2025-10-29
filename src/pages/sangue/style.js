import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    safeArea: { 
        flex: 1, 
        backgroundColor: '#FFFFFF' 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF1F1',
    },
    container: { 
        flex: 1,
        backgroundColor: '#FFF1F1',
    },
    scrollContent: { 
        flexGrow: 1, 
        paddingBottom: 30 
    },
    content: { 
        flex: 1, 
        padding: 20,
        alignItems: 'center',
    },
    bloodBagContainer: {
        marginVertical: 40,
        alignItems: 'center',
    },
    bloodBag: {
        width: 150,
        height: 220,
        backgroundColor: '#E74C3C',
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 10,
    },
    bloodBagTop: {
        position: 'absolute',
        top: -15,
        width: 60,
        height: 30,
        backgroundColor: '#C0392B',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        borderBottomWidth: 5,
        borderBottomColor: '#A93226',
    },
    bloodTypeText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 5,
    },
    infoText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#A93226',
        marginBottom: 25,
        textAlign: 'center',
    },
    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 30,
    },
    bloodTypeButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 2,
        borderColor: '#FFCDD2',
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        margin: 8,
        minWidth: 70,
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#E74C3C',
        borderColor: '#C0392B',
    },
    bloodTypeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#C0392B',
    },
    selectedButtonText: {
        color: '#FFFFFF',
    },
    saveButton: {
        width: '90%',
        backgroundColor: '#27AE60',
        paddingVertical: 18,
        borderRadius: 15,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    saveButtonDisabled: {
        backgroundColor: '#BDC3C7',
        elevation: 0,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;