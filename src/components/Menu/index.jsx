import React from 'react'
import { menuTitle, itemHeader, caloriesPortionHeader, getCaloriesPerPortion } from '../../constants'
import PropTypes from 'prop-types'
import './index.css'


const Menu = ({ menuItems, addItemToMeal }) => {
  const hasMenuItems = menuItems.length > 0

  return (
    <div className='menu'>
      <p><b>{menuTitle}</b></p>
      <table className='menu-table'>
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
              <td>{`${getCaloriesPerPortion(item)}`}</td>
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