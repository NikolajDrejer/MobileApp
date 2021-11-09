import {Items, Sizes, MainCategoryGroups} from "./types";

const compareSizes = (criteria: string[] | undefined, product: any) => {
    if (!criteria) return null
    return criteria.includes(product)
}

export const multiFilter = (
    data: Items[],
    filters: Sizes | undefined,
    gender?: string
) => {

    const man = gender === 'M'
    return data.filter((eachObj: Items) => {
        if (!filters) return true

        if (MainCategoryGroups.topWear.includes(eachObj.kategorinavn)) {
            return compareSizes(man ? filters.menShirt : filters.womenShirt, eachObj.sizes )
        }

        if (MainCategoryGroups.jacket.includes(eachObj.kategorinavn)) {
            return compareSizes(man ? filters.menHoodie : filters.womenHoodie, eachObj.sizes)
        }

        if (MainCategoryGroups.trouser.includes(eachObj.kategorinavn)) {
            return (
                compareSizes(man ? filters.menPants : filters.womenPants, eachObj.sizes)
                || compareSizes(man ? filters.menPantsNumber : filters.womenPantsNumber, eachObj.sizes)
                || compareSizes(man ? filters.menWaistWidth : filters.womenWaistWidth, eachObj.sizes)
            )
        }

        if (MainCategoryGroups.underwear.includes(eachObj.kategorinavn)) {
            return compareSizes(man ? filters.menUnderwear : filters.womenUnderwear, eachObj.sizes)
        }

        if (MainCategoryGroups.footwear.includes(eachObj.kategorinavn)) {
            return compareSizes(man ? filters.menShoes : filters.womenShoes, eachObj.sizes)
        }

        if (MainCategoryGroups.bra.includes(eachObj.kategorinavn)) {
            return (
                compareSizes(filters.womenBraLetter, eachObj.sizes)
                || compareSizes(filters.womenBraNumber, eachObj.sizes)
            )
        }

        return true
    })
}
