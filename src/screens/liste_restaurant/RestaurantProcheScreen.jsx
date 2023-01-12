import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView } from "react-native";
import { AntDesign, FontAwesome ,Ionicons} from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import RestaurantHome from "../../components/restaurants/main/RestaurantHome";
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";
export default function RestaurantProcheScreen() {
    const navigation = useNavigation()
    const route = useRoute()
    const { restaurants } = route.params
    //console.log(restaurants)
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    resto: {
        flexDirection: 'row',
        flexWrap: 'wrap',

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
})