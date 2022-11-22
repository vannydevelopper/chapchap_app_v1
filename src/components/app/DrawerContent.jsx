import React from "react"
import { Text, StyleSheet, View, ScrollView, ImageBackground, TouchableOpacity, TouchableNativeFeedback, Image, StatusBar } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign, FontAwesome, Entypo, Feather, Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { useSelector } from "react-redux";
import { userSelector } from "../../store/selectors/userSelector";
import { COLORS } from "../../styles/COLORS";
import { DrawerActions, useFocusEffect, useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { useState } from "react";
import { useCallback } from "react";
import fetchApi from "../../helpers/fetchApi";


export default function DrawerContent({ state, navigation, descriptors }) {

  const [partenaires, setPartenaires] = useState([])


  const user = useSelector(userSelector)
  const [showServiceCommands, setShowCommandService] = useState(false)

  const handlePress = (routeName) => {

    navigation.navigate(routeName)

    navigation.dispatch(DrawerActions.closeDrawer)
  }

  const onCommandeToggle = () => {
    setShowCommandService(t => !t)
  }
  const fectPartenaires = async () => {
    try {
      const partenaire = await fetchApi("/partenaire", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
      setPartenaires(partenaire.result)


    }
    catch (error) {
      console.log(error)
    }
  }

  useFocusEffect(useCallback(() => {
    fectPartenaires()
  }, []))

  return (
    <View style={styles.drawerContent}>
      <TouchableNativeFeedback>
        <View style={styles.connectedUser}>
          <View style={styles.imageContainer}>
            <Image source={require('../../../assets/images/user.png')} style={styles.image} />
          </View>
          <View style={styles.userNames}>
            <Text style={styles.fullName} numberOfLines={1}>{user.result.NOM} {user.result.PRENOM}</Text>
            <Text style={styles.email}>{user.result.EMAIL}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style={styles.separator} />
      <DrawerContentScrollView style={styles.drawerScroller}>
        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple(COLORS.handleColor)} onPress={() => handlePress('HomeScreen')}>
          <View style={[{ borderRadius: 10, overflow: "hidden" }, (state.index == 0 || state.index == 1 || state.index == 2) && { backgroundColor: COLORS.handleColor }]}>
            <View style={styles.drawerItem}>
              <AntDesign name="home" size={27} color="#000" />
              <Text style={[styles.drawerItemLabel, (state.index == 0 || state.index == 1 || state.index == 2) && { color: '#000' }]}>Produits et  services</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')} onPress={onCommandeToggle}>
          <View style={[{ borderRadius: 10, overflow: "hidden", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, (state.index == 2)&& { backgroundColor: COLORS.handleColor }]}>
            <View style={styles.drawerItem}>
              <Feather name="shopping-cart" size={24} color="#777" />
              <Text style={[styles.drawerItemLabel, (state.index == 0 || state.index == 1 || state.index == 2) && { color: '#000' }]}>Commandes</Text>
            </View>
            {showServiceCommands ? <Ionicons name="caret-up" size={24} color="#777" /> :
              <Ionicons name="caret-down" size={24} color="#777" />}
          </View>
        </TouchableNativeFeedback>
        {showServiceCommands && <View style={styles.services}>

              <TouchableOpacity index={1} onPress={() => navigation.navigate("CommandeEmiseScreen",{ID_SERVICE:1})} style={{ borderRadius: 10 }}>
                <View style={[styles.service, (state.index == 2) && { backgroundColor: COLORS.handleColor }]}>
                  <Text style={[styles.serviceName, (state.index == 2) && { color: '#000' }]}>
                    Achats des produit
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity index={2} onPress={() => navigation.navigate("RestaurantEmiseScreen",{ID_SERVICE:2})} style={{ borderRadius: 10 }}>
                <View style={[styles.service, (state.index == 2) && { backgroundColor: COLORS.handleColor }]}>
                  <Text style={[styles.serviceName, (state.index == 2) && { color: '#000' }]}>
                    Restaurant
                  </Text>
                </View>
              </TouchableOpacity>

        </View>}
        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple(COLORS.handleColor)} onPress={() => handlePress('WishlistTab')}>
          <View style={[{ borderRadius: 10, overflow: "hidden" }, ( state.index == 3) && { backgroundColor: COLORS.handleColor }]}>
            <View style={styles.drawerItem}>
              <AntDesign name="hearto" size={24} color="#777" />
              <Text style={styles.drawerItemLabel}>Wishlist</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
       
        <View style={[styles.separator, { marginVertical: 20 }]} />
        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
          <View style={{ borderRadius: 10, overflow: "hidden" }}>
            <View style={styles.drawerItem}>
              <Feather name="menu" size={24} color="#777" />
              <Text style={styles.drawerItemLabel}>Condition d'utilisation</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
          <View style={{ borderRadius: 10, overflow: "hidden" }}>
            <View style={styles.drawerItem}>
              <AntDesign name="setting" size={24} color="#777" />
              <Text style={styles.drawerItemLabel}>Paramètres</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
          <View style={{ borderRadius: 10, overflow: "hidden" }}>
            <View style={styles.drawerItem}>
              <AntDesign name="infocirlceo" size={24} color="#777" />
              <Text style={styles.drawerItemLabel}>Infos et assistance</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback useForeground background={TouchableNativeFeedback.Ripple('#EFEFEF')}>
          <View style={{ borderRadius: 10, overflow: "hidden" }}>
            <View style={styles.drawerItem}>
              <MaterialIcons name="logout" size={20} color="#777" />
              <Text style={styles.drawerItemLabel}>Déconnexion</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      </DrawerContentScrollView>
    </View>
  )

}
const styles = StyleSheet.create({
  separator: {
    height: 2,
    width: "95%",
    backgroundColor: COLORS.handleColor,
    alignSelf: "center"
  },
  drawerContent: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  connectedUser: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  imageContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.handleColor,
    borderRadius: 10,
    padding: 5
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
    resizeMode: "center"
  },
  userNames: {
    marginLeft: 10
  },
  fullName: {
    fontWeight: "bold",
    fontSize: 16,
    maxWidth: "90%"
  },
  email: {
    color: '#777',
    fontSize: 13
  },
  drawerScroller: {
    paddingHorizontal: 10
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
    overflow: "hidden"
  },
  drawerItemLabel: {
    marginLeft: 10,
    fontWeight: "bold",
    color: '#777'
  },
  services: {
    paddingLeft: 20
  },
  service: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    padding: 10,
    borderRadius: 10
  },
  serviceImageContainer: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: COLORS.handleColor,
    borderWidth: 2
  },
  serviceImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  serviceName: {
    color: '#777',
    marginLeft: 10,
    fontSize: 13
  }
})