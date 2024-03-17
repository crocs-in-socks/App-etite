import React from 'react'

function CalorieTracker() {
  return (
    <div>
        <p>Track Calories</p>
        <div>
            <p>69420/2000</p>
            <p>Status text: you're fat</p>
            <form>
                <input placeholder='Enter what you ate'></input>
                <button type='submit'>Submit</button>
            </form>
            <button>Change daily limit</button>
            <p>How much you've eaten before</p>
            <div>
                
            </div>
        </div>
    </div>
  )
}

export default CalorieTracker