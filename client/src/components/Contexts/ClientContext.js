import { createContext, useState, useEffect } from "react";

const ClientContext = createContext([])

function ClientProvider({ children }) {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        fetch('/clients')
            .then(response => response.json())
            .then(data => setClients(data))
    }, [])

    function addClient(newClient) {
        setClients([...clients, newClient]);
    }
    function updateClient(updatedClient) {
        const updatedClients = clients.map(c => c.id === updatedClient.id ? updatedClient : c);
        setClients(updatedClients);
    }


    return (
        <ClientContext.Provider value={{ clients, addClient, updateClient }}>
            { children }
        </ClientContext.Provider>
    )
}

export { ClientContext, ClientProvider }