import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import {OnboardingStackParams} from "./OnboardingStackParams";
import BrandScreen from "./Screens/BrandScreen";
import GenderScreen from './Screens/GenderScreen';
import PriceRangeScreen from "./Screens/PriceRangeScreen";
import LastOnboardingScreen from "./Screens/LastOnboardingScreen";

const OnboardingStack = createStackNavigator<OnboardingStackParams>()

const Onboarding: React.FC = () => (
    <OnboardingStack.Navigator
        screenOptions={{
            headerShown: false,
            gestureEnabled: false,
        }}>
        <OnboardingStack.Screen name="GenderScreen" component={GenderScreen} />
        <OnboardingStack.Screen name="BrandScreen" component={BrandScreen} />
        <OnboardingStack.Screen name="PriceRangeScreen" component={PriceRangeScreen} />
        <OnboardingStack.Screen name="LastOnboardingScreen" component={LastOnboardingScreen} />
    </OnboardingStack.Navigator>
)

export default Onboarding
