import React from 'react';
import './App.css';
import Menu from './components/Menu'
import Meal from './components/Meal'
import menuItems from './menuItems.json'
import { roundToSingleDecimal, calcCaloriesPerPortion } from './utils'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meal: {
        totalCalories: 0,
        items: []
      },
      menuItems: [],
    }
  }

  componentDidMount() {
    // "fetch" our data
    this.setState({ menuItems })
  }

  addItemToMeal = (newItem) => {
    const { meal } = this.state
    const newMeal = Object.assign({}, meal)

    newMeal.totalCalories = roundToSingleDecimal(newMeal.totalCalories + calcCaloriesPerPortion(newItem.calories, newItem.portion))
    newMeal.items = this.incrementPortionForNewitem(newMeal.items, newItem)

    this.setState({ meal: newMeal })
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
    const { meal, menuItems} = this.state

    return (
      <div className="App">
        <Menu menuItems={menuItems} addItemToMeal={this.addItemToMeal} />
        <Meal meal={meal} />
      </div>
    )
  }
}

export default App;
