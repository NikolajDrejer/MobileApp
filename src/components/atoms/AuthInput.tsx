import styled from 'styled-components/native'
import {colors} from "../../globals/colors";
import { fontSize } from '../../globals/fonts';
import { Shadow } from './Shaddow';


export const AuthInputContainer = styled.View`
    width: 100%
    justify-content: center
`

export const AuthTextInput = styled.TextInput`
  font-size: ${fontSize.m};
  font-weight: 500;
  color: ${colors.mainBlack};
  text-align: left;
  background-color: #eeeeee;
  border: 1px solid  ${colors.whiteGray};
  width: 100%;
  height: 45px;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  elevation: 1;
`

export const AuthShadowContainer = styled(Shadow)`
    width: 100%;
    height: 45px;
    
`

export const AuthButton = styled.TouchableOpacity<{backColor?: string}>`
    width: 100%;
    height: 45px;
    justify-content: center;
    align-items: center;
    align-self: center;
    background-color: ${(props) => props.backColor ? props.backColor : colors.mainBlack};
    border-radius:15px
`

export const ForgotCredLink = styled.TouchableOpacity`
    align-self: flex-end
`
