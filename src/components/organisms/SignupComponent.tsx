import * as React from 'react'
import { Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native';

import { AuthShadowContainer, AuthTextInput, AuthButton, AuthInputContainer } from '../atoms/AuthInput'
import { GenericText } from '../atoms/GenericText';
import { fontSize } from '../../globals/fonts';
import { MiniMargin } from '../atoms/Margin';
import { useState } from 'react';
import { colors } from '../../globals/colors';

export const SignupComponent = () => {
    const navigation = useNavigation();
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [shortPassword, setShortPassword] = useState(false);
    const [noMatch, setNoMatch] = useState(false);
    const [emailExist, setEmailExist] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirm, setConfirm] = useState<string>('');

    const signUp = async() => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email) || email.length === 0) {
            setInvalidEmail(true)
            return false
        } setInvalidEmail(false)

        if (password.length < 8 || 0) {
            setShortPassword(true)
            return false
        } setShortPassword(false)

        if (password != confirm) {
            setNoMatch(true)
            return false
        } setNoMatch(false)

        try {
            await Auth.signUp({
                username: email, password,
                attributes: {
                    email: `${email}`
                }
            })
            navigation.navigate('ConfirmEmailScreen', { email, password })
        } catch (error) {
            setEmailExist(true)
            console.log('error signing up: ', error)
        }
    }

    return (
        <AuthInputContainer>
            <GenericText size={fontSize.m}>Tilmeld dig Haul</GenericText>
            <MiniMargin />
            <AuthShadowContainer>
                <AuthTextInput
                    placeholder="Email"
                    value={email}
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
                />
            </AuthShadowContainer>
            {invalidEmail && <GenericText textAlign='left' size={fontSize.xs} color={colors.red}>Den angivne e-mail er ikke gyldig</GenericText>}
            {emailExist && <GenericText textAlign='left' size={fontSize.xs} color={colors.red}>Denne email er allerede registreret</GenericText>}

            <MiniMargin />

            <AuthShadowContainer>
                <AuthTextInput
                    placeholder="Adgangskode"
                    secureTextEntry={true}
                    contextMenuHidden={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </AuthShadowContainer>
            {shortPassword && <GenericText textAlign='left' size={fontSize.xs} color={colors.red}>Adgangskoden er for kort</GenericText>}

            <MiniMargin />

            <AuthShadowContainer>
                <AuthTextInput
                    placeholder="Bekræft adgangskode"
                    secureTextEntry={true}
                    value={confirm}
                    onChangeText={(text) => setConfirm(text)}
                />
            </AuthShadowContainer>
            {noMatch && <GenericText size={fontSize.xs} color={colors.red}>Adgangskoderne stemmer ikke overens</GenericText>}

            <MiniMargin />
            
            <AuthButton backColor={colors.mainBlack} onPress={signUp}>
                <GenericText size={fontSize.s} color='#fff'>Tilmeld</GenericText>
            </AuthButton>
        </AuthInputContainer>
    )
}


