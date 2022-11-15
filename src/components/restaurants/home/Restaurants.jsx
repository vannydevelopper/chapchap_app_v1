import React from 'react'
import { StyleSheet, TouchableNativeFeedback, View, Text, Image, FlatList, ScrollView } from 'react-native'
import { MaterialIcons, AntDesign, Ionicons } from '@expo/vector-icons';
// import Product from '../main/Product';
// import Shop from '../main/Shop';
import Restaurant from '../main/Restaurant';
import { useAnimatedGestureHandler } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function Restaurants({ restaurants }) {
    const navigation = useNavigation()
    return (
        <View style={styles.homeshops}>
            <TouchableNativeFeedback onPress={() => navigation.navigate('RestaurantScreen', { restaurants })}
                accessibilityRole="button"
                background={TouchableNativeFeedback.Ripple('#c9c5c5')}
            >
                <View style={styles.shopsHeader}>
                    <Text style={styles.title}>Les restaurants</Text>
                    <MaterialIcons name="navigate-next" size={24} color="black" />
                </View>
            </TouchableNativeFeedback>
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