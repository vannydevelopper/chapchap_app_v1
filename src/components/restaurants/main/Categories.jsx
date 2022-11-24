import React from 'react'
import { Image, ImageBackground, StyleSheet, Text, TouchableNativeFeedback, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Categories({ onCategoryPress,categorie,categories, index, totalLength }) {
  // console.log(categories)
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
      <TouchableOpacity key={index} onPress={() => onCategoryPress(categorie)}>
        <View style={styles.imageCard}>
          <ImageBackground source={{ uri: categorie.IMAGE }} style={styles.image} />
        </View>
        <View style={{marginHorizontal:20}}>
        <Text style={[{ fontSize: 12, fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
        </View>
      </TouchableOpacity>
      
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
    height: "80%",
    width: "80%",
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
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