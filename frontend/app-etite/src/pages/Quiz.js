import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Quiz() {
    const [question, setQuestion] = useState(null)
    const [currQid, setCurrQid] = useState('is_vegetarian')
    const [qids, setQids] = useState([])
    const [isDone, setIsDone] = useState(false)
    const [suggestions, setSuggestions] = useState([])

    const question_map = {
        is_vegetarian: 'is_vegetarian',
        is_served_hot: 'is_served_hot',
        is_spicy: 'is_spicy',
        is_savoury: 'is_savoury',
        is_sweet: 'is_sweet',
        is_crunchy: 'is_crunchy',
        is_high_calorie: 'is_high_calorie',
        high_protein: 'high_protein',
        low_fat: 'low_fat',
        is_baked: 'is_baked',
        is_fried: 'is_fried',
        is_raw: 'is_raw',
        is_steamed: 'is_steamed',
        is_processed: 'is_processed',
        is_crispy: 'is_crispy',
        is_chewy: 'is_chewy',
        is_traditional: 'is_traditional',
        is_fusion: 'is_fusion',
        done: 'Quiz finished' 
    }

    const handleTrue = async() => {
        qids.push({ [currQid]: '1' })
        setQids([...qids])
        const response = await axios.get('/getnextquestion', {params:{answers: qids}})

        setIsDone(response.data.done)
        if(isDone) {
            setSuggestions(response.data.suggestions)
        }

        console.log(suggestions)

        setCurrQid(response.data.nextquestion)
        const nextquestion = question_map[currQid]
        setQuestion(nextquestion)
    }

    const handleFalse = async() => {
        qids.push({ [currQid]: '0' })
        setQids([...qids])
        const response = await axios.get('/getnextquestion', {params:{answers: qids}})

        setIsDone(response.data.done)
        if(isDone) {
            setSuggestions(response.data.suggestions)
        }

        console.log(suggestions)

        setCurrQid(response.data)
        const nextquestion = question_map[currQid]
        setQuestion(nextquestion)
    }

    useEffect(() => {
        const nextquestion = question_map[currQid]
        setQuestion(nextquestion)
    }, [])

    return (
      <div>
          {!isDone && <p>Question</p>}
          {!isDone && <p>{question}</p>}
          {!isDone && <button onClick={handleTrue}>Yes</button>}
          {!isDone && <button onClick={handleFalse}>No</button>}
          {<p>{suggestions}</p>}
      </div>
    )
}

export default Quiz