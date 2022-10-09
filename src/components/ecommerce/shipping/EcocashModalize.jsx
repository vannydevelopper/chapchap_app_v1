import React, { useRef, useState, useEffect } from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, BackHandler, Animated, TouchableWithoutFeedback, View, Keyboard } from "react-native"
import { useForm } from "../../../hooks/useForm"
import { useFormErrorsHandle } from "../../../hooks/useFormErrorsHandle"
import { COLORS } from "../../../styles/COLORS"
import { TextField, FilledTextField, InputAdornment, OutlinedTextField } from 'rn-material-ui-textfield'
import { FontAwesome, Fontisto, EvilIcons, Feather, Ionicons, MaterialIcons, FontAwesome5, AntDesign } from '@expo/vector-icons';
import { useCallback } from "react"
import { useSelector } from "react-redux"
import { ecommerceCartSelector } from "../../../store/selectors/ecommerceCartSelectors"
import { Portal } from "react-native-portalize"
import fetchApi from '../../../helpers/fetchApi'
import Loading from '../../app/Loading'
import { restaurantCartSelector } from '../../../store/selectors/restaurantCartSelectors'



export default function EcocashModalize({ info, loadingForm, onClose, shipping_info, service, commandes, resto, onFInish }) {
        const [loading, setLoading] = useState(false)
        const [data, handleChange] = useForm({
                tel: ""
        })
        const { errors, setError, getErrors, setErrors, checkFieldData, isValidate, getError, hasError } = useFormErrorsHandle(data, {
                tel: {
                        required: true,
                        length: [8, 8]
                }
        }, {
                tel: {
                        required: "Le numéro de téléphone est obligatoire",
                        length: "Numéro de téléphone invalide"
                },
        })
        const products = useSelector(ecommerceCartSelector)
        const restaurants = useSelector(restaurantCartSelector)

        if (products) {
                var getAmount = useCallback(() => {
                        var total = 0
                        products.forEach(product => {
                                total += parseInt(product.produit_partenaire.PRIX) * product.QUANTITE
                        })
                        return total
                }, [products])
        }

        if (restaurants) {
                var getAmount = useCallback(() => {
                        var total = 0
                        restaurants.forEach(restaurant => {
                                total += parseInt(restaurant.MONTANT) * restaurant.QUANTITE
                        })
                        return total
                }, [restaurants])
        }



        const onPay = async () => {
                try {
                        Keyboard.dismiss()
                        setLoading(true)
                        setErrors({})
                        let isnum = /^\d+$/.test(data.tel);
                        if (!isnum) {
                                return setError("tel", ["Numéro de téléphone invalide"])
                        }
                        if (service==2) {
                                const commande = await fetchApi('/commandes/clients/restaurant', {
                                        method: "POST",
                                        body: JSON.stringify({
                                                numero: data.tel,
                                                shipping_info: {
                                                        TELEPHONE: shipping_info.tel,
                                                        N0M: shipping_info.nom,
                                                        PRENOM: shipping_info.prenom,
                                                        ADRESSE: shipping_info.address,
                                                },
                                                service:service,
                                                resto
                                        }),
                                        headers: { "Content-Type": "application/json" },
                                })
                                onFInish(commande.result)
                        } if(service==1) {
                                const commande = await fetchApi('/commandes/clients', {
                                        method: "POST",
                                        body: JSON.stringify({
                                                numero: data.tel,
                                                shipping_info: {
                                                        TELEPHONE: shipping_info.tel,
                                                        N0M: shipping_info.nom,
                                                        PRENOM: shipping_info.prenom,
                                                        ADRESSE: shipping_info.address,
                                                },
                                                service:service,
                                                commandes
                                        }),
                                        headers: { "Content-Type": "application/json" },
                                })
                                onFInish(commande.result)
                        }

                } catch (error) {
                        console.log(error)
                } finally {
                        setLoading(false)
                }
        }

        const totalAmount = getAmount() + 0
        return (
                loadingForm ? <ActivityIndicator
                        animating
                        size={"small"}
                        color='#777'
                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                /> :
                        <View style={styles.container}>
                                {loading && <Loading />}
                                <Image source={info.image} style={styles.image} />
                                <OutlinedTextField
                                        label="Numéro ecocash"
                                        fontSize={14}
                                        baseColor={COLORS.smallBrown}
                                        tintColor={COLORS.primary}
                                        lineWidth={0.5}
                                        activeLineWidth={0.5}
                                        errorColor={COLORS.error}
                                        renderRightAccessory={() => <AntDesign name="phone" size={24} color={hasError('tel') ? COLORS.error : "#a2a2a2"} />}
                                        value={data.tel}
                                        onChangeText={(newValue) => handleChange('tel', newValue)}
                                        onBlur={() => checkFieldData('tel')}
                                        error={hasError('tel') ? getError('tel') : ''}
                                        autoCompleteType='off'
                                        returnKeyType="go"
                                        keyboardType="number-pad"
                                        containerStyle={{
                                                marginTop: 10
                                        }}
                                />
                                <View style={styles.orderInfo}>
                                        <View style={styles.orderPriceItem}>
                                                <Text style={styles.orderPriceItemTitle}>Frais de la commande</Text>
                                                <Text style={styles.orderPriceItemValue}>{getAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text>
                                        </View>
                                        <View style={styles.orderPriceItem}>
                                                <Text style={styles.orderPriceItemTitle}>Frais de livraison</Text>
                                                <Text style={styles.orderPriceItemValue}>0 Fbu</Text>
                                        </View>
                                        <View style={styles.orderPriceItem}>
                                                <Text style={styles.orderPriceItemTitle}>Total</Text>
                                                <Text style={styles.orderTotal}>
                                                        {getAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu
                                                </Text>
                                        </View>
                                </View>
                                <TouchableOpacity style={[styles.payBtn, !isValidate() && { opacity: 0.5 }]} disabled={!isValidate()} onPress={onPay}>
                                        <Text style={styles.payBtnTitle}>PAYER ({getAmount().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu)</Text>
                                </TouchableOpacity>
                        </View>
        )
}

const styles = StyleSheet.create({
        container: {
                paddingHorizontal: 20
        },
        image: {
                height: 40,
                width: 100,
                alignSelf: "center"
        },
        orderPriceItem: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 5
        },
        orderPriceItemTitle: {
                color: '#c4bebe',
                fontSize: 13,
                fontWeight: "bold"
        },
        orderTotal: {
                fontWeight: "bold",
                fontSize: 18
        },
        payBtn: {
                paddingVertical: 15,
                backgroundColor: COLORS.ecommerceOrange,
                borderRadius: 5,
                marginVertical: 10
        },
        payBtnTitle: {
                textAlign: "center",
                color: '#fff',
                fontWeight: "bold"
        },
})