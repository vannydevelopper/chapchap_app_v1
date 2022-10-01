import React, { useCallback, useState, useRef, useEffect } from "react";
// import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { ActivityIndicator, StyleSheet, Text, Animated, BackHandler, TouchableOpacity, View, TextInput, Image, ScrollView, TouchableNativeFeedback } from "react-native";
import { Host, Portal } from 'react-native-portalize';
import { Modalize } from "react-native-modalize";
import { AntDesign, SimpleLineIcons, EvilIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { COLORS } from "../../../styles/COLORS"
import { useDispatch } from "react-redux";
import { addMenuAction } from "../../../store/actions/restaurantCartActions";


export default function AddCart({ menu, onClose, loadingForm }) {
        const [selectedSize, setSelectedSize] = useState(null)
        const [amount, setAmount] = useState(1)
        const [isFocused, setIsFocused] = useState(false)
        const dispatch = useDispatch()
        console.log(menu)

        const onDecrement = () => {
                if (parseInt(amount) == 1) {
                        return false
                }
                if (parseInt(amount) <= 0) {
                        return 1
                }
                setAmount(l => parseInt(l) - 1)
        }

        const onIncrement = () => {
                if (amount == 10) {
                        return false
                }
                setAmount(l => parseInt(l) + 1)
        }

        const onChangeText = am => {
                setAmount(am)
        }
        const checkAmount = () => {
                setAmount(parseInt(amount) ? (parseInt(amount) >= 10 ? 10 : parseInt(amount)) : 1)
        }

        const onAddToCart = () => {
                onClose()
                dispatch(addMenuAction(menu, amount))
        }

        let isnum = /^\d+$/.test(amount);
        const isValid = () => {
                return isnum ? (parseInt(amount) >= 1 && parseInt(amount) <= 10) : false
        }
        return (
                loadingForm ? <ActivityIndicator
                        animating
                        size={"small"}
                        color='#777'
                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                /> :

                        <View style={styles.container}>
                                <View style={styles.product}>
                                        <View style={styles.productImage}>
                                                <Image source={{ uri: menu.IMAGE }} style={styles.image} />
                                        </View>
                                        {/* <View style={styles.productDetails}>
                                                        <View >
                                                                <Text numberOfLines={1} style={{ fontSize: 25, fontWeight: "bold", color: "#777" }} >{menu.NOM_SOUS_CATEGORIE}</Text>
                                                        </View></View> */}
                                </View>
                                <Text numberOfLines={1} style={{
                                        marginTop: 15,
                                        fontSize: 25,
                                        fontWeight: "bold",
                                        color: "#fff",
                                        position: "absolute",
                                        marginTop: 90,
                                        marginHorizontal: 20
                                }} >{menu.NOM_SOUS_CATEGORIE}</Text>
                                <View style={styles.ligne}></View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15 }}>
                                        <View>
                                                <Entypo name="star-outlined" size={24} color="black" />
                                        </View>
                                        <View style={{ flexDirection: "row", alignContent: "center", alignItems: "center" }}>
                                                <View>
                                                        <Ionicons name="ios-time-outline" size={24} color="black" />
                                                </View>
                                                <Text>30 min</Text>
                                        </View>
                                        <View>
                                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>{menu.MONTANT} Fbu</Text>
                                        </View>
                                </View>
                                {/* <View style={{ marginTop: 15 }}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{menu.DESCRIPTION_SOUS_CATEGORIE}</Text>
                                </View> */}
                                <View style={{ marginTop: 20 }}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Nombre de plat</Text>
                                </View>

                                <View style={styles.moreDetails}>
                                        {/* <Text style={[styles.subTitle, ]}>Quantité</Text>
                                        <Text style={{ fontSize: 12, color: '#777', marginBottom: 5 }}>
                                                  Disponible: { menu.stock.QUANTITE_RESTANTE }
                                        </Text> */}
                                        <View style={styles.amountContainer}>
                                                <TouchableOpacity style={[styles.amountChanger, (amount <= 1 || !/^\d+$/.test(amount)) && { opacity: 0.5 }]} onPress={onDecrement} disabled={amount <= 1 || !/^\d+$/.test(amount)}>
                                                        <Text style={styles.amountChangerText}>-</Text>
                                                </TouchableOpacity>
                                                <TextInput
                                                        style={[styles.input, isFocused && { borderColor: COLORS.primary }]}
                                                        value={amount.toString()}
                                                        onChangeText={onChangeText}
                                                        onFocus={() => setIsFocused(true)}
                                                        onBlur={() => {
                                                                setIsFocused(false)
                                                                checkAmount()
                                                        }}
                                                        keyboardType="decimal-pad"
                                                />
                                                <TouchableOpacity style={[styles.amountChanger, (!/^\d+$/.test(amount) || amount >= 10) && { opacity: 0.5 }]} onPress={onIncrement} disabled={(!/^\d+$/.test(amount) || amount >= 10)}>
                                                        <Text style={styles.amountChangerText}>+</Text>
                                                </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={[styles.addCartBtn, { opacity: !isValid() ? 0.5 : 1 }]} onPress={onAddToCart} disabled={!isValid()}>
                                                <Text style={styles.addCartBtnTitle}>Ajouter au panier</Text>
                                        </TouchableOpacity>
                                </View>
                        </View>

        )

}

const styles = StyleSheet.create({
        modalContent: {
                paddingBottom: 20,
        },
        modalItem: {
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginTop: 5,
                marginHorizontal: 10
        },
        cardSigne: {
                padding: 15,
                height: 50,
                width: 50,
                color: "#1D8585",
                backgroundColor: '#242F68',
                borderRadius: 10,
                // marginTop: 1,
        },

        cardInput: {
                padding: 15,
                height: 50,
                width: 155,
                borderWidth: 2,
                borderColor: '#D8D8D8',
                borderRadius: 10,
                // marginTop: 1,
        },
        cardIcon: {
                padding: 15,
                height: 50,
                width: 50,
                color: "#1D8585",
                backgroundColor: '#D7D9E4',
                borderRadius: 10,
                // marginTop: 1,
        },
        cardBouton: {
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 25,
                backgroundColor: "#EE7526",
        },
        imageModal: {
                marginTop: 10,
                width: 150,
                height: 150,
        },
        moreDetails: {
                marginTop: 20
        },
        amountChanger: {
                width: 50,
                height: 50,
                backgroundColor: COLORS.ecommercePrimaryColor,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center'
        },
        amountChangerText: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 20
        },
        addCartBtn: {
                marginTop: 15,
                borderRadius: 5,
                backgroundColor: COLORS.ecommerceOrange,
                paddingVertical: 15,
        },
        addCartBtnTitle: {
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold'
        },
        amountContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 50
        },
        input: {
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ddd',
                flex: 1,
                height: "100%",
                marginHorizontal: 10,
                textAlign: 'center',
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold'
        },
        product: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 100,
                paddingVertical: 15,

        },
        productImage: {
                flex: 0.5,
                height: "100%"
        },
        image: {
                width: "100%",
                height: "150%",
                borderRadius: 10,
                alignContent: 'center'
        },
        container: {
                padding: 10,
        },
        ligne: {
                marginTop:40,
                borderBottomWidth: 1,
                borderBottomColor: '#F1F1F1'
        }
})