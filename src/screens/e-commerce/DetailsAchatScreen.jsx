import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, View, StyleSheet, Text, TouchableOpacity, TouchableNativeFeedback, TextInput, ScrollView, StatusBar } from "react-native"
import { Ionicons, AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import ProduitPartenaire from "../../components/ecommerce/home/ProduitPartenaire";
import fetchApi from "../../helpers/fetchApi";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/userSelector"
import Product from "../../components/ecommerce/main/Product";
import { Entypo } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS";
import { Portal } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import { useRef } from "react";
import AddCart from "../../components/ecommerce/main/AddCart";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import { ecommerceProductSelector } from "../../store/selectors/ecommerceCartSelectors";
import { HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
export default function DetailAchatScreen() {
          const navigation = useNavigation()
          const route = useRoute()

          const [loadingShopProducts, setLoadingShopProducts] = useState(true)
          const [shopProducts, setShopProducts] = useState([])

          const [loadingSimilarProducts, setLoadingSimilarProducts] = useState(true)
          const [similarProducs, setSimilarProducts] = useState([])

          const { product } = route.params


          const modalizeRef = useRef(null)
          const [isOpen, setIsOpen] = useState(false)
          const [loadingForm, setLoadingForm] = useState(true)

          const productInCart = useSelector(ecommerceProductSelector(product.produit_partenaire.ID_PRODUIT_PARTENAIRE))

          const onCartPress = () => {
                    setIsOpen(true)
                    modalizeRef.current?.open()
          }

          const onCloseAddToCart = () => {
                    modalizeRef.current?.close()
          }

          const fecthProduits = async () => {
                    try {
                              const response = await fetchApi(`/partenaire/ecommerce/${product.partenaire.ID_PARTENAIRE}`, {
                                        method: "GET",
                                        headers: { "Content-Type": "application/json" },
                              })
                              setShopProducts(response.result)
                    }
                    catch (error) {
                              console.log(error)
                    } finally {
                              setLoadingShopProducts(false)
                    }
          }
          useFocusEffect(useCallback(() => {
                    fecthProduits()
          }, []))

          useEffect(() => {
                    (async () => {
                              try {
                                        var url = `/products?category=${product.categorie.ID_CATEGORIE_PRODUIT}`
                                        const produits = await fetchApi(url)
                                        setSimilarProducts(produits.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {
                                        setLoadingSimilarProducts(false)
                              }
                    })()
          }, [])
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
                    <>
                              <View style={{ marginTop: 0, flex: 1 }}>
                                        <View style={styles.cardHeader}>
                                                  <TouchableOpacity onPress={() => navigation.goBack()}>
                                                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                                                  </TouchableOpacity>
                                                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                                                            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                                                                      <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            </TouchableOpacity>
                                                            <EcommerceBadge />
                                                  </View>
                                        </View>
                                        <ScrollView showsVerticalScrollIndicator={false}>
                                                  <View style={styles.producHeader} >
                                                            <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.productImage} />
                                                  </View>
                                                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                                                            <View>
                                                                      <TouchableOpacity style={styles.category} >
                                                                                <Entypo name="shopping-cart" size={24} color={COLORS.primary} />
                                                                                <Text style={styles.categoryName} numberOfLines={2}>{product.categorie.NOM}</Text>
                                                                      </TouchableOpacity>
                                                                      <View style={styles.productNames}>
                                                                                <Text style={styles.productName}>
                                                                                          {product.produit.NOM} ·
                                                                                          <Text numberOfLines={2} style={styles.productName}> {product.produit_partenaire.NOM}</Text>
                                                                                </Text>
                                                                      </View>
                                                            </View>
                                                            <View style={styles.shareBtn}>
                                                                      <AntDesign name="sharealt" size={20} color={COLORS.primary} />
                                                            </View>
                                                  </View>
                                                  <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                                                            <Text style={styles.productDescription}>{product.produit_partenaire.DESCRIPTION}</Text>
                                                  </View>
                                                  <TouchableNativeFeedback>
                                                            <View style={styles.shop}>
                                                                      <View style={styles.shopLeft}>
                                                                                <View style={styles.shopIcon}>
                                                                                          {true ? <Entypo name="shop" size={24} color={COLORS.primary} /> :
                                                                                                    <FontAwesome name="user" size={24} color={COLORS.primary} />}
                                                                                </View>
                                                                                <View style={styles.shopOwner}>
                                                                                          <Text style={styles.productSeller}>
                                                                                                    {product.partenaire.NOM_ORGANISATION ? product.partenaire.NOM_ORGANISATION : `${product.partenaire.NOM} ${product.partenaire.PRENOM}`}
                                                                                                    {/* <FontAwesome5 name="building" size={10} color={COLORS.primary} style={{ marginLeft: 10 }} /> */}
                                                                                          </Text>
                                                                                          <Text style={styles.shopAdress}>Bujumbura</Text>
                                                                                </View>
                                                                      </View>
                                                                      <MaterialIcons name="navigate-next" size={24} color="black" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  {(loadingShopProducts || loadingSimilarProducts) ? <HomeProductsSkeletons /> : <ProduitPartenaire productPartenaires={shopProducts} />}
                                                  {(loadingShopProducts || loadingSimilarProducts) ? <HomeProductsSkeletons wrap /> :
                                                  <>
                                                  <TouchableNativeFeedback
                                                            accessibilityRole="button"
                                                            background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                                                  >
                                                            <View style={styles.productsHeader}>
                                                                      <Text style={styles.title}>Similaires</Text>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <View style={styles.products}>
                                                            {similarProducs.map((product, index) => {
                                                                      return (
                                                                                <Product
                                                                                          product={product}
                                                                                          index={index}
                                                                                          totalLength={shopProducts.length}
                                                                                          key={index}
                                                                                          fixMargins
                                                                                />
                                                                      )
                                                            })}
                                                  </View>
                                                  </>}

                                        </ScrollView>
                              </View>
                              <View style={styles.productFooter}>
                                        {product.produit_partenaire.PRIX ? <Text style={styles.productPrice}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                                        <TouchableOpacity style={[styles.addCartBtn]} onPress={onCartPress} >
                                                  <>
                                                            <View>
                                                                      <Ionicons name="cart" size={24} color="#fff" />
                                                            </View>
                                                            <Text style={styles.addCartBtnTitle}>
                                                                      Ajouter au panier
                                                            </Text>
                                                            {productInCart ? <View style={styles.badge}>
                                                                      <Text style={styles.badgeText} numberOfLines={1}>{productInCart.QUANTITE}</Text>
                                                            </View> : null}
                                                  </>
                                        </TouchableOpacity>
                              </View>
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
                    </>

          )
}
const styles = StyleSheet.create({
          cardHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    marginTop: StatusBar.currentHeight,
                    height: 60,
                    backgroundColor: '#F1F1F1',
          },
          producHeader: {
                    backgroundColor: '#F1F1F1',
                    paddingBottom: 60,
          },
          category: {
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 15,
          },
          categoryName: {
                    fontWeight: "bold",
                    fontSize: 13,
                    color: COLORS.primary,
                    marginLeft: 5
          },
          productNames: {
                    marginTop: 5
          },
          productName: {
                    fontWeight: "bold",
                    fontSize: 18,
                    color: COLORS.ecommercePrimaryColor
          },
          productImage: {
                    width: '70%',
                    minHeight: 150,
                    maxHeight: 200,
                    alignSelf: 'center',
                    resizeMode: "center",
                    borderRadius: 10
          },
          shop: {
                    flexDirection: "row",
                    alignItems: 'center',
                    justifyContent: "space-between",
                    marginVertical: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
          },
          shopLeft: {
                    flexDirection: "row",
                    alignItems: 'center'
          },
          shopIcon: {
                    width: 40,
                    height: 40,
                    backgroundColor: '#F1F1F1',
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: "center"
          },
          shopOwner: {
                    marginLeft: 10
          },
          productSeller: {
                    fontWeight: "bold"
          },
          shopAdress: {
                    color: '#777',
                    fontSize: 13
          },
          text: {
                    color: '#646B95',
                    fontSize: 20
          },
          carre1: {
                    padding: 15,
                    height: 50,
                    width: 50,
                    color: "#1D8585",
                    backgroundColor: '#242F68',
                    borderRadius: 10,
                    // marginTop: 1,
          },
          carre2: {
                    padding: 15,
                    height: 50,
                    width: 200,
                    borderWidth: 2,
                    borderColor: '#D8D8D8',
                    borderRadius: 10,
                    // marginTop: 1,
          },
          carre3: {
                    padding: 10,
                    height: 50,
                    width: 200,
                    backgroundColor: '#EE7526',
                    borderWidth: 2,
                    borderColor: '#D8D8D8',
                    borderRadius: 10,
                    // marginTop: 1,
          },
          shareBtn: {
                    padding: 15,
                    height: 50,
                    width: 50,
                    color: "#1D8585",
                    backgroundColor: '#D7D9E4',
                    borderRadius: 100
          },
          productDescription: {
                    color: '#777',
                    fontSize: 15,
                    lineHeight: 20
          },
          txtDispla: {
                    color: '#646B94',
                    fontSize: 15,
                    fontWeight: 'bold',
          },
          image: {
                    height: "30%",
                    width: "30%",
                    borderRadius: 8,
                    resizeMode: 'contain'
          },
          productsHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10
          },
          title: {
                    fontWeight: 'bold'
          },
          products: {
                    flexDirection: 'row',
                    flexWrap: 'wrap'
          },
          productFooter: {
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: 10,
          },
          productPrice: {
                    fontWeight: "bold",
                    fontSize: 22
          },
          addCartBtn: {
                    borderRadius: 30,
                    backgroundColor: COLORS.ecommerceOrange,
                    paddingVertical: 10,
                    paddingHorizontal: 15,
                    flexDirection: "row",
                    alignItems: "center"
          },
          addCartBtnTitle: {
                    textAlign: 'center',
                    color: '#fff',
                    fontWeight: 'bold'
          },
          badge: {
                    minWidth: 25,
                    minHeight: 20,
                    borderRadius: 20,
                    paddingHorizontal: 3,
                    backgroundColor: COLORS.ecommerceRed,
                    position: 'absolute',
                    top: -10,
                    right: 0,
                    justifyContent: "center",
                    alignItems: "center",
          },
          badgeText: {
                    textAlign: 'center',
                    fontSize: 10,
                    color: '#FFF',
                    fontWeight: "bold"
          }
})
