import * as React from 'react'
import styled from 'styled-components/native'
import { Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import { colors } from '../../globals/colors'
import { GenericText } from '../atoms/GenericText'
import {fontFamily, fontSize } from '../../globals/fonts'
import { setUser } from '../../features/user';

type Props = {
    width?: string
    height?: string
    backLink: () => void
    opacity?: boolean
}

const BtnContainer = styled.TouchableOpacity<{width?: string, height?: string, opacity?: boolean}>`
    position: absolute
    bottom: 0px
    width: ${(props) => (props.width ? props.width : '100%')};
    height: ${(props) => (props.height ? props.height : '10%')};
    justify-content: center
    background-color: ${colors.whiteGray};
    borderTopLeftRadius: 20px;
    borderTopRightRadius: 20px;
`

export const LogoutButton: React.FC<Props> = ({ width, height, backLink }) => {
    const dispatch = useDispatch()

    const logout = async () => {
        await Auth.signOut({ global: true }).then()
        dispatch(setUser({
            id: "guest",
            gender: "",
            brands: [],
            priceRange: [],
            sizes: [],
            favorites: [],
            categories: [],
            onBoarding: false
        }))
        backLink()
    }
    return ( 
        <BtnContainer width={width} height={height} onPress={logout} >
            <GenericText textAlign={'center'} color={colors.red} size={fontSize.m} font={fontFamily.regular}>Log ud</GenericText>
        </BtnContainer>
    )
}
