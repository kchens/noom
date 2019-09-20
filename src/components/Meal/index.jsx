import React from 'react'
import PropTypes from 'prop-types'
import { mealTitle, getMealCaption, portionsHeader, itemHeader } from '../../constants'

const Meal = ({ meal }) => {
  const hasMeal = meal.items.length > 0

  return (
    <div style={{ backgroundColor: 'yellow', marginLeft: '1rem', width: '250px' }}>
      <p><b>{mealTitle}</b></p>
      <table style={{ width: 'inherit' }}>
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