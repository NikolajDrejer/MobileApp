import * as React from 'react'
import styled from 'styled-components/native'
import {GenericText} from "./GenericText";
import {fontSize} from "../../globals/fonts";

type Props = {
    onPress?: () => void
}

const ContainerView = styled.TouchableOpacity`
    position:absolute
    bottom:20%
    align-content:center
    borderBottomColor: black
    borderBottomWidth: 1px
    paddingBottom: 3px
`

const SkipScreen: React.FC<Props> = ({ onPress}) => {
    return (
        <ContainerView onPress={onPress}>
            <GenericText size={fontSize.xs}>Spring Over</GenericText>
        </ContainerView>
    )
}

export default SkipScreen
