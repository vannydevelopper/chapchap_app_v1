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

export default function App() {
  return (
    <Provider store={store}>
      <Host>
        {/* <AchatProduitsScreens/> */}
        {/* <AppContainer/> */}
        <ServicePersonneScreen />
      </Host>
    </Provider>

  )
}
