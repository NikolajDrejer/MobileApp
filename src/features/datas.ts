import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    brands: [],
    sizes: [],
    categories: []
}

export const algoliaSlice = createSlice({
    name: "algolia",
    initialState: {value: initialState},
    reducers: {
        setAlgolia: (state, action) => {
            state.value = action.payload
        },
        setAlgoliaBrands: (state, action) => {
            state.value.brands = action.payload
        },
        setAlgoliaSizes: (state, action) => {
            state.value.sizes = action.payload
        },
        setAlgoliaCategories: (state, action) => {
            state.value.categories = action.payload
        }
    }
})

export const {setAlgolia, setAlgoliaBrands, setAlgoliaSizes, setAlgoliaCategories} = algoliaSlice.actions

export default algoliaSlice.reducer