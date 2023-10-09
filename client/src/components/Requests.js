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
    function handleEditRequest(editedRequest) {
        const updatedRequests = requests.map(r =>
            r.id === editedRequest.id ? editedRequest : r
        )
        setRequests(updatedRequests)
    }
    function handleAddRequest(newRequest) {
        const updatedRequests = [...requests, newRequest]
        setRequests(updatedRequests)
    }
    function handleCompleteRequest(updatedRequest) {
        const updatedRequests = requests.map(r => 
            r.id === updatedRequest.id ? updatedRequest : r
        )
        setRequests(updatedRequests)
    }

    
    return (
        <div className="requests-main">
            {expandedRequestId ? 
                <ExpandedRequest 
                    expandedRequest = {expandedRequest}
                    onCompleteRequest = {handleCompleteRequest} 
                    onEditRequest = {handleEditRequest} 
                    onExpandClick = {handleRequestClick} /> : 
                <IncompleteRequests 
                    incompleteRequests = {incompleteRequests}
                    onAddRequest = {handleAddRequest}
                    onExpandClick = {handleRequestClick} />}
            <CompleteRequests 
                completedRequests = {completedRequests} 
                onExpandClick = {handleRequestClick} />
        </div>
    )
}