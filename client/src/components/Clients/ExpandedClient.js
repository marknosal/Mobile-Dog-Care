import React from 'react'

export default function ExpandedClient ({ expandedClient, onExpandClick }) {
  return (
    <div style={{ position: 'relative' }}>
        <h2>Client: {expandedClient.id}</h2>
        <h2>Name: {expandedClient.name}</h2>
        <h2>Address: {expandedClient.address}</h2>
        <h2>Debt: {expandedClient.debt}</h2>
        <button style={{ position: 'absolute', top: '0px', right: '0px' }} onClick={onExpandClick}>X</button>
    </div>
  )
}
