import React from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { FontAwesome, Fontisto, EvilIcons, AntDesign, Feather } from '@expo/vector-icons';

export default function ConnexionScreen() {
        return (
                <>
                        <ImageBackground style={styles.container} source={require('../../../assets/images/g52.png')}>
                                <ScrollView keyboardShouldPersistTaps="handled">
                                        <View>
                                                <View style={styles.cardTitle}>
                                                        <View>
                                                                <Text style={styles.Title}>Compte client</Text>
                                                        </View>
                                                        <View>
                                                                <Text style={styles.description}> Chap Chap</Text>
                                                        </View>
                                                </View>

                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Adresse email"
                                                                        fontWeight="Bold"
                                                                        inputContainerStyle={{ paddingRight: 40 }}
                                                                        baseColor="#777"
                                                                        tintColor="#1D8585"
                                                                />
                                                        </View>
                                                        <View style={styles.InputIcon}>
                                                                <Fontisto name="email" size={20} color="black" />
                                                        </View>

                                                </View>

                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Mot de passe"
                                                                        fontWeight="Bold"
                                                                        inputContainerStyle={{ paddingRight: 40 }}
                                                                        baseColor="#777"
                                                                        tintColor="#1D8585"
                                                                />
                                                        </View>
                                                        <View style={styles.InputIcon}>
                                                                <EvilIcons name="lock" size={30} color="black" />
                                                        </View>

                                                </View>

                                                <TouchableOpacity>
                                                        <View style={styles.button}>
                                                                <Text style={styles.buttonText}>S'inscrire</Text>
                                                        </View>
                                                </TouchableOpacity>

                                                <View>

                                                        <View style={styles.button2}>
                                                                <View style={{ marginLeft: 20 }}>
                                                                        <AntDesign name="checkcircleo" size={24} color="white" />
                                                                </View>
                                                                <View style={{ marginLeft: 10 }}>
                                                                        <Text style={styles.buttonText}>Connexion reussi</Text>
                                                                </View>

                                                        </View>
                                                </View>



                                        </View>
                                </ScrollView>
                        </ImageBackground>
                </>
        )
}

const styles = StyleSheet.create({
        Title: {
                fontSize: 18,
                fontWeight: "bold"
        },
        description: {
                fontSize: 18,
                fontWeight: "bold",
                color: "#1D8585"
        },
        cardTitle: {
                flexDirection: "row",
                marginTop: 20,
                marginBottom: 10,
                justifyContent: "center",
                alignItems: "center"
        },
        inputCard: {
                marginHorizontal: 20,
                marginTop: 10
        },
        InputIcon: {
                position: "absolute",
                right: 15,
                marginTop: 15
        },
        button: {
                marginTop: 10,
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 10,
                backgroundColor: "#1D8585",
                marginHorizontal: 20
        },
        buttonText: {
                color: "#fff",
                fontWeight: "bold",
                // textTransform:"uppercase",
                fontSize: 16,
                textAlign: "center"
        },
        button2: {
                borderRadius: 8,
                paddingVertical: 14,
                paddingHorizontal: 10,
                backgroundColor: "#30B252",
                marginHorizontal: 60,
                marginTop: 15,
                alignItems: "center",
                flexDirection: "row",
        },
        container: {
                flex: 1,
        },
})