import React from 'react';
import './App.css';
import Menu from './components/Menu'
import Meal from './components/Meal'
import FoodSearch from './components/FoodSearch'
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
      meals: {
        'breakfast': [],
        'lunch': [],
        'dinner': [],
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

  updateMeals = (type) => {
    const { meal, meals } = this.state
    const newMeals = Object.assign({}, meals)
    
    const newMeal = Object.assign({}, meal)
    newMeal.type = type
    newMeals[type].push(newMeal)

    // TODO: we might want to change meal as well, depending on UI 
    this.setState({ meals: newMeals })
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
    const { meal, menuItems, meals } = this.state

    return (
      <div className="App">
        <FoodSearch addItemToMenu={this.addItemToMenu} />
        <Menu menuItems={menuItems} addItemToMeal={this.addItemToMeal} />
        <Meal meal={meal} meals={meals} updateMeals={this.updateMeals}/>
      </div>
    )
  }
}

export default App;
