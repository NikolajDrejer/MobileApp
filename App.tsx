import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import {Amplify, Auth, API} from 'aws-amplify'
import AppLoading from 'expo-app-loading';
import {Provider} from 'react-redux'
import Index from "./src/source";
import { useFonts, Lato_100Thin, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black } from '@expo-google-fonts/lato';
import config from './src/config'
import store from './src/features/store'
import {useDispatch, useSelector} from 'react-redux';




Amplify.configure(config)
Auth.configure(config)
API.configure(config)

export default function App() {
  const [fontsLoaded] = useFonts({ Lato_100Thin, Lato_300Light, Lato_400Regular, Lato_700Bold, Lato_900Black });
  if (!fontsLoaded) {
      return <AppLoading />;
  } else {
    return (
        <NavigationContainer>
          <Provider store={store}>
          <Index />
          </Provider>
        </NavigationContainer>
    ); 
  }
}
