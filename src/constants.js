import { roundToSingleDecimal, calcCaloriesPerPortion } from './utils'

export const loggedMealsTitle = 'Logged Meals'

export const foodSearchTitle = 'Food Search'
export const foodSearchPlaceholder = 'Enter a food'
export const getFoodSearchNoResultsMsg = (searchTerm) => `No results for:  '${searchTerm}'`
export const getMinSearchLengthErrorMsg = (minLength) => `Search length must be at least ${minLength} characters long`
export const getFetchErrorMsg = (error) => `Something went wrong: ${error}`

export const menuTitle = 'Menu'
export const brandHeader = 'Brand'
export const itemHeader = 'Item'
export const caloriesPortionHeader = 'Calories/Portion'

export const mealTitle = 'Meal'
export const getMealCaption = (calories) => `Calorie Count: ${calories.toFixed(1)}`
export const portionsHeader = 'Portions'

export const getCaloriesPerPortion = (item) => roundToSingleDecimal(
                                                calcCaloriesPerPortion(item.calories, item.portion)
                                               ).toFixed(1)
