import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import * as React from 'react'
import { FlatList, View } from 'react-native';
import {HomeStackParams} from "../HomeStackParams";
import { SmallHeader } from '../../../components/atoms/SmallHeader';
import { Background } from '../../../components/atoms/Background';
import { HomeScreenItem } from '../../../components/molecules/HomeScreenItem';
import ScrollContainer from '../../../components/atoms/ScrollContainer';
import { GenericText } from '../../../components/atoms/GenericText';
import { fontSize } from '../../../globals/fonts';

import { useSelector} from 'react-redux';
import {items} from "../../../globals/items";
import { useCognito } from '../../../utils/hooks';
type ScreenRouteProp = RouteProp<HomeStackParams, 'FavoriteScreen'>
type ScreenNavigationProp = StackNavigationProp<HomeStackParams, 'FavoriteScreen'>

type Props = {
    route: ScreenRouteProp
    navigation: ScreenNavigationProp
}
const FavoriteScreen: React.FC<Props> = ({navigation}) => {
    const favorites = useSelector((state: any) => state.user.value.favorites)
    const { signedIn } = useCognito()
    const [guestUserModel, setGuestUserModel] = React.useState<boolean>(false)

    let favouriteItem: any =[]
    items.forEach((item) => {
        if(favorites.includes(item.id))
            favouriteItem.push(item)
    })

    return (
        <>
        <Background background="image3" />
        <ScrollContainer>
            <SmallHeader onPress={() => navigation.goBack()}>Favoritter</SmallHeader>
            <View style={{marginLeft: '5%', marginRight: '5%'}}>
                {favorites?.length <= 0 ?
                    <GenericText size={fontSize.m}>Her gemmer vi dine favoritter</GenericText> : 
                    <FlatList
                        columnWrapperStyle={{justifyContent: 'space-between'}}
                        numColumns={2}
                        data={favorites}
                        keyExtractor={item => item.objectID.toString()}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({item}) => (
                                   <HomeScreenItem item={item} />
                        )

                        }
                    />
                }
            </View>
        </ScrollContainer>
        </>
    )
}

export default FavoriteScreen
