import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import "../styles/Quiz.css"

import BackButton from "../components/BackButton.js"

function Quiz() {

    const navigate = useNavigate()

    const [question, setQuestion] = useState(null)
    const [currQid, setCurrQid] = useState('is_vegetarian')
    const [qids, setQids] = useState([])
    const [isDone, setIsDone] = useState(false)
    const [suggestions, setSuggestions] = useState([])

    const question_map = {
        is_vegetarian: 'Do you want something vegetarian?',
        is_served_hot: 'Do you want something served hot?',
        is_spicy: 'Something spicy maybe?',
        is_savoury: 'Would you like something savoury?',
        is_sweet: 'How about something sweet?',
        is_crunchy: 'Craving a crunch?',
        is_high_calorie: 'Are you okay with high calories?',
        high_protein: 'Do you want something with high protein?',
        low_fat: 'Looking for low fat?',
        is_baked: 'How about getting baked?',
        is_fried: 'Does fried sound good?',
        is_raw: 'Maybe something raw?',
        is_steamed: 'Do you want something steamed?',
        is_processed: 'Are you okay with something processed?',
        is_crispy: 'How about something crispy?',
        is_chewy: 'Something chewy maybe?',
        is_traditional: 'Would you like something more traditional?',
        is_fusion: 'How about some fusion-cuisine?',
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
        if(isDone && suggestions.length != 0) {
            navigate('/nutrition/' + suggestions[0])
        }
        else {
            navigate('/nutrition/waffles')
        }
    },[isDone])

    return (
      <div className="responsive-container quiz-container">
			<BackButton />
			<h1 className="section-title gradient-text h2-sizing">Food Recommendation Quiz</h1>
			<p className="quiz-question">{question}</p>
			
			<div class="quiz-button-group">
				{!isDone && <button className="quiz-button quiz-button-yes" onClick={handleTrue}>Yes</button>}
				{!isDone && <button className="quiz-button quiz-button-no" onClick={handleFalse}>No</button>}
			</div>

			{/* <p>{suggestions}</p> */}
      </div>
    )
}

export default Quiz