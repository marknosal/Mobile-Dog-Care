import React from "react";
import { useFormik } from 'formik';
import * as yup from 'yup';

export default function NewRequestForm () {

    const forSchema = yup.object().shape({
        details: yup.string().required('Must exist').min(5),
        location: yup.string().required('Must exist').min(5),
        price: yup.number().typeError('Must be number').required('Must exist').min(1.0)
    })

    const formik = useFormik({
        initialValues: {
            details: '',
            location: '',
            price: ''
        },
        validationSchema: forSchema,
        onSubmit: (values) => {
            fetch('/requests', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            })
                .then(response=>response.json())
                .then(data=>console.log(data))
        }
    })




    return (
        <div>
            NewRequest
        </div>
    )
}