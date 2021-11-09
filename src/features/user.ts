import { createSlice } from '@reduxjs/toolkit'

export const InitialSize = {
    menShirt: [],
    menHoodie: [],
    menPants: [],
    menPantsNumber: [],
    menWaistWidth: [],
    menPantsLength: [],
    menUnderwear: [],
    menShoes: [],
    womenShirt: [],
    womenHoodie: [],
    womenPants: [],
    womenPantsNumber: [],
    womenWaistWidth: [],
    womenPantsLength: [],
    womenUnderwear: [],
    womenBraLetter: [],
    womenBraNumber: [],
    womenShoes: []
}

const initialState = {
    id: 'guest',
    gender: '',
    brands: [],
    priceRange: [50, 2500],
    sizes: InitialSize,
    favorites: [],
    onBoarding: false,
    searchState: {
       range: { 
           nypris:{
               
           }
          
      },
      refinementList: {
          gender: '',
          brand: [],
          kategorinavn: [],
          size: [],
      },
      size:[],

      box: ''
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState: {value: initialState},
    reducers: {
        setUser: (state, action) => {
           state.value = action.payload
        },
        setId: (state, action) => {
            state.value.id = action.payload
        },
        setOnboarding: (state, action) => {
            state.value.onBoarding = action.payload
        },
        setFavorites: (state, action) => {
            state.value.favorites = action.payload
        },
        setSearchState: (state, action) => {
            state.value.searchState = action.payload
        },
        setGender: (state, action) => {
            state.value.searchState.refinementList.gender = action.payload
        },
        setBrands: (state, action) => {
            state.value.searchState.refinementList.brand = action.payload
        },
        setMinPrice: (state, action) => {
            state.value.searchState.range.nypris.min = action.payload
        },
        setMaxPrice: (state, action) => {
            state.value.searchState.range.nypris.max = action.payload
        },
        setSizes: (state, action) => {
            state.value.searchState.size = action.payload
        },
        setBox: (state, action) => {
            state.value.searchState.box = action.payload
        },
        setCategories: (state, action) => {
            state.value.searchState.refinementList.kategorinavn = action.payload
        }
    }
})

export const {setId, setUser, setGender, setBrands, setMaxPrice, setMinPrice, setSizes, setBox, setOnboarding, setFavorites, setCategories, setSearchState} = userSlice.actions

export default userSlice.reducer
