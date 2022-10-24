import React from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text, Image, FlatList, ScrollView } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import Product from '../main/Product';
import Shop from '../main/Shop';
import { useNavigation } from '@react-navigation/native';

export default function Shops({ shops }) {
    const navigation=useNavigation()
          return (
                    <View style={styles.homeshops}>
                              <TouchableNativeFeedback onPress={() => navigation.navigate('ShopsScreen', { shops })}
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                              >
                                        <View style={styles.shopsHeader}>
                                                  <Text style={styles.title}>Les boutiques</Text>
                                                  <MaterialIcons name="navigate-next" size={24} color="black" />
                                        </View>
                              </TouchableNativeFeedback>
                              <ScrollView
                                        style={styles.shops}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                              >
                                        {shops.map((shop, index) => {
                                                  return (
                                                            <Shop
                                                                      shop={shop}
                                                                      index={index}
                                                                      totalLength={shops.length}
                                                                      key={index}
                                                            />
                                                  )
                                        })}
                              </ScrollView>
                    </View>
          )
}

const styles = StyleSheet.create({
          homeshops: {
          },
          shopsHeader: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10
          },
          title: {
                    fontWeight: 'bold'
          },
          shops: {
                    paddingHorizontal: 10,
          }
})