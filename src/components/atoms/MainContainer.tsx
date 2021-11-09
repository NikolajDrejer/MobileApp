import * as React from 'react'
import styled from 'styled-components/native'

type Props = {
    background?: string
    centerVert?: boolean
    centerHor?: boolean
    paddingRight?: boolean
}

const ContainerView = styled.View<{ background?: string, centerVert?: boolean, centHor?: boolean, paddingRight?:boolean}>`
    width:100%
    height: 100%
    ${(props) => !props.paddingRight  && 'padding-right:10%'}  
    padding-left:10%
    justify-content:${(props) => props.centHor ? 'space-evenly' : 'flex-start'}
    ${(props) => props.centerVert && 'align-items:center'}
    background: ${(props) => props.background ? props.background : 'rgba(255,255,255, 0);' }
`

const MainContainer: React.FC<Props> = ({ children, background, centerVert, centerHor }) => {
    return (
        <ContainerView background={background} centerVert={centerVert} centHor={centerHor}>
                {children}
        </ContainerView>
    )
}

export default MainContainer
