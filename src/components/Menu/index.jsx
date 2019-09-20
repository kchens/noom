import React from 'react'
import { roundToSingleDecimal, calcCaloriesPerPortion } from '../../utils'
import { menuTitle, itemHeader, caloriesPortionHeader } from '../../constants'
import PropTypes from 'prop-types'

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

Menu.propTypes = {
  addItemToMeal: PropTypes.func,
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      calories: PropTypes.number,
      portion: PropTypes.number,
    })
  )
}

export default Menu