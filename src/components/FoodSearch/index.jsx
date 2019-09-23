import React from 'react'
import PropTypes from 'prop-types'
import { 
  foodSearchPlaceholder, 
  brandHeader, 
  itemHeader, 
  caloriesPortionHeader, 
  foodSearchTitle,
  getFoodSearchNoResultsMsg,
  getFetchErrorMsg,
} from '../../constants'
import FoodItem from '../common/FoodItem'
import SearchBar from '../common/SearchBar'
import './index.css'

const getUrl = (newFood) => `https://uih0b7slze.execute-api.us-east-1.amazonaws.com/dev/search?kv=${newFood}`


class FoodSearch extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
        searchTerm: '',
        errorMsg: '',
        foods: []
    }
  }

  updateSearchTerm = (e) => {
    this.setState( {searchTerm: e.target.value} )
  }

  getNewFoods = (e) => {
    e.preventDefault()
    const { searchTerm } = this.state
    
    if (searchTerm.length >= 3) {
      fetch(getUrl(searchTerm))
        .then(res => res.json())
        .then((foods) => {
          const errorMsg = foods.length === 0 ? getFoodSearchNoResultsMsg(searchTerm) : ''
          this.setState({ foods, errorMsg })
        })
        .catch((error) => {
          this.setState({ errorMsg: getFetchErrorMsg(error) })
        })
    }
  }

  renderItem = (item) => {
    const { addItemToMenu } = this.props
    return <FoodItem key={item.id} item={item} onClick={addItemToMenu} />
  }

  render() {
    const { foods, errorMsg } = this.state
    const hasFoods = foods.length > 0 

    return (
      <div className="food-search">
        <p><b>{foodSearchTitle}</b></p>
        <SearchBar 
          onSubmit={this.getNewFoods}
          onChange={this.updateSearchTerm}
          placeholder={foodSearchPlaceholder}
        />

        <table className="results">
          <thead>
            <tr>
              <th>{itemHeader}</th>
              <th>{brandHeader}</th>
              <th>{caloriesPortionHeader}</th>
            </tr>
          </thead>
          <tbody>
            {hasFoods && foods.map(this.renderItem)}
          </tbody>
        </table>
        
        {errorMsg && <div>{`${errorMsg}`}</div>}
      </div>
    )
  }
}

FoodSearch.propTypes = {
  addItemToMenu: PropTypes.func,
}


export default FoodSearch