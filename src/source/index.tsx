import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import {View} from "react-native";
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from "react";

import {getBrands, getCategories, getSizes, getUser, updateUser, useCognito} from '../utils/hooks';
import { RootStackParams } from './RootStackParams'
import Onboarding from "./Onboarding";
import Home from "./Home";
import Authen from "./Auth";
import { setSearchState, setUser } from '../features/user';
import {Auth} from "aws-amplify"
import algoliasearch from 'algoliasearch/lite';
import { connectRange, connectRefinementList, connectSearchBox, InstantSearch } from 'react-instantsearch-native';
import { setAlgolia, setAlgoliaBrands, setAlgoliaCategories, setAlgoliaSizes } from '../features/datas';
import { element } from 'prop-types';


const Root = createStackNavigator<RootStackParams>()
/*
*/
const VirtualRangeList = connectRange(() => null)
const VirtualRefinementList = connectRefinementList(() => null);
const VirtualSearchBox = connectSearchBox(() => null)


const Index: React.FC = () => {
  const userContext = useSelector((state: any) => state.user.value)
  const productContext = useSelector((state: any) => state.algolia.value)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [loaded, setLoad] = useState(false)
  const { signedIn } = useCognito()
  
  const userSearch = useSelector((state: any) => state.user.value.searchState)

  useEffect(() => {
    console.log('useEffect')
      if (signedIn) {
        console.log('logged in')
          setLoading(true)
          getUser().then((u) => {
            if(u != undefined){
              /* dispatch(setUser(u)) */
            }
            setLoad(true)
            setLoading(false)
          })
      }
  }, [signedIn])
  useEffect(() => {
    getBrands().then((element) => {
      dispatch(setAlgoliaBrands(element))
    })
    getSizes().then((element) => {
      dispatch(setAlgoliaSizes(element))
    })
    getCategories().then((element) =>{
      dispatch(setAlgoliaCategories(element))
    })
}, [signedIn]);
    /*  Need a redoing of this - messes the Algolia functionality
    useEffect(() => {
        if (signedIn && loaded)
      (async function runEffect() {
          await updateUser({gender: userContext.gender})
      })();
    }, [userContext.gender]);
    useEffect(() => {
      if (signedIn && loaded)
      (async function runEffect() {
        console.log("Should not run")
        await updateUser({brands: userContext.brands})
      })();
    }, [userContext.brands]);
    useEffect(() => {
      if (signedIn && loaded)
      (async function runEffect() {
        await updateUser({priceRange: userContext.priceRange})
      })();
    }, [userContext.priceRange]);
    useEffect(() => {
      if (signedIn && loaded)
      (async function runEffect() {
        await updateUser({sizes: userContext.sizes})
      })();
    }, [userContext.sizes]);
    useEffect(() => {
      if (signedIn && loaded)
      (async function runEffect() {
        await updateUser({favorites: userContext.favorites})
      })();
    }, [userContext.favorites]);
    useEffect(() => {
      if (signedIn && loaded)
      (async function runEffect() {
        await updateUser({onBoarding: userContext.onBoarding})
      })();
    }, [userContext.onBoarding]);
    */

    if (loading) {
        return <View/>
    }

    return (
      
        
        <Root.Navigator screenOptions={{ headerShown: false,  gestureEnabled: false, }}>
          {userContext.onBoarding && <>
            <Root.Screen name="Home" component={Home} />
            <Root.Screen name="Auth" component={Authen} />
            <Root.Screen name="Onboarding" component={Onboarding} />
          </>}{!userContext.onBoarding && <>
            <Root.Screen name="Auth" component={Authen} />
            <Root.Screen name="Onboarding" component={Onboarding} />
            <Root.Screen name="Home" component={Home} />
          </>}
        </Root.Navigator>
      
    )
}

export default Index


/*
<InstantSearch searchClient={searchClient} indexName="dev_haul" searchState={userSearch}  >
        <VirtualRefinementList attribute="brand" />
        <VirtualRefinementList attribute="kategorinavn" />
        <VirtualRefinementList attribute="size" />
        <VirtualRefinementList attribute="gender" />
        
        <Root.Navigator screenOptions={{ headerShown: false,  gestureEnabled: false, }}>
          {userContext.onBoarding && <>
            <Root.Screen name="Home" component={Home} />
            <Root.Screen name="Auth" component={Authen} />
            <Root.Screen name="Onboarding" component={Onboarding} />
          </>}{!userContext.onBoarding && <>
            <Root.Screen name="Auth" component={Authen} />
            <Root.Screen name="Onboarding" component={Onboarding} />
            <Root.Screen name="Home" component={Home} />
          </>}
        </Root.Navigator>
      </InstantSearch>

*/