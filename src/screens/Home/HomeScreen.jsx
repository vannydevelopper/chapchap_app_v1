import React, { useCallback, useState } from "react";
import {
    Text, StyleSheet, View, ScrollView, ImageBackground, Dimensions,
    Image
} from "react-native";
import { Feather } from '@expo/vector-icons';
import ViewSlider from 'react-native-view-slider'

const { width, height } = Dimensions.get('window');
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
               <View>
                <ViewSlider
                    renderSlides={
                        <>
                            <View style={styles.viewBox}>
                                <Image source={require('../../../assets/images/pexels-pixabay-271624.jpg')} style={{ ...styles.imagePrincipal }} />
                            </View>
                            <View style={styles.viewBox}>
                                <Image source={require('../../../assets/images/zane-persaud-gOCpvLq2OzY-unsplash.jpg')} style={{ ...styles.imagePrincipal }} />
                            </View>
                            <View style={styles.viewBox}>
                                <Image source={require('../../../assets/images/pexels-emmanuel-ikwuegbu-8005397.jpg')} style={styles.imagePrincipal} />
                            </View>
                            <View style={styles.viewBox}>
                                <Image source={require('../../../assets/images/front-view-packed-food-prepared-takeaway.jpg')} style={styles.imagePrincipal} />
                            </View>
                        </>
                    }
                    style={styles.slider}     //Main slider container style
                    height={240}    //Height of your slider
                    slideCount={4}    //How many views you are adding to slide
                    dots={true}     // Pagination dots visibility true for visibile 
                    dotActiveColor='#399595'     //Pagination dot active color
                    dotInactiveColor='#D2E9E9'    // Pagination do inactive color
                    dotsContainerStyle={styles.dotContainer}     // Container style of the pagination dots
                    autoSlide={true}    //The views will slide automatically
                    slideInterval={2000}    //In Miliseconds
                />
                </View>
<View>
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
        marginTop: 0,
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
        width: '90%',
        height: 150,
        alignSelf: 'center',
        borderRadius: 10,
        marginTop:70
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
    },
    viewBox: {
        paddingHorizontal: 20,
        justifyContent: 'center',
        width: width,
        padding: 10,
        alignItems: 'center',
        height: 150
    },
    slider: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'pink'
    },
    dotContainer: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 15
    }

})