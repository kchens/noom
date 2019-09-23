import React from 'react'
import { menuTitle, brandHeader, itemHeader, caloriesPortionHeader } from '../../constants'
import FoodItem from '../common/FoodItem'
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
            <th>{brandHeader}</th>
            <th>{caloriesPortionHeader}</th>
          </tr>
        </thead>
        <tbody>
          {hasMenuItems && menuItems.map((item) =>
            <FoodItem key={item.id} item={item} onClick={addItemToMeal} />
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