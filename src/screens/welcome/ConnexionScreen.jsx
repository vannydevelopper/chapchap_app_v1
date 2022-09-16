import React, { useRef, useState, useEffect } from 'react'
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { FontAwesome, Fontisto, EvilIcons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import fetchApi from "../../helpers/fetchApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { setUserAction } from "../../store/actions/userActions"


export default function ConnexionScreen() {
        const navigation = useNavigation()
        const dispatch = useDispatch()
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [showPassword, setShowPassword] = useState(false)
        const [errors, setErrors] = useState(null);
        const handleLogin = async () => {
                const user = {
                        email,
                        password
                }
                setErrors(null)
                try {
                        const userData = await fetchApi("/users/login", {
                                method: "POST",
                                body: JSON.stringify(user),
                                headers: { "Content-Type": "application/json" },
                        });
                        await AsyncStorage.setItem("user", JSON.stringify(userData));
                        dispatch(setUserAction(userData))
                }

                catch (error) {
                        console.log(error)
                        setErrors(error.result)
                }
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
                                                                        onChangeText={(em)=>setPassword(em)}
                                                                        value={password}
                                                                        secureTextEntry={!showPassword}
                                                                />
                                                        </View>
                                                        <TouchableOpacity style={styles.InputIcon} onPress={() => setShowPassword(t => !t)}>
                                                                <Ionicons name={!showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#777" />
                                                               
                                                        </TouchableOpacity>

                                                </View>

                                                <TouchableOpacity disabled={email == '' || password == ''} onPress={handleLogin} >
                                                        <View style={[styles.button, (email == '' || password == '') && { opacity: 0.5 }]}>
                                                                <Text style={styles.buttonText}>Se connecter</Text>
                                                        </View>
                                                </TouchableOpacity>

                                                { errors && <View>

                                                        <View style={styles.button2}>
                                                                <View style={{ marginLeft: 20 }}>
                                                                        <AntDesign name="closecircleo" size={24} color="white" />
                                                                </View>
                                                                <View style={{ marginLeft: 10 }}>
                                                                        {errors && <Text style={styles.buttonText}>{errors.main ? errors.main[0] : errors.email[0]} </Text>}
                                                                </View>

                                                        </View>
                                                </View>}



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
                backgroundColor: "#D24646",
                marginHorizontal: 60,
                marginTop: 15,
                alignItems: "center",
                flexDirection: "row",
        },
        container: {
                flex: 1,
        },
})