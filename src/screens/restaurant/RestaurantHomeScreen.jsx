import React, { useCallback, useState, useEffect } from "react";
import { Text, View, useWindowDimensions, ImageBackground, StatusBar, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity, FlatList, TouchableNativeFeedback } from "react-native";
import { EvilIcons, MaterialIcons, AntDesign, Ionicons, MaterialCommunityIcons, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import fetchApi from "../../helpers/fetchApi";
import { DrawerActions, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import SubCategories from "../../components/ecommerce/home/SubCategories";
import HomeProducts from "../../components/ecommerce/home/HomeProducts";
import Shops from "../../components/ecommerce/home/Shops";
import Product from "../../components/ecommerce/main/Product";
import { CategoriesMenuSkeletons, CategoriesSkeletons, HomeMenuSkeletons, HomeProductsSkeletons, RestaurantSkeletons, restaurantSkeletons, SubCategoriesSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge"; import Restaurants from "../../components/restaurants/home/Restaurants";
import HomeMenus from "../../components/restaurants/home/HomeMenus";
import Menu from "../../components/restaurants/main/Menu";
import RestaurantBadge from "../../components/restaurants/main/RestaurantBadge";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRef } from "react";
import Restaurant from "../../components/restaurants/main/Restaurant";
import RestaurantHome from "../../components/restaurants/main/RestaurantHome";
import Categories from "../../components/restaurants/main/Categories";
import * as Location from 'expo-location';

export default function RestaurantHomeScreen() {
    const { height } = useWindowDimensions()

    const [loadingCategories, setLoadingCatagories] = useState(true)
    const [categories, setCategories] = useState([])
    const [selectedCategorie, setSelectedCategorie] = useState(null)

    const modalizeRef = useRef(null)
    const CategoriemodalizeRef = useRef(null)

    const [isOpen, setIsOpen] = useState(false)
    const [loadingForm, setLoadingForm] = useState(true)



    const [loadingSubCategories, setLoadingSubCategories] = useState(false)
    const [sousCategories, SetSousCategories] = useState([])
    const [selectedsousCategories, setSelectedsousCategories] = useState(null)


    const [firstLoadingMenus, setFirstLoadingMenus] = useState(true)
    const [loadingMenus, setLoadingMenus] = useState(false)
    const [menus, setMenus] = useState([])
    const [restaurants, setRestaurants] = useState([])
    const  [ chargementRestos , setLoadingRestos ] = useState ( true )   
   
    const navigation = useNavigation()

    const onCartPress = () => {
        setIsOpen(true)
        modalizeRef.current?.open()
    }

    const plusCategories = () => {
        setIsOpen(true)
        CategoriemodalizeRef.current?.open()
    }

    const fecthCategories = async () => {
        try {
            const response = await fetchApi("/resto/menu/categories", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })
            setCategories(response.result)
        }
        catch (error) {
            console.log(error)
        } finally {
            setLoadingCatagories(false)
        }
    }
    useFocusEffect(useCallback(() => {
        fecthCategories()
    }, []))

    const onCategoryPress = (categorie) => {
        if (loadingSubCategories || loadingMenus) return false
        if (categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU) {
            return setSelectedCategorie(null)
        }
        setSelectedCategorie(categorie)
        setSelectedsousCategories(null)
        CategoriemodalizeRef.current?.close()
    }
    useEffect(() => {
        (async () => {
            try {
                if (firstLoadingMenus == false) {
                    setLoadingMenus(true)
                }
                var url = "/resto/menu"
                if (selectedCategorie) {
                    url = `/resto/menu?category=${selectedCategorie?.ID_CATEGORIE_MENU}`
                }
                const menus = await fetchApi(url)
                setMenus(menus.result)
            } finally {
                setFirstLoadingMenus(false)
                setLoadingMenus(false)
            }
        })()
    }, [selectedCategorie])

    useEffect(() => {
        const fecthRestos = async (lat, long) => {
            try {
                if (firstLoadingMenus == false) {
                    setLoadingMenus(true)
                }
                if (lat && long) {
                    return await fetchApi(`/partenaire/service/resto?lat=${lat}&long=${long}`)
                }
                return await fetchApi('/partenaire/service/resto')
            }
             catch (error) {
                throw error
            }finally {
                setFirstLoadingMenus(false)
                setLoadingMenus(false)
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
            setLoadingRestos(false)
            setRestaurants(restaurants.result)
        }
        askLocationFetchRestos()
        
    }, [selectedCategorie, selectedsousCategories])

return (
    <View style={styles.container}>
        <View style={styles.cardHeader}>
            <TouchableOpacity style={styles.menuOpener} onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <View style={styles.menuOpenerLine} />
                <View style={[styles.menuOpenerLine, { width: 15 }]} />
                <View style={[styles.menuOpenerLine, { width: 25 }]} />
            </TouchableOpacity>
            <RestaurantBadge />
        </View>
        <Text style={styles.titlePrincipal}>Restaurants</Text>
        <View style={{ flexDirection: "row", alignItems: "center", alignContent: "center", justifyContent: "space-between", marginBottom: "1%", paddingHorizontal: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("ResearchTab")} style={styles.searchSection} >
                <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                <Text style={styles.input}>Rechercher.......</Text>
            </TouchableOpacity>
            <View style={styles.cardRecherche}>
                <SimpleLineIcons name="equalizer" size={24} color="white" style={{ fontWeight: 'bold', transform: [{ rotate: '-90deg' }] }} />
            </View>
        </View>
        <ScrollView>
            <TouchableOpacity onPress={onCartPress} style={styles.plus}>
                <View>
                    <Text style={styles.plusText}>Les plus proches</Text>
                </View>
                <View style={{ marginLeft: 100 }}>
                    <View onPress={plusCategories} style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} style={{ marginRight: -15 }} />
                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} />
                    </View>
                </View>
            </TouchableOpacity>
            {(firstLoadingMenus || loadingCategories || loadingMenus || loadingSubCategories) ? <RestaurantSkeletons /> :
                <Restaurants restaurants={restaurants} />
            }
            <TouchableOpacity onPress={plusCategories} style={styles.plus1}>
                <View>
                    <Text style={styles.plusText}>Categories</Text>
                </View>
                <View style={{ marginLeft: 100 }}>
                    <View onPress={plusCategories} style={{ flexDirection: 'row' }}>
                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} style={{ marginRight: -15 }} />
                        <MaterialIcons name="navigate-next" size={24} color={COLORS.ecommercePrimaryColor} />
                    </View>
                </View>
            </TouchableOpacity>
            {(firstLoadingMenus || loadingCategories || loadingMenus || loadingSubCategories) ? <CategoriesMenuSkeletons /> :
                <ScrollView
                    style={styles.shops}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <View style={styles.categories}>
                        {categories.map((categorie, index) => {
                            return (
                                <View style={[styles.category, index == 0 && { marginLeft: 0 }]} key={index}>
                                    <View style={[styles.categoryPhoto, { backgroundColor: categorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU ? COLORS.handleColor : "#DFE1E9" }]}>
                                        <Image source={{ uri: categorie.IMAGE }} style={styles.DataImageCategorie} />
                                    </View>
                                    <Text style={[{ fontSize: 8, fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>

                                </View>
                            )
                        })}
                    </View>
                </ScrollView>
            }

            {
                (firstLoadingMenus || loadingCategories || loadingMenus || loadingSubCategories) ?
                    <>
                        <HomeMenuSkeletons />
                        <HomeMenuSkeletons />
                    </> :
                    <View style={styles.products}>

                        {menus.map((menu, index) => {
                            return (
                                <Menu
                                    menu={menu}
                                    index={index}
                                    totalLength={menus.length}
                                    key={index}
                                    fixMargins
                                />
                            )
                        })}
                    </View>

            }
        </ScrollView>
        <Modalize
            ref={modalizeRef}
            adjustToContentHeight
            handlePosition='inside'
            modalStyle={{
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
                paddingVertical: 20
            }}
            handleStyle={{ marginTop: 10 }}
            scrollViewProps={{
                keyboardShouldPersistTaps: "handled"
            }}
            onClosed={() => {
                setIsOpen(false)
                setLoadingForm(true)
            }}
        >
            <ScrollView>
                <Text style={{ marginTop: 10, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, marginBottom: 40, textAlign: 'center', opacity: 0.7 }}>Nos restaurants</Text>

                <View style={styles.resto}>
                    {restaurants.map((restaurant, index) => {
                        return (
                            <RestaurantHome
                                restaurant={restaurant}
                                index={index}
                                totalLength={restaurants.length}
                                key={index}
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </Modalize>
        <Modalize
            ref={CategoriemodalizeRef}
            adjustToContentHeight
            handlePosition='inside'
            modalStyle={{
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
                paddingVertical: 20
            }}
            handleStyle={{ marginTop: 10 }}
            scrollViewProps={{
                keyboardShouldPersistTaps: "handled"
            }}
            onClosed={() => {
                setIsOpen(false)
                setLoadingForm(true)
            }}
        >
            <ScrollView>
                <Text style={{ fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, paddingVertical: 10, textAlign: 'center', opacity: 0.7 }}>Nos catégories</Text>
                <View style={styles.resto}>
                    {categories.map((categorie, index) => {
                        return (
                            <View style={{ ...styles.category, margin: 15 }} >
                                <View style={styles.actionIcon}>
                                    <ImageBackground source={{ uri: categorie.IMAGE }} borderRadius={15} style={styles.categoryImage}>

                                        {/* <View style={styles.disbaledContainer}>
                                                    <View style={styles.checkIndicator}>
                                                        <AntDesign name="check" size={24} color='#000' />
                                                    </View>
                                                </View> */}
                                    </ImageBackground>
                                </View>
                                <Text style={[{ fontSize: 10, fontWeight: "bold" }, { color: "#797E9A" }]}>{categorie.NOM}</Text>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>
        </Modalize>
    </View>
)
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60,
        marginBottom: "-3%"
    },
    menuOpener: {
    },
    menuOpenerLine: {
        height: 3,
        width: 30,
        backgroundColor: COLORS.ecommercePrimaryColor,
        marginTop: 5,
        borderRadius: 10
    },
    imgBackground: {
        flex: 1,
        width: '100%',
        height: "100%"
    },
    cardOrginal: {
    },
    titlePrincipal: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: "1%",
        color: COLORS.ecommercePrimaryColor,
        marginHorizontal: 10
    },

    searchSection: {
        flexDirection: "row",
        marginTop: 10,
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        alignItems: 'center',
        backgroundColor: '#fff',
        backgroundColor: "#D7D9E4",
        width: "84%",
        height: 50,
        paddingHorizontal: 10
    },
    input: {
        flex: 1,
        marginLeft: 10
    },
    plus: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: "-1%"
    },
    plus1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        marginTop: "2%",
        paddingHorizontal: 10,
        marginBottom: "-1 %"
    },
    plusText: {
        color: COLORS.ecommercePrimaryColor,
        fontSize: 14,
    },
    cardRecherche: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: COLORS.ecommerceRed,
        marginTop: 8,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    },
    DataImageCategorie: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
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
    cardPhoto: {
        marginTop: 10,
        width: 60,
        height: 60,
        //backgroundColor: "#242F68",
        backgroundColor: "#DFE1E9",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
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
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    resto: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginTop: 20
    },
    title: {
        color: '#333',
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 15
    },

    categories: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingBottom: 5
    },
    category: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20,
        elevation:10,
        marginRight:-12.6,
        backgroundColor:'white',
        borderRadius:10
    },
    category: {
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20,
        elevation:10,
        marginRight:-12.6,
        backgroundColor:'white',
        borderRadius:10
    },
    categoryPhoto: {
        width: 80,
        height:70,
        borderRadius: 8,
        backgroundColor: COLORS.skeleton
    },
    categoryPhotoResto: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: COLORS.skeleton
    },
    categoryText: {
        borderRadius: 5,
        width: 40,
        height: 6,
        backgroundColor: COLORS.skeleton,
        marginTop: 5
    },
    actionIcon: {
        borderRadius: 15,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
    },
    disbaledContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 15
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    actionTitle: {
        marginTop: 5,
        color: '#000',
        opacity: 0.6,
        fontWeight: 'bold'
    },

})