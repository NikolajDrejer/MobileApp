import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import {TextInput, View} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import {useSelector} from 'react-redux'

import {OnboardingStackParams} from "../OnboardingStackParams";
import {GenericText} from "../../../components/atoms/GenericText";
import {fontSize} from "../../../globals/fonts";
import { BigMargin, MidMargin, SmallMargin} from "../../../components/atoms/Margin";
import { ConnectedSearchBox } from "../../../components/molecules/SearchBar";
import {NextScreenButton} from "../../../components/molecules/NextScreenButton";
import {BackArrow} from "../../../components/molecules/BackArrow";
import { Background } from '../../../components/atoms/Background';
import { OnboardBrand } from '../../../components/molecules/OnboardBrand';
import { RootState } from '../../../features/store';
import {useState} from "react";
import Spinner from '../../../components/molecules/Spinner';
import BrandList from '../../../components/organisms/BrandList';
import { InstantSearch } from 'react-instantsearch-native';
import { indexName, searchClient } from '../../../config';

type ScreenRouteProp = RouteProp<OnboardingStackParams, 'BrandScreen'>
type ScreenNavigationProp = StackNavigationProp<OnboardingStackParams, 'BrandScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const BrandScreen: React.FC<Props> = ({navigation}) => {
    const user = useSelector<RootState, string[]>((state) => state.user.value.searchState.refinementList.brand)
    const minimumBrands = 2
    const userContext = useSelector((state: any) => state.user.value)
    const userSearch = useSelector((state: any) => state.user.value.searchState)
    return (
        <InstantSearch searchClient={searchClient} indexName={indexName} searchState={userSearch}  >
        <Background />
        <ScrollView style={{paddingRight: "7%", paddingLeft: "7%"}}>
        <SmallMargin />
            <BackArrow align="flex-start" onPress={() => navigation.goBack()} />

            <GenericText size={fontSize.m}>Vælg mindst 3 tøjmærker så vi kan vise dig flere tilbud</GenericText>
            <SmallMargin/>
            
            <ConnectedSearchBox defaultRefinement={userContext.searchState.box} />
            <SmallMargin/>
            
             <View >
                <BrandList attribute="brand" isOnboarding={false} searchable limit={1000} />
            </View>
            <BigMargin />
        </ScrollView>
        <NextScreenButton disabled={user?.length <= minimumBrands} text="Næste" disabledText="Vælg mindst 3 brands" width={"100%"} onPress={() => {navigation.push("PriceRangeScreen")}} />
        </InstantSearch>
    )
}

export default BrandScreen

