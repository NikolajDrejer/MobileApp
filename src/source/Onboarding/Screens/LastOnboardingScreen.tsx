import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import {useSelector} from 'react-redux';

import {OnboardingStackParams} from "../OnboardingStackParams";
import {GenericText} from "../../../components/atoms/GenericText";
import {fontFamily, fontSize} from "../../../globals/fonts";
import MainContainer from "../../../components/atoms/MainContainer";
import {BigMargin, MidMargin, MiniMargin, SmallMargin} from "../../../components/atoms/Margin";
import Logo from '../../../../assets/Logo.svg';
import { Background } from '../../../components/atoms/Background';
import { AuthButton } from '../../../components/atoms/AuthInput';
import FlexContainer from '../../../components/atoms/FlexContainer';
import { Link } from '../../../components/molecules/Link';
import { colors } from '../../../globals/colors';

type ScreenRouteProp = RouteProp<OnboardingStackParams, 'LastOnboardingScreen'>
type ScreenNavigationProp = StackNavigationProp<OnboardingStackParams, 'LastOnboardingScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const LastOnboardingScreen: React.FC<Props> = ({navigation}) => {
    const user = useSelector((state: any) => state.user.value)
    const onPress = async () => {
        navigation.navigate('Home', {screen: "HomeScreen"})
    }

    return (
        <>
        <Background />
        <MainContainer>
            <MidMargin />
            <Logo height="30%"/>
            <SmallMargin/>
            <GenericText font={fontFamily.regular} size={fontSize.l}>Du har en god stil!</GenericText>
            <MiniMargin/>
            <GenericText font={fontFamily.light}  size={fontSize.m}>Vi har nu en udsalg klar  til dig. God fornøjelse!</GenericText>
            <BigMargin/>
            {user?.id === "guest" && 
            <>
                <AuthButton backColor={colors.mainBlack} onPress={() => navigation.navigate('Auth', {screen: 'SignupScreen'})}>
                    <GenericText size={fontSize.s} color={colors.mainWhite}>Fortsæt med email</GenericText>
                </AuthButton>
                <SmallMargin/>
                <FlexContainer justifyContent="center">
                    <Link text="Fortsæt som gæst" onPress={() => onPress()} />
                </FlexContainer> 
            </>
            }
            {user?.id != "guest" && 
            <>
                <AuthButton backColor={colors.mainBlack} onPress={() => onPress()}>
                    <GenericText size={fontSize.s} color={colors.mainWhite}>Gå til dine tilbud</GenericText>
                </AuthButton>
            </>
            }
            
        </MainContainer>
        </>
    )
}
export default LastOnboardingScreen
