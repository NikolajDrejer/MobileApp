import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import {useDispatch, useSelector} from 'react-redux';


import {OnboardingStackParams} from "../OnboardingStackParams";
import {GenericText} from "../../../components/atoms/GenericText";
import {fontSize} from "../../../globals/fonts";
import MainContainer from "../../../components/atoms/MainContainer";
import {BigSpacer, SmallMargin} from "../../../components/atoms/Margin";
import SkipScreen from "../../../components/atoms/SkipScreen";
import FlexContainer from "../../../components/atoms/FlexContainer";
import {NextScreenButton} from "../../../components/molecules/NextScreenButton";
import {BackArrow} from "../../../components/molecules/BackArrow";
import { Background } from '../../../components/atoms/Background';
import {setOnboarding} from '../../../features/user'
import { ConnectedRange } from '../../../components/molecules/priceRange';
import { InstantSearch } from 'react-instantsearch-native';
import { searchClient, indexName } from '../../../config';

type ScreenRouteProp = RouteProp<OnboardingStackParams, 'BrandScreen'>
type ScreenNavigationProp = StackNavigationProp<OnboardingStackParams, 'BrandScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}



const PriceRangeScreen: React.FC<Props> = ({navigation}) => {
    const dispatch = useDispatch();
    const userSearch = useSelector((state: any) => state.user.value.searchState)
    const onPress = () => {
        dispatch(setOnboarding(true))
        navigation.push("LastOnboardingScreen")
    }

    return (
        <InstantSearch searchClient={searchClient} indexName={indexName} searchState={userSearch}  >
        <Background />
        <MainContainer centerVert={true}>
            <SmallMargin />
            <BackArrow align='flex-start' onPress={() => navigation.goBack()} />
            <SmallMargin/>
            <GenericText size={fontSize.m}>Hvor meget skal det koste?</GenericText>
            <BigSpacer/>
            <GenericText size={fontSize.xs}>Prisklasse</GenericText>
            <ConnectedRange attribute="nypris" />
            <FlexContainer>
            </FlexContainer>
            <SkipScreen onPress={() => navigation.push("LastOnboardingScreen")}/>
            <NextScreenButton disabled={false} text="Næste" onPress={onPress} />
        </MainContainer>
        </InstantSearch>
    )
}
export default PriceRangeScreen
