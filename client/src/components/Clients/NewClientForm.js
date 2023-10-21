import React, { useEffect } from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function NewClientForm ({ onShowNewClientForm, setError, onAddClient }) {

    useEffect(() => {
        return () => {
            setError(null)
        }
    }, [])

    const forSchema = yup.object().shape({
        name: yup.string().min(1).max(70).required('Name must exist'),
        address: yup.string().min(10).max(100).required('Address must exist')
    })

    const formik = useFormik({
        initialValues : {
            name: '',
            address: ''
        },
        validationSchema: forSchema,
        onSubmit: (values) => {
            fetch('/clients', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            })
                .then(response=>response.json())
                .then(data => {
                    onAddClient(data)
                    onShowNewClientForm()
                })
        }
    })

    return (
        <div className="new-client-form">
            <h2>New Client Form</h2>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    <p>{formik.errors.name}</p>
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        onChange={formik.handleChange}
                        value={formik.values.address}
                    />
                    <p>{formik.errors.address}</p>
                    <button type="submit">Submit</button>
                    <button onClick={onShowNewClientForm}>Cancel</button>
                </div>
            </form>
            
        </div>
    )
}