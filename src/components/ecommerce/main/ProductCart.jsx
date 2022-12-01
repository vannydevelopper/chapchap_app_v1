import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Alert, Image, StyleSheet, Text, TextInput,ImageBackground, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { addProductAction, removeProductAction } from '../../../store/actions/ecommerceCartActions'
import { COLORS } from '../../../styles/COLORS'
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function ProductCart({ product, index }) {
    const totalPrice = product.produit_partenaire.PRIX * product.QUANTITE
          const [amount, setAmount] = useState(product.QUANTITE)
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
                    if(amount == product.stock.QUANTITE_RESTANTE) {
                              return false
                    }
                    setAmount(l => parseInt(l) +1)
          }

          const onChangeText = am => {
                    setAmount(am)
          }
          const checkAmount = () => {
                    setAmount(parseInt(amount) ? (parseInt(amount) >= product.stock.QUANTITE_RESTANTE ? product.stock.QUANTITE_RESTANTE : parseInt(amount)) : 1)
          }

          let isnum = /^\d+$/.test(amount);
          const isValid = () => {
                    return isnum ? (parseInt(amount) >= 1 && parseInt(amount) <= product.stock.QUANTITE_RESTANTE) : false
          }

          const onRemoveProduct = () => {
                    Alert.alert("Enlever le produit", "Voulez-vous vraiment enlever ce produit du panier ?", 
                    [
                              {
                                        text: "Annuler",
                                        style: "cancel"
                              },
                              { text: "Oui", onPress:  async () => {
                                        dispatch(removeProductAction(product.produit.ID_PRODUIT_PARTENAIRE))
                              } }
                    ])
          }

          useEffect(() => {
                    if(isValid()) {
                              dispatch(addProductAction(product, amount))
                    }
          }, [amount])
        //   return (
        //             <View style={[styles.product, index == 0 && { marginTop: 10 }]}>
        //                       <View style={styles.productImage}>
        //                                 <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.image} />
        //                       </View>
        //                       <View style={styles.productDetails}>
        //                                 <View style={styles.detailsHeader}>
        //                                           <View style={styles.productNames}>
        //                                                     <Text numberOfLines={2} style={styles.productName}>
        //                                                               {product.produit.NOM}
        //                                                                {/* ·
        //                                                               <Text numberOfLines={2} style={styles.productName}> {product.produit_partenaire.NOM}</Text> */}
        //                                                     </Text>
        //                                                     <TouchableOpacity style={styles.reomoveBtn} onPress={onRemoveProduct}>
        //                                                               <MaterialCommunityIcons name="delete" size={24} color="#777" />
        //                                                     </TouchableOpacity>
        //                                           </View>
        //                                           {product.COLOR&&
        //                                           <View style={styles.productNames}>
        //                                           <Text numberOfLines={2} style={styles.productName}> {product.COLOR.COULEUR?product.COLOR.COULEUR:null} 
        //                                            . <Text numberOfLines={2} style={styles.productName}> {product.SIZE.name?product.SIZE.name:null}</Text>
        //                                           </Text>
  
        //                                           </View>
        //                                           }
                                                  
        //                                           {product.produit_partenaire.PRIX ? <Text style={styles.unitPrice}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu</Text> : null}
        //                                 </View>
        //                                 <View style={styles.detailsFooter}>
        //                                           {product.produit_partenaire.PRIX ? <Text numberOfLines={1} style={styles.productPrice}>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu</Text> : null}
        //                                           <View style={styles.amountContainer}>
        //                                                     <TouchableOpacity style={[styles.amountChanger, (amount <= 1 || !/^\d+$/.test(amount)) && { opacity: 0.5 }]} onPress={onDecrement} disabled={amount <= 1 || !/^\d+$/.test(amount)}>
        //                                                               <Text style={styles.amountChangerText}>-</Text>
        //                                                     </TouchableOpacity>
        //                                                     <TextInput
        //                                                               style={[styles.input, isFocused && { borderColor: COLORS.primary}]}
        //                                                               value={amount.toString()}
        //                                                               onChangeText={onChangeText}
        //                                                               onFocus={() => setIsFocused(true)}
        //                                                               onBlur={() => {
        //                                                                         setIsFocused(false)
        //                                                                         checkAmount()
        //                                                               }}
        //                                                               keyboardType="decimal-pad"
        //                                                     />
        //                                                     {product.COLOR ?<TouchableOpacity style={[styles.amountChanger, (!/^\d+$/.test(amount) || amount >= product.COLOR.QUANTITE_RESTANTE) && { opacity: 0.5 }]} onPress={onIncrement} disabled={(!/^\d+$/.test(amount) || amount >= product.COLOR.QUANTITE_RESTANTE)}>
        //                                                               <Text style={styles.amountChangerText}>+</Text>
        //                                                     </TouchableOpacity>:
        //                                                     <TouchableOpacity style={[styles.amountChanger, (!/^\d+$/.test(amount) || amount >=10) && { opacity: 0.5 }]} onPress={onIncrement} disabled={(!/^\d+$/.test(amount) || amount >= 10)}>
        //                                                               <Text style={styles.amountChangerText}>+</Text>
        //                                                     </TouchableOpacity>}
        //                                           </View>
        //                                 </View>
        //                       </View>
        //             </View>
        //   )
        return (
            <View style={[styles.product, index == 0 && { marginTop: -2 }]}>
                
                <ImageBackground source={{ uri: product.produit_partenaire.IMAGE_1 }} style={[styles.serviceBackgound]} marginLeft={5} marginTop={2} mag borderRadius={15} imageStyle={{ opacity: 0.8 }}/>
                <View style={styles.productDetails}>
                    <View style={styles.detailsHeader}>
                        <View style={styles.productNames}>
                        <TouchableOpacity style={styles.reomoveBtn} onPress={onRemoveProduct}>
                    <MaterialCommunityIcons name="delete" size={24} color= {COLORS.ecommerceRed} />
                </TouchableOpacity>
                            <Text style={styles.productName}>
                            {product.produit.NOM}
                            </Text>
                            <Text style={styles.productPrix}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text>
                        </View>
                        {/* {product.produit_partenaire.PRIX ?  <Text style={styles.unitPrice}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null} */}
                    </View>
                    {/* <View style={styles.detailsFooter}>
                        {product.produit_partenaire.PRIX ?  <Text numberOfLines={1} style={styles.productPrice}>{totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                        <View style={styles.amountContainer}>
                            
                        </View>
                    </View> */}
                </View>
                <View style={styles.amountContainer}>
                    <TouchableOpacity style={[styles.amountChanger, (amount <= 1 || !/^\d+$/.test(amount)) && { opacity: 0.5 }]} onPress={onDecrement} disabled={amount <= 1 || !/^\d+$/.test(amount)}>
                        <Text style={styles.amountChangerText}>-</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.input, isFocused && { borderColor: COLORS.primary }]}
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
        )
}

