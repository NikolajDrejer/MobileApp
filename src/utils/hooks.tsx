import React from 'react'
import { HubCallback } from '@aws-amplify/core/lib/Hub'
import { API, Auth, Hub } from 'aws-amplify'
import {Sizes} from "./types";

export type updateUserParams = {
    id?: string
    gender?: string
    brands?: string[]
    priceRange?: number[]
    categories?: string[]
    favorites?: string[]
    sizes?: Sizes
    onBoarding?: boolean
}
/**
 * This function calls the API from our backend and returns all the
 * brands in algolia. We use this function to always show all brands
 * no matter if we choose a param that would normally exclude some 
 * of the data.
 * @returns Brands
 */
export const getBrands = async () => {
    console.log('Getting Brands')
    try{
        const brands = await API.get('api', '/brands', {})
        const array = Object.keys( brands );
        return array
        
    } catch (err) {
        console.log(err)
        return
    }
}
/**
 * 
 * @returns Sizes
 */
export const getSizes = async()  => {
    console.log('Getting Sizes')
    try{
        const sizes = await API.get('api', '/sizes', {})
        const array = Object.keys( sizes );
        return array
    } catch (err) {
        console.log(err)
        return false
    }
}

/**
 * 
 * @returns Categories
 */
export const getCategories = async() => {
    console.log('getting categories')
    try{
        const categories = await API.get('api', '/categories', {})
        const array = Object.keys( categories );
        return array
    } catch(err){
        console.log(err)
        return false
    }
}

/**
 * 
 * @param params 
 * @returns 
 */
export const updateUser = async(params: updateUserParams): Promise<boolean> => {
    console.log('Updating with ', params)
    try {
        await API.post('api', '/user', {
            body: params
        })
        return true
    } catch (error) {
        console.log('error creating the user params', error)
        return false
    }
}

export const getUser = async (): Promise<updateUserParams | undefined> => {
    try {
        const user = await API.get('api', '/user', {})
        return user
    } catch (error) {
        console.log('Error getting user:', error)
    }
    return undefined
}

export const deleteUser = async (email:string): Promise<boolean>  => {
    console.log('Updating with ', email)
    try {
        await API.del('api', '/user', {
            body: email
        })
       return true
    } catch (error) {
        console.log('Error deleting user:', error)
        return false
    }
}

export const useCognito = () => {
    const [signedIn, setSignedIn] = React.useState<boolean>(true)

    const authListener: HubCallback = React.useCallback(({ payload: { event, data } }) => {
        console.log('new auth event: ', event)
        // eslint-disable-next-line default-case
        switch (event) {
            case 'signIn':
                setSignedIn(true)
                break
            case 'signOut':
                setSignedIn(false)
                break
        }
    }, [])

    React.useEffect(() => {
        (async () => {
            try {
                await Auth.currentAuthenticatedUser()
                setSignedIn(true)
            } catch (error) {
                setSignedIn(false)
            }
        })()
        Hub.listen('auth', authListener)
        return () => Hub.remove('auth', authListener)
    }, [])

    return { signedIn }
}
