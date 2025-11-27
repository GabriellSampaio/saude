import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
    // Avatar no Header
    profileButton: {
        padding: 5,
    },
    headerAvatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    headerAvatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    headerAvatarText: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: 'bold',
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
        padding: 15, // Aumentei um pouco o padding
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
    // --- AQUI FOI O AJUSTE ---
    serviceIcon: {
        width: '85%', // Aumentado de 45% para 85%
        height: '85%',
        resizeMode: 'contain',
        marginBottom: 10, // Um pouco mais de espaço entre o ícone e o texto
    },
    serviceLabel: {
        fontSize: 18, // Levemente reduzido para equilibrar com o ícone maior
        fontWeight: 'bold',
        color: '#363F5F',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    // Modal (Drawer)
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
        flexDirection: 'row', 
    },
    drawerContainer: {
        width: width * 0.8,
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    drawerGradient: {
        flex: 1,
        padding: 20,
    },
    drawerHeader: {
        alignItems: 'center',
        marginBottom: 30,
        marginTop: 40,
    },
    closeButton: {
        position: 'absolute',
        top: -20,
        right: 0,
        padding: 10,
    },
    closeButtonText: {
        color: '#FFF',
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileSection: {
        alignItems: 'center',
    },
    avatarContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        overflow: 'hidden', 
    },
    drawerAvatar: {
        width: '100%',
        height: '100%',
    },
    avatarText: {
        fontSize: 32,
        color: '#FFF',
        fontWeight: 'bold',
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 5,
    },
    profileLocation: {
        fontSize: 14,
        color: '#B0C4DE',
    },
    menuSection: {
        flex: 1,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    menuIcon: {
        fontSize: 20,
        marginRight: 15,
        width: 30,
        textAlign: 'center',
    },
    menuText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: '500',
    },
});

export default styles;