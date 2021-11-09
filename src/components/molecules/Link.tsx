import * as React from 'react'
import styled from 'styled-components/native'
import { GenericText } from '../atoms/GenericText'
import { fontSize } from '../../globals/fonts'

type Props = {
    onPress: () => void
    text: string
}

const BtnContainer = styled.TouchableOpacity`
    
    borderBottomColor: black
    borderBottomWidth: 1px
    paddingBottom: 3px
`

export const Link: React.FC<Props> = ({ text, onPress }) => {
    return ( 
        <BtnContainer onPress={onPress}>
            <GenericText size={fontSize.xs}>{text}</GenericText>
        </BtnContainer>
    )
}