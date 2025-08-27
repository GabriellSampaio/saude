import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import styles from './style';

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
                { }
                
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

                { }
            </ScrollView>
        </SafeAreaView>
    );
}
export default Home;
