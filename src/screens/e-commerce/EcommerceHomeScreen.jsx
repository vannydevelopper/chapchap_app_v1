import React, { useCallback, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import SubCategories from "../../components/ecommerce/home/SubCategories";
import HomeProducts from "../../components/ecommerce/home/HomeProducts";

export default function EcommerceHomeScreen() {
          const { height } = useWindowDimensions()
          const [categories, setCategories] = useState([])
          const [sousCategories, SetSousCategories] = useState([])
          const [selectedCategorie, setSelectedCategorie] = useState(null)
          const [selectedsousCategories, setSelectedsousCategories] = useState(null)
          const [products, setProducts] = useState([])

          const fecthProduits = async () => {
                    try {
                              const response = await fetchApi("/products/categories", {
                                        method: "GET",
                                        headers: { "Content-Type": "application/json" },
                              })
                              setCategories(response.result)
                              //console.log(response)
                    }
                    catch (error) {
                              console.log(error)
                    }
          }
          useFocusEffect(useCallback(() => {
                    fecthProduits()
          }, []))

          const selectedItemCategories = (categorie) => {
                    if(categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT) {
                              return setSelectedCategorie(null)
                    }
                    setSelectedCategorie(categorie)
                    setSelectedsousCategories(null)
          }

          const selectedItemSousCategories = (souscategorie) => {
                    setSelectedsousCategories(souscategorie)
          }

          //fetch des sous  categories
          useEffect(() => {
                    (async () => {
                              if (selectedCategorie?.ID_CATEGORIE_PRODUIT) {
                                        const subCategories = await fetchApi(`/products/sub_categories/${selectedCategorie?.ID_CATEGORIE_PRODUIT}`, {
                                                  method: "GET",
                                                  headers: { "Content-Type": "application/json" },
                                        })
                                        SetSousCategories(subCategories.result)
                                        // console.log(subCategories.result)
                              }

                    })()
          }, [selectedCategorie])
          //fetch des produits

          useEffect(() => {
                    (async () => {
                              try {
                                        var url = "/products"
                                        if(selectedCategorie) {
                                                  url = `/products?category=${selectedCategorie?.ID_CATEGORIE_PRODUIT}`
                                        }
                                        const produits = await fetchApi(url)
                                        setProducts(produits.result)
                              } catch (error) {
                                        console.log(error)
                              } finally {

                              }
                    })()

          }, [selectedCategorie, selectedsousCategories])

          return (
                    <View style={styles.container}>
                              <View style={{ backgroundColor: "#fff", marginBottom: 15 }}>
                                        <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.image} />
                              </View>
                              <View style={styles.cardOrginal}>
                                        <Text style={styles.titlePrincipal}>Achat des produits</Text>
                                        <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 25, paddingHorizontal: 10 }}>
                                                  <View style={styles.searchSection}>
                                                            <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                                                            <TextInput
                                                                      style={styles.input}
                                                                      placeholder="Recherche..."
                                                            />
                                                  </View>
                                                  <View style={styles.cardRecherche}>
                                                            <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                                                  </View>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10 }}>
                                                  {categories.map((categorie, index) => {
                                                            return (
                                                                      <TouchableOpacity key={index} onPress={() => selectedItemCategories(categorie)}>
                                                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                                                          <View style={[styles.cardPhoto, { backgroundColor: categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT ? COLORS.handleColor : "#DFE1E9" }]}>
                                                                                                    <Image source={{ uri: categorie.IMAGE }} style={styles.DataImageCategorie} />
                                                                                          </View>
                                                                                          <Text style={[{ fontSize: 12, fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
                                                                                </View>
                                                                      </TouchableOpacity>
                                                            )
                                                  })}
                                        </View>
                                        {selectedCategorie && <SubCategories sousCategories={sousCategories} selectedItemSousCategories={selectedItemSousCategories} selectedsousCategories={selectedsousCategories} />}
                                        <HomeProducts products={products} />
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1
          },
          image: {
                    marginTop: 30,
                    alignSelf: "center",
          },
          cardOrginal: {
          },
          titlePrincipal: {
                    fontSize: 20,
                    fontWeight: "bold",
                    marginBottom: 12,
                    color: COLORS.ecommercePrimaryColor,
                    marginHorizontal: 10
          },

          searchSection: {
                    flexDirection: "row",
                    marginTop: 10,
                    padding: 5,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    backgroundColor: "#D7D9E4",
                    width: "84%",
                    height: 50,
                    paddingHorizontal: 10
          },
          input: {
                    flex: 1,
                    marginLeft: 10
          },
          cardRecherche: {
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: "#EF4255",
                    marginTop: 8,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
          },

          DataImageCategorie: {
                    minWidth: 40,
                    minHeight: 40,
                    borderRadius: 10,
          },
          cardPhoto1: {
                    marginTop: 10,
                    width: 50,
                    height: 50,
                    backgroundColor: "#DFE1E9",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
          },
          cardPhoto: {
                    marginTop: 10,
                    width: 50,
                    height: 50,
                    //backgroundColor: "#242F68",
                    backgroundColor: "#DFE1E9",
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
          },
})