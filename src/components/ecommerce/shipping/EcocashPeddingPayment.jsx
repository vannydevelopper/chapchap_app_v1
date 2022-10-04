import React from "react"
import { useRef } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { Animated, BackHandler, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native"
import { Portal } from "react-native-portalize"
import { COLORS } from "../../../styles/COLORS"
import SuccessEcocash from "./SuccesEcocash"
import io from 'socket.io-client'
import { API_URL } from "../../../helpers/fetchApi"

export default function EcocashPeddingPayment({ onClose, loading }) {
          const socket = useRef(io(API_URL)).current
          const [scale] = useState(new Animated.Value(1.1))
          useEffect(() => {
                    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                              onClose()
                              return true
                    })
                    Animated.spring(scale, {
                              toValue: 1,
                              useNativeDriver: true
                    }).start()
                    return () => {
                              backHandler.remove()
                    }
          }, [])
          useEffect(() => {
                    socket.on('connect', () => {
                              console.log('connected')
                              socket.emit('join', { userId: 1 });
                    })
                    socket.on('ECOCASH_CONFIRMED', message => {
                              console.log(message)
                              onClose()
                    })
                    return () => {
                              socket.disconnect()
                    }
          }, [])
          return (
                    <Portal>
                              <TouchableWithoutFeedback onPress={onClose}>
                                        <View style={styles.modalContainer}>
                                                  <TouchableWithoutFeedback onPress={onClose}>
                                                            <Animated.View style={{ ...styles.modalContent, transform: [{ scale }] }}>
                                                                      <View style={{ borderBottomWidth: 0, paddingVertical: 10, paddingHorizontal: 20, backgroundColor: COLORS.ecommerceOrange }}>
                                                                                <Text style={{ fontWeight: 'bold', color: '#fff', opacity: 0.8, textAlign: 'center' }}>
                                                                                          Paiement initié avec succes
                                                                                </Text>
                                                                      </View>
                                                                      <SuccessEcocash />

                                                            </Animated.View>
                                                  </TouchableWithoutFeedback>
                                        </View>
                              </TouchableWithoutFeedback>
                    </Portal>
          )
}

const styles = StyleSheet.create({
          modalContainer: {
                    position: 'absolute',
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    justifyContent: 'center',
                    alignItems: 'center'
          },
          modalContent: {
                    width: '90%',
                    maxWidth: 400,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    overflow: 'hidden',
                    maxHeight: '90%'
          },
})