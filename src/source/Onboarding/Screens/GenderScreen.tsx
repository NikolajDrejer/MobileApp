import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import {useSelector} from 'react-redux'

import BigHeader from '../../../components/atoms/BigHeader';
import { GenericText } from '../../../components/atoms/GenericText';
import { NextScreenButton } from '../../../components/molecules/NextScreenButton';
import {OnboardingStackParams} from "../OnboardingStackParams";
import { fontSize } from '../../../globals/fonts';
import MainContainer from "../../../components/atoms/MainContainer";
import GenderButtons from "../../../components/molecules/GenderButtons";
import {BigMargin } from '../../../components/atoms/Margin';
import FlexContainer from '../../../components/atoms/FlexContainer';
import { Background } from '../../../components/atoms/Background';




type ScreenRouteProp = RouteProp<OnboardingStackParams, 'GenderScreen'>
type ScreenNavigationProp = StackNavigationProp<OnboardingStackParams, 'GenderScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const GenderScreen: React.FC<Props> = ({navigation}) => {
    const user = useSelector((state: any) => state.user.value.searchState.refinementList.gender)

    const onPress = () => {
        navigation.push('BrandScreen')
    }

    return (
        <>
        <Background />
            <MainContainer centerVert={true} centerHor={true}>
                <FlexContainer justifyContent="center" direction="column">
                    <BigHeader>
                        <GenericText size={fontSize.xl}>Hvad er dit køn?</GenericText>
                    </BigHeader>
                    <BigMargin />
                    <GenderButtons  />
                </FlexContainer>
                <NextScreenButton disabled={!user} disabledText="Vælg køn" text="Næste" onPress={() => onPress()} />
            </MainContainer>
        </>
        
    )
}

export default GenderScreen
