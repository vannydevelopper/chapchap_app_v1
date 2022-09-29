import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AllProductsScreen from "../screens/e-commerce/AllProductsScreen";
import EcommerceCartScreen from "../screens/e-commerce/EcommerceCartScreen";
import EcommerceHomeScreen from "../screens/e-commerce/EcommerceHomeScreen";
import ProductDetailsScreen from "../screens/e-commerce/ProductDetailsScreen";
import ProductShopsScreen from "../screens/e-commerce/ProductShopsScreen";

export default function EcommerceNavigator() {
          const Stack = createStackNavigator()
          return (
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                              <Stack.Screen name="EcommerceHomeScreen" component={EcommerceHomeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}} />
                              <Stack.Screen name="EcommerceCartScreen" component={EcommerceCartScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}} />
                              <Stack.Screen name="ProductDetailsScreen" component={ProductDetailsScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}} />
                              <Stack.Screen name="AllProductsScreen" component={AllProductsScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}} />
                              <Stack.Screen name="ProductShopsScreen" component={ProductShopsScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}} />
                    </Stack.Navigator>
          )
}