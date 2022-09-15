import React from "react";
import { Text, View, useWindowDimensions } from "react-native";
import { TextField, FilledTextField, OutlinedTextField } from 'rn-material-ui-textfield'

export default function LoginScreen() {
          const { height } = useWindowDimensions()
          return (
                    <View style={{ marginTop: 50 }}>
                              <Text style={{}}>Login</Text>
                              <OutlinedTextField
                                        label="Phone number"
                                        keyboardType="phone-pad"
                              />
                    </View>
          )
}