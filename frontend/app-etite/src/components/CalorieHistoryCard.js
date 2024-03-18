import React from 'react'

function CalorieHistoryCard({date, calories}) {

  const options = { year: 'numeric', month: 'short', day: '2-digit' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);

  return (
    <div>
        <p>{formattedDate}  {calories}</p>
    </div>
  )
}

export default CalorieHistoryCard