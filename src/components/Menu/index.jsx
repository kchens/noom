import React from 'react'
import { roundToSingleDecimal } from '../../utils'

const Menu = ({ menuItems, addItemToMeal }) => {
  const hasMenuItems = menuItems.length > 0
  const caloriesPerPortion = (item) => roundToSingleDecimal(item.calories / 100 * item.portion).toFixed(1)

  return (
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
            <tr 
              key={i}
              onClick={() => addItemToMeal(item)}
            >
              <td>{item.name}</td>
              <td>{`${caloriesPerPortion(item)}`}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Menu