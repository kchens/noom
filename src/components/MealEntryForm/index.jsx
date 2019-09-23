import React from 'react'
import PropTypes from 'prop-types'
import { mealTitle } from '../../constants'
import Meal from '../common/Meal'
import './index.css'


const DEFAULT_MEAL_TYPE = 'breakfast'

class MealEntryForm extends React.PureComponent { 
  constructor(props) {
    super(props)
    this.state = {
      type: DEFAULT_MEAL_TYPE,
    }
  }

  updateMealType = (e) => {
    this.setState({ type: e.target.value })
  }

  updateLoggedMeals = (e) => {
    const { type } = this.state
    const { updateLoggedMeals, resetMeal } = this.props
    e.preventDefault()
    updateLoggedMeals(type)
    resetMeal()
  }

  render() {
    const { meal, hasLunch, hasDinner } = this.props
    
    return (
      <div className="meal">
        <p><b>{mealTitle}</b></p>
        <form onSubmit={this.updateLoggedMeals}>  
          <select onChange={this.updateMealType}>
            {!hasDinner && !hasLunch && <option value="breakfast">Breakfast</option>}
            {!hasDinner && <option value="lunch">Lunch</option>}
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
          <input type="submit" />
        </form>
        <Meal meal={meal} />
      </div>
    )
  }
}


MealEntryForm.propTypes = {
  meal: PropTypes.shape({
    totalCalories: PropTypes.number,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        portion: PropTypes.number,
      })
    )
  })
}

export default MealEntryForm