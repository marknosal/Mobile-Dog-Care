import React, { useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"

export default function ExpandedPet({ expandedPet, onExpandPet, onEditPet }) {
    const [editNotes, setEditNotes] = useState(null)
    const forSchema = yup.object().shape({
        notes: yup.string().min(1).required('Must exist'),
    })
    const formik = useFormik({
        initialValues: {
            notes: expandedPet.notes,
        },
        validationSchema: forSchema,
        onSubmit: (values) => {
            fetch(`/pets/${expandedPet.id}`, {
                method: 'PATCH',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(response=>response.json())
                .then(data=>onEditPet(data))
        }
    })

    function editNotesDiv() {
        return (
            <div className="pet-notes-edit">
                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <p>New notes</p>
                        <textarea rows="10" cols="100"
                            type="text"
                            id="notes"
                            name="notes"
                            onChange={formik.handleChange}
                            value={formik.values.notes}
                            style={{ resize: 'none' }}
                        />
                    </div>
                    <button type="submit">Save</button>
                    <button onClick={() => setEditNotes(!editNotes)}>Cancel</button>
                </form>
            </div>
        )
    }

    return (
        <div className="expanded-pet" style={{ position: 'relative'}}>
            <h2>Pet: {expandedPet.id}</h2>
            <h2>Name: {expandedPet.name}</h2>
            {expandedPet.client ? <h2>Owner: {expandedPet.client.name}</h2> : null}
            <h2>Species: {expandedPet.species}</h2>
            <h2>Age: {expandedPet.age}</h2>
            <h2 style={{ display: editNotes ? 'none': 'block' }}>Notes: </h2>
            <p style={{ display: editNotes ? 'none': 'block' }}>{expandedPet.notes}</p>
            <button style={{ position: 'absolute', top: '0px', right: '0px' }} onClick={onExpandPet}>X</button>
            <button style={{ display: editNotes ? 'none': 'block' }} onClick={() => setEditNotes(!editNotes)}>Add to Notes</button>
            {editNotes && editNotesDiv()}
        </div>
    )
}