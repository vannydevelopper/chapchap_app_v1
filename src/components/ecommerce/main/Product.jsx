import React, { useRef } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
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
import fetchApi from "../../../helpers/fetchApi";

export default function Product({ product, index, totalLength, fixMargins = false }) {
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

          const modalizeRef = useRef(null)
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)

          const onCartPress = () => {
                    setIsOpen(true)
                    modalizeRef.current?.open()
          }

  const Addishlist =  async(id) => {
    
    console.log(id)
    try {
              
             
              const form = new FormData()
              form.append("ID_PRODUIT_PARTENAIRE", id)
              console.log(id)
              const newWishlist = await fetchApi('/wishlist', {
                method: "POST",
                body: form
      })
              
    } catch (error) {
              console.log(error)
    } 
    
}
          const onCloseAddToCart = () => {
                    modalizeRef.current?.close()
          }

          const productInCart = useSelector(ecommerceProductSelector(product.produit_partenaire.ID_PARTENAIRE_SERVICE))

          useEffect(() => {
                    if (isOpen) {
                              const timer = setTimeout(() => {
                                        setLoadingForm(false)
                              })
                              return () => {
                                        clearTimeout(timer)
                              }
                    }
          }, [isOpen])

          return (
                    <View key={index} style={[styles.product, additionStyles, fixMargins && { marginTop: 10 }]}>
                              <TouchableWithoutFeedback onPress={() => navigation.push('ProductDetailsScreen', { product: product })} >
                                        <View style={styles.imageCard}>
                                                  <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.image} />
                                        </View>
                              </TouchableWithoutFeedback>
                              <View style={{ flexDirection: "row" }}>
                              <TouchableOpacity style={styles.cartBtn} 
                              onPress={() => {
                                Addishlist(product.produit_partenaire.ID_PRODUIT_PARTENAIRE)
                      }}
                          >

                                        <View style={styles.cardLike}>
                                                  <AntDesign name="hearto" size={24} color="#F29558" />
                                        </View>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.cartBtn} onPress={onCartPress}>
                                                  <>
                                                            <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                            {productInCart ? <View style={styles.badge}>
                                                                      <Text style={styles.badgeText} numberOfLines={1}>{productInCart.QUANTITE}</Text>
                                                            </View> : null}
                                                  </>
                                        </TouchableOpacity>
                              </View>
                              <View style={styles.productNames}>
                                        <Text numberOfLines={2} style={styles.productName}>
                                                  {product.produit.NOM} ·
                                                  <Text numberOfLines={2} style={styles.productName}> {product.produit_partenaire.NOM}</Text>
                                        </Text>
                              </View>
                              {product.produit_partenaire.PRIX ? <Text style={{ color: "#F29558", fontWeight: "bold" }}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
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
                              </Portal>
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
                    width: "100%",
                    backgroundColor: '#F1F1F1',
                    justifyContent: "center",
                    alignItems: "center"
          },
          image: {
                    height: "95%",
                    width: "95%",
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