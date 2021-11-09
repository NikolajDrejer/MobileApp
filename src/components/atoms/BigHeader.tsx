import * as React from 'react'
import styled from 'styled-components/native'
import {colors} from "../../globals/colors";

type Props = {
}

const ContainerView = styled.View`
    width:100%
    align-items: center
    justify-content: center
`

const BigHeader: React.FC<Props> = ({ children }) => {
    return (
        <ContainerView>
                {children}
        </ContainerView>
    )
}

export default BigHeader