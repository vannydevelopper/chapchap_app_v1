import React from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import ProduitParPartenaire from '../main/ProduitParPartenaire';
import { HomeProductsSkeletons } from '../skeletons/Skeletons';
import { useNavigation } from '@react-navigation/native';

export default function ProduitPartenaire({productPartenaires}) {
        return (
                <View style={styles.homeProducts}>
                        <TouchableNativeFeedback
                                accessibilityRole="button"
                                background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                        >
                                <View style={styles.productsHeader}>
                                        <Text style={styles.title}>Autres produits</Text>
                                        <MaterialIcons name="navigate-next" size={24} color="black" />
                                </View>
                        </TouchableNativeFeedback>
                        <ScrollView
                                style={styles.products}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                        >
                                {productPartenaires.map((product, index) => {
                                        return (
                                                <ProduitParPartenaire
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
                marginTop: 10,
                paddingVertical: 10,
                paddingHorizontal: 10
        },
        title: {
                fontWeight: 'bold'
        },
        products: {
                paddingHorizontal: 10,
        }
})