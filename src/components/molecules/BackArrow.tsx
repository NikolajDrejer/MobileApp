import * as React from 'react'
import styled from 'styled-components/native'

import LeftArrow from "../../../assets/left-arrow.svg"

type Props = {
    onPress: () => void
    align?: string
}

const BtnContainer = styled.TouchableOpacity<{ align?: string }>`
    width: 10%;
    height: 100px;
  align-self:${(props) => props.align ? props.align : 'center'}
`

export const BackArrow: React.FC<Props> = ({ align ,onPress }) => {
    return ( 
        <BtnContainer onPress={onPress} align={align}>
            <LeftArrow fill="#000000"/>
        </BtnContainer>
    )
}
