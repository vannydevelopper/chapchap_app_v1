import { createStackNavigator, CardStyleInterpolators } from "@react-navigation/stack";
import React from "react";
import Menu from "../components/restaurants/main/Menu";
import CategorieMenuScreen from "../screens/liste_restaurant/CategorieMenuScreen";
import RestaurantProcheScreen from "../screens/liste_restaurant/RestaurantProcheScreen";
import AllMenuScreen from "../screens/restaurant/AllMenuScreen";
import MenuDetailScreen from "../screens/restaurant/MenuDetailScreen";
import MenusRestaurantScreen from "../screens/restaurant/MenusRestaurantScreen";
import RestaurantCartScreen from "../screens/restaurant/RestaurantCartScreen";
import RestaurantHomeScreen from "../screens/restaurant/RestaurantHomeScreen";
import RestaurantScreen from "../screens/restaurant/RestaurantScreen";


export default function RestaurantNavigator(){
        const Stack = createStackNavigator()
        return(
                
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                        
                        <Stack.Screen name="RestaurantHomeScreen" component={RestaurantHomeScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}}/>
                        <Stack.Screen name="MenuDetailScreen" component={MenuDetailScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid}}/>
                        <Stack.Screen name="RestaurantCartScreen" component={RestaurantCartScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}} />
                        <Stack.Screen name="RestaurantScreen" component={RestaurantScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}} />
                        <Stack.Screen name="MenusRestaurantScreen" component={MenusRestaurantScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}} />
                        <Stack.Screen name="AllMenuScreen" component={AllMenuScreen} options={{ cardStyleInterpolator: CardStyleInterpolators.forFadeFromBottomAndroid}} />

                        <Stack.Screen name="RestaurantProcheScreen" component={RestaurantProcheScreen}/>
                        <Stack.Screen name="CategorieMenuScreen" component={CategorieMenuScreen}/>
                       
                </Stack.Navigator>
        )
}