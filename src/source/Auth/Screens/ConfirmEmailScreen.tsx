import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { Auth } from 'aws-amplify'
import {useDispatch, useSelector} from 'react-redux';
import {AuthStackParams} from "../AuthStackParams";
import MainContainer from "../../../components/atoms/MainContainer";
import { GenericText } from '../../../components/atoms/GenericText';
import { fontSize } from '../../../globals/fonts';
import Logo from '../../../../assets/Logo.svg';
import { BigMargin, SmallMargin } from '../../../components/atoms/Margin';
import { Background } from '../../../components/atoms/Background';
import { AuthInputContainer, AuthShadowContainer, AuthTextInput, AuthButton } from '../../../components/atoms/AuthInput';
import { colors } from '../../../globals/colors';
import {TouchableWithoutFeedback, Keyboard, View, KeyboardAvoidingView, Platform} from 'react-native'
import {InitialSize, setId} from '../../../features/user';
import { getUser, updateUser } from '../../../utils/hooks';
import HomeScreen from '../../Home/Screens/HomeScreen';
import {Sizes} from "../../../utils/types";

type ScreenRouteProp = RouteProp<AuthStackParams, 'ConfirmEmailScreen'>
type ScreenNavigationProp = StackNavigationProp<AuthStackParams, 'ConfirmEmailScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const ConfirmEmailScreen: React.FC<Props> = ({navigation, route}) => {
    const reduxUser = useSelector((state: any) => state.user.value)
    const [goodCred, setGoodCred] = React.useState<boolean>(false);
    const [confirmationCode, setConfirmationCode] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false);
    const { email, password } = route.params ;
    const dispatch = useDispatch();

    const submit = async() => {
        
        if (loading) return
        setLoading(true)

        try {
            if (!email) throw new Error('Email missing')
            await Auth.confirmSignUp(email, confirmationCode)
            await Auth.signIn(email, password)
            await updateUser({gender: reduxUser.gender, brands: reduxUser.brands, priceRange: reduxUser.priceRange,sizes: InitialSize, onBoarding: true})
            let user = await getUser().then()
            dispatch(setId(user?.id))
            navigation.navigate('Home', {screen: 'HomeScreen'})
            
        } catch (error) {
            setGoodCred(true)
            console.error('confirmation code error: ', error)
        }
        setLoading(false)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={true}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
                style={{ backgroundColor: colors.mainWhite, flexGrow: 1 }}
                keyboardVerticalOffset={-35}
                >
        <Background background='image2'/>
        <MainContainer centerHor={true}>
            <SmallMargin />
            <Logo height="34%"/>
            <SmallMargin />
            <>
                <GenericText size={fontSize.l}>Bekræft email</GenericText>
                <GenericText size={fontSize.xs}>{email}</GenericText>
                <AuthInputContainer>
                    <AuthShadowContainer>
                        <AuthTextInput placeholder="Indtast Bekræftelses Kode"
                        keyboardType='numeric'
                        onChangeText={ (text) => setConfirmationCode(text)} 
                        value={confirmationCode}/>
                    </AuthShadowContainer>
                    {goodCred && <GenericText textAlign='left' size={fontSize.xs} color={colors.red}>Verificer venligst dit input</GenericText>}
                    <SmallMargin />
            
                    <AuthButton backColor={colors.mainBlack} onPress={submit}>
                        <GenericText size={fontSize.s} color='#fff'>Bekræft email</GenericText>
                    </AuthButton>
                </AuthInputContainer>
                <BigMargin />
                
            </>
        </MainContainer>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}

export default ConfirmEmailScreen
