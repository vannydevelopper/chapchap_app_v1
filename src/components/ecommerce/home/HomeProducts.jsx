import React from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import Product from '../main/Product';
import { HomeProductsSkeletons } from '../skeletons/Skeletons';
import { useNavigation } from '@react-navigation/native';

export default function HomeProducts({ products, selectedCategorie, selectedsousCategories }) {

        const navigation = useNavigation()
        return (
                <View style={styles.homeProducts}>
                        <TouchableNativeFeedback
                                accessibilityRole="button"
                                background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                                onPress={() => navigation.navigate('AllProductsScreen', {
                                        selectedCategorie: selectedCategorie, selectedsousCategories: selectedsousCategories
                                })}
                        >
                                <View style={styles.productsHeader}>
                                        <Text style={styles.title}>Les plus achetés</Text>
                                        <MaterialIcons name="navigate-next" size={24} color="black" />
                                </View>
                        </TouchableNativeFeedback>
                        <ScrollView
                                style={styles.products}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                        >
                                {products.map((product, index) => {
                                        return (
                                                <Product
                                                        product={product}
                                                        index={index}
                                                        totalLength={products.length}
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