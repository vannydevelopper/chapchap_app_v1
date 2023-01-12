import React from "react";

import { StyleSheet, Text, View, TouchableOpacity, StatusBar, TextInput, ScrollView } from "react-native";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import Menu from "../../components/restaurants/main/Menu";

export default function CategorieMenuScreen() {
   
    const navigation = useNavigation()
    const route=useRoute()
    const{ categories }=route.params
    console.log(categories)
    return (
        <View>
            <View style={styles.cardHeader}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={{ marginTop: 10, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, marginBottom: 30, textAlign: 'center', opacity: 0.7 }}>Les categories</Text>
            


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red"

    },
    products: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: StatusBar.currentHeight,
        height: 60
    },

    input: {
        flex: 1,
        marginLeft: 10
    },
})