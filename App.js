import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import cadastro from "./src/pages/cadastro"; 
import home from "./src/pages/home"; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="cadastro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="home" component={home} />
        <Stack.Screen name="cadastro" component={cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
