import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import {AuthStackParams} from "./AuthStackParams";
import ConfirmEmailScreen from './Screens/ConfirmEmailScreen';
import ForgotPassScreen from './Screens/ForgotPassScreen';
import LoginScreen from './Screens/LoginScreen';
import SignupScreen from './Screens/SignupScreen';
import LandingScreen from "./Screens/LandingScreen"

const AuthStack = createStackNavigator<AuthStackParams>()

const Authen: React.FC = () => (
    <AuthStack.Navigator
        screenOptions={{
            headerShown: false,
            gestureEnabled: false,
        }}>
        <AuthStack.Screen name="LandingScreen" component={LandingScreen} />
        <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
        <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
        <AuthStack.Screen name="ForgotPassScreen" component={ForgotPassScreen} />
        <AuthStack.Screen name="ConfirmEmailScreen" component={ConfirmEmailScreen} />
    </AuthStack.Navigator>
)

export default Authen
