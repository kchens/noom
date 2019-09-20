import { roundToSingleDecimal, calcCaloriesPerPortion } from './utils'

export const menuTitle = 'Menu'
export const itemHeader = 'Item'
export const caloriesPortionHeader = 'Calories/Portion'

export const mealTitle = 'Meal'
export const getMealCaption = (calories) => `Calorie Count: ${calories.toFixed(1)}`
export const portionsHeader = 'Portions'


export const getCaloriesPerPortion = (item) => roundToSingleDecimal(
                                                calcCaloriesPerPortion(item.calories, item.portion)
                                               ).toFixed(1)
