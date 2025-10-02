import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert, ScrollView, Animated, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../../components/Header';
import styles from './style';

const Sangue = ({ navigation }) => {
   

    return (
        <SafeAreaView style={styles.safeArea}>
            <Header title="Hidratação Diária" navigation={navigation} />
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>teste</Text>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Sangue;