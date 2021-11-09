import * as React from 'react'
import styled from 'styled-components/native'
import {GenericText} from "./GenericText";
import {fontSize} from "../../globals/fonts";
import { BackArrow } from '../molecules/BackArrow';
import FlexContainer from './FlexContainer';
import SettingIcon from '../../../assets/Settings.svg'

type Props = {
    onPress: () => void
    settingNav?: () => void
    settings?: boolean
}
const Spacer = styled.View`
  width: 10%
`

const SettingContainer = styled.TouchableOpacity`
  padding:3%
`

const Padding = styled.View`
  padding-left:7%
  padding-right:7%
`

export const SmallHeader: React.FC<Props> = ({ children, settings, onPress, settingNav}) => {

    return (
      <Padding>
        <FlexContainer height='70px'>
          <BackArrow onPress={onPress}/>
          <GenericText size={fontSize.xl}>{children}</GenericText>
          { !settings ? <Spacer /> :
              <SettingContainer onPress={settingNav}>
                <SettingIcon width="22" height="22" fill="#000"/>
              </SettingContainer>}
        </FlexContainer>
      </Padding>
    )
}
