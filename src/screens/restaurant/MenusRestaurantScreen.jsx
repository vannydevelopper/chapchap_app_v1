import React, { useCallback, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TouchableWithoutFeedback, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import ProductPartenaire from "../../components/ecommerce/main/ProductPartenaire";
import fetchApi from "../../helpers/fetchApi";
import { useRoute } from "@react-navigation/native";
import { CategoriesSkeletons, HomeProductsSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import SubCategories from "../../components/ecommerce/home/SubCategories";
import RestaurantBadge from "../../components/restaurants/main/RestaurantBadge";
import MenuPartenaire from "../../components/restaurants/main/MenuPartenaire";
import LottieView from 'lottie-react-native';
import Restaurant from "../../components/restaurants/main/Restaurant";
import { Linking } from "react-native";
import ImageView from "react-native-image-viewing";
import * as Location from 'expo-location';



export default function MenusRestaurantScreen() {
    const route = useRoute()
    const navigation = useNavigation()
    const [firstLoadingMenus, setFirstLoadingMenus] = useState(true)
    const [restaurants, setRestaurants] = useState([])
    const [wishlist, setWishlists] = useState(false)
    const [wishlistNumber, setWishlistsNumber] = useState(null)


    const [firstLoadingProducts, setFirstLoadingProducts] = useState(true)
    const [loadingProducts, setLoadingProducts] = useState(false)
    const [menus, setMenus] = useState([])
    const [imageIndex, setImageIndex] = useState(0)
    const [showImageModal, setShowImageModal] = useState(false)
    const { restaurant } = route.params
    var IMAGES = [
        restaurant.LOGO ? restaurant.LOGO : undefined,
        restaurant.BACKGROUND_IMAGE ? restaurant.BACKGROUND_IMAGE : undefined,
    ]
    const Addishlist = async (id) => {
        if (wishlist) {
            try {

                const newWishlist = await fetchApi(`/wishlist/partenaire/suppression/${id}`, {
                    method: "DELETE",
                })
                setWishlists(false)


            } catch (error) {
                console.log(error)
            }
        }
        else {
            try {
                const form = new FormData()
                const newWishlist = await fetchApi('/wishlist/partenaire', {
                    method: 'POST',
                    body: JSON.stringify({
                        ID_PARTENAIRE_SRVICE: id,

                    }),
                    headers: { "Content-Type": "application/json" },
                })
                setWishlists(true)
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(() => {
        (async () => {
            
            try {
                if (firstLoadingMenus == false) {
                    // setLoadingMenus(true)
                }
                var url = "/partenaire/service/resto"
                const restaurant = await fetchApi(url)
                setRestaurants(restaurant.result)
            } catch (error) {
                console.log(error)
            } finally {
                setFirstLoadingMenus(false)
            }
        })()
    }, [])

    useEffect(() => {
        const fecthRestos = async (lat, long) => {
            try {
                // if (firstLoadingMenus == false) {
                //     setLoadingMenus(true)
                // }
                
                if (lat && long) {
                    return await fetchApi(`/partenaire/service/resto?lat=${lat}&long=${long}`)
                }
                return await fetchApi('/partenaire/service/resto')
               
            }
             catch (error) {
                throw error
            }finally {
                setFirstLoadingMenus(false)
            }
        }
        const askLocationFetchRestos = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                const restaurants = await fecthRestos()
                setLoadingRestos(false)
                setRestaurants(restaurants.result)
                return;
            }
            var location = await Location.getCurrentPositionAsync({});
            const restaurants = await fecthRestos(location.coords.latitude, location.coords.longitude)
            // setLoadingRestos(false)
            setRestaurants(restaurants.result)

        }
        askLocationFetchRestos()
    }, [])

    useEffect(() => {
        (async () => {
            try {
                if (firstLoadingProducts == false) {
                    setLoadingProducts(true)
                }
                var url = `/resto/menu/restaurant/${restaurant.ID_PARTENAIRE_SERVICE} `
                const menu = await fetchApi(url)
                setMenus(menu.result)
            } catch (error) {
                console.log(error)
            } finally {
                setFirstLoadingProducts(false)
                setLoadingProducts(false)
            }
        })()
    }, [])

    const fecthWishlist = async () => {
        try {
            const wishlists = await fetchApi(`/wishlist/partenaire/verification/${restaurant.ID_PARTENAIRE_SERVICE}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            if (wishlists.result) 
            {
                setWishlists(true)
            }
            else{
                setWishlists(false)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthWishlist()
    }, [restaurant]))

    const fecthNombreWishlist = async () => {
        try {
            const wishlists = await fetchApi(`/wishlist/partenaire/${restaurant.ID_PARTENAIRE_SERVICE}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            setWishlistsNumber(wishlists.result)
            
        }
        catch (error) {
            console.log(error)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthNombreWishlist()
    }, [wishlist]))
    return (
        <ScrollView>
            <TouchableWithoutFeedback key={1} onPress={() => {
                setImageIndex(1)
                setShowImageModal(true)
            }}>
                <View style={{ width: '100%', maxHeight: "100%", marginTop: 10 }}>
                    <  Image source={{ uri: restaurant.LOGO }} style={{ ...styles.imagePrincipal }} />
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.goBack()} >
                <Ionicons name="ios-arrow-back-outline" size={40} color="white" style={{ ...styles.icon, marginTop: 20, marginHorizontal: 10 }} />
            </TouchableWithoutFeedback>
            
            <View style={{ marginHorizontal: 10, marginTop: 10, flexDirection: "row", justifyContent: 'space-between' }}>
                <View style={{ flexDirection: "column", marginTop: 15 }}>
                    <Text style={{ fontWeight: "bold" }}>{restaurant.NOM_ORGANISATION}</Text>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <SimpleLineIcons name="location-pin" size={15} color="black" />
                        <Text style={{ fontSize: 12 }}> {restaurant.ADRESSE_COMPLETE} </Text>
                    </View>
                </View>
                {/* <AntDesign name="heart" size={40} color="#F29558" /> */}
                <TouchableOpacity
                    onPress={() => {
                        Addishlist(restaurant.ID_PARTENAIRE_SERVICE)
                    }}
                >
                    {
                       wishlist? <AntDesign name="heart" size={40} color="#EFC519" /> :
                       <AntDesign name="hearto" size={40} color="#EFC519" /> 
                    }
                
                </TouchableOpacity>
                <View style={styles.carre}>
                 <Text style={{ fontSize: 10, marginLeft: 10, color: "#797E9A",right:15 }}>à { restaurant.DISTANCE? restaurant.DISTANCE.toFixed(1) :null} Km</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", marginHorizontal: 10, marginTop: 10, justifyContent: "space-between" }}>
                <View style={{ flexDirection: "row" }}>
                {wishlistNumber?
          <AntDesign name="star" size={20} color="#EFC519" />:
          <AntDesign name="star" size={20} color="#EFC519" />}
                    <Text style={{ fontSize: 15, marginLeft: 15, color: "#797E9A", right: 15 }}>{wishlistNumber?.Nbre}.0</Text>
                </View>
                <View style={{ flexDirection: "row", marginHorizontal: 30 }}>
                    <AntDesign name="clockcircleo" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                    {restaurant.OUVERT ? <Text style={{ fontSize: 15, marginLeft: 2, color: "#797E9A" }}>{restaurant.OUVERT}</Text> : <Text style={{ color: "#797E9A" }}>7h-18h</Text>}
                </View>
                <TouchableOpacity onPress={() => { Linking.openURL(`tel:${restaurant.TELEPHONE}`); }} style={{ flexDirection: "row" }}>
                    <SimpleLineIcons name="call-end" size={15} color="#797E9A" style={{ marginTop: 5 }} />
                    <Text style={{ fontSize: 15, marginLeft: 20, color: "#797E9A", right: 15 }}>{restaurant.TELEPHONE}</Text>
                </TouchableOpacity>

            </View>
            <View style={{ marginTop: 10, marginHorizontal: 10 }} >

                {restaurant.PRESENTATION ? <Text style={{ color: "#797E9A" }}>{restaurant.PRESENTATION}</Text> :
                    <Text style={{ color: "#797E9A" }}>
                        the best hotel for me, I stayed there for two weeks I really enjoyed its great location. I loved the character of the hotel. The restaurant was fantastic and the staff was friendly. Well maintained rooms, comfortable bed, and great Cafe.
                    </Text>}
            </View>
            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>Notre menu</Text>
            </View>
            <View style={{}}>
                {(firstLoadingProducts || loadingProducts) ? <HomeProductsSkeletons wrap /> :
                    menus.length != 0 ?
                        <ScrollView
                            style={styles.shops}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        >
                            {menus.map((menu, index) => {
                                return (
                                    <MenuPartenaire
                                        menu={menu}
                                        index={index}
                                        totalLength={menus.length}
                                        key={index}
                                        fixMargins
                                    />
                                )
                            })}
                        </ScrollView> :
                        <Text style={styles.emptyFeedback}> Aucun menu publie dans {restaurant.NOM_ORGANISATION} </Text>
                }
            </View>
            <View style={{ marginTop: 20, marginHorizontal: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 17 }}>Restaurant plus proche</Text>
            </View>

            {(firstLoadingProducts) ? <HomeProductsSkeletons wrap /> :
                restaurants.length != 0 &&
                <ScrollView
                    style={styles.shops}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >

                    {
                    
                    restaurants.map((restaurant, index) => {
                        return (
                            <Restaurant
                                restaurant={restaurant}
                                restaurants={restaurants}
                                index={index}
                                totalLength={restaurants.length}
                                key={index}
                                note={wishlistNumber}

                            />
                        )
                    })}
                </ScrollView>
            }
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    carre: {
        padding: 15,
        height: 50,
        width: 100,
        color: "#1D8585",
        backgroundColor: '#D7D9E4',
        borderRadius: 10,
    },
    emptyFeedback: {
        textAlign: "center",
        marginTop: 10,
        color: COLORS.ecommercePrimaryColor,
        fontWeight: "bold",
        opacity: 0.6,
        fontSize: 16
    },
    imageCard: {
        backgroundColor: "white",
        flex: 1,
        // marginTop: 100
    },
    menuCard: {
        backgroundColor: "#D7D9E4",
        // flex: 1,
        // marginTop: 250,
        // borderTopLeftRadius: 50,
        // borderTopRightRadius: 50

    },
    imagePrincipal:
    {
        width: '120%',
        height: 280,
        alignSelf: 'center',
        borderBottomLeftRadius: 100,
        borderBottomRightRadius: 100,
    },
    icon: {
        width: 50,
        top: 30,
        position: 'absolute',
        marginRight: 10,
        // backgroundColor: '#fff',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardLike: {
        // marginTop: "-65%",
        // maxWidth: 50,
        // left: "80%",
        // backgroundColor: "white",

        // borderRadius: 5,
        // justifyContent: "center",
        // alignItems: "center"
    },
    txtDisplay: {
        color: "#797E9A",
    }
    ,
    serviceIcon: {
        width: 50,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 100,
        marginLeft: 10,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    serviceName: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 16
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60
    },
    menuOpener: {
        marginTop: 25
    },
    menuOpenerLine: {
        height: 3,
        width: 30,
        backgroundColor: COLORS.ecommercePrimaryColor,
        marginTop: 5
    },
    title: {
        fontWeight: 'bold'
    },
    productsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: -20
    },
    shops: {
        paddingHorizontal: 10,
    },
    titlePrincipal: {
        fontSize: 0,
        fontWeight: "bold",
        marginBottom: 0,
        color: COLORS.ecommercePrimaryColor,
        marginHorizontal: 10
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
    DataImageCategorie: {
        // width: '10%',
        // height:  '50%',
        alignSelf: 'center',

    },
    emptyFeedback: {
        textAlign: "center",
        marginTop: 10,
        color: COLORS.ecommercePrimaryColor,
        fontWeight: "bold",
        opacity: 0.6,
        fontSize: 16
    },
})