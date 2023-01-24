import { useCallback, useEffect, useState } from "react"
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from "../../../styles/COLORS"
import { useDispatch } from "react-redux";
import useFetch from '../../../hooks/useFetch'
import { addMenuAction } from "../../../store/actions/restaurantCartActions";


export default function AddCart({ menu, onClose, loadingForm }) {
        console.log(menu)

        const [amount, setAmount] = useState(1)
        const [isFocused, setIsFocused] = useState(false)
        const dispatch = useDispatch()
        // const [loadingVariants, variants] = useFetch(`/products/variants/${product.produit.ID_PRODUIT}`)
        const [selectedCombinaison, setSelectedCombinaison] = useState(null)
        const [selectedSize, setSelectedSize] = useState(null)

        /**
          * Contient  un tableau des valeurs des variantes qui sont sélectionnés
          */
        const [selectedValues, setSelectedValues] = useState([])

        const onChangeText = am => {
                setAmount(am)
        }

        const onAddToCart = () => {
                // onClose()
                // dispatch(addProductAction(product, amount, selectedCombinaison))
        }
        const onIncrementOther = () => {
                // if (amount == selectedCombinaison.QUANTITE) {
                //           return false
                // }
                // setAmount(l => parseInt(l) + 1)
        }




        return (
                loadingForm ? <ActivityIndicator
                        animating
                        size={"small"}
                        color='#777'
                        style={{ alignSelf: 'center', marginBottom: 15, marginTop: 20 }}
                /> :
                        <View style={styles.container}>
                                <View style={styles.product}>
                                        <View style={styles.productImage}>
                                                {/* <Image source={{ uri: product.produit.IMAGE }} style={styles.image} /> */}
                                        </View>
                                        <View style={styles.productDetails}>
                                                <Text numberOfLines={3} style={styles.productName}>
                                                        jbjbj
                                                        {/* {product.produit.NOM} */}
                                                </Text>
                                                <Text style={styles.productSeller}>
                                                        jjjj
                                                        {/* {product.partenaire.NOM_ORGANISATION ? product.partenaire.NOM_ORGANISATION : `${product.partenaire.NOM} ${product.partenaire.PRENOM}`} */}
                                                </Text>
                                                <Text style={styles.price}>
                                                        {/* { getPrice().toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} FBU */}
                                                        jjj
                                                </Text>
                                        </View>
                                </View>

                                {/* <View style={styles.loadingBlock}>
                                        <Text style={styles.loadingText}>Chargement</Text>
                                        <ActivityIndicator animating={true} size="small" style={{ marginLeft: 10 }} color='#777' />
                                </View>  */}
                                <>

                                        <Text style={styles.noProductFeeback}>
                                                Produit non disponible en stock pour le moment
                                        </Text>
                                        <View style={styles.moreDetails}>
                                                <Text style={styles.avalaibleFeedback}>
                                                        Disponible en stock
                                                </Text>
                                                <View style={styles.amountContainer}>
                                                        <TouchableOpacity style={[styles.amountChanger]}>
                                                                <Text style={styles.amountChangerText}>-</Text>
                                                        </TouchableOpacity>
                                                        <TextInput
                                                                style={[styles.input, isFocused && { borderColor: COLORS.primary }]}
                                                                value={amount.toString()}
                                                                onChangeText={onChangeText}
                                                                onFocus={() => setIsFocused(true)}
                                                                onBlur={() => {
                                                                        setIsFocused(false)
                                                                        checkAmount()
                                                                }}
                                                                keyboardType="decimal-pad"
                                                        />
                                                        <TouchableOpacity
                                                                style={[styles.amountChanger]}
                                                                onPress={onIncrementOther}>
                                                                <Text style={styles.amountChangerText}>+</Text>
                                                        </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity style={[styles.addCartBtn]} onPress={onAddToCart}>
                                                        <Text style={styles.addCartBtnTitle}>Ajouter au panier</Text>
                                                </TouchableOpacity>
                                        </View>
                                </>
                        </View>
        )
}
const styles = StyleSheet.create({
        container: {
                padding: 10,
        },
        title: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 10
        },
        product: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 100,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#F1F1F1'
        },
        productImage: {
                flex: 0.5,
                height: "100%"
        },
        image: {
                width: "100%",
                height: "100%",
                borderRadius: 10,
                resizeMode: 'contain'
        },
        productDetails: {
                flex: 1,
                marginLeft: 10
        },
        productName: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: "bold",
                fontSize: 15
        },
        productSeller: {
                color: COLORS.primary,
                fontSize: 13,
        },
        price: {
                color: COLORS.ecommerceRed,
                fontWeight: 'bold',
                fontSize: 16
        },
        moreDetails: {
                marginTop: 10
        },
        subTitle: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold'
        },
        sizes: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 5
        },
        size: {
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: '#F1F1F1',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10
        },
        color: {
                width: 100,
                height: 50,
                borderRadius: 10,
                backgroundColor: '#F1F1F1',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10
        },

        sizeText: {
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold',
                fontSize: 16
        },
        amountContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: 50
        },
        input: {
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#ddd',
                flex: 1,
                height: "100%",
                marginHorizontal: 10,
                textAlign: 'center',
                color: COLORS.ecommercePrimaryColor,
                fontWeight: 'bold'
        },
        amountChanger: {
                width: 50,
                height: 50,
                backgroundColor: COLORS.ecommercePrimaryColor,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center'
        },
        amountChangerText: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 20
        },
        addCartBtn: {
                marginTop: 15,
                borderRadius: 5,
                backgroundColor: COLORS.ecommerceOrange,
                paddingVertical: 15,
        },
        addCartBtnTitle: {
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold'
        },
        variantName: {
                fontWeight: 'bold',
                marginTop: 5
        },
        variantValues: {
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
                marginTop: 2
        },
        variantValue: {
                paddingVertical: 10,
                paddingHorizontal: 15,
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#E1EAF3',
                marginLeft: 5
        },
        variantValueText: {
                fontSize: 13
        },
        loadingBlock: {
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10
        },
        loadingText: {
                color: '#777'
        },
        noProductFeeback: {
                fontSize: 12,
                marginTop: 10,
                color: 'red',
                fontWeight: "bold",
                opacity: 0.7
        },
        avalaibleFeedback: {
                color: '#777',
                fontSize: 12,
                marginBottom: 2
        }
})