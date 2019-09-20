import React from 'react'
import { caloriesPortionHeader, getCaloriesPerPortion } from '../../constants'
const getUrl = (newFood) => `https://uih0b7slze.execute-api.us-east-1.amazonaws.com/dev/search?kv=${newFood}`

class SearchInput extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm: '',
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
            fetch(getUrl(searchTerm)).then(res => res.json()).then((foods) => {
                this.setState({ foods })
            })
        }
    }

    render() {
        const { foods } = this.state
        const { addItemToMenu } = this.props
        const hasFoods = foods.length > 0 
        return (
            <div>
                <form onSubmit={this.getNewFoods}>
                    <input
                        onChange={this.updateSearchTerm}
                        placeholder="Enter a food"
                    />
                    <input type="submit" />
                </form>
                <table className='results'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>{caloriesPortionHeader}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hasFoods && foods.map((item, i) =>
                            <tr
                                key={i}
                                onClick={() => addItemToMenu(item)}
                            >
                                <td>{item.name}</td>
                                <td>{item.brand}</td>
                                <td>{`${getCaloriesPerPortion(item)}`}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default SearchInput