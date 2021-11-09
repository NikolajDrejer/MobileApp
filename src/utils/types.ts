

export type UserId = string

export type RegularSizes = 'XS' | 'S' | 'M' | 'L' | 'XL'

export type Sizes = {
    menShirt?: RegularSizes[];
    menHoodie?: RegularSizes[];
    menPants?: RegularSizes[];
    menPantsNumber?: string[];
    menWaistWidth?: string[];
    menPantsLength?: string[];
    menUnderwear?: RegularSizes[];
    menShoes?: string[];
    womenShirt?: RegularSizes[];
    womenHoodie?: RegularSizes[];
    womenPants?: RegularSizes[];
    womenPantsNumber?: string[];
    womenWaistWidth?: string[];
    womenPantsLength?: string[];
    womenUnderwear?: RegularSizes[];
    womenBraLetter?: string[];
    womenBraNumber?: string[];
    womenShoes?: string[];
}

export type ProductSizes = {
    standardSizes?: string[]
    shoesLabels?: string[]
    waistLabels?: string[]
    lengthLabels?: string[]
    braLiteral?: string[]
    braNumeric?: string[]
    underwearLiteral?: string[]
    underwearNumeric?: string[]
    trouserNumeric?: string[]
    trouserLength?: string[]
}

export const MainCategoryGroups = {
    topWear: ['T-shirts', 'Skjorter', 'Strik'],
    jacket: ['Jakker', 'Sweatshirts'],
    trouser: ['Shorts', 'Bukser', 'Jeans'],
    underwear: ['UnderWear'],
    footwear: ['Sko'],
    bra: ['Bra']
}


export type UserParams  = {
    id?: UserId;
    gender?: 'M' | 'F';
    brands?: string[];
    priceRange?: number[];
    pushToken?: string;
    sizes?: Sizes;
    onBoarding?:boolean;
    favourites?:string[];
}
export type BrandType = {
    id: string
    name: string
    logo: string
}


export type Items = {
    id?: string
    gender?: string
    category?: string
    name?: string
    brand?: string
    brandId?:string
    kategorinavn: string
    price?: number
    logo?: string
    sizes?: string

}
