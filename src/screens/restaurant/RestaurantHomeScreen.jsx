import React, { useCallback, useState, useRef, useEffect } from "react";
import { StyleSheet, Text, Animated, BackHandler, TouchableOpacity, View, TextInput, Image, ScrollView, TouchableNativeFeedback } from "react-native";
import { AntDesign, SimpleLineIcons, EvilIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { Host, Portal } from 'react-native-portalize';
import { Modalize } from "react-native-modalize";

const DetailRestaurantModal = ({ onClose }) => {
        const [scale] = useState(new Animated.Value(1.1))
        useEffect(() => {
                const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                        onClose()
                        return true
                })
                Animated.spring(scale, {
                        toValue: 1,
                        useNativeDriver: true
                }).start()
                return () => {
                        backHandler.remove()
                }
        }, [])
        return (
                <Portal>
                        <TouchableNativeFeedback onPress={onClose}>
                                <View style={styles.modalContainer}>
                                        <TouchableNativeFeedback>
                                                <Animated.View style={{ ...styles.modalContent, transform: [{ scale }] }}>
                                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                                <Image source={require('../../../assets/restaurant/cheesePizza.png')} style={styles.imageModal} />

                                                        </View>
                                                        <ScrollView keyboardShouldPersistTaps="handled">
                                                                <View style={styles.modalItem}>
                                                                        <View >
                                                                                <Text numberOfLines={1} style={{ fontSize: 17, fontWeight: "bold" }} >Riz Tropical</Text>
                                                                        </View>
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
                                                                                        <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>12 000 Fbu</Text>
                                                                                </View>
                                                                        </View>
                                                                        <View style={{ marginTop: 15 }}>
                                                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Riz frit avec pomme de terre</Text>
                                                                        </View>
                                                                        <View style={{ marginTop: 20 }}>
                                                                                <Text style={{ fontSize: 15, fontWeight: "bold" }}>Nombre de piat</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                                                                <TouchableOpacity style={styles.cardSigne}>
                                                                                        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>-</Text>

                                                                                </TouchableOpacity>
                                                                                <View style={styles.cardInput}>
                                                                                        <TextInput style={{ textAlign: 'center' }}></TextInput>

                                                                                </View>
                                                                                <TouchableOpacity style={styles.cardSigne}>
                                                                                        <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>+</Text>

                                                                                </TouchableOpacity>
                                                                        </View>
                                                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", marginTop: 20 }}>
                                                                                <View style={styles.cardIcon}>
                                                                                        <AntDesign name="sharealt" size={20} color="black" />
                                                                                </View>
                                                                                <View style={styles.cardIcon}>
                                                                                        <AntDesign name="shoppingcart" size={20} color="black" />
                                                                                </View>
                                                                                <TouchableOpacity style={styles.cardBouton}>
                                                                                        <Text style={{ textAlign: 'center', color: 'white', }}>Ajouter au panier</Text>
                                                                                </TouchableOpacity>
                                                                        </View>
                                                                </View>
                                                        </ScrollView>
                                                </Animated.View>
                                        </TouchableNativeFeedback>
                                </View>
                        </TouchableNativeFeedback>
                </Portal>
        )
}

