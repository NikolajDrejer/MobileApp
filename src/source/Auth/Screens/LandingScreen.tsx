import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import {AuthStackParams} from "../AuthStackParams";
import { GenericText } from '../../../components/atoms/GenericText';
import { fontSize } from '../../../globals/fonts';
import MainContainer from "../../../components/atoms/MainContainer";
import Logo from '../../../../assets/Logo.svg';
import { SmallMargin } from '../../../components/atoms/Margin';
import { AuthButton } from '../../../components/atoms/AuthInput';
import { Link } from '../../../components/molecules/Link';
import { Background } from '../../../components/atoms/Background';
import { colors } from '../../../globals/colors';
import FlexContainer from '../../../components/atoms/FlexContainer';

type ScreenRouteProp = RouteProp<AuthStackParams, 'LandingScreen'>
type ScreenNavigationProp = StackNavigationProp<AuthStackParams, 'LandingScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const LandingScreen: React.FC<Props> = ({navigation}) => {
    return (
        <>
        <Background background='image2'/>
        <MainContainer centerHor={true}>
            <SmallMargin />
            <Logo height="34%"/>
      
            <AuthButton backColor={colors.mainBlack} onPress={() => navigation.navigate('Onboarding', {screen: 'GenderScreen'})}>
                <GenericText size={fontSize.s} color={colors.mainWhite}>Lad os begynde!</GenericText>
            </AuthButton>
                
            <FlexContainer justifyContent="center">
                <Link text="Har du allerede en bruger?" onPress={() => navigation.navigate('Auth', {screen: 'LoginScreen'})} />
            </FlexContainer>                
        </MainContainer>
        </>
    )
}
export default LandingScreen
