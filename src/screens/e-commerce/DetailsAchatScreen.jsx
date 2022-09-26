import React, { useCallback, useState, useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView } from "react-native"
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import ProduitPartenaire from "../../components/ecommerce/home/ProduitPartenaire";
import fetchApi from "../../helpers/fetchApi";
import { useSelector } from "react-redux";
import {userSelector} from "../../store/selectors/userSelector"
export default function DetailAchatScreen() {
        const navigation = useNavigation()
        const user = useSelector(userSelector)
        // console.log(user)
        const route = useRoute()
        const [productPartenaires, setProductPartenaire] = useState([])
        const { product } = route.params
        // console.log(product)
        const [nombre, setNombre] = useState(0);
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
        const fecthProduits = async () => {
                try {
                        const response = await fetchApi(`/partenaire/ecommerce/${product.produit_partenaire.ID_PRODUIT_PARTENAIRE}`, {
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                        })
                        setProductPartenaire(response.result)
                        console.log(response.result)
                }
                catch (error) {
                        console.log(error)
                } finally {
                        // setLoadingCatagories(false)
                }
        }
        useFocusEffect(useCallback(() => {
                fecthProduits()
        }, []))
        return (
                <View style={{ marginTop: 30, marginHorizontal: 20, marginBottom: 45 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                                <Ionicons name="ios-arrow-back-outline" size={35} color="black" style={{ marginTop: 0 }} />
                        </TouchableOpacity >
                        <ScrollView showsVerticalScrollIndicator={false}>
                                <View >
                                        <Image source={{ uri: product.produit_partenaire.IMAGE_1 }} style={styles.imagePrincipal} />
                                </View>
                                <View style={{ marginTop: 30 }} >
                                        <Text style={styles.text} numberOfLines={2}>{product.produit.NOM}</Text>
                                </View>
                                <View style={{ marginTop: 5 }} >
                                        <Text style={{ color: '#646B95' }} numberOfLines={2}>{product.sous_categorie.NOM}</Text>
                                </View>
                                <View style={{ marginTop: 5 }}>
                                        <Text style={styles.textFbu}>{product.produit_partenaire.PRIX} Fbu</Text>
                                </View>
                                <View style={{ marginTop: 5 }}>
                                        <Text style={styles.txtDisplay}>{product.produit_partenaire.DESCRIPTION}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center", marginTop: 20 }}>
                                        <Text style={styles.txtDispla}>Vendu par:</Text>
                                        <Text style={{ color: '#F19152', marginLeft: 5 }}>{user.result.NOM} {user.result.PRENOM}</Text>
                                </View>
                                <View>
                                        <Text style={{ fontSize: 14, color: '#191970', opacity: 0.4 }}>Taille</Text>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-between', }}>
                                                <View style={styles.carre}>
                                                        <Text style={{ color: '#242F68', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>{product.produit_partenaire.TAILLE}</Text>
                                                </View>
                                        </View>
                                </View>
                                <View >
                                        <Text style={styles.txtDispla}>Nombres des pieces</Text>
                                </View>
                                <View>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-around', }}>

                                                <TouchableOpacity
                                                        onPress={mouveNumber}
                                                        style={styles.carre1}>
                                                        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>-</Text>

                                                </TouchableOpacity>
                                                <View style={styles.carre2}>
                                                        <TextInput
                                                                disabled={nombre == ''}

                                                                keyboardType="phone-pad"
                                                                defaultValue="0"
                                                                onChangeText={(nb) => setNombre(nb)}
                                                                value={nombre.toString()}
                                                                style={{ textAlign: 'center' }}></TextInput>

                                                </View>

                                                <TouchableOpacity onPress={addNumber} style={styles.carre1}>
                                                        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>+</Text>

                                                </TouchableOpacity>

                                        </View>
                                </View>
                                <ProduitPartenaire productPartenaires={productPartenaires}/>
                                <View>
                                        <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: 40 }}>

                                                <View style={styles.carre}>
                                                        <AntDesign name="sharealt" size={20} color="black" />
                                                </View>
                                                <View style={styles.carre}>
                                                        <AntDesign name="shoppingcart" size={20} color="black" />

                                                </View>
                                                <View style={styles.carre3}>
                                                        <Text style={{ textAlign: 'center', color: 'white', }}>Ajouter au panier</Text>
                                                </View>


                                        </View>
                                </View>
                        </ScrollView>
                </View>

        )
}
const styles = StyleSheet.create({
        imagePrincipal:
        {
                width: '70%',
                height: 150,
                alignSelf: 'center',
                borderRadius: 10
        },
        text: {
                color: '#646B95',
                fontSize: 20
        },
        textFbu: {
                color: 'red',
                fontSize: 15,
                fontWeight: "bold"
        },
        carre1: {
                padding: 15,
                height: 50,
                width: 50,
                color: "#1D8585",
                backgroundColor: '#242F68',
                borderRadius: 10,
                // marginTop: 1,
        },
        carre2: {
                padding: 15,
                height: 50,
                width: 200,
                borderWidth: 2,
                borderColor: '#D8D8D8',
                borderRadius: 10,
                // marginTop: 1,
        },
        carre3: {
                padding: 10,
                height: 50,
                width: 200,
                backgroundColor: '#EE7526',
                borderWidth: 2,
                borderColor: '#D8D8D8',
                borderRadius: 10,
                // marginTop: 1,
        },
        carre: {
                padding: 15,
                height: 50,
                width: 50,
                color: "#1D8585",
                backgroundColor: '#D7D9E4',
                borderRadius: 10,
                // marginTop: 1,
        },
        txtDisplay: {
                color: '#191970',
                fontSize: 15,
                fontWeight: 'bold',
                opacity: 0.4
        },
        txtDispla: {
                color: '#646B94',
                fontSize: 15,
                fontWeight: 'bold',

        },
        image: {
                height: "30%",
                width: "30%",
                borderRadius: 8,
                resizeMode: 'contain'
        },
})