export default function RestaurantHomeScreen() {
        // const [showRestaurantDetail, setshowRestaurantDetail] = useState(false)
        const restaurantRef = useRef(null)
        const DetailRestaurantModalize = () => {
                return (
                        <TouchableNativeFeedback style={styles.modalContent} onPress={() => restaurantRef.current.close()}>
                                <View style={styles.modalList}>
                                        <View style={styles.modalItem}>
                                                <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                        <Image source={require('../../../assets/restaurant/cheesePizza.png')} style={styles.imageModal} />

                                                </View>
                                                <ScrollView keyboardShouldPersistTaps="handled">
                                                        <View>
                                                                <View >
                                                                        <Text numberOfLines={1} style={{ fontSize: 17, fontWeight: "bold" }} >Riz Tropical</Text>
                                                                </View>
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
                                                                                <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>12 000 Fbu</Text>
                                                                        </View>
                                                                </View>
                                                                <View style={{ marginTop: 15 }}>
                                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Riz frit avec pomme de terre</Text>
                                                                </View>
                                                                <View style={{ marginTop: 20 }}>
                                                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Nombre de piat</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                                                        <TouchableOpacity style={styles.cardSigne}>
                                                                                <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>-</Text>

                                                                        </TouchableOpacity>
                                                                        <View style={styles.cardInput}>
                                                                                <TextInput style={{ textAlign: 'center' }}></TextInput>

                                                                        </View>
                                                                        <TouchableOpacity style={styles.cardSigne}>
                                                                                <Text style={{ color: 'white', fontSize: 12, textAlign: 'center', fontWeight: 'bold' }}>+</Text>

                                                                        </TouchableOpacity>
                                                                </View>
                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", alignContent: "center", marginTop: 20 }}>
                                                                        <View style={styles.cardIcon}>
                                                                                <AntDesign name="sharealt" size={20} color="black" />
                                                                        </View>
                                                                        <View style={styles.cardIcon}>
                                                                                <AntDesign name="shoppingcart" size={20} color="black" />
                                                                        </View>
                                                                        <TouchableOpacity style={styles.cardBouton}>
                                                                                <Text style={{ textAlign: 'center', color: 'white', }}>Ajouter au panier</Text>
                                                                        </TouchableOpacity>
                                                                </View>
                                                        </View>
                                                </ScrollView>

                                        </View>
                                </View>
                        </TouchableNativeFeedback>
                )
        }
        return (
                <>
                        <View style={styles.container}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                        <TouchableOpacity>
                                                <AntDesign name="arrowleft" size={24} color="black" />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                                <SimpleLineIcons name="basket" size={24} color="black" />
                                        </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 15, marginBottom: 15 }}>
                                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>Restauration</Text>
                                </View>
                                <View>
                                        <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: 15 }}>
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
                                <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                        <TouchableOpacity style={{ alignContent: "center", alignItems: "center" }}>
                                                <View style={styles.cardAchat}>
                                                        <Image source={require('../../../assets/restaurant/cheesePizza.png')} style={styles.image} />

                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ alignContent: "center", alignItems: "center" }}>
                                                <View style={styles.cardAchat}>
                                                        <Image source={require('../../../assets/restaurant/onboard.png')} style={styles.image} />
                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ alignContent: "center", alignItems: "center" }}>
                                                <View style={styles.cardAchat}>
                                                        <Image source={require('../../../assets/restaurant/chickenBurger.png')} style={styles.image} />
                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ alignContent: "center", alignItems: "center" }}>
                                                <View style={styles.cardAchat}>
                                                        <Image source={require('../../../assets/restaurant/sushiMakizushi.png')} style={styles.image} />
                                                </View>
                                        </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 10, flexDirection: "row", justifyContent: "space-between" }}>
                                        <TouchableOpacity>
                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                        <View style={styles.cardPhoto}>
                                                                <Ionicons name="shirt-sharp" size={24} color="white" />
                                                        </View>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Dejeuner</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                        <View style={styles.cardPhoto}>
                                                                <Ionicons name="shirt-sharp" size={24} color="white" />
                                                        </View>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Petiti Dejeuner</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                        <View style={styles.cardPhoto}>
                                                                <Ionicons name="shirt-sharp" size={24} color="white" />
                                                        </View>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Desert</Text>
                                                </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                                <View style={{ alignContent: "center", alignItems: "center" }}>
                                                        <View style={styles.cardPhoto}>
                                                                <Ionicons name="shirt-sharp" size={24} color="white" />
                                                        </View>
                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>Boissons</Text>
                                                </View>
                                        </TouchableOpacity>
                                </View>
                                <ScrollView>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                                                <TouchableOpacity onPress={() => restaurantRef.current.open()}>
                                                        <View style={styles.cardAchatDescription}>
                                                                <Image source={require('../../../assets/restaurant/chickenBurger.png')} style={styles.imageDescription} />
                                                        </View>
                                                        <View style={{ flexDirection: "row" }}>
                                                                <View style={styles.cardLike}>
                                                                        <Ionicons name="heart-dislike-outline" size={24} color="#F29558" />
                                                                </View>
                                                                <View style={styles.cardLike2}>
                                                                        <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                                </View>
                                                        </View>
                                                        <View style={styles.titleName}>
                                                                <Text numberOfLines={2} style={{ maxWidth: 150, fontSize: 17, fontWeight: "bold", color: "#fff" }}>Riz Tropitel</Text>
                                                        </View>
                                                        <Text style={{ color: "#000", fontWeight: "bold" }}>FBu 45.000</Text>

                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                        <View style={styles.cardAchatDescription}>
                                                                <Image source={require('../../../assets/restaurant/onboard.png')} style={styles.imageDescription} />
                                                        </View>
                                                        <View style={{ flexDirection: "row" }}>
                                                                <View style={styles.cardLike}>
                                                                        <Ionicons name="heart-dislike-outline" size={24} color="#F29558" />
                                                                </View>
                                                                <View style={styles.cardLike2}>
                                                                        <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                                </View>
                                                        </View>
                                                        <View style={styles.titleName}>
                                                                <Text numberOfLines={2} style={{ maxWidth: 150, fontSize: 17, fontWeight: "bold", color: "#fff" }}>Poulet grille</Text>
                                                        </View>
                                                        <Text style={{ color: "#000", fontWeight: "bold" }}>FBu 45.000</Text>

                                                </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                                                <TouchableOpacity>
                                                        <View style={styles.cardAchatDescription}>
                                                                <Image source={require('../../../assets/restaurant/chickenBurger.png')} style={styles.imageDescription} />
                                                        </View>
                                                        <View style={{ flexDirection: "row" }}>
                                                                <View style={styles.cardLike}>
                                                                        <Ionicons name="heart-dislike-outline" size={24} color="#F29558" />
                                                                </View>
                                                                <View style={styles.cardLike2}>
                                                                        <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                                </View>
                                                        </View>
                                                        <View style={styles.titleName}>
                                                                <Text numberOfLines={2} style={{ maxWidth: 150, fontSize: 17, fontWeight: "bold", color: "#fff" }}>Riz Tropitel</Text>
                                                        </View>
                                                        <Text style={{ color: "#000", fontWeight: "bold" }}>FBu 45.000</Text>

                                                </TouchableOpacity>
                                                <TouchableOpacity>
                                                        <View style={styles.cardAchatDescription}>
                                                                <Image source={require('../../../assets/restaurant/onboard.png')} style={styles.imageDescription} />
                                                        </View>
                                                        <View style={{ flexDirection: "row" }}>
                                                                <View style={styles.cardLike}>
                                                                        <Ionicons name="heart-dislike-outline" size={24} color="#F29558" />
                                                                </View>
                                                                <View style={styles.cardLike2}>
                                                                        <AntDesign name="shoppingcart" size={24} color="#F29558" />
                                                                </View>
                                                        </View>
                                                        <View style={styles.titleName}>
                                                                <Text numberOfLines={2} style={{ maxWidth: 150, fontSize: 17, fontWeight: "bold", color: "#fff" }}>Poulet grille</Text>
                                                        </View>
                                                        <Text style={{ color: "#000", fontWeight: "bold" }}>FBu 45.000</Text>

                                                </TouchableOpacity>
                                        </View>
                                </ScrollView>
                                <Portal>
                                        <Modalize ref={restaurantRef} adjustToContentHeight handleStyle={{ display: 'none' }} modalStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                                <DetailRestaurantModalize />
                                        </Modalize>
                                </Portal>
                        </View>
                        {/* {showRestaurantDetail && <DetailRestaurantModal onClose={() => setshowRestaurantDetail(false)} />} */}
                </>

        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                marginHorizontal: 20,
                marginTop: 20
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
        cardRecherche: {
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#EF4255",
                marginTop: 8,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
        },
        cardAchat: {
                width: 120,
                height: 120,
                borderWidth: 2,
                borderColor: "#BCBFD1",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                margin: 5
        },
        image: {
                width: 70,
                height: 70,
        },
        cardPhoto: {
                width: 50,
                height: 50,
                //backgroundColor: "#242F68",
                backgroundColor: "#DFE1E9",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
        },
        cardAchatDescription: {
                // marginTop: 20,
                // width: 150,
                // height: 120,
                // borderWidth: 2,
                // borderColor: "#BCBFD1",
                // borderRadius: 20,
                // justifyContent: "center",
                // alignItems: "center"
        },
        imageDescription: {
                marginTop: 20,
                width: 150,
                height: 150,
        },
        cardLike: {
                width: 35,
                height: 35,
                backgroundColor: "#FBD5DA",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center"
        },
        cardLike2: {
                width: 35,
                height: 35,
                backgroundColor: "#FBD5DA",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 8
        },
        titleName: {
                position: "absolute",
                marginTop: 130,
                marginLeft: 30,
        },
        modalItem: {
                paddingVertical: 10,
                paddingHorizontal: 15,
                marginTop: 5,
                marginHorizontal: 10
        },
        modalContent: {
                paddingBottom: 20,
        },
        imageModal: {
                marginTop: 10,
                width: 150,
                height: 150,
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

})