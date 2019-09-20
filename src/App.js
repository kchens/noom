import React from 'react';
import './App.css';
import Menu from './components/Menu'
import Meal from './components/Meal'
import menuItems from './menuItems.json'
import { roundToSingleDecimal } from './utils'
import { cloneDeep } from 'lodash'

/**
 * Think about delete
 * PropTypes
 * rename menuItems
 * Consolidate utily functions
 * Strings to constants file
 * Classnames
 */

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

    newMeal.totalCalories = newMeal.totalCalories + roundToSingleDecimal(newItem.calories / 100 * newItem.portion)
    newMeal.items = this.incrementItemsPortion(newMeal.items, newItem)
    
    this.setState({ meal: newMeal })
  }

  incrementItemsPortion = (items, newItem) => {
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
    const { meal, menuItems } = this.state

    return (
      <div className="App">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Menu menuItems={menuItems} addItemToMeal={this.addItemToMeal} />
          <Meal meal={meal} />
        </div>
      </div>
    )
  }
}

export default App;
