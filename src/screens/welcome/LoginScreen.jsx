import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useRef, useState, useEffect } from 'react'
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image } from "react-native";
import ConnexionScreen from './ConnexionScreen';
import InscriptionScreen from './InscriptionScreen';

const TopBar = createMaterialTopTabNavigator()

export default function LoginScreen() {
        const { height } = useWindowDimensions()

        return (
                <>
                        <ImageBackground style={styles.container} source={require('../../../assets/images/g52.png')}>
                                <View style={{ backgroundColor:"#fff" }}>
                                        <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.image} />
                                </View>
                                <TopBar.Navigator
                                        screenOptions={{
                                                tabBarStyle: styles.tabBar,
                                                tabBarLabelStyle: {
                                                        color: '#000',
                                                        textTransform: 'none',
                                                        fontWeight: 'bold',
                                                        fontSize: 15
                                                },
                                                tabBarIndicatorStyle: {
                                                        height: 4,
                                                        backgroundColor: "#1D8585"
                                                }

                                        }}
                                >
                                        <TopBar.Screen name='Inscription' component={InscriptionScreen} options={{ headerShown: false }} />
                                        <TopBar.Screen name='Connexion' component={ConnexionScreen} options={{ headerShown: false }} />
                                </TopBar.Navigator>
                        </ImageBackground>
                </>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
        },
        image: {
                marginTop: 30,
                alignSelf: "center",
        },
        tabBar: {
                //marginHorizontal: 20,
                shadowColor: '#000',
                overflow: 'hidden',

        }
})