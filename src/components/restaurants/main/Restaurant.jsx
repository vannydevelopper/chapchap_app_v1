import React from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { useNavigation } from '@react-navigation/native';


export default function Restaurant({ restaurant, index, totalLength }) {
  // console.log(restaurant)
  const navigation = useNavigation()
  const { width } = useWindowDimensions()
  const MAX_WIDTH = 200
  const PRODUCT_MARGIN = 10
  const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
  const PRODUCT_HEIGHT = 200
  const additionStyles = {
    width: PRODUCT_WIDTH,
    height: PRODUCT_HEIGHT,
    marginLeft: index > 0 ? PRODUCT_MARGIN : 0,
    marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : 0
  }
  return (
    <View key={index} style={[styles.shop, additionStyles]}>
      <TouchableNativeFeedback onPress={() => navigation.navigate('MenusRestaurantScreen', { restaurant: restaurant })}>
        <View style={styles.imageCard}>
          <Image source={{ uri: restaurant.LOGO }} style={styles.image} />
        </View>
      </TouchableNativeFeedback>
      <Text style={[{ fontSize: 12, fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{restaurant.NOM_ORGANISATION}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  shop: {
    maxWidth: 100,
    maxHeight: 100,
    // marginTop:-10,
    //  backgroundColor: 'red',
    borderRadius: 8,
    // padding: 0,
    // justifyContent: 'space-between'
  },
  imageCard: {
    borderRadius: 10,
    height: "80%",
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