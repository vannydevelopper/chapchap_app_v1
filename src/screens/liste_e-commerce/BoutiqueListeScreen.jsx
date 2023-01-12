import React from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import ShopModal from "../../components/ecommerce/main/ShopModal";

export default function BoutiqueListeScreen() {
        const navigation = useNavigation()
        const route = useRoute()

        const { shops } = route.params
        return (
                <View style={styles.container}>
                        <View style={styles.cardHeader}>
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <AntDesign name="arrowleft" size={24} color="black" />
                                </TouchableOpacity>
                        </View>
                        <Text style={{ marginTop: 10, fontWeight: 'bold', color: COLORS.ecommercePrimaryColor, fontSize: 18, marginBottom: 30, textAlign: 'center', opacity: 0.7 }}>Boutiques</Text>
                        <View style={styles.searchSection1}>
                                <FontAwesome name="search" size={24} color={COLORS.ecommercePrimaryColor} />
                                <TextInput
                                        style={styles.input}
                                        // value={data.shop}
                                        // onChangeText={(newValue) => handleChange('shop', newValue)}
                                        placeholder="Rechercher "
                                />
                        </View>
                        <ScrollView>
                                <View style={styles.bout}>
                                        {shops.map((shop, index) => {
                                                return (
                                                        <ShopModal
                                                                shop={shop}
                                                                index={index}
                                                                totalLength={shops.length}
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
                flex: 1
        },
        cardHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                marginTop: StatusBar.currentHeight,
                height: 60
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
        bout: {
                flexDirection: 'row',
                flexWrap: 'wrap',
        },
})