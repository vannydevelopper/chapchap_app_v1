import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import DrawerContent from "../components/app/DrawerContent";
import CommandeEmiseScreen from "../screens/e-commerce/CommandeEmiseScreen";
import EcommerceHomeScreen from "../screens/e-commerce/EcommerceHomeScreen";
import EcommerceWishlistScreen from "../screens/e-commerce/EcommerceWishlistScreen";
import HomeScreen from "../screens/home/HomeScreen";
import RestaurationComEmises from "../screens/restaurant/RestaurationComEmises";
import EcommerceNavigator from "./EcommerceNavigator";
import RestaurantNavigator from "./RestaurantNavigator";

export default function DrawerNavigator() {
          const Drawer = createDrawerNavigator()
          return (
                    <Drawer.Navigator screenOptions={{ headerShown: false ,lazy:true,unmountOnBlur:true}} drawerContent={props => <DrawerContent {...props} />}>
                              <Drawer.Screen name='HomeScreen' component={HomeScreen} />
                              <Drawer.Screen name='EcommerceNavigator' component={EcommerceNavigator} />
                              <Drawer.Screen name='RestaurantNavigator' component={RestaurantNavigator} />
                              <Drawer.Screen name='EcommerceWishlistScreen' component={EcommerceWishlistScreen} />
                              <Drawer.Screen name='Commande' component={CommandeEmiseScreen} />
                              <Drawer.Screen name="CommandeRestauration" component={RestaurationComEmises}/>
                    </Drawer.Navigator>
          )
}