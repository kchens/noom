import React from 'react';
import './App.css';
import Menu from './components/Menu'
import Meal from './components/Meal'
import menuItems from './menuItems.json'
import { roundToSingleDecimal } from './utils.js'

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
