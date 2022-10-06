import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PaginationHeader from "../components/ecommerce/main/PaginationHeader";
import AllProductsScreen from "../screens/e-commerce/AllProductsScreen";
import EcommerceCartScreen from "../screens/e-commerce/EcommerceCartScreen";
import EcommerceHomeScreen from "../screens/e-commerce/EcommerceHomeScreen";
import PaymentScreen from "../screens/e-commerce/PaymentScreen";
import ProductDetailsScreen from "../screens/e-commerce/ProductDetailsScreen";
import ProductShopsScreen from "../screens/e-commerce/ProductShopsScreen";
import SearchLivreurScreen from "../screens/e-commerce/SearchLivreurScreen";
import ShippingInfoScreen from "../screens/e-commerce/ShippingInfoScreen";

export default function EcommerceNavigator() {
          const Stack = createStackNavigator()
          return (
                    <Stack.Navigator>
                              <Stack.Group screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid }}>
                                        <Stack.Screen name="EcommerceHomeScreen" component={EcommerceHomeScreen} />
                                        <Stack.Screen name="EcommerceCartScreen" component={EcommerceCartScreen} />
                                        <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} />
                                        <Stack.Screen name="AllProductsScreen" component={AllProductsScreen} />
                                        <Stack.Screen name="ProductShopsScreen" component={ProductShopsScreen} />
                              </Stack.Group>
                    </Stack.Navigator>
          )
}