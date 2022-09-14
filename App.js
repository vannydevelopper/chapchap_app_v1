import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/screens/welcome/LoginScreen';

export default function App() {
  return (
    <View >
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <LoginScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

