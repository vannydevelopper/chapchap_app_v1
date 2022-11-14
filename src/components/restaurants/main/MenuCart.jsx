import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { addMenuAction, removeMenuAction } from '../../../store/actions/restaurantCartActions'

import { COLORS } from '../../../styles/COLORS'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function MenuCart({ menu, index }) {
          const totalPrice =menu.PRIX * menu.QUANTITE
          const [amount, setAmount] = useState(menu.QUANTITE)
          const [isFocused, setIsFocused] = useState(false)

          const dispatch = useDispatch()

          const onDecrement = () => {
                    if(parseInt(amount) == 1) {
                              return false
                    }
                    if(parseInt(amount) <= 0) {
                              return 1
                    }
                    setAmount(l => parseInt(l) - 1)
          }

          const onIncrement = () => {
                    if(amount == 10) {
                              return false
                    }
                    setAmount(l => parseInt(l) +1)
          }

          const onChangeText = am => {
                    setAmount(am)
          }
          const checkAmount = () => {
                    setAmount(parseInt(amount) ? (parseInt(amount) >= 10 ? 10 : parseInt(amount)) : 1)
          }

          let isnum = /^\d+$/.test(amount);
          const isValid = () => {
                    return isnum ? (parseInt(amount) >= 1 && parseInt(amount) <= 10) : false
          }

          const onRemoveProduct = () => {
                    Alert.alert("Enlever le menu", "Voulez-vous vraiment enlever ce menu du panier ?", 
                    [
                              {
                                        text: "Annuler",
                                        style: "cancel"
                              },
                              { text: "Oui", onPress:  async () => {
                                        dispatch(removeMenuAction(menu.ID_RESTAURANT_MENU))
                              } }
                    ])
          }

          useEffect(() => {
                    if(isValid()) {
                              dispatch(addMenuAction(menu, amount))
                    }
          }, [amount])
          return (
                    <View style={[styles.product, index == 0 && { marginTop: 10 }]}>
                              <View style={styles.productImage}>
                                        <Image source={{ uri: menu.IMAGE }} style={styles.image} />
                              </View>
                              <View style={styles.productDetails}>
                                        <View style={styles.detailsHeader}>
                                                  <View style={styles.productNames}>
                                                            <Text numberOfLines={2} style={styles.productName}>
                                                                      {menu.repas} 
                                                                      {/* · */}
                                                                      {/* <Text numberOfLines={2} style={styles.productName}> {menu.categorie}</Text> */}
                                                            </Text>
                                                            <TouchableOpacity style={styles.reomoveBtn} onPress={onRemoveProduct}>
                                                                      <MaterialCommunityIcons name="delete" size={24} color="#777" />
                                                            </TouchableOpacity>
                                                  </View>
                                                  {/* <Text style={styles.unitPrice}>
                                                            { product.partenaire.NOM_ORGANISATION ? product.partenaire.NOM_ORGANISATION : `${product.partenaire.NOM} ${product.partenaire.PRENOM}` }
                                                            <FontAwesome5 name="building" size={10} color={COLORS.primary} style={{ marginLeft: 10 }} />
                                                  </Text> */}
                                                  {menu.MONTANT ? <Text style={styles.unitPrice}>{menu.MONTANT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu</Text> : null}
                                        </View>
                                        <View style={styles.detailsFooter}>
                                                  {menu.MONTANT ? <Text numberOfLines={1} style={styles.productPrice}>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu</Text> : null}
                                                  <View style={styles.amountContainer}>
                                                            <TouchableOpacity style={[styles.amountChanger, (amount <= 1 || !/^\d+$/.test(amount)) && { opacity: 0.5 }]} onPress={onDecrement} disabled={amount <= 1 || !/^\d+$/.test(amount)}>
                                                                      <Text style={styles.amountChangerText}>-</Text>
                                                            </TouchableOpacity>
                                                            <TextInput
                                                                      style={[styles.input, isFocused && { borderColor: COLORS.primary}]}
                                                                      value={amount.toString()}
                                                                      onChangeText={onChangeText}
                                                                      onFocus={() => setIsFocused(true)}
                                                                      onBlur={() => {
                                                                                setIsFocused(false)
                                                                                checkAmount()
                                                                      }}
                                                                      keyboardType="decimal-pad"
                                                            />
                                                            <TouchableOpacity style={[styles.amountChanger, (!/^\d+$/.test(amount) || amount >= 10) && { opacity: 0.5 }]} onPress={onIncrement} disabled={(!/^\d+$/.test(amount) || amount >= 10)}>
                                                                      <Text style={styles.amountChangerText}>+</Text>
                                                            </TouchableOpacity>
                                                  </View>
                                        </View>
                              </View>
                    </View>
          )
}


const styles = StyleSheet.create({
          product: {
                    flexDirection: 'row',
                    height: 100,
                    marginTop: 20
          },
          productImage: {
                    height: "100%",
                    width: "30%",
                    borderRadius: 10,
                    backgroundColor: '#F1F1F1'
          },
          image: {
                    height: "100%",
                    width: "100%",
                    opacity:10 ,
                    borderRadius: 10
          },
          productDetails: {
                    marginLeft: 10,
                    justifyContent: 'space-between',
                    flex: 1
          },
          productNames: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
          },
          productName: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: 'bold'
          },
          reomoveBtn: {
                    width: 30,
                    height: 30,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          unitPrice: {
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: 12,
                    color: '#777'
          },
          detailsFooter: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flex: 1,
          },
          productPrice: {
                    color: '#000',
                    fontWeight: 'bold',
                    fontSize: 14,
                    maxWidth: "55%"
          },
          amountContainer: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 30,
                    marginLeft: 10,
                    width: "45%"
          },
          input: {
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    flex: 1,
                    height: "100%",
                    marginHorizontal: 5,
                    textAlign: 'center',
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: 'bold'
          },
          amountChanger: {
                    width: 30,
                    height: "100%",
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          amountChangerText: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 16
          },
})