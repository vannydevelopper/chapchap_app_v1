import React, { useState } from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ScrollView, ImageBackground, Image } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
import fetchApi from "../../helpers/fetchApi";

export default function CategorieListeScreen() {
        const navigation = useNavigation()
        const route = useRoute()
        const { categories, selectedCategorie } = route.params
        const [selected, setSelected] = useState(selectedCategorie)

        const [products, setProducts] = useState([])

        const onCategoryPress = async (categorie) => {
                console.log(categorie)
                setSelected(null)
                try {
                        const reponse = await fetchApi(`/products?category=${categorie.ID_CATEGORIE_PRODUIT}`, {
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                        })
                
                        setProducts(reponse.result)
                        console.log(`/products?category=${categorie.ID_CATEGORIE_PRODUIT}`)
                        console.log(reponse.result)

                } catch (error) {
                        console.log(error)
                }


        }
        return (
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
                        <ScrollView
                                style={styles.shops}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                        >
                                <View style={styles.categories}>
                                        {categories.map((categorie, index) => {
                                                return (
                                                        <TouchableOpacity style={[styles.category,]} onPress={() => onCategoryPress(categorie)} key={index}>
                                                                {/* <View style={styles.categoryPhoto}>
                                                                        <Image source={{ uri: categorie.IMAGE }} borderRadius={15} style={styles.categoryImage} />
                                                                </View> */}

                                                                <View style={[styles.categoryPhoto, { backgroundColor: categorie.ID_CATEGORIE_PRODUIT == selected ? COLORS.handleColor : "#DFE1E9" }]}>
                                                                        <Image source={{ uri: categorie.IMAGE }} style={[styles.categoryImage, , { opacity: categorie.ID_CATEGORIE_PRODUIT == selected ? 0.2 : 1 }]} />
                                                                </View>
                                                                <Text style={[{ fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
                                                                {categorie.ID_CATEGORIE_PRODUIT == selected && <View style={[styles.categoryChecked, { backgroundColor: categorie.ID_CATEGORIE_PRODUIT == selected }]}>
                                                                        <AntDesign style={{ marginTop: 20, marginLeft: 20, color: COLORS.ecommercePrimaryColor }} name="check" size={40} color='#000' />
                                                                </View>}
                                                        </TouchableOpacity>
                                                )
                                        })}

                                </View>
                        </ScrollView>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                marginHorizontal: 5
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
})