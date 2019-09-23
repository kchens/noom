import React from 'react'
import { menuTitle } from '../../constants'
import FoodTable from '../common/FoodTable'
import PropTypes from 'prop-types'
import './index.css'

const Menu = ({ menuItems, addItemToMeal }) =>
  <div className='menu'>
    <p><b>{menuTitle}</b></p>
    <FoodTable 
      items={menuItems}
      onFoodItemClick={addItemToMeal}
    />
  </div>


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