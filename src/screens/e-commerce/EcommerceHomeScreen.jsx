import React, { useCallback, useRef,useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";
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
    const [shops, setShops] = useState([])
    const navigation = useNavigation()
    const CategoriemodalizeRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [loadingForm, setLoadingForm] = useState(true)
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
        CategoriemodalizeRef.current?.open()
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
                var url = "/products"
                if (selectedCategorie) {
                    url = `/products?category=${selectedCategorie?.ID_CATEGORIE_PRODUIT}`
                }
                if (selectedsousCategories) {
                    url = `/products?category=${selectedCategorie?.ID_CATEGORIE_PRODUIT}&subCategory=${selectedsousCategories?.ID_PRODUIT_SOUS_CATEGORIE}`
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
    }, [selectedCategorie, selectedsousCategories])
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
        <View style={styles.container}>
            <View style={styles.cardHeader}>
                <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                    <View style={styles.menuOpenerLine} />
                    <View style={[styles.menuOpenerLine, { width: 15 }]} />
                    <View style={[styles.menuOpenerLine, { width: 25 }]} />
                </TouchableOpacity>
                <EcommerceBadge />
            </View>
            <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[2]}>
                <Text style={styles.titlePrincipal}>Achat des produits</Text>
                <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 25, paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => navigation.navigate("ResearchTab")} style={styles.searchSection} >
                        <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                        <Text style={styles.input}>Rechercher.......</Text>
                    </TouchableOpacity>
                    <View style={styles.cardRecherche}>
                        <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
                    </View>
                </View>
                <TouchableOpacity onPress={plusCategories} style={styles.plus1}>
                    <View>
                        <Text style={styles.plusText}>Categories</Text>
                    </View>
                    <View style={{ marginLeft: 300,marginTop:-20 }}>
                        <View  style={{ flexDirection: 'row' }}>
                            <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} style={{ marginRight: -15 }} />
                            <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} />
                        </View>
                    </View>
                </TouchableOpacity>
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
                    </View>
                    }
                {selectedCategorie ? ((loadingSubCategories || loadingProducts) ? <SubCategoriesSkeletons /> : <SubCategories
                    sousCategories={sousCategories}
                    selectedItemSousCategories={selectedItemSousCategories}
                    selectedsousCategories={selectedsousCategories}
                />) : null}

                {(firstLoadingProducts || loadingCategories || loadingProducts || loadingSubCategories) ? <HomeProductsSkeletons /> :
                    <HomeProducts products={products} selectedCategorie={selectedCategorie} selectedsousCategories={selectedsousCategories} />}

                {(firstLoadingProducts || loadingCategories || loadingProducts || loadingSubCategories) ? <HomeProductsSkeletons /> :
                    <Shops shops={shops} />
                }
                <View>
                    <View style={styles.productsHeader}>
                        <Text style={styles.title}>Recommandé pour vous</Text>
                    </View>
                </View>
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
                </View>
                
         
            </ScrollView>
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
                    setLoadingForm(true)
                }}
            >
                <ScrollView>
                    <Text style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>catégories</Text>
                    <View style={styles.cate}>
                        {categories.map((categorie, index) => {
                            return (
                                <View style={{ ...styles.categoryModel, margin: 15 }} >
                                    <View style={styles.actionIcon}>
                                        <ImageBackground source={{ uri: categorie.IMAGE }} borderRadius={15} style={styles.categoryImage} />
                                    </View>
                                    <Text style={[{ fontSize: 10, fontWeight: "bold" }, { color: "#797E9A" }]}>{categorie.NOM}</Text>
                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            </Modalize>
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
        marginTop: "-8%",
        paddingHorizontal: 10,
        marginBottom: "-5 %"
    },
    plusText: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 14,
    },
    categoryModel: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20,
        elevation: 10,
        backgroundColor: 'white',
        borderRadius: 10,
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
        backgroundColor: COLORS.ecommerceRed,
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
})