import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import HomeScreen from "./Screens/HomeScreen";
import {HomeStackParams} from "./HomeStackParams";
import MyProfile from "./Screens/MyProfile";
import FavoriteScreen from './Screens/FavoriteScreen';
import SearchScreen from './Screens/SearchScreen';
import SettingScreen from './Screens/SettingScreen';

const HomeStack = createStackNavigator<HomeStackParams>()

const Home: React.FC = () => (
    <HomeStack.Navigator
        screenOptions={{
            headerShown: false,
            gestureEnabled: false,
        }}>
        <HomeStack.Screen name="HomeScreen" component={HomeScreen}/>
        <HomeStack.Screen name="MyProfile" component={MyProfile} />
        <HomeStack.Screen name="FavoriteScreen" component={FavoriteScreen} />
        <HomeStack.Screen name="SearchScreen" component={SearchScreen} />
        <HomeStack.Screen name="SettingScreen" component={SettingScreen} />
    </HomeStack.Navigator>
)

export default Home
