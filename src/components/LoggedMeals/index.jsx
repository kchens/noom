import React from 'react'
import Meal from '../common/Meal'
import { loggedMealsTitle } from '../../constants'

import './index.css'

const LoggedMeals = ({ loggedMeals }) => {
  const entries = Object.entries(loggedMeals)
  return (
    <div className='logged-meals'>
      <p><b>{loggedMealsTitle}</b></p>
      {entries.map((entry, i) => {
        const mealTime = entry[0]
        const mealTimeInfo = entry[1]
        return (
          <div key={i}>
            <div>
              {mealTime.toUpperCase()}
            </div>
            <div>
              {mealTimeInfo.count > 0 &&
                mealTimeInfo.meals.map((meal, j) => <Meal key={j} meal={meal} />)
              }
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default LoggedMeals