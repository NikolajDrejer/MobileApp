import * as React from 'react'
import styled from 'styled-components/native'
import {useDispatch, useSelector} from 'react-redux';
import {Image, View} from "react-native";
import { brands } from '../../globals/brands';
import { colors } from '../../globals/colors'
import {Shadow} from "../atoms/Shaddow";
import { BrandType } from '../../utils/types'
import {setBrands} from '../../features/user'
import { RootState } from '../../features/store';
import {useEffect, useState} from "react";
import {GenericText} from "../atoms/GenericText";
import {fontSize} from "../../globals/fonts";
import {BigMargin, BigSpacer, MidMargin} from "../atoms/Margin";

type Props = {
    searchInput:string
}
const ButtonContainer = styled(Shadow)<{pressed?:boolean}>`
    width:45%
    height:115px
    justify-content:center
    align-items:center
    border-radius:10px
    margin:2%
    background:${(props) => props.pressed ? colors.mainWhite : colors.whiteGray}
`

const CheckContainer = styled.View`
    top:2px
    align-self:flex-end
    position:absolute
    width:20px
    height:20px
    border-radius:10px
    justify-content:center
    align-items:center
    background:${colors.mainBlack}
`
export const OnboardBrand : React.FC<Props> = ({searchInput }) => {

    const user = useSelector<RootState, string[]>((state) => state.user.value.searchState.refinementList.brand)
    const dispatch = useDispatch();
    const [brandShow, setBrandShow] = useState<BrandType[]>(brands);
    const [noBrand, setNoBrand] = useState<boolean>(false);

    const toggleSelection = async (item: string) => {
        let newSelection: string[]

        if(user === undefined){
            dispatch(setBrands(item))
        }
        if (!user.includes(item)) {
            newSelection = [...user, item]
            dispatch(setBrands(newSelection))
        } else {
            newSelection = user.filter((i) => i !== item)
            dispatch(setBrands(newSelection))
        }
    }

    useEffect(() => {
       const showBrand = () => {
           setNoBrand(false)
           if(searchInput.length == 0 || searchInput == undefined){
               return setBrandShow(brands)
           }
           else{
                   setBrandShow([])
                   let brandArray: any
                   brands.forEach((item => {
                       if (item.name === searchInput) {
                           brandArray = [item]
                       }
                   }))
                   if(brandArray)
                   return setBrandShow(brandArray)
                   else{
                       setNoBrand(true)
                   }
           }
       }
    showBrand()
    },[searchInput])


    return (
        <>
            <View style={{ height:'100%', width:'100%', flexWrap:'wrap', flexDirection:'row', borderColor:'black'}}>
                {brandShow && brandShow.map((brand) => {
                    return (
                        <ButtonContainer onPress={() => toggleSelection(brand.id)} key={brand.id}>
                            <Image source={{uri: brand.logo}} style={{width:'100%', height:'100%', resizeMode: 'contain', overflow:'hidden'}} />
                            { user?.includes(brand.id) &&
                                <CheckContainer>
                                    <Image source={require('../../../assets/checkMark.png')} style={{ width: '50%', height: '50%', resizeMode:'contain'}} />
                                </CheckContainer>}
                        </ButtonContainer>
                    )
                })}
                {noBrand &&
                <GenericText textAlign={'center'} size={fontSize.m}>Dette mærke er desværre ikke tilgængeligt</GenericText>
                }
            </View>
            <BigMargin/>
        </> 
    )
}
