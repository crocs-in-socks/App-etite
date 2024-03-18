import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Quiz() {

    const navigate = useNavigate()

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
        done: 'These are your suggestions!' 
    }

    const handleTrue = async() => {
        qids.push({ [currQid]: '1' })
        setQids([...qids])

        const response = await axios.get('/getnextquestion', {params:{answers: qids}})
        const nextqid = response.data.nextquestion
        const done = response.data.done
        const response_suggestions = response.data.suggestions
        
        setCurrQid(nextqid)
        setIsDone(done)
        setSuggestions(response_suggestions)

        // console.log(currQid)
        // console.log(isDone)
        // console.log(suggestions)
    }


    const handleFalse = async() => {
        qids.push({ [currQid]: '0' })
        setQids([...qids])

        const response = await axios.get('/getnextquestion', {params:{answers: qids}})
        const nextqid = response.data.nextquestion
        const done = response.data.done
        const response_suggestions = response.data.suggestions
        
        setCurrQid(nextqid)
        setIsDone(done)
        setSuggestions(response_suggestions)

        // console.log(currQid)
        // console.log(isDone)
        // console.log(suggestions)
    }

    useEffect(() => {
        const nextquestion = question_map[currQid]
        setQuestion(nextquestion)
    }, [currQid])

    useEffect(()=>{
        if(isDone)
        {
            navigate('/nutrition/' + suggestions[0])
        }
    },[isDone])

    return (
      <div>
          <p>Question</p>
          <p>{question}</p>
          {!isDone && <button onClick={handleTrue}>Yes</button>}
          {!isDone && <button onClick={handleFalse}>No</button>}
          <p>{suggestions}</p>
      </div>
    )
}

export default Quiz