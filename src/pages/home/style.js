import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 24,
        color: '#0a66c2',
        fontWeight: 'bold',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 15,
        color: '#333',
    },
    gridContainer: {
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    serviceButton: {
        flex: 1,
        margin: 5,
        height: 150,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    serviceIcon: {
        flex: 1,
        width: '40%',
        resizeMode: 'contain',
    },
    serviceLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
});

export default styles;