import * as React from 'react'
import styled from 'styled-components/native'
import {colors} from "../../globals/colors";
import {TouchableOpacity} from "react-native";
import FlexContainer from "../atoms/FlexContainer";
import SearchIcon from "../../../assets/Search.svg";
import {useState} from "react";
import {AuthTextInput} from "../atoms/AuthInput";
import PropTypes from 'prop-types';
import { connectSearchBox } from 'react-instantsearch-native';
import { useDispatch, useSelector } from 'react-redux';
import { setBox } from '../../features/user';

const SearchBarContainer = styled.View`
   align-items:center;
   justify-content:center;
   background:${colors.mainWhite}
  border: 1px solid ${colors.grey}
   border-radius:12px;
   height:50px;
   width:100%
`

const SearchBarText = styled.TextInput`
    width:75%;
    height:90%
   margin-left:2%;
   background:${colors.mainWhite}
`

const SearchIconContainer = styled.TouchableOpacity`
   background:${colors.mainWhite}
   padding:4%
`
import { createConnector } from 'react-instantsearch-native';

const connectWithQuery = createConnector({
  displayName: 'WidgetWithQuery',
  getProvidedProps(props, searchState) {
    // Since the `attributeForMyQuery` searchState entry isn't
    // necessarily defined, we need to default its value.
    const currentRefinement = searchState.attributeForMyQuery || '';

    // Connect the underlying component with the `currentRefinement`
    return { currentRefinement };
  },
  refine(props, searchState, nextRefinement) {
    // When the underlying component calls its `refine` prop,
    // we update the searchState with the provided refinement.
    
    return {
      // `searchState` represents the search state of *all* widgets. We need to extend it
      // instead of replacing it, otherwise other widgets will lose their respective state.
      ...searchState,
      attributeForMyQuery: nextRefinement,
    };
  },
  getSearchParameters(searchParameters, props, searchState) {
    // When the `attributeForMyQuery` state entry changes, we update the query
    return searchParameters.setQuery(searchState.attributeForMyQuery || '');
  },
  cleanUp(props, searchState) {
    // When the widget is unmounted, we omit the entry `attributeForMyQuery`
    // from the `searchState`, then on the next request the query will
    // be empty
    const { attributeForMyQuery, ...nextSearchState } = searchState;

    return nextSearchState;
  },
});

type Props = {
  refine: any
  currentRefinement: string
}
const SearchBar: React.FC<Props> = ({ refine, currentRefinement }) => {
    const searchBox = useSelector((state: any) => state.user.value.searchState.box)
    const dispatch = useDispatch();
    const onChange = (item: string) => {
        refine(item)
        dispatch(setBox(item))
        console.log("Current ", item)
    }
    return(
        <SearchBarContainer>
            <FlexContainer>
                <SearchBarText
                    placeholder={'Search...'}
                    onChangeText={(text) => onChange(text)}
                    value={searchBox}
                    clearButtonMode={'always'}
                    underlineColorAndroid={'white'}
                    spellCheck={false}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                />
                <SearchIconContainer>
                    <SearchIcon height="20" width="20" fill={colors.mainBlack}/>
                </SearchIconContainer>
            </FlexContainer>
        </SearchBarContainer>
    )

    }

export const ConnectedSearchBox = connectSearchBox(SearchBar);