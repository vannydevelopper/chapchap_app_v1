import React from "react";
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { FontAwesome, Fontisto, EvilIcons, Feather, Ionicons } from '@expo/vector-icons';

export default function InscriptionScreen() {
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
                                                                        label="Nom Complet"
                                                                        fontWeight="Bold"
                                                                        inputContainerStyle={{ paddingRight: 40 }}
                                                                        baseColor="#777"
                                                                        tintColor="#1D8585"
                                                                />
                                                        </View>
                                                        <View style={styles.InputIcon}>
                                                                <FontAwesome name="user-o" size={20} color="black" />
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

                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Confirmer le mot de passe"
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

                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Numero de telephone"
                                                                        fontWeight="Bold"
                                                                        keyboardType="phone-pad"
                                                                        inputContainerStyle={{ paddingRight: 40 }}
                                                                        baseColor="#777"
                                                                        tintColor="#1D8585"
                                                                />
                                                        </View>
                                                        <View style={styles.InputIcon}>
                                                                <Ionicons name="ios-call-outline" size={24} color="black" />
                                                        </View>

                                                </View>

                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Adresse physique"
                                                                        fontWeight="Bold"
                                                                        inputContainerStyle={{ paddingRight: 40 }}
                                                                        baseColor="#777"
                                                                        tintColor="#1D8585"
                                                                />
                                                        </View>
                                                        <View style={styles.InputIcon}>
                                                                <EvilIcons name="location" size={24} color="black" />
                                                        </View>

                                                </View>

                                                <TouchableOpacity>
                                                        <View style={styles.button}>
                                                                <Text style={styles.buttonText}>S'inscrire</Text>
                                                        </View>
                                                </TouchableOpacity>

                                                <TouchableOpacity>
                                                        <View style={styles.cardButton}>
                                                                <Text style={{ fontSize: 17, fontWeight: "bold", color: "#1D8585" }}> S'inscrire plus tard</Text>
                                                        </View>
                                                </TouchableOpacity>

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
        cardButton: {
                marginBottom: 20,
                marginTop: 10,
                justifyContent: "center",
                alignItems: "center",
                borderBottomWidth: 1,
                borderBottomColor: "#1D8585",
                marginHorizontal: 105
        },
        container: {
                flex: 1,
        },
})