const styles = StyleSheet.create({
    product: {
        flexDirection: 'row',
        backgroundColor: '#F1F1F1',
        borderRadius: 9,
        padding: 5,
        alignItems: "center",
        height: 90,
        marginTop: 10,

    },
    productImage: {
        height: "70%",
        width: "20%",
        borderRadius: 10,
        marginHorizontal: 10,

        backgroundColor: '#F1F1F1'
    },
    image: {
        height: "100%",
        width: "100%",
        opacity: 10,
        borderRadius: 10,
    },
    productDetails: {
        marginLeft: -63,
        justifyContent: 'space-between',
        flex: 1,
        marginTop: -8
    },
    productNames: {
        marginVertical: 30
    },
    productName: {
        color: COLORS.ecommercePrimaryColor,
        fontWeight: 'bold',
        fontSize: 11
    },
    productName1: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 10
    },
    serviceBackgound: {
        width: "50%",
        height: "95%",
        justifyContent: 'space-between',
    },
    productPrix: {
        color: COLORS.ecommerceRed,
        fontWeight: 'bold'
    },
    reomoveBtn: {
        // width: 30,
        // height: 30,
        // backgroundColor: '#F1F1F1',
        borderRadius: 5,
        marginTop:-8,
        marginRight:"-170%",
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
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 1,
        // marginHorizontal: 10,
        flexDirection: 'row',
        marginTop: 40
    },
    input: {
        // borderRadius: 5,
        borderWidth: 1,
        fontSize: 10,
        borderColor: '#fff',
        // flex: 1,
        height: "0%",
        // marginHorizontal: 15,
        textAlign: 'center',
        color: COLORS.ecommercePrimaryColor,
        fontWeight: 'bold'
    },
    amountChanger: {
        width: 20,
        // height: "100%",
        // backgroundColor: COLORS.ecommercePrimaryColor,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    amountChangerText: {
        color: COLORS.ecommerceRed,
        fontWeight: 'bold',
        fontSize: 10
    },
})