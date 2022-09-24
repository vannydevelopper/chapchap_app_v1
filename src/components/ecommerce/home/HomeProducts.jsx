import React from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text, Image, FlatList } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import Product from '../main/Product';

export default function HomeProducts({ products }) {
          return (
                    <View style={styles.homeProducts}>
                              <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#c9c5c5')}
                              >
                                        <View style={styles.productsHeader}>
                                                  <Text style={styles.title}>Les plus achetés</Text>
                                                  <MaterialIcons name="navigate-next" size={24} color="black" />
                                        </View>
                              </TouchableNativeFeedback>
                              <FlatList
                                        data={products}
                                        style={styles.products}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        keyExtractor={(item, index) => index}
                                        renderItem={({ item: product, index}) => {
                                                  return (
                                                            <Product
                                                                      product={product}
                                                                      index={index}
                                                                      totalLength={products.length}
                                                            />
                                                  )
                                        }}
                              />
                    </View>
          )
}

const styles = StyleSheet.create({
          homeProducts: {
          },
          productsHeader: {
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
          products: {
                    paddingHorizontal: 10,
          }
})