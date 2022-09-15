import React from "react";
import { Image } from "react-native";
import { Text, StyleSheet, View, ScrollView, ImageBackground } from "react-native";
import { Feather } from '@expo/vector-icons';
export default function HomeScreen() {
    return (
        <ImageBackground style={styles.imgBackground} source={require('../../../assets/images/g52.png')}>
            <View style={styles.cardHeader}>
                <Image source={require('../../../assets/images/chapchap_logo.png')} style={styles.Image} />
                <View style={{ marginLeft: 50, marginTop: 40 }}>
                    <Feather name="menu" size={35} color="#1D8585" />
                </View>
            </View>
            <ScrollView style={{ marginTop: 10, marginBottom: 50 }}>
                <View style={{ width: '100%', marginTop: 10 }}>
                    <Image source={require('../../../assets/images/pexels-pixabay-271624.jpg')} style={{ ...styles.imagePrincipal }} />
                </View>
                <View style={styles.cardPrincipal}>
                    <Text style={styles.text}>Catégories de service</Text>
                    <View style={styles.container}>
                        <View>
                            <Image source={require('../../../assets/images/front-view-packed-food-prepared-takeaway.jpg')} style={{ ...styles.imageContainer, marginRight: 10 }} />
                            <View style={styles.icon}>
                                <Image source={require('../../../assets/images/fireworks-on-event-day-reminder-calendar-page-of-interface-svgrepo-com.png')} style={styles.imageIcon} />
                            </View>
                            <View style={styles.Txt}>
                                <Text style={styles.DisplayText}>Achats de produits</Text>
                            </View>
                        </View>
                        <View>
                            <Image source={require('../../../assets/images/front-view-packed-food-prepared-takeaway.jpg')} style={styles.imageContainer} />
                            <View style={styles.icon}>
                                <Image source={require('../../../assets/images/food-svgrepo-com.png')} style={styles.imageIcon} />
                            </View>
                            <View style={styles.Txt}>
                                <Text style={styles.DisplayText}>Restauration</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View>
                            <Image source={require('../../../assets/images/zane-persaud-gOCpvLq2OzY-unsplash.jpg')} style={{ ...styles.imageContainer, marginRight: 10 }} />
                            <View style={styles.icon}>
                                <Image source={require('../../../assets/images/fireworks-on-event-day-reminder-calendar-page-of-interface-svgrepo-com.png')} style={styles.imageIcon} />
                            </View>
                            <View style={styles.Txt}>
                                <Text style={styles.DisplayText}>Evénement</Text>
                            </View>
                        </View>
                        <View>
                            <Image source={require('../../../assets/images/pexels-emmanuel-ikwuegbu-8005397.jpg')} style={styles.imageContainer} />
                            <View style={styles.icon}>
                                <Image source={require('../../../assets/images/plumber-svgrepo-com.png')} style={styles.imageIcon} />
                            </View>
                            <View style={styles.Txt}>
                                <Text style={styles.DisplayText}>Service à la personne</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <View>
                            <Image source={require('../../../assets/images/pexels-pixabay-271624.jpg')} style={{ ...styles.imageContainer, marginRight: 10 }} />
                            <View style={styles.icon}>
                                <Image source={require('../../../assets/images/hotel-svgrepo-com.png')} style={styles.imageIcon} />
                            </View>
                            <View style={styles.Txt}>
                                <Text style={styles.DisplayText}>Hotel</Text>
                            </View>
                        </View>
                        <View>
                            <Image source={require('../../../assets/images/sms222.jpg')} style={styles.imageContainer} />
                            <View style={styles.icon}>
                                <Image source={require('../../../assets/images/marketing-mail-svgrepo-com.png')} style={styles.imageIcon} />
                            </View>
                            <View style={styles.Txt}>
                                <Text style={styles.DisplayText} numberOfLines={2}>Publicité et Campagne</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}
const styles = StyleSheet.create({
    cardPrincipal: {
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 8,
        borderWidth: 2,
        borderColor: '#fff',
        marginTop: 20,
        marginBottom: 150
    },
    cardHeader: {
        marginHorizontal: 140,
        flexDirection: "row",
        justifyContent: "space-between",
        alignContent: "center",
        alignItems: "center"
    },
    text: {
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 20,
        textAlign: 'center'
    },
    Image: {
        alignSelf: 'center',
        marginTop: 40
    },
    imageContainer: {
        width: 130,
        height: 130,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        marginHorizontal: 20,
        opacity: 0.5,
    },
    imageIcon: {
        width: 30,
        height: 30,
    },
    imagePrincipal:
    {
        width: '80%',
        height: 100,
        alignSelf: 'center',
        borderRadius: 10
    },
    icon: {
        width: 50,
        position: 'absolute',
        left: 30,
        bottom: 90,
        height: 50,
        backgroundColor: '#fff',
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    DisplayText: {
        maxWidth: 115,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 11,
    },
    Txt: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center"
    }

})