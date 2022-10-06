import { DrawerActions, NavigationContainer } from '@react-navigation/native'
import React from 'react'
import HomeScreen from '../screens/home/HomeScreen'
import { createDrawerNavigator } from '@react-navigation/drawer';
import EcommerceNavigator from './EcommerceNavigator'
import DrawerContent from '../components/app/DrawerContent';
import RestaurantNavigator from './RestaurantNavigator';
import CommandeEmiseScreen from '../screens/e-commerce/CommandeEmiseScreen';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import PaginationHeader from '../components/ecommerce/main/PaginationHeader';
import ShippingInfoScreen from '../screens/e-commerce/ShippingInfoScreen';
import PaymentScreen from '../screens/e-commerce/PaymentScreen';
import SearchLivreurScreen from '../screens/e-commerce/SearchLivreurScreen';

export default function RootNavigator() {
          const Drawer = createDrawerNavigator()
          const Stack = createStackNavigator()
          return (
                    <NavigationContainer
                              theme={{
                                        colors: {
                                                  background: "#fff",
                                        },
                              }}>
                              <Stack.Navigator screenOptions={{  }}>
                                        <Stack.Screen name='Root' component={DrawerNavigator} options={{ headerShown: false }} />
                                        <Stack.Group screenOptions={{
                                                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                                                  header: () => <PaginationHeader />,
                                                  headerShown: false,
                                                  headerMode: "float"
                                        }}>
                                                  <Stack.Screen name="ShippingInfoScreen" component={ShippingInfoScreen} />
                                                  <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
                                                  <Stack.Screen name="SearchLivreurScreen" component={SearchLivreurScreen} />
                                        </Stack.Group>
                                        <Stack.Screen name="NoHeaderSearchLivreurScreen" component={SearchLivreurScreen} options={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }}  />
                              </Stack.Navigator>
                    </NavigationContainer>
          )
}