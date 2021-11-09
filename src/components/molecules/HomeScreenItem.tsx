import * as React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../globals/colors'
import { GenericText } from '../atoms/GenericText'
import { fontSize } from '../../globals/fonts'
import {Image, TouchableOpacity, View} from "react-native";
import FlexContainer from "../atoms/FlexContainer";
import {SmallMargin} from "../atoms/Margin";
import HeartIcon from "../../../assets/Heart.svg"
import {useCognito} from "../../utils/hooks";
import * as Linking from 'expo-linking';
import { useDispatch, useSelector } from 'react-redux'
import { setFavorites } from '../../features/user'
type Props = {
    item?: any
    setGuestUserModel?: any
    guestUserModel?: any
    signedIn?: boolean
}

const MainContainer = styled.View`
    height:200px
    width:47%
    margin-bottom:2%  
`

const ItemContainer = styled.TouchableOpacity`
    height:57%
    justify-content:center
    align-items:center
    background-color:${colors.mainWhite}
`

const FavouriteButton = styled.TouchableOpacity`
    right:5px
    align-items:flex-end
    justify-content:center
`

export const HomeScreenItem: React.FC<Props> = ({item, setGuestUserModel, guestUserModel,signedIn}) => {
    const favorites = useSelector((state: any) => state.user.value.favorites)
    const dispatch = useDispatch();
    let newSelection = []

    const onPress = (item: any) => {
       // if(signedIn){
    if(favorites === undefined){
            dispatch(setFavorites(item))
        }
      if(!favorites?.includes(item)){
        newSelection = [item, ...favorites]
        dispatch(setFavorites(newSelection))
      } else {
          newSelection = favorites.filter((i: any) => i !== item)
          dispatch(setFavorites(newSelection))
      }
      console.log(favorites)
    } //else {
    //    setGuestUserModel(!guestUserModel)
  //  }
   // }
    
    return (
        <MainContainer>
            <SmallMargin/>
            <ItemContainer onPress={() => (Linking.openURL(item.vareurl))}>
                <Image source={{uri: item.billedurl}} style={{ width: '100%', height: '100%', resizeMode:'contain'}} />
            </ItemContainer>
            <GenericText textAlign={'left'} size={'12px'}>{item.produktnavn}</GenericText>
            <GenericText textAlign={'left'} size={fontSize.s}>{item.glpris}</GenericText>
            <FlexContainer>
                <GenericText color={colors.red} textAlign={'left'} size={fontSize.s}>{item.nypris}</GenericText>
                <View style={{marginLeft:'auto', width: 100, alignContent: 'flex-end'}}>
                    <FavouriteButton onPress={() => onPress(item)}>
                        { (favorites?.includes(item)) ?
                            <HeartIcon width="20" height="20" fill={colors.red}/>:
                            <HeartIcon width="20" height="20" fill="#000"/>
                        }
                    </FavouriteButton>
                </View>
            </FlexContainer>
        </MainContainer>
    )
}
