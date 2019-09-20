import React from 'react'

const Meal = ({ meal }) => {
  const hasMeal = meal.items.length > 0

  return (
    <div style={{ backgroundColor: 'yellow', marginLeft: '1rem', width: '250px' }}>
      <p><b>Meal</b></p>
      <table style={{ width: 'inherit' }}>
        <caption>Calorie Count: {meal.totalCalories.toFixed(1)}</caption>
        <thead>
          <tr>
            <th>Item</th>
            <th>Portion</th>
          </tr>
        </thead>
        <tbody>
          {hasMeal && meal.items.map((item, i) => {
            return <tr key={i}>
              <td>{item.name}</td>
              <td>{item.portion}</td>
            </tr>
          }
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Meal