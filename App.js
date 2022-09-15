import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/Home/HomeScreen';

export default function App() {
  return (
    <View >
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <HomeScreen/>
      <StatusBar style="auto" />
    </View>
  );
}

