import { NavigationContainer } from '@react-navigation/native'
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import EcommerceHomeScreen from '../screens/e-commerce/EcommerceHomeScreen'
import PlusAchCommandeScreen from '../screens/e-commerce/PlusAchCommandeScreen'
import HomeScreen from '../screens/home/HomeScreen'

export default function RootNavigator() {
          const Stack = createStackNavigator()
          return (
                    <NavigationContainer 
                              theme={{
                                        colors: {
                                                  background: "#fff",
                                        },
                              }}>
                              <Stack.Navigator screenOptions={{ headerShown: false }}>
                                        <Stack.Screen name="HomeScreen" component={HomeScreen} />
                                        <Stack.Screen name="EcommerceHomeScreen" component={EcommerceHomeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}} />
                                        <Stack.Screen name='PlusAchCommandeScreen' component={PlusAchCommandeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}}/>
                              </Stack.Navigator>
                    </NavigationContainer>
          )
}