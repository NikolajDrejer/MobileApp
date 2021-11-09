import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { HomeStackParams } from "../HomeStackParams";
import { GenericText } from '../../../components/atoms/GenericText';
import { fontSize } from '../../../globals/fonts';
import MainContainer from "../../../components/atoms/MainContainer";
import { AuthButton } from '../../../components/atoms/AuthInput';
import { Background } from '../../../components/atoms/Background';
import { SmallHeader } from '../../../components/atoms/SmallHeader';
import FlexContainer from '../../../components/atoms/FlexContainer';
import {BigSpacer, SmallMargin} from '../../../components/atoms/Margin';
import { LogoutButton } from '../../../components/molecules/LogoutButton';
import {deleteUser, useCognito} from '../../../utils/hooks';
import {DarkenContainer} from "../../../components/atoms/DarkContainer";
import {Auth} from "aws-amplify";
import {DeleteAccountPopUp} from "../../../components/molecules/DeleteAccountPopUp";



type ScreenRouteProp = RouteProp<HomeStackParams, 'SettingScreen'>
type ScreenNavigationProp = StackNavigationProp<HomeStackParams, 'SettingScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
    loggedIn?: boolean
}

const SettingScreen: React.FC<Props> = ({navigation, loggedIn}) => {

    const {signedIn} = useCognito();
    const [modalVisible, setModalVisible] = React.useState<boolean>(false)

    const deleteAccount = async () => {
        await deleteUser('theo+pp@goco.dk').then()
        navigation.push('Auth')
    }

   return (
        <>

        <Background background='image2'/>
        {(modalVisible) &&<DarkenContainer style={{ opacity: 0.4}}/>}
        <SmallMargin/>
        <SmallHeader onPress={() => {navigation.goBack()}}>Indstillinger</SmallHeader>
        <MainContainer centerHor={false}>
        <BigSpacer />
        <FlexContainer justifyContent="space-around" direction="column" height="20%">
            {!signedIn ?
            <>
                <AuthButton onPress={() => navigation.navigate('Auth', {screen: 'LoginScreen'})}>
                    <GenericText size={fontSize.s} color="#fff">Log ind</GenericText>
                </AuthButton>
                <AuthButton onPress={() => navigation.navigate('Auth', {screen: 'SignupScreen'})}>
                    <GenericText size={fontSize.s} color="#fff">Opret med email</GenericText>
                </AuthButton>
                </> : <>
                <AuthButton onPress={() => setModalVisible(!modalVisible)}>
                    <GenericText size={fontSize.s} color="#fff">Slet Konto</GenericText>
                </AuthButton>
            </>
            }

        </FlexContainer>
            {modalVisible && <DeleteAccountPopUp modalVisible={modalVisible} closeRequest={() => setModalVisible(!modalVisible)}
                                                 onYes={() => deleteAccount()} onNo={() => {setModalVisible(!modalVisible)}}/>}
        </MainContainer>
            {signedIn && !modalVisible && < LogoutButton backLink={() => navigation.navigate('Auth', {screen: 'LandingScreen'})}/>}

        </>
    )
}

export default SettingScreen
