import * as React from 'react'
import BottomSheet from "@gorhom/bottom-sheet"
import styled from 'styled-components/native'
import { GenericText } from "../atoms/GenericText";
import { fontSize } from "../../globals/fonts";
import { colors } from "../../globals/colors";

import {BigSpacer, MiniMargin, SmallMargin} from "../atoms/Margin";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import ItemType from "./ItemTypes";
import {useDispatch, useSelector} from 'react-redux'
import {setCategories, setMaxPrice, setMinPrice} from '../../features/user';
import { clothTypes } from '../../globals/categories';
import {FlatList} from "react-native";
import { ConnectedRange } from './priceRange';
import FlexContainer from '../atoms/FlexContainer';

type Props = {
    closeHandler: () => void
    backButton?: boolean
    priceRange?: any
    loading?: any
}

const BottomSheetBody = styled.View`
    flex: 1;
    padding: 0px 20px 0px 20px;
`

const BottomSheetContainer = styled.View`
    flex: 1;
    zIndex:2
    flex-direction: column;
`

const MarkerStyle = styled.View`
    height:17px
    width:17px
    border-radius:15px
    background:${colors.mainBlack}
`

const SliderView = styled.View`
  width: 100%;
  align-items: center;
`

export const CustomBottomSheet: React.FC<Props> = ({ children, closeHandler }) => {

    const dispatch = useDispatch();
    const priceRange = useSelector((state: any) => state.user.value.priceRange)
    const categories = useSelector((state: any) => state.user.value.categories)

    const updatePrice = (values: React.SetStateAction<number[]>) => {
        dispatch(setPriceRange(values))
    }

    const bottomSheetRef = React.useRef<BottomSheet>(null);
    const userContext = useSelector((state: any) => state.user.value)
    const closeSheet = (event: number) => {
        if (event === 0) closeHandler()
    }


    const saveCategory = (item: string) => {
        let newSelection = []

        if (categories === []){
            newSelection = [item]
            dispatch(setCategories(newSelection))
        }
        if (!categories?.includes(item)) {
            newSelection = [item, ...categories]
            dispatch(setCategories(newSelection))

        } else {
            newSelection = categories.filter((i:any) => i !== item)
            dispatch(setCategories(newSelection))
        }
    }

    return (
        <BottomSheet
            enableContentPanningGesture={false}
            ref={bottomSheetRef}
            index={1}
            snapPoints={['0%', '90%']}
            onChange={(event) => closeSheet(event)}
        >
            <BottomSheetBody>
                <BottomSheetContainer>
                    <SmallMargin/>
                    <GenericText fontWeight={600}textAlign={'left'} size={fontSize.m}>Filter</GenericText>
                    <MiniMargin/>
                    <GenericText fontWeight={700} textAlign={'left'} size={fontSize.l}>jeg leder efter...</GenericText>
                    <SmallMargin />
                    <GenericText fontWeight={600} textAlign={'left'} size={fontSize.s}>Pris</GenericText>
                    <MiniMargin />
                    <FlexContainer alignItems="center" justifyContent="center">
                        <ConnectedRange attribute="nypris" />
                    </FlexContainer>
                    
                    
                    <SmallMargin />
                    <GenericText fontWeight={600} textAlign={'left'} size={fontSize.s}>Kategorier</GenericText>
                    <MiniMargin />
                    
                    <ItemType />
                </BottomSheetContainer>
            </BottomSheetBody>
        </BottomSheet >

    )
}

