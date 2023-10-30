import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

export default function ExpandedClient({ expandedClient, onExpandClick, onUpdateClient }) {

  const forSchema = yup.object().shape({
    amountToCollect: yup.number().min(1).required('Must exist'),
  })
  const formik = useFormik({
    initialValues: {
      payment: expandedClient.debt,
    },
    validationSchema: forSchema,
    onSubmit: (values) => {
      const newDebt = expandedClient.debt - formik.values.payment
      fetch(`/clients/${expandedClient.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ debt: newDebt })
      })
      .then(response => response.json())
      .then(data => {
        onUpdateClient(data)
        onExpandClick()
      })
    }
  })

  return (
    <div style={{ position: 'relative' }}>
      <h2>Client: {expandedClient.id}</h2>
      <h2>Name: {expandedClient.name}</h2>
      <h2>Address: {expandedClient.address}</h2>
      <h2>Debt: {expandedClient.debt}</h2>

      {expandedClient.debt !== 0 && (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor='amountToCollect'>Payment: </label>
              <input
                type='number'
                id='payment'
                name='payment'
                onChange={formik.handleChange}
                value={formik.values.payment}
              />
              <p>{formik.errors.payment}</p>
            </div>
            <button type='submit'>Collect Payment</button>
          </form>
        </div>
      )}
      <button style={{ position: 'absolute', top: '0px', right: '0px' }} onClick={onExpandClick}>X</button>
    </div>
  )
}
