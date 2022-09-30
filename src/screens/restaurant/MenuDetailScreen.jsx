import React, { useCallback, useState, useEffect, useRef } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity, TextInput, TouchableNativeFeedback, ScrollView, StatusBar } from "react-native"
import { Ionicons, AntDesign, Entypo, Foundation, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from 'react-redux';
import fetchApi from "../../helpers/fetchApi";
import ProduitRestoPartenaire from "../../components/restaurants/home/ProduitRestoPartenaire";
import Menu from "../../components/restaurants/main/Menu";
import { HomeProductsSkeletons } from "../../components/restaurants/skeletons/SkeletonsResto";
import { restaurantProductSelector } from "../../store/selectors/restaurantCartSelectors"
import AddCart from "../../components/restaurants/main/AddCart"
// import ProductImages from "../../components/ecommerce/details/ProductImages";
import ProductImages from "../../components/restaurants/details/ProductImages"
export default function MenuDetailScreen() {
    const [nombre, setNombre] = useState(0);
    const route = useRoute()
    const navigation = useNavigation()
    const { product } = route.params
    // console.log(product)

    const [loadingPartenaireProducts, setloadingPartenaireProducts] = useState(true)
    const [shopProducts, setShopProducts] = useState([])

    const [loadingSimilarProducts, setLoadingSimilarProducts] = useState(true)
    const [similarProducs, setSimilarProducts] = useState([])

    const productInCart = useSelector(restaurantProductSelector(product.ID_RESTAURANT_MENU))

    const modalizeRef = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [loadingForm, setLoadingForm] = useState(true)

    const onCartPress = () => {
        setIsOpen(true)
        modalizeRef.current?.open()
    }
    const onCloseAddToCart = () => {
        modalizeRef.current?.close()
    }

    var IMAGES = [
        product.IMAGE ? product.IMAGE : undefined,
        product.IMAGE_2 ? product.IMAGE_2 : undefined,
        product.IMAGE_3 ? product.IMAGE_3 : undefined,
]

    const fecthProduitPartenaires = async () => {
        try {
            const response = await fetchApi(`/resto/menu?partenaire=${product.ID_PARTENAIRE}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            setShopProducts(response.result)
            console.log(response.result)
        }
        catch (error) {
            console.log(error)
        } finally {
            setloadingPartenaireProducts(false)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthProduitPartenaires()
    }, []))

    useEffect(() => {
        (async () => {
            try {
                var url = "/resto/menu"
                const produits = await fetchApi(url)
                setSimilarProducts(produits.result)
                // console.log(produits.result)
            } catch (error) {
                console.log(error)
            } finally {
                setLoadingSimilarProducts(false)
            }
        })()
    }, [])


    return (
        <>
            <View style={{ marginTop: 0, flex: 1 }}>
                <View style={styles.cardHeader}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back-sharp" size={24} color="black" />
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity style={{ marginRight: 20 }} >
                            <AntDesign name="search1" size={24} color={COLORS.ecommercePrimaryColor} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled>
                    <ProductImages images={IMAGES}/>
                    {/* <View style={styles.producHeader} >
                        <Image source={{ uri: product.IMAGE }} style={styles.productImage} />
                    </View> */}
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                        <View>
                            <TouchableOpacity style={styles.category} >
                                <Entypo name="shopping-cart" size={24} color={COLORS.primary} />
                                <Text style={styles.categoryName} numberOfLines={2}>{product.NOM_CATEGORIE}</Text>
                            </TouchableOpacity>
                            <View style={styles.productNames}>
                                <Text style={styles.productName}>
                                    <Text numberOfLines={2} style={styles.productName}>{product.NOM_SOUS_CATEGORIE}</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.shareBtn}>
                            <AntDesign name="sharealt" size={20} color={COLORS.primary} />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                        <Text style={styles.productDescription}>{product.DESCRIPTION_SOUS_CATEGORIE}</Text>
                    </View>
                    <TouchableNativeFeedback>
                        <View style={styles.shop}>
                            <View style={styles.shopLeft}>
                                <View style={styles.shopIcon}>
                                    <Entypo name="shop" size={24} color={COLORS.primary} />
                                    {/* <FontAwesome name="user" size={24} color={COLORS.primary} /> */}
                                </View>
                                <View style={styles.shopOwner}>
                                    <Text style={styles.productSeller}>
                                        obr
                                    </Text>
                                    <Text style={styles.shopAdress}>Bujumbura</Text>
                                </View>
                            </View>
                            <MaterialIcons name="navigate-next" size={24} color="black" />
                        </View>
                    </TouchableNativeFeedback>

                    {(loadingPartenaireProducts) ? <HomeProductsSkeletons /> :
                        <ProduitRestoPartenaire productPartenaires={shopProducts} />}

                    {(loadingSimilarProducts) ? <HomeProductsSkeletons wrap /> :
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
                                        <Menu
                                            menu={product}
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
                {product.MONTANT ? <Text style={styles.productPrice}>{product.MONTANT.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
                <TouchableOpacity style={[styles.addCartBtn]} onPress={onCartPress}  >
                    <>
                        <View>
                            <Ionicons name="cart" size={24} color="#fff" />
                        </View>
                        <Text style={styles.addCartBtnTitle}>
                            Ajouter au panier
                        </Text>
                        {productInCart ? <View style={styles.badge}>
                            <Text style={styles.badgeText} numberOfLines={productInCart.QUANTITE}></Text>
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

                        <AddCart menu={product} loadingForm={loadingForm} onClose={onCloseAddToCart} />
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
    productImage: {
        width: '70%',
        minHeight: 150,
        maxHeight: 200,
        alignSelf: 'center',
        resizeMode: "center",
        borderRadius: 10
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
    shareBtn: {
        padding: 15,
        height: 50,
        width: 50,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 100
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
