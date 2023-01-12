import React from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { AntDesign, FontAwesome,Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import ShopModal from "../../components/ecommerce/main/ShopModal";
import Product from "../../components/ecommerce/main/Product";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";

export default function PlusRecommandeScreen() {
        const navigation = useNavigation()
        const route = useRoute()

        const { products } = route.params
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
                                        <EcommerceBadge/>
                                </View>
                        </View>
                        <ScrollView>
                                <View style={styles.products}>
                                        {products.map((product, index) => {
                                                return (
                                                        <Product
                                                                product={product}
                                                                index={index}
                                                                totalLength={products.length}
                                                                key={index}
                                                                fixMargins
                                                        />
                                                )
                                        })}
                                </View>
                        </ScrollView>
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
                backgroundColor: '#F1F1F1',
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
        products: {
                flexDirection: 'row',
                flexWrap: 'wrap'
        }
})