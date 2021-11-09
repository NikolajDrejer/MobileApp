import * as React from 'react'
import {colors} from "../../globals/colors";
import { KeyboardAvoidingView, Platform } from 'react-native'

type Props = {
}

const KeyboardAvoid: React.FC<Props> = ({ children }) => {

    return (
        <>
            {Platform.OS === 'ios' && 
                <KeyboardAvoidingView behavior={'padding'} style={{ backgroundColor: colors.mainWhite, flexGrow: 1 }} keyboardVerticalOffset={-10}>
                    {children}
                </KeyboardAvoidingView>
            }
            {Platform.OS === 'android' && 
                <KeyboardAvoidingView
                    behavior={'position'}>
                    {children}
                </KeyboardAvoidingView>
            }
        </>
    )
}

export default KeyboardAvoid
