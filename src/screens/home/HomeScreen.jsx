import React, { useCallback, useState } from "react";
import {
          Text, StyleSheet, View, ScrollView, ImageBackground, Dimensions,
          Image,
          FlatList,
          useWindowDimensions
} from "react-native";
import { Feather } from '@expo/vector-icons';
import { StatusBar } from "expo-status-bar";
import Animated from "react-native-reanimated";
import Carousel from "../../components/app/Carousel";
import ServicesCategories from "../../components/app/ServicesCategories";

export default function HomeScreen() {
          return (
                    <>
                    <StatusBar backgroundColor='#fff' barStyle='dark-content' />
                    <View style={styles.imgBackground}>
                              <View style={styles.cardHeader}>
                                        <View />
                                        <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.logo} />
                                        <View style={styles.menuOpener}>
                                                  <Feather name="menu" size={35} color="#1D8585" />
                                        </View>
                              </View>
                              <Carousel />
                              <ServicesCategories />
                    </View>
                    </>
          )
}
const styles = StyleSheet.create({
          cardHeader: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 100,
                    paddingHorizontal: 20
          },
          logo: {
                    marginTop: 25
          },
          menuOpener: {
                    marginTop: 25
          },
          imgBackground: {
                    flex: 1,
                    width: '100%',
                    height: "100%"
          }
})