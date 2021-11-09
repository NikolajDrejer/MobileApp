import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'

import {AuthStackParams} from "../AuthStackParams";
import MainContainer from "../../../components/atoms/MainContainer";
import { SignupComponent } from '../../../components/organisms/SignupComponent';
import { SmallMargin } from '../../../components/atoms/Margin';
import { Link } from '../../../components/molecules/Link';
import Logo from '../../../../assets/Logo.svg';
import { Background } from '../../../components/atoms/Background';
import FlexContainer from '../../../components/atoms/FlexContainer';
import {Keyboard, TouchableWithoutFeedback} from 'react-native';
import KeyboardAvoid from '../../../components/atoms/KeyboardAvoid';

type ScreenRouteProp = RouteProp<AuthStackParams, 'SignupScreen'>
type ScreenNavigationProp = StackNavigationProp<AuthStackParams, 'SignupScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const SignupScreen: React.FC<Props> = ({navigation}) => {
   
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <KeyboardAvoid>
                <Background background="image2" />
                <MainContainer centerHor={true}>
                    <SmallMargin />

                    <Logo height="28%"/>
                    <SmallMargin />
                    <SignupComponent />
                    <SmallMargin />
                    <FlexContainer justifyContent="center">
                        <Link text="Har du allerede en bruger?" onPress={() => navigation.navigate("LoginScreen")} />
                    </FlexContainer>
                </MainContainer>
            </KeyboardAvoid>
        </TouchableWithoutFeedback>
        
    )
}

export default SignupScreen
