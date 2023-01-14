import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ScrollView, ImageBackground, Image, ActivityIndicator } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import fetchApi from "../../helpers/fetchApi";
import { Modalize } from "react-native-modalize";
import Product from "../../components/ecommerce/main/Product";

/**
 * Screen pour affiches les produits par categories avec une filtre par categories
 * @author Vanny Boy <vanny@mediabox.bi>
 * @returns 
 */

export default function CategorieListeScreen() {
        const navigation = useNavigation()
        const route = useRoute()
        const { selectedCategorie } = route.params
        const [selected, setSelected] = useState(selectedCategorie)

        const [categories, setCategories] = useState([])
        const [products, setProducts] = useState([])

        const CategoriemodalizeRef = useRef()
        const [isOpen, setIsOpen] = useState(false)
        const [selectedOneCategorie, setSelectedOneCategorie] = useState(null)

        const [LoadingProducts, setLoadingProducts] = useState(true)
        const [loadingCategories, setLoadingCatagories] = useState(true)

        const deselectionner = null


        const fetchCategories = () => {
                setIsOpen(true)
                CategoriemodalizeRef.current?.open()
        }

        const onCategoryPress = (categorie) => {
                setSelectedOneCategorie(categorie)
                setSelected(deselectionner)
                CategoriemodalizeRef.current.close()
        }

        useEffect(() => {
                (async () => {
                        try {
                                const reponse = await fetchApi("/products/categories", {
                                        method: "GET",
                                        headers: { "Content-Type": "application/json" },
                                })
                                setCategories(reponse.result)
                        }
                        catch (error) {
                                console.log(error)
                        }
                        finally {
                                setLoadingCatagories(false)
                        }
                })()
        }, [])

        useEffect(() => {
                (async () => {
                        try {
                                if (LoadingProducts == false) {
                                        setLoadingProducts(true)
                                }
                                var url = "/products"
                                if (selectedOneCategorie) {
                                        url = `/products?category=${selectedOneCategorie?.ID_CATEGORIE_PRODUIT}`
                                }
                                const produits = await fetchApi(url)
                                setProducts(produits.result)
                                console.log(produits.result)
                        }
                        catch (error) {
                                console.log(error)
                        }
                        finally {
                                setLoadingProducts(false)
                        }
                })()
        }, [selectedOneCategorie])

        return (
                <>
                        <View style={styles.container}>
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
                                {selected && <TouchableOpacity style={styles.modelCard} onPress={fetchCategories}>
                                        <Text style={styles.inputText}>{selected ? selected.NOM : "Selectionner"}</Text>
                                        <AntDesign name="caretdown" size={16} color="#777" />
                                </TouchableOpacity>}
                                {(selected == null && selectedOneCategorie == null) && <TouchableOpacity style={styles.modelCard} onPress={fetchCategories}>
                                        <Text style={styles.inputText}>Selectionner</Text>
                                        <AntDesign name="caretdown" size={16} color="#777" />
                                </TouchableOpacity>}
                                {(selectedOneCategorie && selected == null) && <TouchableOpacity style={styles.modelCard} onPress={fetchCategories}>
                                        <Text style={styles.inputText}>{selectedOneCategorie ? selectedOneCategorie.NOM : "Selectionner"}</Text>
                                        <AntDesign name="caretdown" size={16} color="#777" />
                                </TouchableOpacity>}

                                <ScrollView>
                                       {LoadingProducts ? <View style={{ flex: 1, justifyContent: 'center' }}>
                                                <ActivityIndicator animating={true} size="large" color={"black"} />
                                        </View> :
                                        <>
                                                {products.length == 0 ? <View style={styles.notResultat}>
                                                        <Text style={styles.textNotfound}>Pas de produits touves</Text>
                                                </View> :

                                                        <View style={styles.products}>
                                                                {products.map((product, index) => {
                                                                        return (
                                                                                <Product
                                                                                        product={product}
                                                                                        index={index}
                                                                                        totalLength={products.length}
                                                                                        key={index}
                                                                                        fixMargins
                                                                                />
                                                                        )
                                                                })}
                                                        </View>}
                                        </>}
                                </ScrollView>
                        </View>
                        <Modalize
                                ref={CategoriemodalizeRef}
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
                                        //     setLoadingForm(true)
                                }}
                        >
                                <ScrollView>
                                        <Text style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Catégories</Text>
                                        <ScrollView>
                                                {categories.map((categorie, index) => {
                                                        return (
                                                                <View key={index}>
                                                                        <TouchableOpacity style={styles.modalItem} onPress={() => onCategoryPress(categorie)}>
                                                                                <View style={styles.categoryPhotoModal}>
                                                                                        <Image source={{ uri: categorie.IMAGE }} style={styles.DataImageCategorieModal} />
                                                                                </View>
                                                                                <View style={styles.cardName}>
                                                                                        <Text numberOfLines={1} style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor }}>{categorie.NOM}</Text>
                                                                                </View>

                                                                        </TouchableOpacity>
                                                                </View>
                                                        )
                                                })}

                                        </ScrollView>
                                </ScrollView>
                        </Modalize>
                </>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        cardHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginTop: StatusBar.currentHeight,
                height: 60,
                backgroundColor: '#fff',
        },
        searchSection1: {
                flexDirection: "row",
                marginTop: -20,
                marginBottom: 10,
                padding: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ddd",
                alignItems: 'center',
                backgroundColor: "white",
                width: "95%",
                height: 50,
                marginHorizontal: 10,
                paddingHorizontal: 10
        },
        input: {
                flex: 1,
                marginLeft: 10
        },
        categories: {
                flexDirection: 'row',
                flexWrap: 'wrap',
        },
        category: {
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 10,
                // margin: 5,
                marginTop: 5,
                // backgroundColor: "#F5F4F1",
        },
        categoryPhoto: {
                backgroundColor: COLORS.skeleton,
                width: 80,
                height: 70,
                borderRadius: 8,
                padding: 3,
                justifyContent: 'center',
                alignItems: 'center'
        },
        categoryImage: {
                width: '100%',
                height: '100%',
        },
        categoryChecked: {
                width: 80,
                height: 85,
                borderRadius: 8,
                marginTop: -80

        },
        modelCard: {
                justifyContent: "space-between",
                flexDirection: "row",
                marginHorizontal: 10,
                marginTop: 10,
                backgroundColor: "#fff",
                padding: 9,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ddd"
        },
        inputText: {
                fontSize: 17,
                color: "#777"
        },
        modalItem: {
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
                alignContent: 'center'
        },
        categoryPhotoModal: {
                backgroundColor: COLORS.skeleton,
                width: 70,
                height: 50,
                borderRadius: 8,
                padding: 3,
                justifyContent: 'center',
                alignItems: 'center'
        },
        DataImageCategorieModal: {
                borderRadius: 10,
                width: '65%',
                height: '65%',
        },
        cardName: {
                marginLeft: 10
        },
        products: {
                flexDirection: 'row',
                flexWrap: 'wrap'
        },
        notResultat: {
                padding: 5,
                marginTop: 10,
                marginHorizontal: 10
        },
        textNotfound: {
                fontWeight: "bold",
                fontSize: 18,
                color: "#777"
        }
})