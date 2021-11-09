import * as React from 'react'
import styled from 'styled-components/native'
import {Modal, TouchableOpacity, View} from "react-native";
import {colors} from "../../globals/colors";
import {GenericText} from "../atoms/GenericText";
import { fontSize} from "../../globals/fonts";
import {AuthButton} from "../atoms/AuthInput";
import {MidMargin, SmallMargin} from "../atoms/Margin";

type Props = {
   modalVisible:boolean
   closeRequest: () => void
   onYes: () => void
   onNo: () => void
}

const Center = styled.View`
    zIndex:1
    flex:1
    justify-content:center
    align-items:center
`

const ModalContainer = styled.View`
    justify-content:center
    background:${colors.mainWhite}
    border-radius:20px
    width: 70%;
    padding:5%
    height:39%
    justify-content:center
   
`

export const DeleteAccountPopUp: React.FC<Props> = ({ modalVisible,onYes, onNo, closeRequest }) => {

    return (
        <Center>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                   console.log("CLOSEEEE")
                }}
            >
                <Center>
                    <ModalContainer>
                        <GenericText textAlign={'center'} size={fontSize.s}>Er du sikker på, at du vil slette din konto?</GenericText>
                        <SmallMargin/>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                            <AuthButton style={{width:'45%'}} backColor={colors.mainBlack} onPress={onYes}>
                                <GenericText size={fontSize.s} color={colors.mainWhite}>Slet Konto</GenericText>
                            </AuthButton>
                            <MidMargin/>
                            <AuthButton style={{width:'45%'}} backColor={colors.mainBlack} onPress={onNo}>
                                <GenericText size={fontSize.s} color={colors.mainWhite}>Fortryd</GenericText>
                            </AuthButton>
                        </View>
                        <SmallMargin/>
                    </ModalContainer>
                </Center>
            </Modal>
        </Center>
    )
}
