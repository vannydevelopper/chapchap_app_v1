import React, { useState } from "react"
import { Image, View, StyleSheet, Text, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback } from "react-native"
import { Ionicons, AntDesign, Entypo, Foundation } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import { useDispatch } from "react-redux";
import { restaurantProductSelector } from '../../store/selectors/restaurantCartSelectors';
import { addMenuAction } from "../../store/actions/restaurantCartActions";
import { useSelector } from 'react-redux';
import ImageView from "react-native-image-viewing";


export default function MenuDetailScreen() {

    const route = useRoute()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [imageIndex, setImageIndex] = useState(0)
    const [showImageModal, setShowImageModal] = useState(false)
    const { product } = route.params
    const MenuInCart = useSelector(restaurantProductSelector(product.ID_RESTAURANT_MENU))

    const [amount, setAmount] = useState(1)
    if (MenuInCart) {
        const l = MenuInCart.QUANTITE
        useState(l => parseInt(l))
    }
    const [isFocused, setIsFocused] = useState(false)
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
    const add = () => {
        navigation.navigate("RestaurantHomeScreen")
    }
    const onAddToCart = () => {
        add()
        dispatch(addMenuAction(product, amount))
    }

    var IMAGES = [
        product.IMAGE ? product.IMAGE : undefined,
        product.IMAGE2 ? product.IMAGE2 : undefined,
        product.IMAGE3 ? product.IMAGE3 : undefined,
    ]
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
    let isnum = /^\d+$/.test(amount);
    const isValid = () => {
        return isnum ? (parseInt(amount) >= 1 && parseInt(amount) <= 10) : false
    }
    return (
        <>
            <ScrollView >
                <View style={{ marginLeft: "5%", marginRight: "5%", marginTop: "5%", }}>
                    <TouchableWithoutFeedback key={1} onPress={() => {
                        setImageIndex(1)
                        setShowImageModal(true)
                    }}>
                        <View style={{ width: '100%', maxHeight: "100%", marginTop: 10 }}>
                            <  Image source={{ uri: product.IMAGE }} style={{ ...styles.imagePrincipal }} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={styles.cardBack}>
                        <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} >
                            <Ionicons name="ios-arrow-back-outline" size={30} color={COLORS.ecommercePrimaryColor} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cartBtn} >
                            <>
                                <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                {MenuInCart ? <View style={styles.badge}>
                                    <Text style={styles.badgeText} numberOfLines={1}>{MenuInCart.QUANTITE}</Text>
                                </View> : null}
                            </>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 10 }} >
                        <Text style={styles.text} numberOfLines={2}>{product.repas}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                        <View style={{ flexDirection: "row" }}>
                            <AntDesign name="star" size={15} color="#EFC519" />
                            <AntDesign name="star" size={15} color="#EFC519" />
                            <AntDesign name="star" size={15} color="#EFC519" />
                            <AntDesign name="staro" size={15} color="#EFC519" />
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <AntDesign name="clockcircleo" size={15} color="#797E9A" />
                            <Text style={{ fontSize: 10, marginLeft: 10, color: "#797E9A" }}>30 Min</Text>
                        </View>
                        <View style={{ marginTop: -5 }}>
                            <Text style={styles.textFbu}>{product.PRIX} Fbu</Text>
                        </View>
                    </View>
                    <View style={{ marginTop: 10 }} >
                        <Text style={styles.text1} numberOfLines={2}>{product.categorie}</Text>
                    </View>
                    <View style={{ marginTop: 10 }} >
                        <Text style={styles.txtDisplay}>
                            {product.DESCRIPTION ? product.DESCRIPTION : "Aucun description"}
                        </Text>
                    </View>

                </View>
                {showImageModal &&
                    <ImageView
                        images={IMAGES.map(img => ({ uri: img }))}
                        imageIndex={imageIndex}
                        visible={showImageModal}
                        onRequestClose={() => setShowImageModal(false)}
                        swipeToCloseEnabled
                        keyExtractor={(_, index) => index.toString()}
                    />
                }
            </ScrollView >
            <View style={{ marginLeft: 30, marginHorizontal: 20 }}>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: "bold" }}>Nombre de plat</Text>
                </View>
                <View style={styles.moreDetails}>
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

                </View>
                <View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-around', marginTop: 40 }}>
                        <View style={styles.carre}>
                            <AntDesign name="sharealt" size={20} color="black" />
                        </View>
                        <View style={styles.carre}>
                            <AntDesign name="shoppingcart" size={20} color="black" />
                        </View>
                        <TouchableOpacity style={[{ opacity: !isValid() ? 0.5 : 1 }]} onPress={onAddToCart} disabled={!isValid()}>
                            <View style={styles.carre3}>
                                <Text style={{ textAlign: 'center', color: 'white', fontWeight: "bold" }}>Ajouter au panier</Text>
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </>


    )
}
const styles = StyleSheet.create({
    imagePrincipal:
    {
        width: '120%',
        height: 280,
        alignSelf: 'center',
        borderBottomLeftRadius: 60,
        borderBottomRightRadius: 60,
    },
    text: {
        color: '#242F68',
        fontWeight: "bold",
        fontSize: 20
    },
    addCartBtnTitle: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold'
    },
    text1: {
        color: '#242F68',
        fontWeight: "bold",
        fontSize: 16
    },
    textFbu: {
        color: 'red',
        fontWeight: "bold",
        fontSize: 15
    },
    badge: {
        minWidth: 25,
        minHeight: 20,
        borderRadius: 20,
        backgroundColor: COLORS.ecommerceRed,
        position: 'absolute',
        top: 20,
        right: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#FFF',
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
        backgroundColor: COLORS.ecommerceOrange,
        borderWidth: 2,
        borderColor: '#D8D8D8',
        borderRadius: 10,

    },
    back: {
        padding: 10,
        height: 50,
        width: 50,
        backgroundColor: '#D7D9E4',
        // backgroundColor: COLORS.ecommercePrimaryColor,
        borderRadius: 50,

    },
    cardBack: {
        width: "100%",
        position: 'absolute',
        // marginRight: 10,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row",
        justifyContent: "space-between",
        top: "8%",
             
    },
    cartBtn: {
        marginTop: 10,
        width: 45,
        height: 45,
        backgroundColor: "#FBD5DA",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    badge: {
        minWidth: 25,
        minHeight: 20,
        paddingHorizontal: 5,
        borderRadius: 20,
        backgroundColor: COLORS.ecommerceRed,
        position: 'absolute',
        top: -5,
        right: -10,
        justifyContent: "center",
        alignItems: "center",
    },
    badgeText: {
        textAlign: 'center',
        fontSize: 10,
        color: '#FFF',
        fontWeight: "bold"
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
    moreDetails: {
        marginTop:10
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
    addCartBtn: {
        marginTop: 15,
        borderRadius: 5,
        backgroundColor: COLORS.ecommerceOrange,
        paddingVertical: 15,
    },
    amountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50
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
        marginTop: 30

    },

    icon1: {
        width: 50,
        top: 30,
        marginLeft: 10,
        left: 250,
        position: 'absolute',
        // backgroundColor: '#fff',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardOK: {
        width: 10,
        height: 10,
        backgroundColor: 'red',
        borderRadius: 9,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,

        top: 30,
        marginLeft: 8,
        left: 270,
        position: 'absolute',
    },
})
