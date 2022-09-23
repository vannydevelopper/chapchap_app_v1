import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
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
                              </Stack.Navigator>
                    </NavigationContainer>
          )
}