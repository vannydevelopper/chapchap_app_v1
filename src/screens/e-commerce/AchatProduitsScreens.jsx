import React, { useCallback, useState } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { useFocusEffect } from "@react-navigation/native";

export default function AchatProduitsScreens() {
        const { height } = useWindowDimensions()
        const [categories, setCategories] = useState([])
        const [selectedCategorie, setSelectedCategorie] = useState(null)
        const fecthProduits = async () => {
                try {

                        const response = await fetchApi("/products/categories", {
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                        })
                        setCategories(response.result)
                        console.log(response)
                }
                catch (error) {
                        console.log(error)
                }
        }
        useFocusEffect(useCallback(() => {
                fecthProduits()
        }, []))

        const selectedItemCategories = (categorie) => {
                setSelectedCategorie(categorie)
        }
        return (
                <View style={styles.container}>
                        <View style={{ backgroundColor: "#fff", marginBottom: 15 }}>
                                <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.image} />
                        </View>
                        <View style={styles.cardOrginal}>
                                <Text style={styles.titlePrincipal}>Achat des produits</Text>
                                <View>
                                        <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 25 }}>
                                                <View style={styles.searchSection}>
                                                        <EvilIcons name="search" size={24} color="black" />
                                                        <TextInput
                                                                style={styles.input}
                                                                placeholder="Recherche"

                                                        />
                                                </View>
                                                <View style={styles.cardRecherche}>
                                                        <AntDesign name="menuunfold" size={24} color="white" />
                                                </View>
                                        </View>

                                </View>
                                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                                        <View>

                                        </View>
                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Voir plus</Text>
                                </View>
                                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                                {categories.map((categorie, index) => {
                                        return (
                                                <TouchableOpacity key={index} onPress={()=>selectedItemCategories(categorie)}>
                                                        <View style={{ alignContent: "center", alignItems: "center" }}>
                                                                <View style={[styles.cardPhoto, {backgroundColor:categorie.ID_CATEGORIE_PRODUIT==selectedCategorie?.ID_CATEGORIE_PRODUIT ? "#242F68" : "#DFE1E9"} ]}>
                                                                        <Ionicons name="shirt-sharp" size={24} color="white" />
                                                                </View>
                                                                <Text style={{ fontSize: 12, fontWeight: "bold" }}>{categorie.NOM}</Text>
                                                        </View>
                                                </TouchableOpacity>
                                        )
                                })}
                                </View>


                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                                        <TouchableOpacity style={styles.tireCard}>
                                                <Text style={{ fontWeight: "bold", fontSize: 17 }}>Chemises</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                                <Text style={{ fontWeight: "bold", color: "#ddd", fontSize: 17 }}>Pantalons</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                                <Text style={{ fontWeight: "bold", color: "#ddd", fontSize: 17 }}>Sous-vetements</Text>
                                        </TouchableOpacity>
                                </View>
                        </View>
                        <ScrollView>
                                <View style={{ flexDirection: "row", marginHorizontal: 20, justifyContent: "space-between", marginBottom: 10 }}>
                                        <View>
                                                <View style={styles.cardAchat}>
                                                        <Ionicons name="shirt-sharp" size={70} color="black" />
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                        <View style={styles.cardLike}>
                                                                <Ionicons name="heart-dislike-outline" size={24} color="#F29558" />
                                                        </View>
                                                        <View style={styles.cardLike2}>
                                                                <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                        </View>
                                                </View>
                                                <View>
                                                        <Text numberOfLines={2} style={{ maxWidth: 150, fontSize: 12 }}>Chemise jean a manches courtes</Text>
                                                        <Text style={{ color: "#F29558", fontWeight: "bold" }}>FBu 45.000</Text>
                                                </View>
                                        </View>

                                        <View>
                                                <View style={styles.cardAchat}>
                                                        <Ionicons name="shirt-sharp" size={70} color="black" />
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                        <View style={styles.cardLike}>
                                                                <Ionicons name="heart-dislike-outline" size={24} color="#F29558" />
                                                        </View>
                                                        <View style={styles.cardLike2}>
                                                                <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                        </View>
                                                </View>
                                                <View>
                                                        <Text numberOfLines={2} style={{ maxWidth: 150, fontSize: 12 }}>Chemise jean a manches courtes</Text>
                                                        <Text style={{ color: "#F29558", fontWeight: "bold" }}>FBu 45.000</Text>
                                                </View>
                                        </View>
                                </View>

                                <View style={{ flexDirection: "row", marginHorizontal: 20, justifyContent: "space-between", marginBottom: 10 }}>
                                        <View>
                                                <View style={styles.cardAchat}>
                                                        <Ionicons name="shirt-sharp" size={70} color="black" />
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                        <View style={styles.cardLike}>
                                                                <Ionicons name="heart-dislike-outline" size={24} color="#F29558" />
                                                        </View>
                                                        <View style={styles.cardLike2}>
                                                                <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                        </View>
                                                </View>
                                                <View>
                                                        <Text numberOfLines={2} style={{ maxWidth: 150, fontSize: 12 }}>Chemise jean a manches courtes</Text>
                                                        <Text style={{ color: "#F29558", fontWeight: "bold" }}>FBu 45.000</Text>
                                                </View>
                                        </View>

                                        <View>
                                                <View style={styles.cardAchat}>
                                                        <Ionicons name="shirt-sharp" size={70} color="black" />
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                        <View style={styles.cardLike}>
                                                                <Ionicons name="heart-dislike-outline" size={24} color="#F29558" />
                                                        </View>
                                                        <View style={styles.cardLike2}>
                                                                <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                        </View>
                                                </View>
                                                <View>
                                                        <Text numberOfLines={2} style={{ maxWidth: 150, fontSize: 12 }}>Chemise jean a manches courtes</Text>
                                                        <Text style={{ color: "#F29558", fontWeight: "bold" }}>FBu 45.000</Text>
                                                </View>
                                        </View>
                                </View>
                        </ScrollView>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1
        },
        image: {
                marginTop: 30,
                alignSelf: "center",
        },
        cardOrginal: {
                marginHorizontal: 20
        },
        titlePrincipal: {
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 12
        },
        input: {
                flex: 1
        },
        searchSection: {
                flexDirection: "row",
                marginTop: 10,
                padding: 5,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#ddd",
                //justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                backgroundColor: "#D7D9E4",
                width: "84%"
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
        cardPhoto1: {
                marginTop: 10,
                width: 50,
                height: 50,
                backgroundColor: "#DFE1E9",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
        },
        tireCard: {
                borderBottomWidth: 3,
                borderBottomColor: "#F04A5C"
        },
        cardAchat: {
                marginTop: 20,
                width: 150,
                height: 120,
                borderWidth: 2,
                borderColor: "#BCBFD1",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center"

        },
        cardLike: {
                marginTop: 10,
                width: 35,
                height: 35,
                backgroundColor: "#FBD5DA",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
        },
        cardLike2: {
                marginTop: 10,
                width: 35,
                height: 35,
                backgroundColor: "#FBD5DA",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 8
        },
        cardRecherche: {
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#EF4255",
                marginTop: 8,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"

        }
})