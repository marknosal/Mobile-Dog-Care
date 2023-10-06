import React, { useEffect, useState } from "react"
import CompleteRequests from "./CompleteRequests"
import IncompleteRequests from "./IncompleteRequests"

export default function Requests() {
    const [requests, setRequests] = useState([])
    useEffect(() => {
        // fetch requests and set them in state
        fetch('/requests')
            .then(response => response.json())
            .then(data => setRequests(data))
    }, [])
    //filter requests based on 'completed' attribute
    const completedRequests = requests.filter(r => r.completed)
    const incompleteRequests = requests.filter(r => !r.completed)

    
    return (
        <div className="requests-main">
            <CompleteRequests allRequests={completedRequests} />
            <hr/>
            <IncompleteRequests allRequests={incompleteRequests} />
            <hr/>
        </div>
    )
}