import React from 'react'

export default function ExpandedClient ({ onExpandClick }) {
  return (
    <div>
        ExpandedClient
        <button onClick={onExpandClick}>X</button>
    </div>
  )
}
