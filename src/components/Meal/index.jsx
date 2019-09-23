import React from 'react'
import PropTypes from 'prop-types'
import { mealTitle, getMealCaption, portionsHeader, itemHeader } from '../../constants'
import './index.css'

/**
 * get default value for select
 * render loggedMeals state
 *  
 */

class Meal extends React.PureComponent { 
  constructor(props) {
    super(props)
    this.state = {
      type: '',
    }
  }

  updateMealType = (e) => {
    this.setState({ type: e.target.value })
  }

  updateMeals = (e) => {
    const { type } = this.state
    const { updateMeals } = this.props
    e.preventDefault()

    updateMeals(type)
  }

  render() {
    const { meal, meals } = this.props
    const hasMeal = meal.items.length > 0
    const hasLunch = meals['lunch'].length > 0
    const hasDinner = meals['dinner'].length > 0

    // const selectComponent = () => {
      // const myOptions = {
      //   breakfast: ['breakfast', 'lunch', 'dinner'],
      //   lunch: ['lunch', 'dinner'],
      //   dinner: ['dinner'],
      // }
      // go over meals. if we see 'dinner', only render dinner
      // const hasBreakfast = meals['breakfast'].length > 0
      
    // }
    return (
      <div className="meal">
        <p><b>{mealTitle}</b></p>
        <form onSubmit={this.updateMeals}>  
          <select onChange={this.updateMealType}>
            {!hasDinner && !hasLunch && <option value="breakfast">Breakfast</option>}
            {!hasDinner && <option value="lunch">Lunch</option>}
            <option value="dinner">Dinner</option>
          </select>
          <input type="submit" />
        </form>
        <table className="meal-table">
          <caption>{getMealCaption(meal.totalCalories)}</caption>
          <thead>
            <tr>
              <th>{itemHeader}</th>
              <th>{portionsHeader}</th>
            </tr>
          </thead>
          <tbody>
            {hasMeal && meal.items.map((item, i) => {
              return <tr key={i}>
                <td>{item.name}</td>
                <td>{item.portion}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    )
  }
}


Meal.propTypes = {
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

export default Meal