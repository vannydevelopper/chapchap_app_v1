import React from 'react'
import { Image, StyleSheet, Text,TouchableNativeFeedback, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { useNavigation } from '@react-navigation/native';


export default function Shop({ shop, index, totalLength }) {
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
                    marginRight: index == totalLength-1 ? PRODUCT_MARGIN : 0
          }
          return (
                    <View key={index} style={[styles.shop, additionStyles]}>
                       <TouchableNativeFeedback onPress={() => navigation.navigate('ProductShopsScreen', { id: shop.ID_PARTENAIRE })}>
                              <View style={styles.imageCard}>
                                        <Image source={{ uri: shop.LOGO }} style={styles.image} />
                              </View>
                              </TouchableNativeFeedback>
                                        <Text numberOfLines={2} style={styles.shopName}>
                                        {shop.NOM_ORGANISATION}
                              </Text>
                              {shop.categories.map((categorie,index)=>{
                                return(
                                    <View key={index}>
                                    <Text numberOfLines={2} style={styles.shopCategory}> {categorie.NOM}</Text>
                                    </View>

                                )
                              })}
                    </View>
          )
}
const styles = StyleSheet.create({
          shop: {
                    maxWidth: 200,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 8,
                    padding: 10,
                    justifyContent: 'space-between'
          },
          imageCard: {
                    borderRadius: 10,
                    height: "65%",
                    width: "90%",
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