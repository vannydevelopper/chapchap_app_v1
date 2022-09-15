import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
// import { TextField } from "react-native-material-textfield";

export default function LoginScreen(){
        const { height } = useWindowDimensions()
        return(
                <View style={{marginTop:50}}>
                        <Text>Login</Text>
                        // <TextField/>
                </View>
        )
}