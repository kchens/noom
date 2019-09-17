import React from 'react';
import './App.css';
import menuItems from './menuItems.json'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meal: [],
      menuItems: [],
    }
  }

  componentDidMount() {
    this.setState({ menuItems })
  }

  addItemToMeal = (item) => {
    const { meal } = this.state
    const newMeal = meal.slice()
    newMeal.push(item)
    this.setState({ meal: newMeal })
  }

  render() {
    const { meal, menuItems } = this.state
    const hasMenuItems = menuItems.length > 0
    const hasMeal = meal.length > 0
    let caloriecount
    if (hasMeal) {
      caloriecount = (Math.round(meal.reduce((acc, item) => acc + (item.portion * (item.calories / 100)), 0) * 10) / 10).toFixed(1)
    } else {
      caloriecount = 0
    }
    return (
      <div className="App">
        {/* Users can add an arbitrary number of food items to each meal.
Food items are given in an array. Each item conforms to the following schema:
{id: String, name: String, calories: int, portion: int}
      `calories` is number of calories per 100g.
      `portion` is size of a single portion in grams.
      For each meal, calculate the total number of calories based on the number of portions logged for each food item.
      We don’t care about the prototype looking good in a browser. We want to see how you organize your code, how you consider corner cases, and how aware you are of browser limitations.     */}
        <div>
          <div style={{ backgroundColor: 'orange', float: 'left', marginLeft: '1rem' }}>
            <div><b>Menu</b></div>
            {hasMenuItems && menuItems.map((item, i) => 
              <div onClick={() => this.addItemToMeal(item) }>{item.name}</div>
            )}
          </div>
          <div>
            <div style={{ backgroundColor: 'yellow', float: 'left', marginLeft: '1rem' }}>
              <div><b>Meal</b></div>
              <div>Calorie Count: {caloriecount}</div>
              {hasMeal && meal.map((item) => 
                <div>{item.name}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
