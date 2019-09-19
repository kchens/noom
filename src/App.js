import React from 'react';
import './App.css';
import menuItems from './menuItems.json'

const roundToSingleDecimal = (float) => (Math.round(float * 10) / 10).toFixed(1)
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      meal: {
        // This is what meal looks like.
        // 'chicken': {
        //   portions: 1,
        //   itemDetails: {},
        // }
      },
      menuItems: [],
    }
  }

  componentDidMount() {
    // "fetch" our data
    this.setState({ menuItems })
  }

  addItemToMeal = (item) => {
    const { meal } = this.state
    const newMeal = Object.assign({}, meal)
    if (item.name in newMeal) {
      newMeal[item.name].portion = newMeal[item.name].portion + 1
    } else {
      newMeal[item.name] = {
        portion: 1,
        itemDetails: item
      }
    }
    this.setState({ meal: newMeal })
  }

  render() {
    const { meal, menuItems } = this.state
    const hasMenuItems = menuItems.length > 0
    const mealEntries = Object.entries(meal)
    const hasMeal = mealEntries.length > 0
    let caloriecount
    if (hasMeal) {
      caloriecount = roundToSingleDecimal(
        mealEntries.reduce((acc, entry) => {
          let foodDetails = entry[1]
          return acc + foodDetails.portion * (foodDetails.itemDetails.calories / 100 * (foodDetails.itemDetails.portion) )
        }, 0)
      )
    } else {
      caloriecount = 0
    }
    return (
      <div className="App">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'orange', marginLeft: '1rem', width: '250px' }}>
            <p><b>Menu</b></p>
            <table style={{ width: 'inherit' }}>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Calories/Portion</th>
                </tr>
              </thead>
              <tbody>
                {hasMenuItems && menuItems.map((item, i) =>
                  <tr onClick={() => this.addItemToMeal(item)}>
                    <td>{item.name}</td>
                    <td>{`${roundToSingleDecimal(item.calories / 100 * item.portion)}`}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div style={{ backgroundColor: 'yellow', marginLeft: '1rem', width: '250px' }}>
            <p><b>Meal</b></p>
            <table style={{ width: 'inherit' }}>
              <caption>Calorie Count: {caloriecount}</caption>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Portion</th>
                </tr>
              </thead>
              <tbody>
                {hasMeal && Object.entries(meal).map((entry) => {
                  const food = entry[0]
                  const foodDetails = entry[1]
                  return <tr>
                    <td>{food}</td>
                    <td>{foodDetails.portion}</td>
                  </tr>
                }
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
