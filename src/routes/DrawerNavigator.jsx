import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import DrawerContent from "../components/app/DrawerContent";
import CommandeEmiseScreen from "../screens/e-commerce/CommandeEmiseScreen";
import HomeScreen from "../screens/home/HomeScreen";
import RestaurationComEmises from "../screens/restaurant/RestaurationComEmises";
import EcommerceNavigator from "./EcommerceNavigator";
import RestaurantNavigator from "./RestaurantNavigator";

export default function DrawerNavigator() {
          const Drawer = createDrawerNavigator()
          return (
                    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={props => <DrawerContent {...props} />}>
                              <Drawer.Screen name='HomeScreen' component={HomeScreen} />
                              <Drawer.Screen name='EcommerceNavigator' component={EcommerceNavigator} />
                              <Drawer.Screen name='RestaurantNavigator' component={RestaurantNavigator} />
                              <Drawer.Screen name='Commande' component={CommandeEmiseScreen} />
                              <Drawer.Screen name="CommandeRestauration" component={RestaurationComEmises}/>
                    </Drawer.Navigator>
          )
}