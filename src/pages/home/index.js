import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';


const sangue = require('../../../assets/sangue.png');
const agua = require('../../../assets/agua.png');
const alergia = require('../../../assets/alergia.png');
const remedio = require('../../../assets/remedio.png');

const ServiceButton = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.serviceButton} onPress={onPress}>
        {icon && <Image source={icon} style={styles.serviceIcon} />}
        <Text style={styles.serviceLabel}>{label}</Text>
    </TouchableOpacity>
);


const Home = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                {}
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.backButtonText}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Serviços</Text>
            </View>

            <ScrollView contentContainerStyle={styles.gridContainer}>
                <View style={styles.row}>
                    <ServiceButton
                        icon={sangue}
                        label="Sangue"
                        onPress={() => console.log('Sangue Pressionado')}
                    />
                    <ServiceButton
                        icon={agua}
                        label="Água"
                        onPress={() => console.log('Água Pressionado')}
                    />
                </View>
                <View style={styles.row}>
                    <ServiceButton
                        icon={alergia}
                        label="Alergias"
                        onPress={() => console.log('Alergias Pressionado')}
                    />
                    <ServiceButton
                        icon={remedio}
                        label="Remédios"
                        onPress={() => console.log('Remédios Pressionado')}
                    />
                </View>
                <View style={styles.row}>
                    <ServiceButton
                        label="Pressão"
                        onPress={() => console.log('Pressão Pressionado')}
                    />
                    <ServiceButton
                        label="Outro Serviço"
                        onPress={() => console.log('Outro Serviço Pressionado')}
                    />
                </View>
                {}
            </ScrollView>
        </SafeAreaView>
    );
};


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
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    serviceLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
    },
});

export default Home;
