import * as React from 'react'
import styled from 'styled-components/native'
import {Image} from "react-native";
import {useSelector, useDispatch} from 'react-redux'

import { GenericText } from '../atoms/GenericText'
import WomanIcon from '../../../assets/WomanSilhouette.svg'
import ManIcon from '../../../assets/ManSilhouette.svg'
import { Shadow } from '../atoms/Shaddow'
import { colors } from '../../globals/colors'
import {fontFamily, fontSize } from '../../globals/fonts'
import {SmallMargin} from "../atoms/Margin";
import {setGender} from '../../features/user'

type Props = {
    myProfileGender?:boolean
}

const BtnContainer = styled(Shadow)<{genderSelect:boolean, myProfileGender?:boolean}>`
    width: 40%;
    height:  ${(props) => props.myProfileGender ? '140px' :'250px'}
    border-radius: 100px;
    background-color:${(props) => props.genderSelect ? colors.mainWhite : colors.whiteGray}
    justify-content:center;
    align-items: center;
`

const ImageContainer = styled.View<{myProfileGender?:boolean}>`
    width:${(props) => props.myProfileGender ? '65%' :'100%'}
    height: ${(props) => props.myProfileGender ? 160 :'50%'}
    paddingLeft:  ${(props) => props.myProfileGender ? '3%' :'0%'}
    display: flex
    flex-direction: row
    justify-content: ${(props) => props.myProfileGender ? 'space-around' :'space-around'}
    align-items: center;
`

const CheckContainer = styled.View`
    top:85%
    align-self:flex-end
    position:absolute
    width:20px
    height:20px
    border-radius:10px
    justify-content:center
    align-items:center
    background:${colors.mainBlack}
`

const GenderButtons: React.FC<Props> = ({myProfileGender}) => {
    const gender = useSelector((state: any) => state.user.value.searchState.refinementList.gender)
    const dispatch = useDispatch();

    const onMalePress = () => {
        dispatch(setGender(['', 'herre']))
    }

    const onFemalePress = () => {
        dispatch(setGender(['', 'dame']))
    }
    
    return (
        <ImageContainer myProfileGender={myProfileGender}>
            <BtnContainer genderSelect={gender.includes('herre')} myProfileGender={myProfileGender}  onPress={() => onMalePress()}>
                { gender.includes('herre') &&
                <CheckContainer>
                    <Image source={require('../../../assets/checkMark.png')} style={{ width: '50%', height: '50%', resizeMode:'contain'}} />
                </CheckContainer>
                }   
                <ManIcon width="100%" height="30%" fill="#000"/>
                <SmallMargin/>
                <GenericText font={fontFamily.regular} size={fontSize.s}>Mand</GenericText>
            </BtnContainer>

            <BtnContainer genderSelect={gender.includes('dame')} myProfileGender={myProfileGender} onPress={() => onFemalePress()}>
                { gender.includes('dame') &&
                <CheckContainer>
                    <Image source={require('../../../assets/checkMark.png')} style={{ width: '50%', height: '50%', resizeMode:'contain'}} />
                </CheckContainer>
                }
                <WomanIcon width="100%" height="30%" fill="#000"/>
                <SmallMargin/>
                <GenericText size={fontSize.s}>Kvinde</GenericText>
            </BtnContainer>
        </ImageContainer>
    )
}

export default GenderButtons
