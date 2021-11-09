import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Auth } from 'aws-amplify';
import {useState} from "react";

import {AuthStackParams} from "../AuthStackParams";
import MainContainer from "../../../components/atoms/MainContainer";
import { GenericText } from '../../../components/atoms/GenericText';
import { fontSize } from '../../../globals/fonts';
import { Link } from '../../../components/molecules/Link';
import { SmallMargin, MiniMargin, BigMargin } from '../../../components/atoms/Margin';
import Logo from '../../../../assets/Logo.svg';
import { Background } from '../../../components/atoms/Background';
import { AuthInputContainer, AuthShadowContainer, AuthTextInput, AuthButton } from '../../../components/atoms/AuthInput';
import { colors } from '../../../globals/colors';
import FlexContainer from '../../../components/atoms/FlexContainer';


type ScreenRouteProp = RouteProp<AuthStackParams, 'ForgotPassScreen'>
type ScreenNavigationProp = StackNavigationProp<AuthStackParams, 'ForgotPassScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const ForgotPassScreen: React.FC<Props> = ({navigation}) => {
    const [loading, setLoading] = React.useState(false)
    const [email, setEmail] = React.useState<string>('');

    const [submitted, setSubmitted] = React.useState<boolean>(false);
    const [code, setCode] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [invalidInput, setInvalidInput] = React.useState(false);

    const sendAuthCode = async (): Promise<void> => {
        setLoading(true)

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email) || email.length === 0) {
            setInvalidEmail(true)
            return
        } setInvalidEmail(false)

        try {
          await Auth.forgotPassword(email)
          setSubmitted(true)
          setLoading(false)
        } catch (error) {
            console.log('error sending Auth: ', error)
        }
      };

      const resetPassword = async (): Promise<void> => {
        setLoading(true)
        try {
          await Auth.forgotPasswordSubmit(email, code, password)
          navigation.navigate('LoginScreen');
          setLoading(false)
        } catch (error) {
          setInvalidInput(true)
          setLoading(false);
          console.log(error);
        }
      };
    
    return (
        <KeyboardAvoidingView
            style={{ flex:1 }}
            behavior={Platform.OS === 'ios' ? 'position' : 'padding'}>
            <Background background="image2"/>
                    <MainContainer centerHor={true}>
                    <SmallMargin />
                    <Logo height="34%"/>
                    <SmallMargin />
                    <>
                        <GenericText size={fontSize.m}>Glemt Adgangskoden?</GenericText>
                        <SmallMargin/>
                        <AuthInputContainer>
                            <AuthShadowContainer>
                                <AuthTextInput textContentType="emailAddress" placeholder="Email"
                                    onChangeText={ (text) => setEmail(text)}
                                    autoCapitalize='none'
                                    value={email} editable={!submitted}/>
                            </AuthShadowContainer>
                            {invalidEmail && <GenericText textAlign='left' size={fontSize.xs} color={colors.red}>Den angivne e-mail er ikke gyldig</GenericText>}

                            <MiniMargin />

                            {
                                submitted ? <>
                                    <AuthShadowContainer>
                                        <AuthTextInput placeholder="Sikkerheds kode"
                                        keyboardType='numeric'
                                        onChangeText={ (text) => setCode(text)}
                                        value={code}/>
                                    </AuthShadowContainer>
                
                                    <MiniMargin />

                                    <AuthShadowContainer>
                                        <AuthTextInput textContentType="newPassword" placeholder="Nyt Kodeord"
                                        secureTextEntry={true}
                                        onChangeText={ (text) => setPassword(text)}
                                        value={password}/>
                                    </AuthShadowContainer>
                                    {invalidInput && <GenericText textAlign='left' size={fontSize.xs} color={colors.red}>Verificer venligst dine input</GenericText>}

                                    <MiniMargin />
                                    <AuthButton backColor={colors.mainBlack} onPress={resetPassword}>
                                        <GenericText size={fontSize.s} color='#fff'>Opdater Kodeord</GenericText>
                                    </AuthButton>
                                </> : <>
                                    <AuthButton backColor={colors.mainBlack} onPress={sendAuthCode}>
                                        <GenericText size={fontSize.s} color='#fff'>Send ny kode</GenericText>
                                    </AuthButton>
                                </>
                            }

                        </AuthInputContainer>
                        <BigMargin />
                        <FlexContainer justifyContent="center">
                            <Link text="Tilbage til login" onPress={() => navigation.push("LoginScreen")} />
                        </FlexContainer>
                    </>
                </MainContainer>
        </KeyboardAvoidingView>

    )
}

export default ForgotPassScreen
