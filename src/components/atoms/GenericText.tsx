import styled from 'styled-components/native'
import {colors} from "../../globals/colors";
import { fontFamily } from '../../globals/fonts';

type Props = {
    fontWeight?: number,
    size: string
    color?: string
    textAlign?: string
    font?: string
}

export const GenericText = styled.Text<Props>`
    font-size: ${(props: Props) => props.size};
    font-weight: ${(props: Props) => props.fontWeight || 500};
    color: ${(props: Props) => props.color ? props.color : colors.mainBlack };
    text-align: ${(props: Props) => props.textAlign || 'center'};
    font-family: ${(props: Props) => props.font || fontFamily.regular};
`

export const BoldText = styled.Text<Props>`
    font-weight: 700

`
