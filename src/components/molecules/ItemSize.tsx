import * as React from 'react'
import styled from 'styled-components/native'
import {useDispatch, useSelector} from 'react-redux';
import {FlatList, Image, View} from "react-native";

import { colors } from '../../globals/colors'
import { GenericText } from '../atoms/GenericText'
import { fontSize } from '../../globals/fonts'
import {Shadow} from "../atoms/Shaddow";
import { setSizes } from '../../features/user';
import {Sizes} from "../../utils/types";

type Props = {
    notLoggedIn?: () => void
    userData?: string[]
    text?: string
    categoryName: string
    categoryArray?: string[]
    fullSize?: Sizes

}
const ButtonContainer = styled(Shadow)<{pressed?:boolean}>`
    width:50px
    height:50px
    margin-right: 15px
    border-radius:30px
    justify-content:center
    align-items:center
    background:${(props) => props.pressed ? colors.mainWhite : colors.whiteGray}
`
const CheckContainer = styled.View`
    top:40px
    align-self:flex-end
    position:absolute
    width:20px
    height:20px
    border-radius:10px
    justify-content:center
    align-items:center
    background:${colors.mainBlack}
`

export const ItemSize: React.FC<Props> = ({ text, userData, fullSize,categoryArray, categoryName }) => {
    const dispatch = useDispatch();

    const toggleSelection = (item: string) => {

        if (userData === undefined){
            userData = [item]
            dispatch(setSizes({...fullSize, [categoryName]:userData}))
            return
        }

        if (!userData?.includes(item)) {
           userData = [item, ...userData]
            dispatch(setSizes({...fullSize, [categoryName]:userData}))
            return
        } else {
           userData = userData.filter((i) => i !== item)
            dispatch(setSizes({...fullSize, [categoryName]:userData}))
           return
        }
    }
        
    return (
        <>
            {text && <GenericText style={{marginLeft: '5%'}} size={fontSize.xxs} textAlign={'left'}>{text}</GenericText>}
            <FlatList
                style={{height:75,paddingTop:'2%', paddingLeft:'5%'}}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={categoryArray}
                keyExtractor={item => item}
                renderItem={(props:any) => (
                    <>
                        <ButtonContainer pressed={userData?.includes(props.item)} onPress={() => toggleSelection(props.item)}>
                            <GenericText fontWeight={300} size={fontSize.s}>{props.item}</GenericText>
                            { userData?.includes(props.item) === true &&
                            <CheckContainer>
                                <Image source={require('../../../assets/checkMark.png')} style={{ width: '50%', height: '50%', resizeMode:'contain'}} />
                            </CheckContainer>
                            }
                        </ButtonContainer>
                    </>
                )}
            />
        </>
    )
}
