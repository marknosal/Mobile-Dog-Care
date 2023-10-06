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

    function handleRequestClick (requestId) {
        if (expandedRequestId === requestId) {
            setExpandedRequestId(null)
        } else {
            setExpandedRequestId(requestId)
        }
    }

    function handleRevertClick () {
        setExpandedRequestId(null)
    }
    
    return (
        <div className="requests-main">
            {expandedRequestId ? <ExpandedRequest expandedRequest={expandedRequest} onRevertClick = {handleRevertClick} /> : <IncompleteRequests allRequests={incompleteRequests} onRequestClick={handleRequestClick} />}
            <hr/>
            <CompleteRequests allRequests={completedRequests} />
            <hr/>
        </div>
    )
}