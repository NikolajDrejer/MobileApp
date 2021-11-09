import * as React from 'react'
import styled from 'styled-components/native'
import {Modal, TouchableOpacity} from "react-native";
import {colors} from "../../globals/colors";
import {GenericText} from "../atoms/GenericText";
import { fontSize} from "../../globals/fonts";
import {AuthButton} from "../atoms/AuthInput";
import {SmallMargin} from "../atoms/Margin";

type Props = {
   modalVisible:boolean
   closeRequest: () => void
   onLogin: () => void
   onCreate: () => void
}

const Center = styled.View`
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
    height:45%
    justify-content:center
   
`

export const GuestLogInPopUp: React.FC<Props> = ({ modalVisible,onLogin, onCreate, closeRequest }) => {

    const onCreatePage = () => {
        closeRequest()
        onCreate()
    }

    const onLoginPage = () => {
        closeRequest()
        onLogin()
    }


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
                        <GenericText textAlign={'center'} size={fontSize.s}>Opret konto for at gå videre</GenericText>
                        <SmallMargin/>
                        <AuthButton backColor={colors.mainBlack} onPress={onCreatePage}>
                            <GenericText size={fontSize.s} color={colors.mainWhite}>Fortsæt med email</GenericText>
                        </AuthButton>
                        <SmallMargin/>
                        <AuthButton backColor={colors.mainBlack} onPress={onLoginPage}>
                            <GenericText size={fontSize.s} color={colors.mainWhite}>Log på</GenericText>
                        </AuthButton>
                        <SmallMargin/>
                        <TouchableOpacity onPress={closeRequest}>
                            <GenericText style={{textDecorationLine: 'underline'}} textAlign={'center'} size={fontSize.xs}>Luk side</GenericText>
                        </TouchableOpacity>
                    </ModalContainer>
                </Center>
            </Modal>
        </Center>
    )
}
