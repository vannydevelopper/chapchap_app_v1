import React from "react";
import { Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LottieView from 'lottie-react-native';
import {COLORS} from "../../../styles/COLORS"
import { useNavigation } from "@react-navigation/native";

export default function SuccessEcocash() {
        const navigation = useNavigation()
        return (
                <View style={styles.container}>
                        <ScrollView style={{}} keyboardShouldPersistTaps='always'>
                                <View style={styles.content}>
                                        <Image source={require('../../../../assets/images/ecocash.png')} style={styles.methodImage} />
                                        <Text style={styles.successTitle}>En attente de confirmation</Text>
                                        {/* <LottieView style={{ width: 150, height: 150, marginVertical: -10 }} source={require('../../../../assets/lotties/loadingConfirmation.json')} autoPlay loop={true} /> */}
                                        <LottieView style={{ width: 100, height: 100}} source={require('../../../../assets/lotties/loading.json')} autoPlay loop={true} />
                                        <View style={styles.steps}>
                                                <Text style={styles.subTitle}>Confirmer le paiement en suivant ces etapes:</Text>
                                                <View style={styles.step}>
                                                        <View style={styles.peineIndex}>
                                                                <Text style={styles.peineIndexText}>1</Text>
                                                        </View>
                                                        <Text style={styles.stepTitle}>
                                                                Tapez
                                                                <Text style={styles.stepHighlight}> *404#</Text>
                                                        </Text>
                                                </View>
                                                <View style={styles.step}>
                                                        <View style={styles.peineIndex}>
                                                                <Text style={styles.peineIndexText}>2</Text>
                                                        </View>
                                                        <Text style={styles.stepTitle}>
                                                                Entrez le
                                                                <Text style={styles.stepHighlight}> code PIN</Text>
                                                        </Text>
                                                </View>
                                                <View style={styles.step}>
                                                        <View style={styles.peineIndex}>
                                                                <Text style={styles.peineIndexText}>3</Text>
                                                        </View>
                                                        <Text style={styles.stepTitle}>
                                                                Sélectionner
                                                                <Text style={styles.stepHighlight}> 5. Payer le marchant</Text>
                                                        </Text>
                                                </View>
                                                <View style={styles.step}>
                                                        <View style={styles.peineIndex}>
                                                                <Text style={styles.peineIndexText}>4</Text>
                                                        </View>
                                                        <Text style={styles.stepTitle}>
                                                                Sélectionner
                                                                <Text style={styles.stepHighlight}> 3. Approuver le paiement</Text>
                                                        </Text>
                                                </View>
                                                <View style={{...styles.step, marginBottom:20}}>
                                                        <View style={styles.peineIndex}>
                                                                <Text style={styles.peineIndexText}>5</Text>
                                                        </View>
                                                        <Text style={styles.stepTitle}>
                                                                Confimer en tapant le
                                                                <Text style={styles.stepHighlight}> code PIN</Text>
                                                        </Text>
                                                </View>
                                        </View>
                                        {/* <TouchableOpacity onPress={()=>navigation.navigate("SearchLivreurScreen")}>
                                                <View style={styles.payBtn} >
                                                        <Text style={styles.payBtnTitle}>Confirmer</Text>
                                                </View>
                                        </TouchableOpacity> */}
                                </View>

                        </ScrollView>
                </View>
        )
}

const styles = StyleSheet.create({
        // container: {
        //         flex: 1
        // },
        content: {
                alignItems: 'center'
        },
        methodImage: {
                height: 60,
                width: 150,
                resizeMode: 'contain',
                marginLeft: 10,
                alignSelf: 'center'
        },
        successTitle: {
                color: '#777',
                fontWeight: 'bold',
                fontSize: 17
        },
        steps: {
                alignSelf: 'flex-start',
                paddingHorizontal: 20
        },
        subTitle: {
                color: '#777',
                marginVertical: 10
        },
        step: {
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 5
        },
        peineIndex: {
                backgroundColor: '#2358ad',
                width: 15,
                height: 15,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
        },
        peineIndexText: {
                color: '#fff',
                fontSize: 9,
                marginTop: -2,
                fontWeight: 'bold',
                opacity: 0.8
        },
        stepTitle: {
                marginLeft: 10,
                color: '#777'
        },
        stepHighlight: {
                color: '#2358ad',
                marginHorizontal: 10,
                fontWeight: 'bold'
        },
        payBtn: {
                // flex:1,
                // paddingVertical: 15,
                // backgroundColor: COLORS.ecommerceOrange,
                // borderRadius: 5,
                marginVertical: 10,
                // marginTop: 10,
                    borderRadius: 8,
                    paddingVertical: 14,
                    paddingHorizontal: 30,
                    backgroundColor: COLORS.ecommerceOrange,
                    marginHorizontal: 20
        },
        payBtnTitle: {
                textAlign: "center",
                color: '#fff',
                fontWeight: "bold"
        },
})