import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/welcome/LoginScreen';
import AppContainer from './src/AppContainer';
import { Provider } from 'react-redux';
import {store} from './src/store'
import AchatProduitsScreens from './src/screens/e-commerce/AchatProduitsScreens';
import CommandeEmiseScreen from './src/screens/e-commerce/CommandeEmiseScreen';
import Carousel from './src/screens/homeDrawer/carousel';
import HomeScreen from './src/screens/home/HomeScreen';

export default function App() {
  return (
    <Provider store={store}>
    <HomeScreen/>
    {/* // <AppContainer/> */}
    </Provider>

  )
}
