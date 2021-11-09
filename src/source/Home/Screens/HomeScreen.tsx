import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { Image, TouchableOpacity, View} from "react-native";

import {HomeStackParams} from "../HomeStackParams";
import {ExploreTopBar} from "../../../components/molecules/ExploreTopBar";
import {BigSpacer, MidMargin} from "../../../components/atoms/Margin";
import {fontFamily, fontSize} from "../../../globals/fonts";
import {GenericText} from "../../../components/atoms/GenericText";
import {CustomBottomSheet} from "../../../components/molecules/CustomBottomSheet";
import { Background } from '../../../components/atoms/Background';
import { ScrollView } from 'react-native-gesture-handler';
import {useCognito} from "../../../utils/hooks";
import {GuestLogInPopUp} from "../../../components/molecules/GuestLogInPopUp";
import {DarkenContainer} from "../../../components/atoms/DarkContainer";
import {Items} from "../../../utils/types";
import {useSelector} from "react-redux";
import {multiFilter} from "../../../utils/SizeFilter";

import ItemList from '../../../components/organisms/ItemList';
import { connectMenu, connectRange, connectRefinementList, InstantSearch, Configure } from 'react-instantsearch-native';
import { items } from '../../../globals/items';
import { searchClient, indexName } from '../../../config';
import FlexContainer from '../../../components/atoms/FlexContainer';
import { ConnectedRange } from '../../../components/molecules/priceRange';

type ScreenRouteProp = RouteProp<HomeStackParams, 'HomeScreen'>
type ScreenNavigationProp = StackNavigationProp<HomeStackParams, 'HomeScreen'>

type Props = {
  route: ScreenRouteProp
  navigation: ScreenNavigationProp
}
const VirtualRefinementList = connectRefinementList(() => null);
const VirtualMenu = connectMenu(() => null);
const VirtualRange = connectRange(() => null)
const HomeScreen: React.FC<Props> = ({navigation}) => {
    const user = useSelector((state: any) => state.user.value)
    const { signedIn } = useCognito()
    const [modalVisible, setModalVisible] = React.useState<boolean>(false)
    const [guestUserModel, setGuestUserModel] = React.useState<boolean>(false)
    let productsToShow = items
    const userSearch = useSelector((state: any) => state.user.value.searchState)
    const checkIsBetween = (num: number, min: number, max: number) => (num >= min && num <= max)
    const checkMenSize = user.sizes.menShirt.concat(user.sizes.menHoodie, user.sizes.menPants, user.sizes.menWaistWidth, user.sizes.menPantsNumber, user.sizes.menShoes)
    const checkWomenSize = user.sizes.womenShirt.concat(user.sizes.womenHoodie, user.sizes.womenPants, user.sizes.womenWaistWidth, user.sizes.womenPantsNumber, user.sizes.womenShoes, user.sizes.womenBraLetter, user.sizes.womenBraNumber)

    console.log(user.sizes.menHoodie)

    if (user && user.sizes && user.gender === 'M' ? checkMenSize.length : checkWomenSize.length) {
        productsToShow = multiFilter(productsToShow, user.sizes, user.gender)
    }

    return (
        <InstantSearch searchClient={searchClient} indexName={indexName} searchState={userSearch}>
        <VirtualRefinementList attribute="brand" defaultRefinement={userSearch.refinementList.brand} />
        <VirtualRefinementList attribute="kategorinavn" defaultRefinement={userSearch.refinementList.kategorinavn}  />
        <VirtualRefinementList attribute="size" />
        <VirtualMenu attribute="gender" />
        <VirtualRange attribute="nypris" />
        

        <Background background="image3" />
            {(guestUserModel || modalVisible) &&<DarkenContainer style={{ opacity: 0.4, zIndex: modalVisible ? 0 : 1}}/>}
            <ExploreTopBar searchPress={() => navigation.push('SearchScreen')} favouritePress={() => navigation.push('FavoriteScreen')} profilePress={() => navigation.push('MyProfile')}/>

            <ScrollView style={{marginTop: '18%', paddingLeft: "7%", paddingRight: "7%"}}>
            <MidMargin/>
                <GenericText font={fontFamily.light} textAlign={'left'} size={fontSize.xl}>Hej, se dine tilbud</GenericText>
                <MidMargin/>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={{flexDirection:'row', alignItems: 'center'}}>
                        <GenericText font={fontFamily.bold} textAlign={'left'} size={fontSize.s}>Filter</GenericText>
                        <Image source={require('../../../../assets/filterIcon.png')} style={{ width: 40, height: 25, resizeMode:'contain', marginLeft:'2%'}} />
                    </View>
                </TouchableOpacity>
                <View style={{width:'100%', height:'100%'}}>
                    <ItemList />
                </View>
            </ScrollView>
        { guestUserModel && <GuestLogInPopUp closeRequest={() => setGuestUserModel(!guestUserModel)} modalVisible={guestUserModel}
                                             onLogin={() => navigation.push('Auth', {screen: 'LoginScreen'})} onCreate={() => navigation.push('Auth', {screen: 'SignupScreen'})} /> }
        { modalVisible && <CustomBottomSheet closeHandler={() => {setModalVisible(false)}} />}
        </InstantSearch>
    )
}

export default HomeScreen
