import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function NewRequestForm ({ onAddRequest, setNewRequest, newRequest }) {

    const forSchema = yup.object().shape({
        client: yup.string().required('Must exist').min(5),
        pet: yup.string().required('Must exist').min(2),
        details: yup.string().required('Must exist').min(5),
        location: yup.string().required('Must exist').min(5),
        price: yup.number().typeError('Must be number').required('Must exist').min(1.0),
        datetime: yup.string().required('Must exist')
    })

    const formik = useFormik({
        initialValues: {
            client: '',
            pet: '',
            details: '',
            location: '',
            price: '',
            datetime: ''
        },
        validationSchema: forSchema,
        onSubmit: (values) => {
            fetch(`/requests`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })
            .then(response=>response.json())
            .then(data=> {
                    onAddRequest(data)
                    setNewRequest(!newRequest)
                }
            )
        }
    })


    return (
        <div className="request-form-container">
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="client">Client:</label>
                    <input
                        type="text"
                        id="client"
                        name="client"
                        onChange={formik.handleChange}
                        value={formik.values.client}
                    />
                    <p>{formik.errors.client}</p>
                </div>
                <div>
                    <label htmlFor="pet">Pet:</label>
                    <input
                        type='text'
                        id='pet'
                        name='pet'
                        onChange={formik.handleChange}
                        value={formik.values.pet}
                    />
                    <p>{formik.errors.pet}</p>
                </div>
                <div>
                    <label htmlFor="details">Details:</label>
                    <input
                        type="text"
                        id="details"
                        name="details"
                        onChange={formik.handleChange}
                        value={formik.values.details}
                    />
                    <p>{formik.errors.details}</p>
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        onChange={formik.handleChange}
                        value={formik.values.location}
                    />
                    <p>{formik.errors.location}</p>
                </div>
                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    <p>{formik.errors.price}</p>
                </div>
                <div>
                    <label htmlFor="datetime">Date:</label>
                    <input
                        type="datetime-local"
                        id="datetime"
                        name="datetime"
                        onChange={formik.handleChange}
                        value={formik.values.datetime}
                    />
                    <p>{formik.errors.datetime}</p>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}