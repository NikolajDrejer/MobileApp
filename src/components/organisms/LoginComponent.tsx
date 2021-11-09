import * as React from 'react'
import { Auth } from 'aws-amplify'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react'
import {useDispatch} from 'react-redux';
import { GenericText } from '../atoms/GenericText'
import { fontSize } from '../../globals/fonts'
import { AuthInputContainer, AuthShadowContainer, AuthTextInput, AuthButton } from '../atoms/AuthInput'
import { MiniMargin, SmallMargin } from '../atoms/Margin'
import { colors } from '../../globals/colors'
import {getUser} from "../../utils/hooks";
import { setUser } from '../../features/user';
type Props = {
    
}

export const LoginComponent: React.FC<Props> = ({children}) => {
    const navigation = useNavigation();
    const [email, onEmailChange] = useState<string>('');
    const [password, onPasswordChange] = useState<string>('');
    const [notSignIn, setNotSignIn] = useState<boolean>(false)
    const dispatch = useDispatch();

async function signIn() {
    try {
        await Auth.signIn(email, password);
        let user = await getUser().then()
        console.log('-----------')
        console.log(user?.onBoarding)
        if(user?.onBoarding === true) {
            navigation.navigate('Home', {screen: 'HomeScreen'})
        }
        else{
            navigation.navigate('Onboarding', {screen: 'GenderScreen'})
        }
    } catch (error) {
        setNotSignIn(true)
        return console.log('error signing in', error);
    }
}

    return ( 
        <AuthInputContainer>
            <AuthShadowContainer>
                <AuthTextInput 
                    textContentType="emailAddress" placeholder="Email"
                    onChangeText={ (text) => onEmailChange(text)}
                    autoCapitalize='none'
                    value={email}/>
            </AuthShadowContainer>

            <MiniMargin />
                
            <AuthShadowContainer>
                <AuthTextInput textContentType="newPassword" placeholder="Adgangskode"
                    secureTextEntry={true} 
                    onChangeText={ (text) => onPasswordChange(text)}
                    value={password}/>
            </AuthShadowContainer>
            {notSignIn && <GenericText textAlign='left' size={fontSize.xs} color={colors.red}>kontroller, at du har indtastet det korrekte brugernavn og kodeord</GenericText>}

            <MiniMargin />

            {children}
            
            <SmallMargin />
            
            <AuthButton backColor={colors.mainBlack} onPress={signIn}>
                <GenericText size={fontSize.s} color='#fff'>Log ind</GenericText>
            </AuthButton>
        </AuthInputContainer>
    )
}
