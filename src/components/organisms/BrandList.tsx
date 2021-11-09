import React from 'react';
import styled from 'styled-components/native'
import { View, Text, FlatList, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connectRefinementList } from 'react-instantsearch-native';
import {Shadow} from "../atoms/Shaddow";
import { colors } from '../../globals/colors';
import { useDispatch,useSelector } from 'react-redux';
import { setBrands } from '../../features/user';


const ButtonContainer = styled(Shadow)<{pressed?:boolean, isOnboarding?:boolean}>`
    width:${(props) => props.isOnboarding ? '60px' : '45%' }
    height:${(props) => props.isOnboarding ? '70px' : '115px' }
    margin-right:${(props) => props.isOnboarding ? '15px' : '2%' }
    margin-left:${(props) => props.isOnboarding ? '0' : '2%' }
    margin-top:${(props) => props.isOnboarding ? '0' : '2%' }
    margin-bottom:${(props) => props.isOnboarding ? '0' : '2%' }
    border-radius:${(props) => props.isOnboarding ? '30px' : '10px' }
    justify-content:center
    align-items:center
    background:${(props) => props.pressed ? colors.mainWhite : colors.whiteGray}
`
const CheckContainer = styled.View<{isOnboarding?:boolean}>`
    top:${(props) => props.isOnboarding ? '52px' : '2px' }
    align-self:flex-end
    position:absolute
    width:20px
    height:20px
    border-radius:10px
    justify-content:center
    align-items:center
    background:${colors.mainBlack}
`


// @ts-ignore
const BrandList = ({ items, refine, isOnboarding }) => {
    const dispatch = useDispatch();
    const refinementList = useSelector((state: any) => state.user.value.searchState.refinementList.brand)
    const UpdateRefine = (item: any) => {
        let newSelection: string[]
        if(refinementList === undefined){
            dispatch(setBrands(item))
        }
        if (!refinementList.includes(item)) {
            newSelection = [...refinementList, item]
            dispatch(setBrands(item))
        } else {
            newSelection = refinementList.filter((i) => i !== item)
            dispatch(setBrands(newSelection))
        }
    }
    return (
    <FlatList
        horizontal={isOnboarding}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={items}
        keyExtractor={item => item.value.toString()}
        numColumns={isOnboarding ? 0 : 2}
        renderItem={(props:any) => (
            <ButtonContainer isOnboarding={isOnboarding} pressed={props.item.isRefined} onPress={() => UpdateRefine(props.item.value)}>
                <Text>{props.item.label}</Text>
                {/*  <Image source={{uri: props.item.logo}} style={{width:'90%', height:'90%', resizeMode: 'contain', overflow:'hidden'}} />*/}
                { props.item.isRefined &&
                <CheckContainer isOnboarding={isOnboarding}>
                    <Image source={require('../../../assets/checkMark.png')} style={{ width: '50%', height: '50%', resizeMode:'contain'}} />
                </CheckContainer>
                }
            </ButtonContainer>
        )}
    />
);
            }

const ItemPropType = PropTypes.shape({
  value: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.string.isRequired,
  isRefined: PropTypes.bool.isRequired,
});

BrandList.propTypes = {
  items: PropTypes.arrayOf(ItemPropType).isRequired,
  refine: PropTypes.func.isRequired,
  isOnboarding: PropTypes.bool.isRequired,
};


export default connectRefinementList(BrandList);