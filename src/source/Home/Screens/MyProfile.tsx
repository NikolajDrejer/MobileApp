import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import {useSelector} from 'react-redux';

import {HomeStackParams} from "../HomeStackParams";
import {fontFamily, fontSize} from "../../../globals/fonts";
import {GenericText} from "../../../components/atoms/GenericText";
import GenderButtons from "../../../components/molecules/GenderButtons";
import {ItemSize} from "../../../components/molecules/ItemSize";
import {ItemBrand} from "../../../components/molecules/ItemBrand";
import {brands} from "../../../globals/brands";
import { SmallHeader } from '../../../components/atoms/SmallHeader';
import { Background } from '../../../components/atoms/Background';
import ScrollContainer from '../../../components/atoms/ScrollContainer';
import {shoesLabels, standardLabels, braLettersLabels, waistLabels, numberSizesPants} from '../../../globals/sizes';
import {GuestLogInPopUp} from "../../../components/molecules/GuestLogInPopUp";
import {DarkenContainer} from "../../../components/atoms/DarkContainer";
import {BigMargin, MidMargin, MiniMargin, SmallMargin} from '../../../components/atoms/Margin';
import BrandList from '../../../components/organisms/BrandList';
import { InstantSearch } from 'react-instantsearch-native';
import { searchClient, indexName } from '../../../config';
// import {SizeList} from '../../../components/organisms/SizeList';


type ScreenRouteProp = RouteProp<HomeStackParams, 'MyProfile'>
type ScreenNavigationProp = StackNavigationProp<HomeStackParams, 'MyProfile'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}

const MyProfile: React.FC<Props> = ({navigation}) => {
    const user = useSelector((state: any) => state.user.value)
    const sizes = useSelector((state: any) => state.algolia.value.sizes)
    const [guestUserModel, setGuestUserModel] = React.useState<boolean>(false)
    const [loading, setLoading] = React.useState(true);
    const userSearch = useSelector((state: any) => state.user.value.searchState)
    let man = user.gender === 'M'

    return (
        <InstantSearch searchClient={searchClient} indexName={indexName} searchState={userSearch}  >
            <Background background="image3" />
            {guestUserModel &&<DarkenContainer style={{ opacity: 0.4, zIndex:1}}/>}
            <ScrollContainer>
                <SmallHeader settings={true} settingNav={() => {navigation.push('SettingScreen')}} onPress={() => {navigation.goBack()}}>Min Profil</SmallHeader>

                <GenericText style={{marginLeft: '5%'}} textAlign={'left'} font={fontFamily.bold} size={fontSize.s}>Køn</GenericText>
                <GenderButtons myProfileGender={true} userGender={user?.gender} notLoggedIn={() => setGuestUserModel(!guestUserModel)}/>
                <MiniMargin/>
                <GenericText style={{marginLeft: '5%'}} textAlign={'left'} font={fontFamily.bold} size={fontSize.s}>Mine mærker</GenericText>
                <BrandList attribute="brand" isOnboarding={true} showMore={true} limit={200} />
                
                <SmallMargin/>
                <GenericText style={{marginLeft: '5%'}} textAlign={'left'} font={fontFamily.bold} size={fontSize.s}>Mine størrelser</GenericText>

                <ItemSize userData={man ? user.sizes?.menShirt || []: user.sizes.womenShirt} categoryName={man ? 'menShirt':'womenShirt'}
                          fullSize={user.sizes} notLoggedIn={() => setGuestUserModel(!guestUserModel)} categoryArray={standardLabels}
                          text={'I t-shirts, toppe, skjorter og lignende bruger jeg:'}/>

                <ItemSize userData={man ? user.sizes.menHoodie: user.sizes.womenHoodie} categoryName={man ? 'menHoodie': 'womenHoodie'}
                          fullSize={user.sizes} notLoggedIn={() => setGuestUserModel(!guestUserModel)} categoryArray={standardLabels}
                          text={'I trøjer, bluser, jakker og lignende bruger jeg:'}/>

                <ItemSize userData={man ? user.sizes.menPants: user.sizes.womenPants}  categoryName={man ? 'menPants': 'womenPants'}
                          fullSize={user.sizes} notLoggedIn={() => setGuestUserModel(!guestUserModel)} categoryArray={standardLabels}
                          text={'I jeans, bukser, kjoler og lignende bruger jeg:'}/>

                <ItemSize userData={man ? user.sizes.menPantsNumber: user.sizes.womenPantsNumber}  categoryName={man ? 'menPantsNumber': 'womenPantsNumber'}
                          fullSize={user.sizes} notLoggedIn={() => setGuestUserModel(!guestUserModel)} categoryArray={numberSizesPants}
                          />

                <ItemSize userData={man ? user.sizes.menWaistWidth: user.sizes.womenWaistWidth}  categoryName={man ? 'menWaistWidth': 'womenWaistWidth'}
                          fullSize={user.sizes} notLoggedIn={() => setGuestUserModel(!guestUserModel)} categoryArray={waistLabels}
                          text={'Livvidde på bukser:'}/>

                {!man &&  <ItemSize userData={user.sizes.womenBraLetter}  categoryName='womenBraLetter'
                          fullSize={user.sizes} notLoggedIn={() => setGuestUserModel(!guestUserModel)} categoryArray={braLettersLabels}
                          text={'I lingeri, bh og lignende bruger jeg:'}/>}

                <ItemSize userData={man ? user.sizes.menUnderwear: user.sizes.womenUnderwear}  categoryName={man ? 'menUnderwear': 'womenUnderwear'}
                          fullSize={user.sizes} notLoggedIn={() => setGuestUserModel(!guestUserModel)} categoryArray={standardLabels}
                          text={ man ? 'I undertøj bruger jeg:': 'I undertøj, nattøj og lignende bruger jeg:'}/>

                <ItemSize userData={man ? user.sizes.menShoes: user.sizes.womenShoes} categoryName={man ? 'menShoes': 'womenShoes'}
                          fullSize={user.sizes} notLoggedIn={() => setGuestUserModel(!guestUserModel)} categoryArray={shoesLabels}
                          text={'I sko, støvler, sneakers og lignende bruger jeg:'}/>
                          <MiniMargin/>

                { guestUserModel && <GuestLogInPopUp closeRequest={() => setGuestUserModel(!guestUserModel)}  modalVisible={guestUserModel}
                                     onLogin={() => navigation.push('Auth', {screen: 'LoginScreen'})} onCreate={() => navigation.push('Auth')} /> }

                <SmallMargin />
            </ScrollContainer>
        </InstantSearch>
    )
}

export default MyProfile
