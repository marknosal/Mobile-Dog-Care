import React, { useEffect, useState } from "react"
import Error from "../Error"
import ClientCard from "./ClientCard"
import ExpandedClient from "./ExpandedClient"

export default function Clients() {
    const [clients, setClients] = useState([])
    const [expandedClientId, setExpandedClientId] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch('/clients',)
            .then(response=>response.json())
            .then(data=>setClients(data))
    }, [])

    function expandedClientContainer () {
        console.log('')
    }

    function clientCardContainer() {
        return (
            <div className="client-card-container">
                {clients.map(client => (
                    <div key={client.id} className="client-card">
                        <ClientCard client={client} onExpandClick={handleExpandClick} />
                    </div>
                ))}
            </div>
        )
    }
    function handleExpandClick() {
        console.log('')
    }
    return (
        <div className="clients-main">
            <Error error={error} />
            <div className="client-container">
                {expandedClientId ? expandedClientContainer() : clientCardContainer()}
            </div>
            Clients
        </div>
    )
}