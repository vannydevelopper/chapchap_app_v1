import React, { useCallback, useRef } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, View } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../../styles/COLORS';
import { Portal } from 'react-native-portalize';
import { Modalize } from 'react-native-modalize';
import AddCart from './AddCart1';
import { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ecommerceProductSelector } from '../../../store/selectors/ecommerceCartSelectors';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import fetchApi from "../../../helpers/fetchApi";

export default function Product({ product, index, totalLength, fixMargins = false, onRemove }) {
  //  console.log(product)
  const [wishlist, setWishlist] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)

  const navigation = useNavigation()
  const { width } = useWindowDimensions()
  const PRODUCT_MARGIN = 10
  const PRODUCT_WIDTH = (width / 2) - PRODUCT_MARGIN - 10
  const PRODUCT_HEIGHT = 270
  const additionStyles = {
    width: PRODUCT_WIDTH,
    height: PRODUCT_HEIGHT,
    marginLeft: index > 0 ? PRODUCT_MARGIN : (fixMargins ? PRODUCT_MARGIN : 0),
    marginRight: index == totalLength - 1 ? PRODUCT_MARGIN : (fixMargins ? 0 : 0)
  }

  const modalizeRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [loadingForm, setLoadingForm] = useState(true)
  const [SIZES, setSIZES] = useState([])
  const [quantites, setQuantites] = useState([])

  const [colors, SetColors] = useState([])
  const [variantes, setVariantes] = useState([])
  const [combinaisons, setCombinaisons] = useState([])
 var nombre=0;
  const onPress = useCallback((newCombinaison,nbre) => {
    nombre=nbre
    const isSelected = combinaisons.find(i =>i.ID_VARIANT == newCombinaison.ID_VARIANT)
    if (isSelected) {
    var  comb = combinaisons.filter(i =>i.ID_VARIANT != newCombinaison.ID_VARIANT)
    const newCombinaisons=[...comb,newCombinaison]
    setCombinaisons( newCombinaisons )
    }
    else {
      setCombinaisons(t => [...t, newCombinaison])
    }
    console.log(combinaisons.length)
    console.log(nbre)

    if(combinaisons.length==nbre-1)
    {
      
        const ID_VALUE=combinaisons.map((combinaison,index)=>combinaison.ID_VALUE)
        const form = new FormData()
        form.append('ID_VARIANT', JSON.stringify(ID_VALUE))

        try {
          
          const res =  fetchApi("/products/quantite/", {
            method: "POST",
            body: form
    })
          setQuantites(res)
        console.log(res)

        }
       catch (error) {
      console.log(error)
    }
        }

    }


  }, [combinaisons])
  
  const fecthSizes = async () => {
    try {
      const sizes = await fetchApi(`/products/size/${product.produit.ID_PRODUIT_PARTENAIRE}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      setSIZES(sizes.result)
    }
    catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    fecthSizes()
  }, []))
  const fecthVariantes = async () => {
    try {
      const sizes = await fetchApi(`/products/variante/${product.produit.ID_PRODUIT_PARTENAIRE}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      setVariantes(sizes.result)
    }
    catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    fecthVariantes()
  }, []))


  useEffect(() => {
    (async () => {
      try {
        // setLoadingSubCategories(true)
        if (selectedSize?.ID_TAILLE) {
          const color = await fetchApi(`/products/color/${product.produit.ID_PRODUIT_PARTENAIRE}/${selectedSize?.ID_TAILLE}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          })
          SetColor(color.result)
          console.log("color.result")
        }
      } catch (error) {
        console.log(error)
      }
      // finally {
      //     setLoadingSubCategories(false)
      // }
    })()
  }, [selectedSize])


  const onCartPress = () => {
    setIsOpen(true)
    modalizeRef.current?.open()
  }
  const fecthWishlist = async () => {
    try {
      const wishliste = await fetchApi(`/wishlist/verification/${product.produit.ID_PRODUIT_PARTENAIRE}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      // console.log(wishliste.result)
      if (wishliste.result) {
        setWishlist(true)
      }

    }
    catch (error) {
      console.log(error)
    }
  }
  useFocusEffect(useCallback(() => {
    fecthWishlist()
  }, []))


  const Addishlist = async (id) => {
    //  console.log(id)
    if (wishlist) {
      try {

        const newWishlist = await fetchApi(`/wishlist/suppression/${id}`, {
          method: "DELETE",
        })
        if (onRemove) {
          onRemove(id)
        }

        setWishlist(false)

      } catch (error) {
        console.log(error)
      }

    }

    else {
      try {
        const form = new FormData()
        // form.append("ID_PRODUIT", id)
        //  console.log(id)
        const newWishlist = await fetchApi('/wishlist', {
          method: 'POST',
          body: JSON.stringify({
            ID_PRODUIT_PARTENAIRE: id,

          }),
          headers: { "Content-Type": "application/json" },
        })

        setWishlist(true)


      } catch (error) {
        console.log(error)
      }

    }

  }
  const onCloseAddToCart = () => {
    modalizeRef.current?.close()
  }

  const productInCart = useSelector(ecommerceProductSelector(product.produit.ID_PRODUIT_PARTENAIRE))
  //  console.log(product.produit.ID_PRODUIT_PARTENAIRE)
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setLoadingForm(false)
      })
      return () => {
        clearTimeout(timer)
      }
    }
  }, [isOpen])

  return (
    <View key={index} style={[styles.product, additionStyles, fixMargins && { marginTop: 10 }]}>
      <TouchableWithoutFeedback onPress={() => navigation.push('ProductDetailsScreen', { product: product })} >
        <View style={styles.imageCard}>
          <Image source={{ uri: product.produit.IMAGE }} style={styles.image} />
        </View>
      </TouchableWithoutFeedback>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          onPress={() => {
            Addishlist(product.produit.ID_PRODUIT_PARTENAIRE)
            setWishlist(true)
          }}
        >
          <View style={styles.cardLike}>
            {wishlist ? <AntDesign name="heart" size={24} color="#F29558" /> : <AntDesign name="hearto" size={24} color="#F29558" />}


          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cartBtn} onPress={onCartPress}>
          <>
            <AntDesign name="shoppingcart" size={24} color="#F29558" />
            {productInCart ? <View style={styles.badge}>
              <Text style={styles.badgeText} numberOfLines={1}>{productInCart.QUANTITE}</Text>
            </View> : null}
          </>
        </TouchableOpacity>
      </View>
      <View style={styles.productNames}>
        <Text numberOfLines={2} style={styles.productName}>
          {product.produit.NOM} ·
          <Text numberOfLines={2} style={styles.productName}> {product.produit_partenaire.NOM}</Text>
        </Text>
      </View>
      {product.produit_partenaire.PRIX ? <Text style={{ color: "#F29558", fontWeight: "bold" }}>{product.produit_partenaire.PRIX.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} Fbu</Text> : null}
      <Portal>
        <GestureHandlerRootView style={{ height: isOpen ? '100%' : 0, opacity: isOpen ? 1 : 0, backgroundColor: 'rgba(0, 0, 0, 0)', position: 'absolute', width: '100%', zIndex: 1 }}>
          <Modalize
            ref={modalizeRef}
            adjustToContentHeight
            handlePosition='inside'
            modalStyle={{
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              paddingVertical: 20
            }}
            handleStyle={{ marginTop: 10 }}
            scrollViewProps={{
              keyboardShouldPersistTaps: "handled"
            }}
            onClosed={() => {
              setIsOpen(false)
              setLoadingForm(true)
            }}
          >
            <AddCart combinaisons={combinaisons} onPress={onPress} variantes={variantes} colors={colors} SIZES={SIZES} product={product} loadingForm={loadingForm} onClose={onCloseAddToCart} />
          </Modalize>
        </GestureHandlerRootView>
      </Portal>
    </View>
  )
}

const styles = StyleSheet.create({
  product: {
    maxWidth: 200
  },
  imageCard: {
    borderRadius: 8,
    height: "60%",
    width: "100%",
    backgroundColor: '#F1F1F1',
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: "95%",
    width: "95%",
    borderRadius: 8,
    resizeMode: 'contain'
  },
  cardLike: {
    marginTop: 10,
    width: 35,
    height: 35,
    backgroundColor: "#FBD5DA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  cartBtn: {
    marginTop: 10,
    width: 35,
    height: 35,
    backgroundColor: "#FBD5DA",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8
  },
  badge: {
    minWidth: 25,
    minHeight: 20,
    paddingHorizontal: 5,
    borderRadius: 20,
    backgroundColor: COLORS.ecommerceRed,
    position: 'absolute',
    top: -5,
    right: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    textAlign: 'center',
    fontSize: 10,
    color: '#FFF',
    fontWeight: "bold"
  },
  productName: {
    color: COLORS.ecommercePrimaryColor,
    fontWeight: "400",
    fontSize: 13
  }
})