import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastro from "./src/pages/cadastro"; 
import Home from "./src/pages/home"; 
import Login from "./src/pages/login"; 
import Exames from './src/pages/exames';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {}
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        {}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Exames" component={Exames} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
