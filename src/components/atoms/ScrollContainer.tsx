import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

type Props = {
    background?: string
    centerVert?: boolean
    centerHor?: boolean
    paddingRight?: boolean
}

const ContainerView = styled.ScrollView<{ background?: string, centerVert?: boolean, centHor?: boolean, paddingRight?:boolean}>`
    width:100%
    top: 7%
    background: ${(props) => props.background ? props.background : 'rgba(255,255,255, 0);' }
`

const ScrollContainer: React.FC<Props> = ({ children, background, centerVert, centerHor }) => {
    return (
        <ContainerView background={background} centerVert={centerVert} centHor={centerHor}>
            {children}
        </ContainerView>
    )
}

export default ScrollContainer
