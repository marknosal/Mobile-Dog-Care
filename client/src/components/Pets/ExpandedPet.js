import React from "react"

export default function ExpandedPet({ expandedPet, onExpandPet }) {
    return (
        <div className="expanded-pet" style={{ position: 'relative'}}>
            <h2>Name: {expandedPet.name}</h2>
            <h2>Species: {expandedPet.species}</h2>
            <h2>Age: {expandedPet.age}</h2>
            <h2>Notes: </h2>
            <p>{expandedPet.notes}</p>
            <button style={{ position: 'absolute', top: '0px', right: '0px' }} onClick={onExpandPet}>X</button>
        </div>
    )
}