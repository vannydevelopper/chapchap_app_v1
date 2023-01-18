import React, { useCallback, useRef, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, FlatList, TouchableNativeFeedback } from "react-native";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { DrawerActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import SubCategories from "../../components/ecommerce/home/SubCategories";
import HomeProducts from "../../components/ecommerce/home/HomeProducts";
import Shops from "../../components/ecommerce/home/Shops";
import Product from "../../components/ecommerce/main/Product";
import { CategoriesSkeletons, HomeProductsSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import { useForm } from "../../hooks/useForm";
import { Modalize } from "react-native-modalize";
import Shop from "../../components/ecommerce/main/Shop";
import ShopModal from "../../components/ecommerce/main/ShopModal";
import * as Location from 'expo-location';

/**
 * Screen de home pour afficher les boutiques, les categories et les produits recommande pour vous
 * @author Inconnu mais corriger par Vanny Boy <vanny@mediabox.bi>
 * @returns 
 */

export default function EcommerceHomeScreen() {
    const { height } = useWindowDimensions()

    const [loadingCategories, setLoadingCatagories] = useState(true)
    const [categories, setCategories] = useState([])
    const [selectedCategorie, setSelectedCategorie] = useState(null)


    const [loadingSubCategories, setLoadingSubCategories] = useState(false)
    const [sousCategories, SetSousCategories] = useState([])
    const [selectedsousCategories, setSelectedsousCategories] = useState(null)


    const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [products, setProducts] = useState([])
    const [productsCommande, setProductCommandes] = useState([])

    const [shops, setShops] = useState([])
    const [IsLoadingMore, setIsLoadingMore] = useState(false)
    const [offset, setOffset] = useState(0)
    const navigation = useNavigation()

    const CategoriemodalizeRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false)
    const [loadingForm, setLoadingForm] = useState(true)

    const LIMIT = 10

    const isCloseToBottom = useCallback(({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    }, []);


    const onLoadMore = async () => {
        try {
            setIsLoadingMore(true)
            const newOffset = offset + LIMIT
            const pts = await getProducts(newOffset)
            setOffset(newOffset)
            setProducts(p => [...p, ...pts.result])
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoadingMore(false)
        }
    }
    const fecthCategories = async () => {
        try {
            const response = await fetchApi("/products/categories", {
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
        fecthCategories()
    }, []))

    const onCategoryPress = (categorie) => {

        if (loadingSubCategories || loadingProducts) return false
        if (categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT) {
            return setSelectedCategorie(null)
        }
        setSelectedCategorie(categorie)
        setSelectedsousCategories(null)
        navigation.navigate("PlusRecommandeScreen", { selectedOneCategorie: categorie })
    }

    const selectedItemSousCategories = (souscategorie) => {
        if (loadingSubCategories || loadingProducts) return false
        if (souscategorie.ID_PRODUIT_SOUS_CATEGORIE == selectedsousCategories?.ID_PRODUIT_SOUS_CATEGORIE) {
            return setSelectedsousCategories(null)
        }
        setSelectedsousCategories(souscategorie)
        // setSelectedsousCategories(null)
    }
    const plusCategories = () => {
        // setIsOpen(true)
        // CategoriemodalizeRef.current?.open()
        navigation.navigate("CategorieListeScreen")
    }
    const onCartPress = () => {
        // setIsOpen(true)
        // modalizeRef.current?.open()
        navigation.navigate("BoutiqueListeScreen", { shops: shops })
    }
    const productPress = () => {
        // setIsOpen(true)
        // ProductmodalizeRef.current?.open()
        navigation.navigate("PlusRecommandeScreen", { selectedOneCategorie: null, ID_PARTENAIRE_SERVICE: null })
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


    const getProducts = useCallback(async (offset = 0) => {
        try {
            if (firstLoadingProducts == false) {
                setLoadingProducts(true)
            }
            var url = `/products?limit=${LIMIT}&offset=${offset}&`
            if (selectedCategorie) {
                url = `/products?category=${selectedCategorie?.ID_CATEGORIE_PRODUIT}&limit=${LIMIT}&offset=${offset}&`
            }
            if (selectedsousCategories) {
                url = `/products?category=${selectedCategorie?.ID_CATEGORIE_PRODUIT}&subCategory=${selectedsousCategories?.ID_PRODUIT_SOUS_CATEGORIE}`
            }
            return await fetchApi(url)
        }
        catch (error) {
            console.log(error)
        }

    }, [selectedCategorie, selectedsousCategories])

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                setOffset(0)
                const produts = await getProducts(0)
                setProducts(produts.result)
            } catch (error) {
                console.log(error)
            }
        })()
    }, []))

    const getProductsCommandes = useCallback(async (offset = 0) => {

        if (firstLoadingProducts == false) {
            setLoadingProducts(true)
        }
        var url = "/products/commande"
        if (selectedCategorie) {
            url = `/products/commande?category=${selectedCategorie?.ID_CATEGORIE_PRODUIT}`
        }
        if (selectedsousCategories) {
            url = `/products/commande?category=${selectedCategorie?.ID_CATEGORIE_PRODUIT}&subCategory=${selectedsousCategories?.ID_PRODUIT_SOUS_CATEGORIE}`
        }
        return await fetchApi(url)


    }, [selectedCategorie, selectedsousCategories])

    useFocusEffect(useCallback(() => {
        (async () => {
            try {
                setOffset(0)
                const produts = await getProductsCommandes(0)
                setProductCommandes(produts.result)
            } catch (error) {
                console.log(error)
            }
        })()
    }, []))

    useEffect(() => {
        const fecthShops = async (lat, long) => {
            try {
                if (firstLoadingProducts == false) {
                    setLoadingProducts(true)
                }
                if (lat && long) {
                    return await fetchApi(`/partenaire/ecommerce?lat=${lat}&long=${long}`)
                }
                else {
                    return await fetchApi('/partenaire/ecommerce')
                }
            }
            catch (error) {
                console.log(error)
            } finally {
                setFirstLoadingProducts(false)
                setLoadingProducts(false)
            }
        }
        const askLocationFetchShops = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                const shops = await fecthShops()
                setShops(shops.result)
                setFirstLoadingProducts(false)
                setLoadingProducts(false)
                return;
            }
            var location = await Location.getCurrentPositionAsync({});
            const shops = await fecthShops(location.coords.latitude, location.coords.longitude)
            setShops(shops.result)
            setFirstLoadingProducts(false)
            setLoadingProducts(false)
        }
        askLocationFetchShops()

    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <View style={styles.menuOpenerLine} />
                    <View style={[styles.menuOpenerLine, { width: 15 }]} />
                    <View style={[styles.menuOpenerLine, { width: 25 }]} />
                </TouchableOpacity>
                <EcommerceBadge />
            </View>
            <ScrollView
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent) && !IsLoadingMore && offset <= 40) {
                        onLoadMore()
                    }
                }}
                style={styles.cardOrginal}>

                <Text style={styles.titlePrincipal}>Achat des produits</Text>
                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 12, paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("ResearchTab")} style={styles.searchSection} >
                        <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                        <Text style={styles.input}>Rechercher.......</Text>
                    </TouchableOpacity>
                    <View style={styles.cardRecherche}>
                        <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                    </View>
                </View>
                <TouchableOpacity style={styles.plus2} onPress={onCartPress}>
                    <View>
                        <Text style={styles.plusText}>Boutiques proches</Text>
                    </View>
                    {
                        shops.length > 0 &&
                        <TouchableOpacity onPress={onCartPress}>
                            <View>
                                <AntDesign name="arrowright" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    }
                </TouchableOpacity>
                {(firstLoadingProducts || loadingCategories || loadingProducts || loadingSubCategories) ? <HomeProductsSkeletons /> :
                    <Shops shops={shops} />
                }

                <TouchableOpacity style={{ ...styles.plus2, marginBottom: 3 }} onPress={plusCategories}>
                    <View>
                        <Text style={styles.plusText}>Categories</Text>
                    </View>
                    {
                        categories.length > 0 &&
                        <TouchableOpacity onPress={plusCategories}>
                            <View>
                                <AntDesign name="arrowright" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    }
                </TouchableOpacity>


                {(loadingCategories || firstLoadingProducts) ? <CategoriesSkeletons /> :

                    <ScrollView
                        style={styles.shops}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <View style={styles.categories}>
                            {categories.map((categorie, index) => {
                                return (
                                    <>
                                        {/* <TouchableOpacity onPress={() => onCategoryPress(categorie)} style={[styles.category,]} key={index}>
                                            <View style={[styles.categoryPhoto, { backgroundColor: categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT ? COLORS.handleColor : "#DFE1E9" }]}>
                                                <Image source={{ uri: categorie.IMAGE }} style={[styles.DataImageCategorie, , { opacity: categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT ? 0.2 : 1 }]} />
                                            </View>
                                            <Text style={[{ fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
                                            {categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT && <View style={[styles.categoryChecked, { backgroundColor: categorie.ID_CATEGORIE_PRODUIT == selectedCategorie?.ID_CATEGORIE_PRODUIT }]}>
                                                <AntDesign style={{ marginTop: 20, marginLeft: 20, color: COLORS.ecommercePrimaryColor }} name="check" size={40} color='#000' />
                                            </View>}
                                        </TouchableOpacity> */}

                                        <TouchableOpacity onPress={() => onCategoryPress(categorie)} style={[styles.category,]} key={index}>
                                            <View style={styles.categoryPhoto}>
                                                <Image source={{ uri: categorie.IMAGE }} style={styles.DataImageCategorie} />
                                            </View>
                                            <Text style={[{ fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
                                        </TouchableOpacity>
                                    </>
                                )
                            })}
                        </View>
                    </ScrollView>
                }
                {/* {selectedCategorie ? ((loadingSubCategories || loadingProducts) ? <SubCategoriesSkeletons /> : <SubCategories
                    sousCategories={sousCategories}
                    selectedItemSousCategories={selectedItemSousCategories}
                    selectedsousCategories={selectedsousCategories}
                />) : null} */}

                {productsCommande.length > 0 &&
                    <TouchableOpacity style={styles.plus2}>
                        <View>
                            <Text style={styles.plusText}>Articles plus achetés</Text>
                        </View>
                        <TouchableOpacity onPress={productPress}>
                            <View>
                                <AntDesign name="arrowright" size={24} color="black" />
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>}
                {(firstLoadingProducts || loadingCategories || loadingProducts || loadingSubCategories) ? <HomeProductsSkeletons /> :
                    <HomeProducts products={productsCommande} selectedCategorie={selectedCategorie} selectedsousCategories={selectedsousCategories} />}


                <TouchableOpacity onPress={productPress} style={{ ...styles.plus2, marginBottom: 2 }}>
                    <View>
                        <Text style={styles.plusText}>Recommandé pour  vous </Text>
                    </View>
                    <View>
                        <AntDesign name="arrowright" size={24} color="black" />
                    </View>
                </TouchableOpacity>
                <View style={styles.products}>
                    {products.map((product, index) => {
                        return (
                            <Product
                                product={product}
                                index={index}
                                totalLength={products.length}
                                key={index}
                                fixMargins
                                IsLoadingMore={IsLoadingMore}
                            />
                        )
                    })}
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10, opacity: IsLoadingMore ? 1 : 0 }}>
                    <ActivityIndicator animating={true} size="large" color={"#000"} />
                </View>
            </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    plus1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: "-3%",
        paddingHorizontal: 10,
        marginBottom: "-1%"
    },
    plus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: "1%",
        paddingHorizontal: 10,
        marginBottom: "0%"
    },
    plus2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        // marginTop: "-5%",
        paddingHorizontal: 10,
        marginBottom: "5%",
        // backgroundColor:"red"
    },
    plusRecommande: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: "-2%",
        paddingHorizontal: 10,
        marginBottom: "5%"
    },
    plusText: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 18,
        fontWeight: "bold"
    },
    textRcommande: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 14,
        paddingHorizontal: 10,

    },
    categories: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingBottom: 2,
        // marginTop:-10
    },
    categoryModel: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
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
    categoryChecked: {
        width: 80,
        height: 85,
        borderRadius: 8,
        marginTop: -80

    },
    actionIcon: {
        borderRadius: 15,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
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
    bout: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60
    },
    cate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    menuOpener: {
    },
    menuOpenerLine: {
        height: 3,
        width: 30,
        backgroundColor: COLORS.ecommercePrimaryColor,
        marginTop: 5,
        borderRadius: 10
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: "100%"
    },
    cardOrginal: {
        marginBottom: "1%"
    },
    titlePrincipal: {
        fontSize: 23,
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
        backgroundColor: COLORS.ecommerceRed,
        marginTop: 8,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    DataImageCategorie: {
        borderRadius: 10,
        width: '80%',
        height: '80%',
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
    }
})