import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

const AlergiasScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Tela de Alergias</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, color: 'blue' }}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AlergiasScreen;