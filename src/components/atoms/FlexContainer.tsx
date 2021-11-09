import * as React from 'react'
import styled from 'styled-components/native'

type Props = {
    height?: string
    width?:string
    justifyContent?: string
    alignItems?: string,
    direction?: string
    margin?: string
    position?: string
}

const ContainerView = styled.View<{ justifyContent?:string, alignItems?:string, height?:string, width?:string, direction?: string, margin?: string, position?: string }>`
    height:${(props) => props.height ? props.height : 'auto'}
    width:${(props) => props.width ? props.width : 'auto'}
    flex-direction: ${(props) => props.direction ? props.direction : 'row'}
    justify-content:${(props) => props.justifyContent ? props.justifyContent : 'space-between'}
    align-items:${(props) => props.alignItems ? props.alignItems : 'center'}
    position:${(props) => props.position ? props.position : 'relative'}
   
`

const FlexContainer: React.FC<Props> = ({ children, justifyContent, alignItems, height, width, direction, position }) => {
    return (
        <ContainerView justifyContent={justifyContent} alignItems={alignItems} height={height} width={width} direction={direction} position={position}>
            {children}
        </ContainerView>
    )
}

export default FlexContainer
