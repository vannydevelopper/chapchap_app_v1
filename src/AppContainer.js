import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, ActivityIndicator } from "react-native";
import LoginScreen from "./screens/welcome/LoginScreen";
// import HomeScreen from "./screens/Home/HomeScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import AchatProduitsScreens from "./screens/e-commerce/AchatProduitsScreens";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../src/store/selectors/userSelector"
import { setUserAction } from "./store/actions/userActions"

const Stack = createStackNavigator()

export default function AppContainer() {          
        const dispatch = useDispatch()
        const user = useSelector(userSelector)
        const [userLoading, setUserLoading] = useState(true)
        useEffect(() => {
                (async function () {
                        const user = await AsyncStorage.getItem("user")
                        await AsyncStorage.removeItem('user')
                        dispatch(setUserAction(JSON.parse(user)))
                        setUserLoading(false)
                })()
        }, [dispatch])

        return ( userLoading ?
                <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                        <ActivityIndicator color="#007BFF" animating={userLoading} size='large' />
                              </View> :
                <>
                <NavigationContainer>
                        <Stack.Navigator>
                                {!user ?
                                        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/> :
                                        <Stack.Screen name="Achat" component={AchatProduitsScreens} options={{ headerShown: false }}/>
                                // <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
                                }
                        </Stack.Navigator>
                </NavigationContainer>
                </>
        )
}