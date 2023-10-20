import React, { useEffect, useState } from "react"
import CompleteRequests from "./CompleteRequests"
import IncompleteRequests from "./IncompleteRequests"
import ExpandedRequest from "./ExpandedRequest"
import Error from "../Error"

export default function Requests( { onUpdateClientDebt }) {
    // state
    const [requests, setRequests] = useState([])
    const [expandedRequestId, setExpandedRequestId] = useState(null)
    const [error, setError] = useState(null)

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
    function handleExpandClick (requestId) {
        expandedRequestId ? setExpandedRequestId(null) : setExpandedRequestId(requestId)
    }
    function handleEditRequest(editedRequest) {
        const updatedRequests = requests.map(r =>
            r.id === editedRequest.id ? editedRequest : r
        )
        setRequests(updatedRequests)
    }
    function handleAddRequest(newRequest) {
        if (newRequest.error) {
            setError(newRequest.error)
        } else {
            const updatedRequests = [...requests, newRequest]
            setRequests(updatedRequests)
        }
    }
    function handleCompleteRequest(updatedRequest) {
        const updatedRequests = requests.map(r => 
            r.id === updatedRequest.id ? updatedRequest : r
        )
        setRequests(updatedRequests)
    }
    function handleDeleteRequest(deletedId) {
        setExpandedRequestId(null)
        const updatedRequests = requests.filter(r => r.id !== deletedId)
        setRequests(updatedRequests)
    }

    function handleClearExpandedRequest() {
        setExpandedRequestId(null)
    }

    
    return (
        <div className="requests-main">
            <Error error={error} />
            {expandedRequestId ? 
                <ExpandedRequest 
                    expandedRequest = {expandedRequest}
                    onCompleteRequest = {handleCompleteRequest} 
                    onEditRequest = {handleEditRequest}
                    onDeleteRequest = {handleDeleteRequest}
                    onExpandClick = {handleExpandClick}
                    onClearExpandedRequest = {handleClearExpandedRequest}
                    onUpdateClientDebt = {onUpdateClientDebt} /> : 
                <IncompleteRequests 
                    incompleteRequests = {incompleteRequests}
                    onAddRequest = {handleAddRequest}
                    setError={setError}
                    onExpandClick = {handleExpandClick} />}
            <CompleteRequests 
                completedRequests = {completedRequests} 
                onExpandClick = {handleExpandClick} />
        </div>
    )
}