import React, { useRef, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageBackground, ActivityIndicator } from "react-native";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { FontAwesome, Fontisto, EvilIcons, Feather, Ionicons } from '@expo/vector-icons';
import fetchApi from '../../helpers/fetchApi';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setUserAction } from "../../store/actions/userActions"

export default function InscriptionScreen() {
        const [nom, setNom] = useState("");
        const [prenom, setPrenom] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confrimPassword, setConfrimPassword] = useState("");
        const [telephone, setTelephone] = useState("");
        const [adressePhysique, setAdressePhysique] = useState("");
        const [errors, setErrors] = useState(null);
        const dispatch = useDispatch()
        const navigation = useNavigation()
        const [loading, setLoading] = useState(false);

        const enregistrement = async () => {
                setErrors(null)
                // if (password != confrimPassword) {
                //         setErrors(t => {
                //                   return {
                //                             ...t,
                //                             confrimPassword: "le mot de passe ne corespond pas"
                //                   }
                //         })
                //         return false
                //  }
                setLoading(true)
                try {
                        const res = await fetchApi("/users", {
                                method: 'POST',
                                body: JSON.stringify({
                                        NOM: nom,
                                        PRENOM: prenom,
                                        EMAIL: email,
                                        PASSWORD: password,
                                        TELEPHONE_1: telephone,
                                }),
                                headers: { "Content-Type": "application/json" },
                        })
                        await AsyncStorage.setItem("user", JSON.stringify(res));
                        dispatch(setUserAction(res));
                }
                catch (error) {
                        console.log(error)
                        setErrors(error.result)
                }
                setLoading(false);
        }

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
                                                                        label="Nom"
                                                                        fontWeight="Bold"
                                                                        inputContainerStyle={{ paddingRight: 40 }}
                                                                        baseColor="#777"
                                                                        tintColor="#1D8585"
                                                                        onChangeText={(em) => setNom(em)}
                                                                        value={nom}
                                                                />
                                                        </View>
                                                        <View style={styles.InputIcon}>
                                                                <FontAwesome name="user-o" size={20} color="black" />
                                                        </View>

                                                </View>

                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Prénom"
                                                                        fontWeight="Bold"
                                                                        inputContainerStyle={{ paddingRight: 40 }}
                                                                        baseColor="#777"
                                                                        tintColor="#1D8585"
                                                                        onChangeText={(em) => setPrenom(em)}
                                                                        value={prenom}
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
                                                                        onChangeText={(em) => setEmail(em)}
                                                                        value={email}
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
                                                                        onChangeText={(em) => setPassword(em)}
                                                                        value={password}
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
                                                                        onChangeText={(em) => setConfrimPassword(em)}
                                                                        value={confrimPassword}
                                                                />
                                                        </View>
                                                        <View style={styles.InputIcon}>
                                                                <EvilIcons name="lock" size={30} color="black" />
                                                        </View>

                                                </View>

                                                <View style={styles.inputCard}>
                                                        <View>
                                                                <OutlinedTextField
                                                                        label="Numéro de téléphone"
                                                                        fontWeight="Bold"
                                                                        keyboardType="phone-pad"
                                                                        inputContainerStyle={{ paddingRight: 40 }}
                                                                        baseColor="#777"
                                                                        tintColor="#1D8585"
                                                                        onChangeText={(em) => setTelephone(em)}
                                                                        value={telephone}
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
                                                                        onChangeText={(em) => setAdressePhysique(em)}
                                                                        value={adressePhysique}
                                                                />
                                                        </View>
                                                        <View style={styles.InputIcon}>
                                                                <EvilIcons name="location" size={24} color="black" />
                                                        </View>

                                                </View>

                                                        {loading && <View style={{ flex: 1, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                                                <ActivityIndicator color="#007BFF" animating={loading} size='large' />
                                                        </View>}

                                                        <TouchableOpacity
                                                                disabled={nom == '' || prenom == '' || email == '' || password == '' || confrimPassword == '' || telephone == '' || adressePhysique == ''}
                                                                onPress={enregistrement}>
                                                                <View style={[styles.button, (nom == '' || prenom == '' || email == '' || password == '' || confrimPassword == '' || telephone == '' || adressePhysique == '') && { opacity: 0.5 }]}>
                                                                        <Text style={styles.buttonText}>S'inscrire</Text>
                                                                </View>
                                                        </TouchableOpacity>


                                                <TouchableOpacity onPress={() => navigation.navigate("Connexion")}>
                                                        <View style={styles.cardButton}>
                                                                <Text style={{ fontSize: 13, fontWeight: "bold", color: "#1D8585" }}> S'inscrire plus tard</Text>
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
                marginHorizontal: 118
        },
        container: {
                flex: 1,
        },
        errorss: {
                fontSize: 12,
                color: "red"
        }
})