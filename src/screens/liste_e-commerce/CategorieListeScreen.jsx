import React from "react";
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, TextInput, ScrollView, ImageBackground, Image } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from "@react-navigation/native";
import { COLORS } from "../../styles/COLORS"
import EcommerceBadge from "../../components/ecommerce/main/EcommerceBadge";

export default function CategorieListeScreen() {
        const navigation = useNavigation()
        const route = useRoute()
        const { categories } = route.params
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
                                <View style={styles.categories}>
                                        {categories.map((categorie, index) => {
                                                return (
                                                        <TouchableOpacity style={[styles.category,]} key={index}>
                                                                <View style={styles.categoryPhoto}>
                                                                        <Image source={{ uri: categorie.IMAGE }} borderRadius={15} style={styles.categoryImage} />
                                                                </View>
                                                                <Text style={[{ fontWeight: "bold" }, { color: COLORS.ecommercePrimaryColor }]}>{categorie.NOM}</Text>
                                                        </TouchableOpacity>
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
                marginHorizontal:5
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
        categories: {
                flexDirection: 'row',
                flexWrap: 'wrap',
        },
        category: {
                alignItems: 'center',
                padding: 10,
                backgroundColor: 'white',
                borderRadius: 10,
                margin: 5,
                marginTop: 5,
                backgroundColor: "#F5F4F1",
        },
        categoryPhoto: {
                backgroundColor: COLORS.skeleton,
                width: 80,
                height: 70,
                borderRadius: 8,
                padding: 3,
                justifyContent: 'center',
                alignItems: 'center'
        },
        categoryImage: {
                width: '100%',
                height: '100%',
            },
})