import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/welcome/LoginScreen';
import AppContainer from './src/AppContainer';
import { Provider } from 'react-redux';
import { store } from './src/store'
import AchatProduitsScreens from './src/screens/e-commerce/AchatProduitsScreens';
import ServicePersonneScreen from './src/screens/e-commerce/ServicePersonneScreen';
import { Host } from 'react-native-portalize';
import CommandeEmiseScreen from './src/screens/e-commerce/CommandeEmiseScreen';
import MenuDetailScreen from './src/screens/restaurant/MenuDetailScreen';
import RestaurantHomeScreen from './src/screens/restaurant/RestaurantHomeScreen';
import PanierScreen from './src/screens/restaurant/PanierScreen';
import OnBoardingScreen from './src/screens/welcome/OnBoardingScreen';


export default function App() {
          return (
                    <Provider store={store}>
                              <Host>
                                        <AppContainer />
                              </Host>
                    </Provider>
          )
}
