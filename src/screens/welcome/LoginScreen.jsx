import React from "react";
import { Text, View, useWindowDimensions } from "react-native";


export default function LoginScreen(){
        const { height } = useWindowDimensions()
        return(
                <View style={{marginTop:50}}>
                        <Text>Login</Text>
                </View>
        )
}