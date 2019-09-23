import React from 'react'
import PropTypes from 'prop-types'
import { 
  foodSearchPlaceholder, 
  foodSearchTitle,
  getFoodSearchNoResultsMsg,
  getFetchErrorMsg,
  getMinSearchLengthErrorMsg,
} from '../../constants'
import FoodTable from '../common/FoodTable'
import SearchBar from './SearchBar'
import ErrorMsg from './ErrorMsg'
import './index.css'

const getUrl = (newFood) => `https://uih0b7slze.execute-api.us-east-1.amazonaws.com/dev/search?kv=${newFood}`

const MIN_SEARCH_LENGTH = 3
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
    
    if (searchTerm.length >= MIN_SEARCH_LENGTH) {
      fetch(getUrl(searchTerm))
        .then(res => res.json())
        .then((foods) => {
          const errorMsg = foods.length === 0 ? getFoodSearchNoResultsMsg(searchTerm) : ''
          this.setState({ foods, errorMsg })
        })
        .catch((error) => {
          this.setState({ errorMsg: getFetchErrorMsg(error) })
        })
    } else {
      this.setState({ foods: [], errorMsg: getMinSearchLengthErrorMsg(MIN_SEARCH_LENGTH)})
    }
  }

  render() {
    const { foods, errorMsg } = this.state
    const { addItemToMenu } = this.props
    
    return (
      <div className="food-search">
        <p><b>{foodSearchTitle}</b></p>
        <SearchBar 
          onSubmit={this.getNewFoods}
          onChange={this.updateSearchTerm}
          placeholder={foodSearchPlaceholder}
        />
        <FoodTable 
          items={foods} 
          onFoodItemClick={addItemToMenu}
        />      

        {errorMsg && <ErrorMsg errorMsg={errorMsg} />}
      </div>
    )
  }
}

FoodSearch.propTypes = {
  addItemToMenu: PropTypes.func,
  foods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      calories: PropTypes.number,
      portion: PropTypes.number,
    })
  )
}


export default FoodSearch