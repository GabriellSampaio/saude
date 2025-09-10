import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastro from "./src/pages/cadastro"; 
import Home from "./src/pages/home"; 
import Login from "./src/pages/login"; 
import Splash from "./src/pages/splash"; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {}
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        {}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
