import React from "react";
import { StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import {COLORS} from "../../styles/COLORS"
import LottieView from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";

export default function SearchLivreurScreen() {
        const navigation = useNavigation()
        return (
                <View style={styles.container}>
                        <View style={{ justifyContent:"center", alignItems:"center", marginTop:30}}>
                                <Text style={styles.titlePrincipal}>En attente du livreur</Text>
                                <LottieView style={{ width: 100, height: 100}} source={require('../../../assets/lotties/loading.json')} autoPlay loop={true} />
                        </View>
                        <View style={styles.cardStatus}>
                        <Text style={styles.titleStatus}>Status de livraisons</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 25, marginTop:20 }}>
                                        <View style={{ flexDirection: "row" }}>
                                                <View style={styles.cardIcon}>
                                                        <FontAwesome name="car" size={24} color="black" />
                                                </View>
                                                <View style={{ marginLeft: 15 }}>
                                                        <View>
                                                                <Text style={styles.statutTitle}>Pick depart</Text>
                                                        </View>
                                                        <View>
                                                                <Text style={styles.dateStatus}>10 Oct 2021 at 10:30 P.M</Text>
                                                        </View>
                                                </View>

                                        </View>
                                        <View style={styles.statutVue}>
                                                <AntDesign name="check" size={20} color="white" />
                                        </View>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 25 }}>
                                        <View style={{ flexDirection: "row" }}>
                                                <View style={styles.cardIcon}>
                                                        <FontAwesome name="car" size={24} color="black" />
                                                </View>
                                                <View style={{ marginLeft: 15 }}>
                                                        <View>
                                                                <Text style={styles.statutTitle}>Livraison en cours</Text>
                                                        </View>
                                                        <View>
                                                                <Text style={styles.dateStatus}>10 Oct 2021 at 10:30 P.M</Text>
                                                        </View>
                                                </View>

                                        </View>
                                        <View style={styles.statutVue}>
                                                <AntDesign name="check" size={20} color="white" />
                                        </View>
                                </View>

                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={{ flexDirection: "row" }}>
                                                <View style={styles.cardIcon}>
                                                        <FontAwesome name="car" size={24} color="black" />
                                                </View>
                                                <View style={{ marginLeft: 15 }}>
                                                        <View>
                                                                <Text style={styles.statutTitle}>Livraion terminer</Text>
                                                        </View>
                                                        <View>
                                                                <Text style={styles.dateStatus}>10 Oct 2021 at 10:30 P.M</Text>
                                                        </View>
                                                </View>

                                        </View>
                                        <View style={styles.statutVue}>
                                                <AntDesign name="check" size={15} color="white" />
                                        </View>
                                </View>

                                <TouchableOpacity >
                                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                                                <View style={styles.cancelBtn}>
                                                        <Ionicons name="close" size={30} color="#777" />
                                                </View>
                                        </View>
                                </TouchableOpacity>


                        </View>
                </View>
        )
}

const styles = StyleSheet.create({
        container: {
                flex: 1,
                // marginHorizontal: 10
        },
        titlePrincipal: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: "bold",
                fontSize: 22,
                paddingLeft: 10,
                paddingRight: 50,
                lineHeight: 33,
        },
        titleStatus:{
                color: COLORS.ecommercePrimaryColor,
                fontWeight: "bold",
                fontSize: 15,
                paddingLeft: 10,
                paddingRight: 50,
                lineHeight: 33,
        },
        cardStatus: {
                marginTop: "10%",
                padding: 10,
                backgroundColor: "#F4F4F5",
                borderRadius: 20,
                flex: 1
        },
        cardIcon: {
                width: 40,
                height: 40,
                borderRadius: 10,
                backgroundColor: "#DDD8F5",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center"
        },
        statutTitle: {
                fontSize: 17,
                fontWeight: "bold",
                color: "#000"
        },
        dateStatus: {
                fontSize: 13,
                color: "#000"
        },
        statutVue: {
                width: 22,
                height: 22,
                backgroundColor: "#636BB4",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                marginTop: 10
        },
        cancelBtn: {
                width: 60,
                height: 60,
                borderRadius: 100,
                borderColor: '#ddd',
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: '#ddd',
                overflow: "hidden",
                marginTop: 30
        }
})