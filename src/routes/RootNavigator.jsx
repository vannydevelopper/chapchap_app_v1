import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import HomeScreen from '../screens/home/HomeScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import EcommerceNavigator from './EcommerceNavigator'
import DrawerContent from '../components/app/DrawerContent';
import RestaurantNavigator from './RestaurantNavigator';

export default function RootNavigator() {
        const Drawer = createDrawerNavigator()
        return (
                <NavigationContainer
                        theme={{
                                colors: {
                                        background: "#fff",
                                },
                        }}>
                        <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={props => <DrawerContent {...props} />}>
                                <Drawer.Screen name='HomeScreen' component={HomeScreen} />
                                <Drawer.Screen name='EcommerceNavigator' component={EcommerceNavigator} />
                                <Drawer.Screen name='RestaurantNavigator' component={RestaurantNavigator} />
                        </Drawer.Navigator>
                </NavigationContainer>
        )
}