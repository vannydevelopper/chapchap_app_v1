import React from "react";
import { Text, View, useWindowDimensions, StatusBar, StyleSheet, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS";
import Product from "../../components/ecommerce/main/Product";
import { HomeProductsSkeletons } from "../../components/ecommerce/skeletons/Skeletons";
import { useContext } from "react";
import SearchContext from "../../context/searchContext";
import LottieView from "lottie-react-native";


export default function EcommerceResearchScreen() {
    const { products, firstLoadingProducts, loadingProducts } = useContext(SearchContext)
    const { height } = useWindowDimensions()
    const navigation = useNavigation()
    const route = useRoute()
    return (
        <View style={styles.container}>
            <ScrollView style={styles.cardOrginal} stickyHeaderIndices={[2]}>
                <View style={styles.products}>
                    {
                        (firstLoadingProducts || loadingProducts) ? 
                        <View style={{ marginTop: 20 }}>
                                <HomeProductsSkeletons />
                                <HomeProductsSkeletons />
                            </View>:
                            products.length!=0 ?
                            products.map((product, index) => {
                                return (
                                    <Product
                                        product={product}
                                        index={index}
                                        totalLength={products.length}
                                        key={index}
                                        fixMargins
                                    />
                                )
                            }):
                            <>
                            <LottieView style={{marginHorizontal:70, marginTop:10,width: 200, height: 200, alignSelf: "center" }} source={require('../../../assets/lotties/empty-cart.json')} autoPlay loop={false} />
                            <Text style={styles.emptyFeedback}>Votre liste des produits est vide</Text>
                            </>}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    emptyFeedback: {
        textAlign: "center",
        marginTop: 10,
        color: COLORS.ecommercePrimaryColor,
        fontWeight: "bold",
        opacity: 0.6,
        fontSize: 16,
        marginTop:40,
        marginHorizontal:50
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
        marginBottom: 12,
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
        minWidth: 40,
        minHeight: 40,
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
        width: 50,
        height: 50,
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
})