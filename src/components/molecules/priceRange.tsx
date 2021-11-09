import MultiSlider from "@ptomasroos/react-native-multi-slider";
import React from "react";
import { connectRange } from "react-instantsearch-native";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/native";
import { setMinPrice, setMaxPrice } from "../../features/user";
import { colors } from "../../globals/colors";
import PropTypes, { any } from 'prop-types';


const MarkerStyle = styled.View`
    height:17px
    width:17px
    border-radius:15px
    background:${colors.mainBlack}
`

type Props = {
    min: number
    max: number
    refine: any
    currentRefinement: {min: number, max: number}
    canRefine: boolean
}

const PriceRange: React.FC<Props> = ({min, max, refine, currentRefinement, canRefine}) => {
    const dispatch = useDispatch();
    const priceRange = useSelector((state: any) => state.user.value.searchState.range.nypris)
    const [currentValues, setCurrentValues] = React.useState({min: min, max: max} || {min: currentRefinement.min, max: currentRefinement.max})
/*
    const [multiSliderValue, setMultiSliderValue] = React.useState([priceRange.min, priceRange.max]);
    let multiSliderValuesChange = (values: React.SetStateAction<number[]>) => {
        setMultiSliderValue(values);
    }
    React.useEffect(() => {
       // dispatch(setMinPrice(multiSliderValue[0]))
       // dispatch(setMaxPrice(multiSliderValue[1]))
     //  refine({ min: multiSliderValue[0], max: multiSliderValue[1] })
    }, [multiSliderValue]);
*/
    const sliderOneValuesChange = (sliderState: any) => {
        setCurrentValues({min: sliderState[0], max: sliderState[1]});
    };
    const sliderOneValuesChangeFinish = (sliderState: any) => {
        if (
          currentRefinement.min !== sliderState[0] ||
          currentRefinement.max !== sliderState[1]
        ) {
          refine({
            min: sliderState[0],
            max: sliderState[1],
          });
        }
      };
    return(
        <MultiSlider
            values={[currentValues.min, currentValues.max]}
            min={min}
            max={max}
            onValuesChange={sliderOneValuesChange}
            onValuesChangeFinish={sliderOneValuesChangeFinish}
            step={25}
            sliderLength={250}
            customMarker={() => (<MarkerStyle/>)}
            trackStyle={{height:6, bottom:'1%'}}
            selectedStyle={{backgroundColor:colors.mainBlack}}
            unselectedStyle={{backgroundColor:colors.grey}}
            enableLabel={true}
        />
    )
}
export const ConnectedRange = connectRange(PriceRange);