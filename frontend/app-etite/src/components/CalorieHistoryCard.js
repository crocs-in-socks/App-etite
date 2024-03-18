import React from 'react'

function CalorieHistoryCard({date, calories}) {

  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);

  return (
    <div className="eaten-group">
        <p>{formattedDate}</p>
		<p>{calories} kcal</p>
    </div>
  )
}

export default CalorieHistoryCard