import React from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { HomeProductsSkeletons } from '../skeletons/Skeletons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Product from '../main/Product';
import HomeProduct from '../main/HomeProduct';
import { COLORS } from '../../../styles/COLORS';
import { useEffect } from 'react';
import { useState } from 'react';
import fetchApi from '../../../helpers/fetchApi';


export default function ProduitPartenaire({ productPartenaires, ID_PARTENAIRE_SERVICE }) {
    const navigation = useNavigation()
    const [shops, setShops] = useState([])

    useEffect(() => {
        (async () => {
            try {
                // if (firstLoadingProducts == false) {
                //     // setLoadingProducts(true)
                // }
                var url = `/partenaire/ecommerce/one/${ID_PARTENAIRE_SERVICE}`
                const shops = await fetchApi(url)
                setShops(shops.result[0])
            } catch (error) {
                console.log(error)
            } finally {
                // setFirstLoadingProducts(false)
                // setLoadingProducts(false)
            }
        })()
    }, [])
    return (
        <View style={styles.homeProducts}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('ProductShopsScreen', { id: ID_PARTENAIRE_SERVICE ,shop:shops})}

                accessibilityRole="button"
                background={TouchableNativeFeedback.Ripple('#c9c5c5')}
            >
                <View style={{
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10
                }}>
                    <View style={styles.productsHeader}>
                        <Text style={styles.title}>Dans ce boutique</Text>
                        {
                            productPartenaires.length > 4 &&
                            <View style={{ marginTop: -8 }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <MaterialIcons style={{ marginLeft: -30 }} name="navigate-next" size={24} color={COLORS.ecommerceOrange} />
                                    <MaterialIcons style={{ marginLeft: -30 }} name="navigate-next" size={24} color={COLORS.ecommerceOrange} />
                                </View>
                            </View>
                        }

                    </View>

                </View>

            </TouchableNativeFeedback>


            <ScrollView
                style={styles.products}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {productPartenaires.map((product, index) => {
                    return (
                        <HomeProduct
                            product={product}
                            index={index}
                            totalLength={productPartenaires.length}
                            key={index}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    homeProducts: {
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: "5%",
        marginBottom: "-3%",

    },
    title: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 14,
    },
    products: {
        paddingHorizontal: 10,
    }
})