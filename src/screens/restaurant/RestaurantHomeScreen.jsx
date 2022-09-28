import React, { useCallback, useState, useRef, useEffect } from "react";
import { StyleSheet, Text, Animated, BackHandler, TouchableOpacity, View, TextInput, Image, ScrollView, TouchableNativeFeedback } from "react-native";
import { AntDesign, SimpleLineIcons, EvilIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { Host, Portal } from 'react-native-portalize';
import { Modalize } from "react-native-modalize";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AjoutPanierModalize from "../../components/restaurants/AjoutPanierModalize";
import FiltreModal from "../../components/restaurants/FiltreModal";
import fetchApi from "../../helpers/fetchApi";
import { COLORS } from "../../styles/COLORS"
import RestoSubCategories from "../../components/restaurants/home/RestoubCategories";
import { CategoriesMenuSkeletons, HomeProductsSkeletons } from "../../components/restaurants/skeletons/SkeletonsResto";


export default function RestaurantHomeScreen() {
        const ajoutPanierRef = useRef(null)
        const filtreRef = useRef(null)
        const navigation = useNavigation()
        const [partenaires, setPartenaires] = useState([])

        const [loadingMenuCategories, setLoadingMenuCatagories] = useState(true)
        const [menuCategories, setMenuCategories] = useState([])
        const [selectedCategorie, setSelectedCategorie] = useState(null)

        const [loadingMenu, setLoadingMenu] = useState(false)
        const [menuListes, setMenuListes] = useState([])
        const [selectedMenu, setSelectedMenu] = useState(null)

        const fetchPartenaire = async () => {
                try {
                        const response = await fetchApi('/partenaire/service/2', {
                                method: "GET",
                                headers: { "Content-Type": "application/json" },
                        })
                        setPartenaires(response.result)
                        // console.log(response.result)
                }
                catch (error) {
                        console.log(error)
                }
        }

        useFocusEffect(useCallback(() => {
                fetchPartenaire()
        }, []))

        useEffect(() => {
                (async () => {
                        try {
                                const menus = await fetchApi("/resto/menu/categories", {
                                        method: "GET",
                                        headers: { "Content-Type": "application/json" },
                                })
                                setMenuCategories(menus.result)
                                // console.log(menus.result)

                        } catch (error) {
                                console.log(error)
                        } finally {
                                setLoadingMenuCatagories(false)
                        }
                })()
        }, [])

        const onMenuCategoryPress = (menuCategorie) => {
                setSelectedCategorie(menuCategorie)
        }

        //fetch menu
        useEffect(() => {
                (async () => {
                        try {
                                setLoadingMenu(true)
                                if (selectedCategorie?.ID_CATEGORIE_MENU) {
                                        const menu = await fetchApi(`/resto/menu?category=${selectedCategorie?.ID_CATEGORIE_MENU}`, {
                                                method: "GET",
                                                headers: { "Content-Type": "application/json" },
                                        })
                                        setMenuListes(menu.result)
                                        // console.log(menu.result)
                                }
                        } catch (error) {
                                console.log(error)
                        } finally {
                                setLoadingMenu(false)
                        }
                })()
        }, [selectedCategorie])

        return (
                <>
                        <View style={styles.container}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
                                        <TouchableOpacity onPress={() => navigation.goBack()}>
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
                                                <TouchableOpacity onPress={() => filtreRef.current.open()} style={styles.cardRecherche}>
                                                        <AntDesign name="menuunfold" size={24} color="white" />
                                                </TouchableOpacity>
                                        </View>

                                </View>
                                <View >
                                        <ScrollView
                                                horizontal showsHorizontalScrollIndicator={false}
                                                style={styles.subCategories}
                                        >
                                                {partenaires.map((partenaire, index) => {
                                                        return (
                                                                <TouchableOpacity key={index} style={{ alignContent: "center", alignItems: "center" }}>
                                                                        <View style={styles.cardAchat}>
                                                                                {/* <Image source={require('../../../assets/restaurant/cheesePizza.png')} style={styles.image} /> */}
                                                                                <Image source={{ uri: partenaire.IMAGE }} style={styles.image} />
                                                                        </View>
                                                                </TouchableOpacity>
                                                        )
                                                })}
                                        </ScrollView>
                                </View>
                                {loadingMenuCategories ? <CategoriesMenuSkeletons /> :
                                        <View>
                                                <ScrollView
                                                        horizontal showsHorizontalScrollIndicator={false}
                                                        style={styles.subCategoriesMenu}
                                                >
                                                        {menuCategories.map((menuCategorie, index) => {
                                                                return (
                                                                        <TouchableOpacity key={index} onPress={() => onMenuCategoryPress(menuCategorie)}>
                                                                                <View style={{ alignContent: "center", alignItems: "center", margin: 20 }}>
                                                                                        <View style={[styles.cardPhoto, { backgroundColor: menuCategorie.ID_CATEGORIE_MENU == selectedCategorie?.ID_CATEGORIE_MENU ? COLORS.handleColor : "#DFE1E9" }]}>
                                                                                                <Ionicons name="shirt-sharp" size={24} color="white" />
                                                                                        </View>
                                                                                        <Text style={{ fontSize: 12, fontWeight: "bold" }}>{menuCategorie.NOM}</Text>
                                                                                </View>
                                                                        </TouchableOpacity>
                                                                )
                                                        })}
                                                </ScrollView>
                                        </View>}
                                <ScrollView showsVerticalScrollIndicator={false}>
                                        {selectedCategorie && loadingMenu ? <HomeProductsSkeletons /> :
                                                <RestoSubCategories menuListes={menuListes} ajoutPanierRef={ajoutPanierRef} filtreRef={filtreRef} />}
                                </ScrollView>
                                <Portal>
                                        <Modalize ref={ajoutPanierRef} adjustToContentHeight handleStyle={{ display: 'none' }} modalStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                                <AjoutPanierModalize ajoutPanierRef={ajoutPanierRef} />
                                        </Modalize>
                                </Portal>

                                <Portal>
                                        <Modalize ref={filtreRef} adjustToContentHeight handleStyle={{ display: 'none' }} modalStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                                                <FiltreModal filtreRef={filtreRef} />
                                        </Modalize>
                                </Portal>

                        </View>
                </>

        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                marginHorizontal: 10,
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
                // width: 120,
                // height: 120,
                // borderWidth: 2,
                // borderColor: "#BCBFD1",
                // borderRadius: 20,
                // justifyContent: "center",
                // alignItems: "center",
                // margin: 5
        },
        image: {
                width: 70,
                height: 70,
                margin: 5,
                borderRadius: 10
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
        imageModalPanier: {
                width: 70,
                height: 70,
        },
        subCategories: {
                paddingVertical: 5,
                padding: 5,
        },
        subCategoriesMenu: {
        }


})