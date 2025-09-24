import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    header: {
        paddingTop: 50,
        paddingBottom: 30,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
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
        shadowOffset: {
            width: 0,
            height: 4,
        },
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
});

export default styles;