import React from 'react'
import { roundToSingleDecimal, calcCaloriesPerPortion } from '../../utils'
import { menuTitle, itemHeader, caloriesPortionHeader } from '../../constants'

const displayCaloriesPerPortion = (item) => roundToSingleDecimal(
                                              calcCaloriesPerPortion(item.calories, item.portion)
                                            )

const Menu = ({ menuItems, addItemToMeal }) => {
  const hasMenuItems = menuItems.length > 0

  return (
    <div style={{ backgroundColor: 'orange', marginLeft: '1rem', width: '250px' }}>
      <p><b>{menuTitle}</b></p>
      <table style={{ width: 'inherit' }}>
        <thead>
          <tr>
            <th>{itemHeader}</th>
            <th>{caloriesPortionHeader}</th>
          </tr>
        </thead>
        <tbody>
          {hasMenuItems && menuItems.map((item, i) =>
            <tr 
              key={i}
              onClick={() => addItemToMeal(item)}
            >
              <td>{item.name}</td>
              <td>{`${displayCaloriesPerPortion(item)}`}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Menu