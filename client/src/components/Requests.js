import React, { useEffect, useState } from "react"

export default function Requests() {
    const [requests, setRequests] = useState([])
    useEffect(() => {
        fetch('/requests')
            .then(response => response.json())
            .then(data => setRequests(data))
    }, [])
    return (
        <div className="requests-main">
            <div className='requests-incomplete'>
                incomplete
                <hr/>
            </div>
            <div className='requests-complete'>
                complete
                <hr/>
            </div>
        </div>
    )
}