import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./src/pages/splash";
import Login from "./src/pages/login";
import Cadastro from "./src/pages/cadastro";
import Home from "./src/pages/home";
import Exames from "./src/pages/exames";
import Remedios from "./src/pages/remedios"; 
import Alergias from "./src/pages/alergias"; 
import Agua from "./src/pages/agua";  
import Sangue from "./src/pages/sangue";       

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Cadastro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Exames" component={Exames} />
        <Stack.Screen name="Remedios" component={Remedios} />
        <Stack.Screen name="Alergias" component={Alergias} />
        <Stack.Screen name="Agua" component={Agua} />
        <Stack.Screen name="Sangue" component={Sangue} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}