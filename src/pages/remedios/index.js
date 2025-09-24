import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

const RemediosScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Tela de Remédios</Text>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, color: 'blue' }}>Voltar</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RemediosScreen;