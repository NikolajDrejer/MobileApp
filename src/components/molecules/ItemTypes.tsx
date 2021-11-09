import * as React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../globals/colors'
import { GenericText } from '../atoms/GenericText'
import { fontSize } from '../../globals/fonts'
import { FlatList, Image, View } from "react-native";
import {Shadow} from "../atoms/Shaddow";
import FlexContainer from "../atoms/FlexContainer";
import { useDispatch, useSelector} from 'react-redux'
import { setCategories } from '../../features/user'
import {TouchableOpacity} from 'react-native-gesture-handler'


const ButtonContainer = styled(Shadow)<{pressed?:boolean}>`
    width:98%
    height:60px
    align-self: center;
    justify-content:center
    align-items:center
    shadowColor: ${colors.mainGray};
    shadowOpacity: 0.2
    border-radius:25px
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



const ItemType = () => {
    const dispatch = useDispatch()
    const data = useSelector((state: any) => state.algolia.value.categories)
    const selected = useSelector((state: any) => state.user.value.searchState.refinementList.kategorinavn)
    let newSelection = []

    const onPress = (item: any) => {
       if (selected === undefined){
            newSelection = [item]
            dispatch(setCategories(newSelection))           
        }
        if (!selected?.includes(item)) {            
            newSelection = [item, ...selected]
           dispatch(setCategories(newSelection))        
        } else {
            newSelection = selected.filter((i) => i !== item)
           dispatch(setCategories(newSelection))
        }
    }
    
    return (
    <>
    <FlatList         
            style={{}}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={data}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View />}
            renderItem={(props) => (
                <TouchableOpacity onPress={() => onPress(props.item)}>
                <ButtonContainer pressed={selected?.includes(props.item)}  >
                    <FlexContainer width={'85%'}>
                    <GenericText textAlign={'left'} size={fontSize.m}>{props.item}</GenericText>
       
                    </FlexContainer>
                    { selected?.includes(props.item) &&
                    <CheckContainer>
                        <Image  source={require('../../../assets/checkMark.png')} style={{ width: '50%', height: '50%', resizeMode:'contain'}} />
                    </CheckContainer>
                    }
                </ButtonContainer>
                <View style={{height: '1%'}} />
            </TouchableOpacity>
                    
            )}    
        />
        
       
    </> 
    )    
}

export default ItemType;