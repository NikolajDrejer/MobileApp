import * as React from 'react'
import styled from 'styled-components/native'
import { TouchableOpacity } from "react-native";

import FlexContainer from "../atoms/FlexContainer";
import ProfileIcon from "../../../assets/Profile.svg"
import SearchIcon from "../../../assets/Search.svg"
import HeartIcon from "../../../assets/Heart.svg"

type Props = {
    profilePress?: () => void
    favouritePress?: () => void
    searchPress?: () => void
}

const MainContainer = styled.View`
    align-self:center
    
    top:7%
`

export const ExploreTopBar: React.FC<Props> = ({ profilePress, favouritePress, searchPress }) => {
    return (
        <MainContainer>
            <FlexContainer >
                <TouchableOpacity style={{marginRight:'54%'}} onPress={profilePress}>
                    <ProfileIcon width="30" height="30" fill="#000000"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={searchPress}>
                    <SearchIcon width="30" height="30" fill="#000000" />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:'8%'}} onPress={favouritePress}>
                    <HeartIcon width="30" height="30" fill="#000000" />
                </TouchableOpacity>
            </FlexContainer>
        </MainContainer>
    )
}
