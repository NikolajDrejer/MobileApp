import * as React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../globals/colors'
import {FlatList, Image, View} from "react-native";
import {Shadow} from "../atoms/Shaddow";
import {updateUser, useCognito} from '../../utils/hooks';
import {useDispatch, useSelector} from 'react-redux';
import { setBrands } from '../../features/user';
import { GenericText } from '../atoms/GenericText';
import { fontSize } from '../../globals/fonts';

type Props = {
    notLoggedIn?: () => void
    onPress?: () => void
    pressed?:boolean
    image?: string
    setLoading?: any
    brands: any[]
    userBrands?: string[]
    onSelectionChange?(choices: string[]): void
}
const ButtonContainer = styled(Shadow)<{pressed?:boolean}>`
    width:60px
    height:70px
    margin-right:15px
    border-radius:30px
    justify-content:center
    align-items:center
    background:${(props) => props.pressed ? colors.mainWhite : colors.whiteGray}
`
const CheckContainer = styled.View`
    top:52px
    align-self:flex-end
    position:absolute
    width:20px
    height:20px
    border-radius:10px
    justify-content:center
    align-items:center
    background:${colors.mainBlack}
`

export const ItemBrand: React.FC<Props> = ({ brands, userBrands, notLoggedIn, onSelectionChange }) => {
    const dispatch = useDispatch();

    const [selectedValue, setSelectedValue] = React.useState<string[]>(userBrands || [])

    const toggleSelection = async (item: string) => {
        let newSelection: string[]
        if (!selectedValue.includes(item)) {
            newSelection = [...selectedValue, item]
            dispatch(setBrands(newSelection))
        } else {
            newSelection = selectedValue.filter((i) => i !== item)
            dispatch(setBrands(newSelection))
        }

        setSelectedValue(newSelection)
        if (onSelectionChange) {
            onSelectionChange(newSelection)
        }
    }

    return (
            <FlatList
                style={{height:80, paddingTop:'2%', paddingLeft:'5%'}}
                horizontal={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={brands}
                keyExtractor={item => item.item}
                ItemSeparatorComponent={() => <View style={{width:'0%'}}/>}
                renderItem={(props:any) => (
                    <ButtonContainer pressed={userBrands?.includes(props.item)} onPress={() => toggleSelection(props.item)}>
                        <GenericText size={fontSize.s}> {props.item} </GenericText>
                        <Image source={{uri: props.item}} style={{width:'90%', height:'90%', resizeMode: 'contain', overflow:'hidden'}} />
                        { userBrands?.includes(props.item) &&
                        <CheckContainer>
                            <Image source={require('../../../assets/checkMark.png')} style={{ width: '50%', height: '50%', resizeMode:'contain'}} />
                        </CheckContainer>
                        }
                    </ButtonContainer>
                    )}
            />
        )
}
