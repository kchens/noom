import React from 'react';
import './App.css';
import Menu from './components/Menu'
import MealEntryForm from './components/MealEntryForm'
import FoodSearch from './components/FoodSearch'
import LoggedMeals from './components/LoggedMeals'
import menuItems from './menuItems.json'
import { roundToSingleDecimal, calcCaloriesPerPortion } from './utils'

/**
 * 1. Users can have multiple meals. Tag it as "Breakfast", "lunch"..
   2. Everytime we add an item, we tag "Breakfast", "lunch"
  => (a) If user tags a meal as "lunch", then they cannot tag a "breakfast". They can tag "dinner"
 */

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meal: {
        totalCalories: 0,
        items: [],
        type: '',
      },
      loggedMeals: {
        breakfast: {
          meals: [],
          count: 0,
        },
        lunch: {
          meals: [],
          count: 0,
        },
        dinner: {
          meals: [],
          count: 0,
        },
        snack: {
          meals: [],
          count: 0,
        }
      },
      menuItems: [],
    }
  }

  componentDidMount() {
    // "fetch" our data
    this.setState({ menuItems })
  }

  addItemToMenu = (item) => {
    const { menuItems } = this.state
    const newMenuItems = menuItems.slice()
    newMenuItems.push(item)
    this.setState({ menuItems: newMenuItems })
  }

  addItemToMeal = (newItem) => {
    const { meal } = this.state
    const newMeal = Object.assign({}, meal)

    newMeal.totalCalories = roundToSingleDecimal(
      newMeal.totalCalories + calcCaloriesPerPortion(newItem.calories, newItem.portion)
    )

    newMeal.items = this.incrementPortionForNewitem(newMeal.items, newItem)

    this.setState({ meal: newMeal })
  }

  updateLoggedMeals = (type) => {
    const { meal, loggedMeals } = this.state

    if (this.mealIsEmpty()) return

    const newLoggedMeals = Object.assign({}, loggedMeals)
    
    const newMeal = Object.assign({}, meal)
    newMeal.type = type
    newLoggedMeals[type].meals.push(newMeal)
    newLoggedMeals[type].count = newLoggedMeals[type].meals.length
    
    this.setState({ meals: newLoggedMeals })
  }

  resetMeal = () => {
    const emptyMeal = {
      totalCalories: 0,
      items: [],
      type: '',
    }
    this.setState({ meal: emptyMeal })
  }

  mealIsEmpty = () => {
    return this.state.meal.items.length === 0
  }

  incrementPortionForNewitem = (items, newItem) => {
    const hasItem = items.filter((item) => item.name === newItem.name).length > 0
    if (hasItem) {
      return items.map((item) => {
        if (item.name === newItem.name) {
          return { name: item.name, portion: item.portion + 1 }
        }
        return item
      })
    } else {
      items.push({ name: newItem.name, portion: 1 })
      return items
    }
  }

  render() {
    const { meal, menuItems, loggedMeals } = this.state
    const hasLunch = loggedMeals.lunch.count > 0
    const hasDinner = loggedMeals.dinner.count > 0

    return (
      <div className="App">
        <div>
          <FoodSearch addItemToMenu={this.addItemToMenu} />
          <Menu menuItems={menuItems} addItemToMeal={this.addItemToMeal} />
        </div>
        <div>
          <MealEntryForm
            meal={meal} 
            hasLunch={hasLunch}
            hasDinner={hasDinner}
            loggedMeals={loggedMeals} 
            updateLoggedMeals={this.updateLoggedMeals} 
            resetMeal={this.resetMeal} 
          />
          <LoggedMeals loggedMeals={loggedMeals} />
        </div>
      </div>
    )
  }
}

export default App;
