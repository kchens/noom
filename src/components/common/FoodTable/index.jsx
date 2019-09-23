import React from 'react'
import { brandHeader, 
  itemHeader, 
  caloriesPortionHeader 
} from '../../../constants'
import FoodItem from '../FoodItem'
import PropTypes from 'prop-types'
import './index.css'


const FoodTable = ({items, onFoodItemClick}) => {
  const hasItems = items.length > 0
  return (
    <table className="table">
      <thead>
        <tr>
          <th>{itemHeader}</th>
          <th>{brandHeader}</th>
          <th>{caloriesPortionHeader}</th>
        </tr>
      </thead>
      <tbody>
        {hasItems && items.map((item) =>
          <FoodItem key={item.id} item={item} onClick={onFoodItemClick} />
        )}
      </tbody>
    </table>
  )
}


FoodTable.propTypes = {
  onFoodItemClick: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      calories: PropTypes.number,
      portion: PropTypes.number,
    })
  )
}

export default FoodTable
  