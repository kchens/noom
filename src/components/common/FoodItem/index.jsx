import React from 'react'
import { getCaloriesPerPortion } from '../../../constants'
import PropTypes from 'prop-types'

class FoodItem extends React.PureComponent {
  addItemToMenuOrMeal = () => {
    this.props.onClick(this.props.item)
  }

  render() {
    const { item } = this.props
    return (
      <tr
        onClick={this.addItemToMenuOrMeal}
      >
        <td>{item.name}</td>
        <td>{item.brand}</td>
        <td>{`${getCaloriesPerPortion(item)}`}</td>
      </tr>
    )
  }
} 

FoodItem.propTypes = {
  onClick: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    calories: PropTypes.number,
    portion: PropTypes.number,
  })
}

export default FoodItem