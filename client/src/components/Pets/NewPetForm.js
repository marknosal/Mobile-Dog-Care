import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";

export default function NewPetForm({ onShowNewPetForm, setError, onAddPet }) {

    useEffect(() => {
        return () => {
            setError(null)
        }
    })

    const forSchema = yup.object().shape({
        name: yup.string().min(2).max(70).required('Must exist'),
        species: yup.string().min(2).max(50).required('Must exist'),
        age: yup.number().min(1).max(3).required('Must exist'),
        notes: yup.string().min(1).max(1000)
    })
    const formik = useFormik({
        initialValues: {
            name: '',
            species: '',
            age: '',
            notes: ''
        },
        validationSchema: forSchema,
        onSubmit: (values) => {
            fetch('/pets', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(response=>response.json())
                .then(data=>onAddPet(data))
        }
    })
    return (
        <div className="new-pet-form">
            <h2>New Pet Form</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        onChange={formik.handleChange}
                        value={formik.values.name} 
                    />
                    <p>{formik.errors.name}</p>
                </div>
                <div>
                    <label htmlFor="species">Species: </label>
                    <input 
                        type="text"
                        id="species"
                        name="species"
                        onChange={formik.handleChange}
                        value={formik.values.species}
                    />
                    <p>{formik.errors.species}</p>
                </div>
                <div>
                    <label htmlFor="age">Age: </label>
                    <input 
                        type="number"
                        id="age"
                        name="age"
                        onChange={formik.handleChange}
                        value={formik.values.age}
                    />
                    <p>{formik.errors.age}</p>
                </div>
                <div>
                    <label htmlFor="notes">Notes: </label>
                    <input
                        type="text"
                        id="notes"
                        name="notes"
                        onChange={formik.handleChange}
                        value={formik.values.notes}
                    />
                    <p>{formik.errors.notes}</p>
                </div>
                <button type="submit">Submit</button>
                <button onClick={onShowNewPetForm}>Cancel</button>
            </form>
        </div>
    )
}