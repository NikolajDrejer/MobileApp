import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import {HomeStackParams} from "../HomeStackParams";
import MainContainer from "../../../components/atoms/MainContainer";
import { GenericText } from '../../../components/atoms/GenericText';
import { fontSize } from '../../../globals/fonts';
import { MidMargin, MiniMargin, SmallMargin, HorMargin, MidSmallMargin } from '../../../components/atoms/Margin';
import { BackArrow } from '../../../components/molecules/BackArrow';
import { ConnectedSearchBox } from '../../../components/molecules/SearchBar';
import { colors } from '../../../globals/colors';
import {useState} from "react";
import FlexContainer from "../../../components/atoms/FlexContainer";
import {View} from "react-native";
import { Background } from '../../../components/atoms/Background';
import SearchList from '../../../components/organisms/SearchList';
import { InstantSearch } from 'react-instantsearch-native';
import { searchClient, indexName } from '../../../config';
import { useSelector } from 'react-redux';

type ScreenRouteProp = RouteProp<HomeStackParams, 'SearchScreen'>
type ScreenNavigationProp = StackNavigationProp<HomeStackParams, 'SearchScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const SearchScreen: React.FC<Props> = ({navigation}) => {
    const [data, setData] = useState([{id: 0, name: 'Sneakers'},{id: 1, name: 'Tommy Hilfiger Trøje'},{id: 2, name: 'Fila'}])
    const userSearch = useSelector((state: any) => state.user.value.searchState)
    return (
        <InstantSearch searchClient={searchClient} indexName={indexName} >
        <Background background="image3" />
        <MainContainer centerVert={false}>
            <SmallMargin />
            <FlexContainer>
                <BackArrow align="flex-start" onPress={() => navigation.goBack()}/>
                <FlexContainer width="85%">
                <ConnectedSearchBox />
                </FlexContainer>
            </FlexContainer>

            <MiniMargin />
            <FlexContainer justifyContent={'flex-start'}>
                <GenericText fontWeight={700} size={fontSize.xs} color={colors.mainGray} >Søgehistorik</GenericText>
            </FlexContainer>

            <MiniMargin />
            <SearchList />
           
        </MainContainer>
        </InstantSearch>
    )
}

export default SearchScreen
