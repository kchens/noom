import React from 'react'
import PropTypes from 'prop-types'
import { getMealCaption, portionsHeader, itemHeader } from '../../../constants'

import './index.css'

const Meal = ({ meal }) => {
  const hasMeal = meal.items.length > 0

  return (
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

  )
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