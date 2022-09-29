import React, { useRef } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
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
import { useNavigation } from '@react-navigation/native';

export default function Menu({ product, index, totalLength, fixMargins = false }) {
       

          return (
            <View key={index} style={[styles.product, additionStyles]}>
                              <TouchableOpacity onPress={()=>navigation.push('ProductDetailsScreen', {product:product})} style={styles.imageCard}>
                                        <Image source={{ uri: product.IMAGE}} style={styles.image} />
                              </TouchableOpacity>
                              {/* <View style={{ flexDirection: "row" }}>
                                        <View style={styles.cardLike}>
                                                  <AntDesign name="hearto" size={24} color="#F29558" />
                                        </View>
                                        <TouchableOpacity style={styles.cartBtn} onPress={onCartPress}>
                                                  <>
                                                  <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                  {productInCart ? <View style={styles.badge}>
                                                            <Text style={styles.badgeText} numberOfLines={1}>{ productInCart.QUANTITE }</Text>
                                                  </View> : null}
                                                  </>
                                        </TouchableOpacity>
                              </View> */}
                              <View style={styles.productNames}>
                                        <Text numberOfLines={2} style={styles.productName}>
                                                  {product.NOM} ·
                                                  <Text numberOfLines={2} style={styles.productName}> {product.produit_partenaire.NOM}</Text>
                                        </Text>
                              </View>
                              {/* {product.produit_partenaire.PRIX ? <Text style={{ color: "#F29558", fontWeight: "bold" }}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu</Text> : null}
                              <Portal>
                                        <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
                                                  <Modalize
                                                            ref={modalizeRef}
                                                            adjustToContentHeight
                                                            handlePosition='inside'
                                                            modalStyle={{
                                                                      borderTopRightRadius: 25,
                                                                      borderTopLeftRadius: 25,
                                                                      paddingVertical: 20
                                                            }}
                                                            handleStyle={{ marginTop: 10 }}
                                                            scrollViewProps={{
                                                                      keyboardShouldPersistTaps: "handled"
                                                            }}
                                                            onClosed={() => {
                                                                      setIsOpen(false)
                                                                      setLoadingForm(true)
                                                            }}
                                                  >
                                                            <AddCart product={product} loadingForm={loadingForm} onClose={onCloseAddToCart} />
                                                  </Modalize>
                                        </GestureHandlerRootView>
                              </Portal> */}
                    </View>
                    
          )
}

const styles = StyleSheet.create({
          product: {
                    maxWidth: 200
          },
          imageCard: {
                    borderRadius: 8,
                    height: "60%",
                    width: "100%"
          },
          image: {
                    height: "100%",
                    width: "100%",
                    borderRadius: 8,
                    resizeMode: 'contain'
          },
          cardLike: {
                    marginTop: 10,
                    width: 35,
                    height: 35,
                    backgroundColor: "#FBD5DA",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center"
          },
          cartBtn: {
                    marginTop: 10,
                    width: 35,
                    height: 35,
                    backgroundColor: "#FBD5DA",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: 8
          },
          badge: {
                    minWidth: 25,
                    minHeight: 20,
                    paddingHorizontal: 5,
                    borderRadius: 20,
                    backgroundColor: COLORS.ecommerceRed,
                    position: 'absolute',
                    top: -5,
                    right: -10,
                    justifyContent: "center",
                    alignItems: "center",
          },
          badgeText: {
                    textAlign: 'center',
                    fontSize: 10,
                    color: '#FFF',
                    fontWeight: "bold"
          },
          productName: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "400",
                    fontSize: 13         
          }
})