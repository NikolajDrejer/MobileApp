import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import {Keyboard, TouchableWithoutFeedback} from 'react-native'

import { LoginComponent } from '../../../components/organisms/LoginComponent';
import {AuthStackParams} from "../AuthStackParams";
import { GenericText } from '../../../components/atoms/GenericText';
import { fontSize } from '../../../globals/fonts';
import MainContainer from "../../../components/atoms/MainContainer";
import Logo from '../../../../assets/Logo.svg';
import { MiniMargin, SmallMargin } from '../../../components/atoms/Margin';
import { ForgotCredLink } from '../../../components/atoms/AuthInput';
import { Link } from '../../../components/molecules/Link';
import { Background } from '../../../components/atoms/Background';
import FlexContainer from '../../../components/atoms/FlexContainer';
import KeyboardAvoid from '../../../components/atoms/KeyboardAvoid';

type ScreenRouteProp = RouteProp<AuthStackParams, 'LoginScreen'>
type ScreenNavigationProp = StackNavigationProp<AuthStackParams, 'LoginScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const LoginScreen: React.FC<Props> = ({navigation, route}) => {


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <KeyboardAvoid>
            <Background background='image2'/>
            <MainContainer centerHor={true}>
                <SmallMargin />
                <Logo height="34%"/>
                <SmallMargin />
                <>
                    <GenericText size={fontSize.m}>Velkommen tilbage</GenericText>
                    <MiniMargin/>
                    <LoginComponent>
                        <ForgotCredLink>
                            <GenericText size={fontSize.xs} onPress={() => navigation.navigate("ForgotPassScreen")}>Glemt Kode?</GenericText>
                        </ForgotCredLink>
                    </LoginComponent>
                    <MiniMargin />
                    <FlexContainer justifyContent="center">
                        <Link text="Fortsæt som gæst" onPress={() => navigation.navigate('Onboarding', {screen: 'GenderScreen'})} />
                    </FlexContainer> 
                </>
            </MainContainer>

            </KeyboardAvoid>
            
            
            
            

        </TouchableWithoutFeedback>
    )
}

export default LoginScreen
