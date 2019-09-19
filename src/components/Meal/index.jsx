import React from 'react'
import { roundToSingleDecimal } from '../../utils'

const Meal = ({ meal }) => {
  const mealEntries = Object.entries(meal)

  const hasMeal = mealEntries.length > 0

  let caloriecount
  if (hasMeal) {
    caloriecount = roundToSingleDecimal(
      mealEntries.reduce((acc, entry) => {
        let foodDetails = entry[1]
        return acc + foodDetails.portion * (foodDetails.itemDetails.calories / 100 * (foodDetails.itemDetails.portion))
      }, 0)
    )
  } else {
    caloriecount = 0
  }

  return (
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
          {hasMeal && Object.entries(meal).map((entry, i) => {
            const food = entry[0]
            const foodDetails = entry[1]
            return <tr key={i}>
              <td>{food}</td>
              <td>{foodDetails.portion}</td>
            </tr>
          }
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Meal