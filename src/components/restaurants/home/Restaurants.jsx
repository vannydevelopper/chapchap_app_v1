import React from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text, Image, FlatList, ScrollView } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
// import Product from '../main/Product';
// import Shop from '../main/Shop';
import Restaurant from '../main/Restaurant';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function Restaurants({ lat, long, restaurants }) {
    const navigation = useNavigation()
    return (
        <View style={styles.homeshops}>
            <ScrollView
                style={styles.shops}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {restaurants.map((restaurant, index) => {
                    return (
                        <Restaurant
                            restaurant={restaurant}
                            index={index}
                            totalLength={restaurants.length}
                            key={index}
                        // lat={lat} 
                        // long={long} 
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    homeshops: {
        marginBottom: "-6%",



    },
    shopsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        // marginTop:-80
    },
    title: {
        fontWeight: 'bold'
    },
    shops: {
        paddingHorizontal: 10,
        marginTop: 5,


    }
})