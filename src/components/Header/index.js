import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './style';

const Header = ({ title, navigation, showBackButton = true }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {showBackButton && (
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Text style={styles.backButtonText}>←</Text>
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{title}</Text>
                {}
                {showBackButton && <View style={{ width: 40 }} />} 
            </View>
        </SafeAreaView>
    );
};

export default Header;