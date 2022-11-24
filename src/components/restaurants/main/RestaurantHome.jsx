import React from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { useNavigation } from '@react-navigation/native';


export default function RestaurantHome({ restaurant,restaurants, index, totalLength }) {
  // console.log(restaurants)
  const navigation = useNavigation()
  const { width } = useWindowDimensions()
  
  const MAX_WIDTH = 200
  const PRODUCT_MARGIN = 10
  const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
  const PRODUCT_HEIGHT = 200
  const additionStyles = {
    width: PRODUCT_WIDTH,
    height: PRODUCT_HEIGHT,
    // marginLeft: index > 0 ? PRODUCT_MARGIN : 0,
    // marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : 0
  }
  return (
    <View key={index} style={[styles.shop, additionStyles]}>
      <TouchableNativeFeedback onPress={() => navigation.navigate('MenusRestaurantScreen', { restaurant: restaurant,restaurants: restaurants})}>
        <View style={styles.imageCard}>
          <Image source={{ uri: restaurant.LOGO }} style={styles.image} />
        </View>
      </TouchableNativeFeedback>
      <Text style={[{ fontSize: 12, fontWeight: "bold" }, { color: "#797E9A" }]}>{restaurant.NOM_ORGANISATION.toLowerCase()}</Text>
      <View style={{ flexDirection: "row",marginHorizontal:-1}}>
        <AntDesign name="star" size={14} color="#EFC519" />
        <Text style={{ fontSize: 10, marginLeft: 10, color: "#797E9A",right:10 }}>3.0</Text>
        <Text style={{ fontSize: 15, marginLeft: 10, color: "#797E9A",right:12 ,top:-10,fontWeight: "bold"}}>.</Text>
        <Text style={{ fontSize: 10, marginLeft: 10, color: "#797E9A",right:15 }}>à 1.O Km</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  shop: {
    marginHorizontal:10,
    maxWidth: 200,
    marginBottom:"-10%"
  },
  imageCard: {
    borderRadius: 10,
    height: "60%",
    width: "100%",
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    resizeMode: 'contain',
  },
  shopName: {
    color: COLORS.ecommercePrimaryColor,
    fontWeight: "bold",
    fontSize: 13,
    textAlign: 'center'
  },
  shopCategory: {
    textAlign: 'center',
    color: '#777',
    fontSize: 12
  }
})