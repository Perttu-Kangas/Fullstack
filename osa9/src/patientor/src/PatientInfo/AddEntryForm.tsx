import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'

import { TextField } from './FormField'
import { BaseEntry } from '../types'

export type EntryFormValues = Omit<BaseEntry, 'id'>

interface Props {
  onSubmit: (values: EntryFormValues) => void
  onCancel: () => void
}

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required'
        const errors: { [field: string]: string } = {}
        if (!values.description) {
          errors.description = requiredError
        }
        if (!values.date) {
          errors.date = requiredError
        }
        if (!values.specialist) {
          errors.specialist = requiredError
        }
        return errors
      }}>
      {({ isValid, dirty }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Desc'
              placeholder='Desc'
              name='Desc'
              component={TextField}
            />
            <Field
              label='Date'
              placeholder='YYYY-MM-DD'
              name='Date'
              component={TextField}
            />
            <Field
              label='Specialist'
              placeholder='Specialist'
              name='Specialist'
              component={TextField}
            />
            <Grid>
              <Grid item>
                <Button
                  color='secondary'
                  variant='contained'
                  style={{ float: 'left' }}
                  type='button'
                  onClick={onCancel}>
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type='submit'
                  variant='contained'
                  disabled={!dirty || !isValid}>
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddEntryForm
