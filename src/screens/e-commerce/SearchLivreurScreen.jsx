import React from "react";
import { ScrollView, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";
import { FontAwesome, AntDesign, Ionicons } from '@expo/vector-icons';
import { COLORS } from "../../styles/COLORS"
import LottieView from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";

export default function SearchLivreurScreen() {
          const navigation = useNavigation()
          return (
                    <View style={styles.container}>
                              <View style={styles.header}>
                                        <Text style={styles.titlePrincipal}>En attente du livreur</Text>
                                        <LottieView style={{ width: 100, height: 100, alignSelf: "center" }} source={require('../../../assets/lotties/loading.json')} autoPlay loop={true} />
                              </View>
                              <View style={styles.cardStatus}>
                                        <View style={styles.importantInfos}>
                                                  <View style={styles.importantInfo}>
                                                            <Text style={[styles.importantInfoValue]}>SH62HH</Text>
                                                            <Text style={styles.importantInfoTitle}>
                                                                      Code de la commande
                                                            </Text>
                                                  </View>
                                                  <View style={styles.importantInfo}>
                                                            <Text style={[styles.importantInfoValue, { textAlign: "right" }]}>10:46</Text>
                                                            <Text style={[styles.importantInfoTitle, { textAlign: "right" }]}>
                                                                      Heure
                                                            </Text>
                                                  </View>
                                        </View>
                                        {false && <View style={styles.infomations}>
                                                  <View style={styles.info}>
                                                            <Text style={styles.infoTitle}>
                                                                      Commande
                                                            </Text>
                                                            <Text style={styles.infoValue}>
                                                                      2 chaussures et 1 pantalons
                                                            </Text>
                                                  </View>
                                                  <View style={styles.info}>
                                                            <Text style={styles.infoTitle}>
                                                                      Destination
                                                            </Text>
                                                            <Text style={styles.infoValue}>
                                                                      Kanyosha, 18 avenue ngaha
                                                            </Text>
                                                  </View>
                                                  <View style={styles.info}>
                                                            <Text style={styles.infoTitle}>
                                                                      Personne
                                                            </Text>
                                                            <Text style={styles.infoValue}>
                                                                      Mr, jean claude kaburungu
                                                            </Text>
                                                  </View>
                                                  <View style={styles.info}>
                                                            <Text style={styles.infoTitle}>
                                                                      Livreur
                                                            </Text>
                                                            <Text style={styles.infoValue}>
                                                                      En attente...
                                                            </Text>
                                                  </View>
                                        </View>}
                                        <Text style={[styles.titlePrincipal, { textAlign: "left", marginTop: 10, fontSize: 18, marginBottom: 5 }]}>Status de livraisons</Text>
                                        <View style={styles.statusContainer}>
                                                  <View>
                                                            {new Array(4).fill(0).map((status, index) => {
                                                                      return (
                                                                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 25 }} key={index}>
                                                                                          <View style={{ flexDirection: "row" }}>
                                                                                                    <View style={styles.cardIcon}>
                                                                                                              <FontAwesome name="car" size={24} color="black" />
                                                                                                    </View>
                                                                                                    <View style={{ marginLeft: 10 }}>
                                                                                                              <View>
                                                                                                                        <Text style={styles.statutTitle}>Pick depart</Text>
                                                                                                              </View>
                                                                                                              <View>
                                                                                                                        <Text style={styles.dateStatus}>10 Oct 2021 at 10:30 P.M</Text>
                                                                                                              </View>
                                                                                                    </View>
                                                                                          </View>
                                                                                </View>
                                                                      )
                                                            })}
                                                  </View>
                                                  <View style={styles.statusCheckes}>
                                                            {new Array(4).fill(0).map((status, index) => {
                                                                      return (
                                                                                <View style={[styles.statutVue, index == 3 && { backgroundColor: '#ddd', elevation: 0 }]} key={index}>
                                                                                          {index != 3 && <AntDesign name="check" size={15} color="white" />}
                                                                                </View>
                                                                      )
                                                            })}
                                                            <View style={styles.progressIndicator} />
                                                  </View>
                                        </View>
                                        <View style={styles.navigation}>
                                                  <TouchableNativeFeedback useForeground onPress={() => {
                                                            navigation.navigate('EcommerceHomeScreen')
                                                            navigation.goBack()
                                                  }}>
                                                            <View style={styles.cancelBtn}>
                                                                      <Ionicons name="close" size={30} color="#777" />
                                                            </View>
                                                  </TouchableNativeFeedback>
                                                  <TouchableNativeFeedback useForeground onPress={{}}>
                                                            <View style={[styles.nextBtn]}>
                                                                      <Text style={[styles.navigationBtnText]}>
                                                                                Voir la commande
                                                                      </Text>
                                                            </View>
                                                  </TouchableNativeFeedback>
                                        </View>
                              </View>
                    </View>
          )
}

const styles = StyleSheet.create({
          container: {
                    flex: 1,
                    // marginHorizontal: 10
          },
          header: {
                    marginVertical: 30
          },
          titlePrincipal: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold",
                    fontSize: 22,
                    lineHeight: 33,
                    textAlign: "center"
          },
          importantInfos: {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
          },
          importantInfoValue: {
                    fontSize: 18,
                    fontWeight: "bold",
                    color: COLORS.ecommercePrimaryColor
          },
          importantInfoTitle: {
                    color: '#777'
          },
          titleStatus: {
                    color: COLORS.ecommercePrimaryColor,
                    fontWeight: "bold",
                    fontSize: 15,
                    paddingLeft: 10,
                    paddingRight: 50,
                    lineHeight: 33,
          },
          cardStatus: {
                    padding: 10,
                    backgroundColor: "#F1F1F1",
                    width: "100%",
                    paddingHorizontal: 20,
                    position: "absolute",
                    bottom: 0,
                    paddingTop: 30,
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30
          },
          cardIcon: {
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: COLORS.handleColor,
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center"
          },
          statutTitle: {
                    fontSize: 15,
                    fontWeight: "bold",
                    color: "#000"
          },
          dateStatus: {
                    fontSize: 13,
                    color: "#777"
          },
          statutVue: {
                    width: 22,
                    height: 22,
                    backgroundColor: COLORS.ecommercePrimaryColor,
                    borderRadius: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    alignContent: "center",
                    elevation: 5,
                    shadowColor: COLORS.ecommercePrimaryColor,
                    marginTop: -30
          },
          cancelBtn: {
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    borderColor: '#ddd',
                    borderWidth: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#ddd',
                    overflow: "hidden"
          },
          navigation: {
                    flexDirection: "row",
                    justifyContent: 'center',
                    paddingHorizontal: 40,
                    marginVertical: 25,
                    marginBottom: 10
          },
          nextBtn: {
                    paddingVertical: 20,
                    minWidth: 200,
                    overflow: "hidden",
                    backgroundColor: COLORS.ecommerceOrange,
                    borderRadius: 30,
                    marginLeft: 10
          },
          navigationBtnText: {
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "#FFF"
          },
          info: {
                    marginTop: 10
          },
          infoTitle: {
                    fontWeight: "bold",
                    fontSize: 15
          },
          infoValue: {
                    color: '#777'
          },
          statusContainer: {
                    flexDirection: "row",
                    justifyContent: "space-between"
          },
          statusCheckes: {
                    justifyContent: "space-around"
          },
          progressIndicator: {
                    position: 'absolute',
                    width: 1,
                    height: "80%",
                    borderWidth: 1,
                    borderStyle: "dashed",
                    borderColor: '#c2baba',
                    top: 0,
                    alignSelf: "center",
                    zIndex: -1,
                    marginTop: 15
          }
})