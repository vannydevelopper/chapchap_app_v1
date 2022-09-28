import React, { useState } from "react"
import { Image, View, StyleSheet, Text, TouchableOpacity, TextInput, TouchableNativeFeedback, ScrollView, StatusBar } from "react-native"
import { Ionicons, AntDesign, Entypo, Foundation, MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import { useCallback } from "react";
import fetchApi from "../../helpers/fetchApi";
export default function MenuDetailScreen() {
    const [nombre, setNombre] = useState(0);
    const route = useRoute()
    const navigation = useNavigation()
    const { menuListe } = route.params
    console.log(menuListe)
    const addNumber = async () => {

        if (nombre != '') {
            setNombre(nbr => parseInt(nbr) + 1)
        }
        else {
            setNombre(1)
        }
    }

    const mouveNumber = async () => {

        if (nombre != '') {
            setNombre(nbr => parseInt(nbr) - 1)

        }
        else {
            setNombre(0)

        }
    }

    // const fecthProduitsPartenaire = async () => {
    //     try {
    //         const response = await fetchApi(`/resto/menu?category=${product.partenaire.ID_PARTENAIRE}`, {
    //             method: "GET",
    //             headers: { "Content-Type": "application/json" },
    //         })
    //         setShopProducts(response)
    //     }
    //     catch (error) {
    //         console.log(error)
    //     } finally {
    //         setLoadingShopProducts(false)
    //     }
    // }

    // useFocusEffect(useCallback(()=>{
    //     fecthProduitsPartenaire
    // },[]))

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
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.producHeader} >
                        <Image source={{ uri: menuListe.IMAGE }} style={styles.productImage} />
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 10 }}>
                        <View>
                            <TouchableOpacity style={styles.category} >
                                <Entypo name="shopping-cart" size={24} color={COLORS.primary} />
                                <Text style={styles.categoryName} numberOfLines={2}>Plat du riz</Text>
                            </TouchableOpacity>
                            <View style={styles.productNames}>
                                <Text style={styles.productName}>
                                    <Text numberOfLines={2} style={styles.productName}> Roz . kasongo</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.shareBtn}>
                            <AntDesign name="sharealt" size={20} color={COLORS.primary} />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 10, marginTop: 5 }}>
                        <Text style={styles.productDescription}>gyuguy dgyugd vyudgyuvyu gvdyuvdyuv gvyuvdyuv vyuvyuv yvyugvy vyuv</Text>
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
                </ScrollView>
            </View>
            <View style={styles.productFooter}>
                <Text style={styles.productPrice}>15 000 Fbu</Text>
                <TouchableOpacity style={[styles.addCartBtn]}  >
                    <>
                        <View>
                            <Ionicons name="cart" size={24} color="#fff" />
                        </View>
                        <Text style={styles.addCartBtnTitle}>
                            Ajouter au panier
                        </Text>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText} numberOfLines={1}>12</Text>
                        </View>
                    </>
                </TouchableOpacity>
            </View>
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
})
