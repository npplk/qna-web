import React, { useState, useContext } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { FetchContext } from '../../store/fetch'
import { AuthContext } from '../../store/auth'
import ModalContext from '../../store/modal'

import TextArea from '../textarea'
import Button from '../button'
import styles from './add-response.module.css'

const EditResponse = ({ threadType, threadId, answerId, saveEdit, cancelEdit, text }) => {
  const { authAxios } = useContext(FetchContext)
  const { isAuthenticated } = useContext(AuthContext)
  const { handleComponentVisible } = useContext(ModalContext)

  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={{ text }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true)
        try {
          const { data } = await authAxios.post(`/answer/${threadType}/${threadId}/${answerId}`, values)
          saveEdit(data)
          resetForm({})
        } catch (error) {
          setStatus(error.response.data.message)
        }
        setLoading(false)
      }}
      validationSchema={Yup.object({
        text: Yup.string()
          .required('Body is missing.')
          .min(30, 'Body must be at least 30 characters.')
          .max(30000, 'Body cannot be longer than 30000 characters.')
      })}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form className={styles.container} onSubmit={handleSubmit}>
          <h2>Your answer</h2>
          <TextArea
            name="text"
            autoComplete="off"
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={touched.text && errors.text}
            errorMessage={errors.text && errors.text}
            className={styles.textarea}
          />
          <p className={styles.status}>{status}</p>
          <div className={styles.button}>
            <Button
              type="submit"
              primary
              isLoading={loading}
              disabled={isSubmitting}
              onClick={() => !isAuthenticated() && handleComponentVisible(true, 'signup')}
            >
              Save
            </Button>
            <Button
              secondary
              disabled={isSubmitting}
              onClick={cancelEdit}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default EditResponse
