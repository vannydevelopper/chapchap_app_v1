import React, { useCallback, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback, TouchableWithoutFeedback } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import ProductPartenaire from "../../components/ecommerce/main/ProductPartenaire";
import fetchApi from "../../helpers/fetchApi";
import { useRoute } from "@react-navigation/native";
import { CategoriesSkeletons, HomeProductsSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import SubCategories from "../../components/ecommerce/home/SubCategories";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import { Linking } from "react-native";
import HomeProducts from "../../components/ecommerce/home/HomeProducts";
import Shops from "../../components/ecommerce/home/Shops";

export default function ProductShopsScreen() {
    const route = useRoute()
    const { selectedCategorie: defautSelectedCategorie, selectedsousCategories: defautSelectedsousCategories } = route.params

    const [loadingCategories, setLoadingCatagories] = useState(true)
    const [categories, setCategories] = useState([])
    const [selectedCategorie, setSelectedCategorie] = useState(null)

    const [loadingSubCategories, setLoadingSubCategories] = useState(false)
    const [sousCategories, SetSousCategories] = useState([])
    const [selectedsousCategories, setSelectedsousCategories] = useState(defautSelectedsousCategories)

    const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [products, setProducts] = useState([])
    const [shops, setShops] = useState([])


    const navigation = useNavigation()
    const { id, shop } = route.params
    const fecthProduits = async () => {
        try {
            const response = await fetchApi(`/products/categorie/${id} `, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            setCategories(response.result)
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoadingCatagories(false)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthProduits()
    }, []))

    const onCategoryPress = (categorie) => {
        if (loadingSubCategories || loadingProducts) return false
        if (categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT) {
            return setSelectedCategorie(null)
        }
        setSelectedCategorie(categorie)
        setSelectedsousCategories(null)
    }

    const selectedItemSousCategories = (souscategorie) => {
        ss
        setSelectedsousCategories(souscategorie)
    }


    //fetch des sous  categories
    useEffect(() => {
        (async () => {
            try {
                setLoadingSubCategories(true)
                if (selectedCategorie?.ID_CATEGORIE_PRODUIT) {
                    const subCategories = await fetchApi(`/products/sub_categories/${selectedCategorie?.ID_CATEGORIE_PRODUIT}`, {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    })
                    SetSousCategories(subCategories.result)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingSubCategories(false)
            }
        })()
    }, [selectedCategorie])

    useEffect(() => {
        (async () => {
            try {

                if (firstLoadingProducts == false) {
                    setLoadingProducts(true)
                }
                var url = `/products/products/${id} `
                if (selectedCategorie) {
                    url = `/products?category=${selectedCategorie?.ID_CATEGORIE_PRODUIT}`
                }
                const produits = await fetchApi(url)
                setProducts(produits.result)

            } catch (error) {
                console.log(error)
            } finally {
                setFirstLoadingProducts(false)
                setLoadingProducts(false)
            }
        })()
    }, [id])
    useEffect(() => {
        (async () => {
            try {
                if (firstLoadingProducts == false) {
                    setLoadingProducts(true)
                }
                var url = "/partenaire/ecommerce"
                const shops = await fetchApi(url)
                setShops(shops.result)
            } catch (error) {
                console.log(error)
            } finally {
                setFirstLoadingProducts(false)
                setLoadingProducts(false)
            }
        })()
    }, [selectedCategorie, selectedsousCategories])

    return (
        <ScrollView>
            <View style={{ width: '100%', maxHeight: "100%", marginTop: 10 }}>
                <  Image source={{ uri: shop.LOGO }} style={{ ...styles.imagePrincipal }} />
            </View>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()} >
                <Ionicons name="ios-arrow-back-outline" size={40} color="white" style={{ ...styles.icon, marginTop: 20, marginHorizontal: 10 }} />
            </TouchableWithoutFeedback>
            <View style={{ marginHorizontal: 10, marginTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
                <View style={{ flexDirection: "column", marginTop: 15 }}>
                    <Text style={{ fontWeight: "bold" }}>{shop.NOM_ORGANISATION}</Text>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <SimpleLineIcons name="location-pin" size={15} color="black" />
                        <Text style={{ fontSize: 12 }}> {shop.ADRESSE_COMPLETE} </Text>
                    </View>
                </View>
                <AntDesign style={{ marginTop: 10 }} name="hearto" size={40} color="#F29558" />
                {/* <TouchableOpacity
                    onPress={() => {
                        Addishlist(restaurant.ID_PARTENAIRE_SERVICE)
                    }}
                >
                    {
                       wishlist? <AntDesign name="heart" size={40} color="#EFC519" /> :
                       <AntDesign name="hearto" size={40} color="#EFC519" /> 
                    }
                
                </TouchableOpacity> */}
                <View style={styles.carre}>
                    <Text style={{ fontSize: 10, marginLeft: 10, color: "#797E9A",right:15 }}>à { shop.DISTANCE? shop.DISTANCE.toFixed(1) :null} Km</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", marginHorizontal: 10, marginTop: 10, justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                    {/* {wishlistNumber ?
                        <AntDesign name="star" size={20} color="#EFC519" /> :
                        <AntDesign name="star" size={20} color="#EFC519" />} */}
                   {shop.note.nbre==0 ?
                        <AntDesign name="staro" size={20} color="#EFC519" /> :
                        <AntDesign name="star" size={20} color="#EFC519" />}
                    <Text style={{ fontSize: 15, marginLeft: 15, color: "#797E9A", right: 15 }}>{shop.note.nbre}.0</Text>

                </View>
                <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
                    <AntDesign name="clockcircleo" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                    <Text style={{ fontSize: 15, marginLeft: 2, color: "#797E9A" }}>{shop.OUVERT}</Text>
                </View>
                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${shop.TELEPHONE}`); }} style={{ flexDirection: "row" }}>
                    <SimpleLineIcons name="call-end" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                    <Text style={{ fontSize: 15, marginLeft: 20, color: "#797E9A", right: 15 }}>{shop.TELEPHONE}</Text>
                </TouchableOpacity>

            </View>
            <View style={{ marginTop: 10, marginHorizontal: 10 }} >
                <Text style={{ color: "#797E9A" }}>{shop.PRESENTATION}</Text>
            </View>
            {/* <TouchableOpacity style={styles.plus1}>
                <View>
                    <Text style={styles.plusText}>Categories</Text>
                </View>
                <View style={{ marginTop: -8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} style={{ marginRight: -15 }} />
                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} />
                    </View>
                </View>
            </TouchableOpacity>
            <ScrollView
                style={styles.categorys}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.categories}>
                    {shop.categories.map((categorie, index) => {
                        return (

                            <TouchableOpacity onPress={() => onCategoryPress(categorie)} style={[styles.category, index == 0 && { marginLeft: 0 }]} key={index}>

                                <View style={[styles.categoryPhoto,]}>
                                    <Image source={{ uri: categorie.IMAGE }} style={[styles.DataImageCategorie]} />
                                </View>
                                <Text style={[{ fontSize: 8, fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>

                            </TouchableOpacity>
                        )
                    })}
                </View>
            </ScrollView> */}

            <TouchableOpacity style={styles.plus}>
                <View>
                    <Text style={styles.plusText}>Produits</Text>
                </View>
                <View style={{ marginTop: -8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} style={{ marginRight: -15 }} />
                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} />
                    </View>
                </View>
            </TouchableOpacity>
            {(firstLoadingProducts || loadingCategories || loadingProducts || loadingSubCategories) ? <HomeProductsSkeletons /> :
                <HomeProducts products={products} selectedCategorie={selectedCategorie} selectedsousCategories={selectedsousCategories} />}

            <TouchableOpacity style={styles.plus}>
                <View>
                    <Text style={styles.plusText}>Les plus proches</Text>
                </View>
                <View style={{ marginTop: -8 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} style={{ marginRight: -15 }} />
                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} />
                    </View>
                </View>
            </TouchableOpacity>
            {(firstLoadingProducts || loadingCategories || loadingProducts || loadingSubCategories) ? <HomeProductsSkeletons /> :
                <Shops shops={shops} />
            }








            {/* <View style={styles.cardHeader}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <View style={styles.productsHeader}>
                            <Ionicons name="arrow-back-sharp" size={24} color="black" />
                            <Text style={styles.title}> Les produits disponibles:</Text>
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: "bold", color: '#777', fontSize: 16, marginLeft: 10 }}>
                        {selectedCategorie ? selectedCategorie.NOM : products.NOM_ORGANISATION}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate('EcommerceCartScreen')}>
                        <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                    </TouchableOpacity>
                    <EcommerceBadge />
                </View>
            </View>
            <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[1]}>
                <Text style={styles.titlePrincipal}></Text>
                {(loadingCategories || firstLoadingProducts) ? <CategoriesSkeletons /> :
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 10, backgroundColor: '#fff', paddingBottom: 10 }}>
                            {categories.map((categorie, index) => {
                                return (
                                    <TouchableOpacity key={index} onPress={() => onCategoryPress(categorie)}>
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
                    </View>}


                {selectedCategorie && ((loadingSubCategories || loadingProducts || loadingSubCategories) ? <SubCategoriesSkeletons /> : <SubCategories
                    sousCategories={sousCategories}
                    selectedItemSousCategories={selectedItemSousCategories}
                    selectedsousCategories={selectedsousCategories}
                />)}

                {(firstLoadingProducts || loadingCategories || loadingProducts || loadingSubCategories) ? <HomeProductsSkeletons wrap /> :

                    <View style={styles.products}>
                        {products.map((product, index) => {
                            return (
                                <ProductPartenaire
                                    product={product}
                                    index={index}
                                    totalLength={products.length}
                                    key={index}
                                    fixMargins
                                />
                            )
                        })}
                    </View>}
            </ScrollView> */}

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    categorys: {
        marginTop: "0%"
    },
    imagePrincipal:
    {
        width: '120%',
        height: 280,
        alignSelf: 'center',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    carre: {
        padding: 15,
        height: 50,
        width: 100,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 10,
    },
    plus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: "-2%",
        paddingHorizontal: 10,
        marginBottom: "5%"
    },
    plus1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: "1%",
        paddingHorizontal: 10,
        marginBottom: "-4%"
    },
    plusText: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 14,
    },
    categories: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingBottom: 5,
        marginTop: -80
    },
    categoryPhoto: {
        width: 80,
        height: 70,
        borderRadius: 8,
        backgroundColor: COLORS.skeleton
    },
    categoryChecked: {
        width: 80,
        height: 85,
        borderRadius: 8,
        marginTop: -80

    },
    category: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20,
        elevation: 10,
        marginRight: -12.6,
        backgroundColor: 'white',
        borderRadius: 10
    },
    icon: {
        width: 50,
        top: 30,
        position: 'absolute',
        marginRight: 10,
        // backgroundColor: '#fff',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60
    },
    menuOpener: {
        marginTop: 25
    },
    menuOpenerLine: {
        height: 3,
        width: 30,
        backgroundColor: COLORS.ecommercePrimaryColor,
        marginTop: 5
    },
    title: {
        fontWeight: 'bold'
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    titlePrincipal: {
        fontSize: 0,
        fontWeight: "bold",
        marginBottom: 0,
        color: COLORS.ecommercePrimaryColor,
        marginHorizontal: 10
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
    DataImageCategorie: {
        minWidth: 40,
        minHeight: 40,
        borderRadius: 10,
    },
})