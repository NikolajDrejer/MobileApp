import * as React from 'react'
import styled from 'styled-components/native'
import { colors } from '../../globals/colors'
import { GenericText } from '../atoms/GenericText'
import RightArrow from '../../../assets/right-arrow.svg'
import {fontFamily, fontSize } from '../../globals/fonts'

type Props = {
    onPress: () => void
    text: string
    onComplete?: boolean
    width?: string
    height?: string
    disabled?: boolean
    disabledText?: stringm
}

const BtnContainer = styled.TouchableOpacity<{width?: string, height?: string, disabled?: boolean}>`
    position: absolute
    bottom: 0px
    width: ${(props) => (props.width ? props.width : '130%')};
    height: ${(props) => (props.height ? props.height : '10%')};
    justify-content: center
    align-items: center;
    background-color: ${(props) => (props.disabled ? colors.mainGray : colors.mainBlack)};
    borderTopLeftRadius: 20px;
    borderTopRightRadius: 20px;
    flex-direction: row
`

const ArrowContainer = styled.View`
  width: 10%;
  margin: 0 20px;
`

export const NextScreenButton: React.FC<Props> = ({ text, width, height, onPress, disabled, disabledText }) => {
    return ( 
        <BtnContainer disabled={disabled} width={width} height={height} onPress={onPress}>
                <GenericText textAlign={'center'} color="white" size={fontSize.m} font={fontFamily.light}>{!disabled ? text : disabledText}</GenericText>
                {!disabled && 
                <ArrowContainer>
                    <RightArrow fill="white"/>
                </ArrowContainer>
                }
        </BtnContainer>
    )
}
