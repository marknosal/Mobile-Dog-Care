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
        return (
            <ExpandedClient onExpandClick={handleExpandClick} />
        )
    }

    function clientCardContainer() {
        return (
            <div className="client-card-container">
                {clients.map(client => (
                        <ClientCard key={client.id} client={client} onExpandClick={handleExpandClick} />
                ))}
            </div>
        )
    }
    function handleExpandClick(id) {
        expandedClientId ? setExpandedClientId(null) : setExpandedClientId(id)
    }
    return (
        <div className="clients-main">
            <Error error={error} />
            <div className="client-container">
                <h2>{expandedClientId ? "Client" : "Clients"}</h2>
                {expandedClientId ? expandedClientContainer() : clientCardContainer()}
            </div>
        </div>
    )
}