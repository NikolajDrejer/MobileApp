import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    range: {
        nypris: {
            min: 1,
            max: 500
        }
    },
    refinementList: {
        gender: 'herre',
        brand: ['Kenzo'],
        size: [''],
        kategorinavn: ['']
    }
}

export const searchSlice = createSlice({
    name: "search",
    initialState: {value: initialState},
    reducers: {
        setSearchState: (state, action) => {
            state.value = action.payload
        },
        setGender: (state, action) => {
            state.value.refinementList.gender = action.payload
        },
        setBrands: (state, action) => {
            state.value.refinementList.brand = action.payload
        },
        setMinPrice: (state, action) => {
            state.value.range.nypris.min = action.payload
        },
        setMaxPrice: (state, action) => {
            state.value.range.nypris.max = action.payload
        },
        setSizes: (state, action) => {
            state.value.refinementList.size = action.payload
        },
        setCategories: (state, action) => {
            state.value.refinementList.kategorinavn = action.payload
        }
    }
})

export const {setGender, setBrands, setMaxPrice, setMinPrice, setSizes, setCategories, setSearchState} = searchSlice.actions

export default searchSlice.reducer