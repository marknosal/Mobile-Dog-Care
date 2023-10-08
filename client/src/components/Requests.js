import React, { useEffect, useState } from "react"
import CompleteRequests from "./CompleteRequests"
import IncompleteRequests from "./IncompleteRequests"
import ExpandedRequest from "./ExpandedRequest"

export default function Requests() {
    // state
    const [requests, setRequests] = useState([])
    const [expandedRequestId, setExpandedRequestId] = useState(null)

    useEffect(() => {
        // fetch requests and set them in state
        fetch('/requests')
            .then(response => response.json())
            .then(data => setRequests(data))
    }, [])

    //filter requests based on 'completed' attribute
    const completedRequests = requests.filter(r => r.complete)
    const incompleteRequests = requests.filter(r => !r.complete)

    const expandedRequest = requests.find(r => r.id === expandedRequestId)
    //functions
    function handleRequestClick (requestId) {
        expandedRequestId ? setExpandedRequestId(null) : setExpandedRequestId(requestId)
    }
    function handleStateRequests(newRequest) {
        const updatedRequests = requests.map(r =>
            r.id === newRequest.id ? newRequest : r
        )
        setRequests(updatedRequests)
    }

    
    return (
        <div className="requests-main">
            {expandedRequestId ? 
                <ExpandedRequest 
                    expandedRequest = {expandedRequest} 
                    onStateRequests = {handleStateRequests} 
                    onExpandClick = {handleRequestClick} /> : 
                <IncompleteRequests 
                    allRequests={incompleteRequests} 
                    onExpandClick={handleRequestClick} />}
            <CompleteRequests 
                allRequests={completedRequests} 
                onExpandClick={handleRequestClick} />
        </div>
    )
}