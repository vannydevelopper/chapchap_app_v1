import React, { useCallback, useRef } from 'react'
import { Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import AddCart from './AddCart';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ecommerceProductSelector } from '../../../store/selectors/ecommerceCartSelectors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import fetchApi from "../../../helpers/fetchApi";

export default function Shop({ shop, index, totalLength, fixMargins = false }) {
  const [wishlist, setWishlist] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  const navigation = useNavigation()
  const { width } = useWindowDimensions()
  const PRODUCT_MARGIN = 10
  const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
  const PRODUCT_HEIGHT = 270
  const additionStyles = {
    width: PRODUCT_WIDTH,
    height: PRODUCT_HEIGHT,
    marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
    marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : (fixMargins ? 0 : 0)
  }
  // return (
  //   <View key={index} style={[styles.shop, additionStyles]}>
  //                      <TouchableNativeFeedback onPress={() => navigation.navigate('ProductShopsScreen', { id: shop.ID_PARTENAIRE_SERVICE })}>
  //                             <View style={styles.imageCard}>
  //                                       <Image source={{ uri: shop.LOGO }} style={styles.image} />
  //                             </View>
  //                             </TouchableNativeFeedback> 
  //                                       <Text numberOfLines={2} style={styles.shopName}>
  //                                       {shop.NOM_ORGANISATION }
  //                             </Text>
  //                             {shop.categories.map((categorie,index)=>{
  //                               return(
  //                                   <View key={index}>
  //                                   <Text numberOfLines={2} style={styles.shopCategory}> {categorie.NOM}</Text>
  //                                   </View>

  //                               )
  //                             })}
  //                   </View>
  // )
  function strUcFirst(a) {
    return (a + '').charAt(0).toUpperCase() + a.substr(1);
  }
  return (
    <View key={index} style={[styles.shop, additionStyles]}>
      <TouchableNativeFeedback onPress={() => navigation.navigate('ProductShopsScreen', { id: shop.ID_PARTENAIRE_SERVICE,shop:shop })}>
        <View style={styles.imageCard}>
          <Image source={{ uri: shop.LOGO }} style={styles.image} />
        </View>
      </TouchableNativeFeedback>
      <Text style={[{ fontSize: 12, fontWeight: "bold" }, { color: "#797E9A" }]}>{strUcFirst(shop.NOM_ORGANISATION.toLowerCase())}</Text>
      <View style={{ flexDirection: "row", marginHorizontal: -1 }}>
        {shop.note.nbre==0 ?
          <AntDesign name="staro" size={14} color="#EFC519" /> :
          <AntDesign name="star" size={14} color="#EFC519" />}
        <Text style={{ fontSize: 10, marginLeft: 10, color: "#797E9A", right: 10 }}>{shop.note.nbre}.0</Text>
        <Text style={{ fontSize: 15, marginLeft: 10, color: "#797E9A", right: 12, top: -10, fontWeight: "bold" }}>.</Text>
        <Text style={{ fontSize: 10, marginLeft: 10, color: "#797E9A", right: 15 }}>à { shop.DISTANCE? shop.DISTANCE.toFixed(1) :null} Km</Text>

        {/* <Text style={{ fontSize: 10, marginLeft: 10, color: "#797E9A", right: 15 }}>à {shop.DISTANCE ? shop.DISTANCE.toFixed(1) : null} Km</Text> */}
      </View>
    </View>
  )
}
// const styles = StyleSheet.create({
//   product: {
//     maxWidth: 200
//   },
//   imageCard: {
//     borderRadius: 8,
//     height: "60%",
//     width: "100%",
//     backgroundColor: '#F1F1F1',
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   image: {
//     height: "95%",
//     width: "95%",
//     borderRadius: 8,
//     resizeMode: 'contain'
//   },
//   cardLike: {
//     marginTop: 10,
//     width: 35,
//     height: 35,
//     backgroundColor: "#FBD5DA",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center"
//   },
//   cartBtn: {
//     marginTop: 10,
//     width: 35,
//     height: 35,
//     backgroundColor: "#FBD5DA",
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     marginLeft: 8
//   },
//   badge: {
//     minWidth: 25,
//     minHeight: 20,
//     paddingHorizontal: 5,
//     borderRadius: 20,
//     backgroundColor: COLORS.ecommerceRed,
//     position: 'absolute',
//     top: -5,
//     right: -10,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   badgeText: {
//     textAlign: 'center',
//     fontSize: 10,
//     color: '#FFF',
//     fontWeight: "bold"
//   },
//   productName: {
//     color: COLORS.ecommercePrimaryColor,
//     fontWeight: "400",
//     fontSize: 13
//   }
// })

const styles = StyleSheet.create({
  shop: {
    maxHeight: 150,
    marginTop: 5,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 10,
    padding: 10,
    maxWidth: 200,
    marginBottom: 20
  },
  imageCard: {
    borderRadius: 10,
    height: "75%",
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