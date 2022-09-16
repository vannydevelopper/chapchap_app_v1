import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Text, View } from "react-native";
import LoginScreen from "./screens/welcome/LoginScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import DrawerScreen from "./screens/homeDrawer/DrawerScreen";
import DetailAchatScreen from "./screens/homeDrawer/DetailsAchatScreen";

const Stack = createStackNavigator()

export default function AppContainer() {
        return (
                <NavigationContainer>
                        <Stack.Navigator>
                                <Stack.Screen name="detail" component={DetailAchatScreen} options={{ headerShown: false }} />
                                <Stack.Screen name="drawer" component={DrawerScreen} options={{ headerShown: false }} />
                                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        </Stack.Navigator>
                </NavigationContainer>
        )
}