/* import * as React from 'react'



import {useDispatch, useSelector} from 'react-redux';



import algoliasearch from 'algoliasearch/lite';

import {
    InstantSearch,
    connectCurrentRefinements,
    connectMenu,
    connectRange,
    connectRefinementList,
    connectSearchBox,
    connectInfiniteHits,
  } from 'react-instantsearch-native';
import { setSearchState } from '../../features/user';

import { FlatList, TextInput, View } from 'react-native';
import SearchBar from '../molecules/SearchBar';
import styled from 'styled-components/native';
import Spinner from '../molecules/Spinner';
import PropTypes from 'prop-types';
import { HomeScreenItem } from '../molecules/HomeScreenItem';
import ItemList from './ItemList';
import BrandList from './BrandList';

const searchClient = algoliasearch('8FLVK3VW2R', 'a2c00309ca830ef3e6ab3cd4534c9772');


type FilterProps = {
  currentStack?: any
}


export const Filter: React.FC<FilterProps> = ({children, currentStack}) => {
    const userSearch = useSelector((state: any) => state.user.value.searchState)
    const dispatch = useDispatch();
    const onSearchStateChange = (nextState: any) => {
      const searchState = { ...userSearch, ...nextState };
      dispatch(setSearchState(searchState))
      
    }

    const StackSelect = (currentStack: any) => {
      switch(currentStack){
        case 0:
          return (<ItemList/>)
        // code block
        break;
      case 1:
        return (<View/>)
        // code block
        break;
      default:
        return (<View/>)
        // code block
      }
      

    }
    return ( 
        <>
          <BrandList attribute="brand"/>
          <BrandList attribute="kategorinavn" />
          <ItemList />

       </>
    )
}



























const SearchBoxContainer = styled.View`
    backgroundColor: #162331
    flexDirection: row
    alignItems: center
`
const SearchInput = styled.TextInput`
    backgroundColor: white
    height: 40
    borderWidth: 1
    padding: 10
    margin: 10
    flexGrow: 1
`
type SearchProps = {
    refine: any
    currentRefinement?: string
}
const SearchBox: React.FC<SearchProps> = ({refine, currentRefinement}) => {
    const userSearch = useSelector((state: any) => state.user.value.searchState)
    const dispatch = useDispatch();

    return (
        <SearchBoxContainer>
          <Spinner />
          <SearchInput
            onChangeText={text => refine(text)}
            value={currentRefinement}
            placeholder={'Search a product...'}
            clearButtonMode={'always'}
            underlineColorAndroid={'white'}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize={'none'}
          />
        </SearchBoxContainer>
    )
}
const ConnectedSearchBox = connectSearchBox(SearchBox);