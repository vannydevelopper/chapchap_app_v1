import { useState } from "react"
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons'; 
import { COLORS } from "../../../styles/COLORS"
import { useDispatch } from "react-redux";
import { addProductAction } from "../../../store/actions/ecommerceCartActions";
export default function AddCart({ product, loadingForm, onClose }) {
          const SIZES = [{
                    name: 'XL',
                    id: 1
          },{
                    name: 'S',
                    id: 2
          },{
                    name: 'M',
                    id: 3
          },{
                    name: 'L',
                    id: 4
          },{
                    name: 'XL',
                    id: 5
          },{
                    name: 'XXL',
                    id: 6
          }]
          const [selectedSize, setSelectedSize] = useState(null)
          const [amount, setAmount] = useState(1)
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

          const onAddToCart = () => {
                    onClose()
                    dispatch(addProductAction(product, amount))
          }

          let isnum = /^\d+$/.test(amount);
          const isValid = () => {
                    return isnum ? (parseInt(amount) >= 1 && parseInt(amount) <= product.stock.QUANTITE_RESTANTE) : false
          }

          return (
                    loadingForm ? <ActivityIndicator
                              animating
                              size={"small"}
                              color='#777'
                              style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                    /> :
                    <View style={styles.container}>
                              {/* <Text style={styles.title}>Ajouter au panier</Text> */}
                              <View style={styles.product}>
                                        <View style={styles.productImage}>
                                                  <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.image} />
                                        </View>
                                        <View style={styles.productDetails}>
                                                  <Text numberOfLines={3} style={styles.productName}>
                                                            {product.produit.NOM} ·
                                                            <Text numberOfLines={3} style={styles.productName}> { product.produit_partenaire.NOM }</Text>
                                                  </Text>
                                                  <Text style={styles.productSeller}>
                                                            { product.partenaire.NOM_ORGANISATION ? product.partenaire.NOM_ORGANISATION : `${product.partenaire.NOM} ${product.partenaire.PRENOM}` }
                                                            {/* <FontAwesome5 name="building" size={10} color={COLORS.primary} style={{ marginLeft: 10 }} /> */}
                                                  </Text>
                                                  {product.produit_partenaire.PRIX ? <Text style={styles.price}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") } Fbu</Text> : null}
                                        </View>
                              </View>
                              <View style={styles.moreDetails}>
                                        <Text style={styles.subTitle}>Taille</Text>
                                        <View style={[styles.sizes]}>
                                                  {SIZES.map((size, index) => <TouchableOpacity style={[styles.size, index == 0 && { marginLeft: 0 }, size.id == selectedSize?.id && { backgroundColor: COLORS.ecommercePrimaryColor }]} key={index} onPress={() => setSelectedSize(size)}>
                                                            <Text style={[styles.sizeText, size.id == selectedSize?.id && { color: '#FFF' }]}>{ size.name }</Text>
                                                  </TouchableOpacity>)}
                                        </View>
                              </View>
                              <View style={styles.moreDetails}>
                                        <Text style={[styles.subTitle, ]}>Quantité</Text>
                                        <Text style={{ fontSize: 12, color: '#777', marginBottom: 5 }}>
                                                  Disponible: { product.stock.QUANTITE_RESTANTE }
                                        </Text>
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
                                                  <TouchableOpacity style={[styles.amountChanger, (!/^\d+$/.test(amount) || amount >= product.stock.QUANTITE_RESTANTE) && { opacity: 0.5 }]} onPress={onIncrement} disabled={(!/^\d+$/.test(amount) || amount >= product.stock.QUANTITE_RESTANTE)}>
                                                            <Text style={styles.amountChangerText}>+</Text>
                                                  </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={[styles.addCartBtn, { opacity: !isValid() ? 0.5 : 1 }]} onPress={onAddToCart} disabled={!isValid()}>
                                                  <Text style={styles.addCartBtnTitle}>Ajouter au panier</Text>
                                        </TouchableOpacity>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    padding: 10,
          },
          title: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    marginTop: 10
          },
          product: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 100,
                    paddingVertical: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: '#F1F1F1'
          },
          productImage: {
                    flex: 0.5,
                    height: "100%"
          },
          image: {
                    width: "100%",
                    height: "100%",
                    borderRadius: 10,
                    alignContent: 'center'
          },
          productDetails: {
                    flex: 1,
                    marginLeft: 10
          },
          productName: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold",
                    fontSize: 15
          },
          productSeller: {
                    color: COLORS.primary,
                    fontSize: 13,
          },
          price: {
                    color: COLORS.ecommerceRed,
                    fontWeight: 'bold',
                    fontSize: 16
          },
          moreDetails: {
                    marginTop: 20
          },
          subTitle: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: 'bold'
          },
          sizes: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 5
          },
          size: {
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: '#F1F1F1',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10
          },
          sizeText: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: 'bold',
                    fontSize: 16
          },
          amountContainer: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 50
          },
          input: {
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    flex: 1,
                    height: "100%",
                    marginHorizontal: 10,
                    textAlign: 'center',
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: 'bold'
          },
          amountChanger: {
                    width: 50,
                    height: 50,
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          amountChangerText: {
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20
          },
          addCartBtn: {
                    marginTop: 15,
                    borderRadius: 5,
                    backgroundColor: COLORS.ecommerceOrange,
                    paddingVertical: 15,
          },
          addCartBtnTitle: {
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold'
          }
          
})