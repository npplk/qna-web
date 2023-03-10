import React, { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { FetchContext } from '../../../store/fetch'

import Button from '../../button'
import Textarea from '../../textarea'
import FormInput from '../../form-input'
import TagInput from '../../tag-input'

import styles from './create-thread-form.module.css'

const FaqForm = () => {
  const router = useRouter()
  const { authAxios } = useContext(FetchContext)

  const [loading, setLoading] = useState(false)

  return (
    <Formik
      initialValues={{ title: '', text: '', tags: [] }}
      onSubmit={async (values, { setStatus, resetForm }) => {
        setLoading(true)
        try {
          await authAxios.post('faq', values)
          resetForm({})
          router.push('/faqs')
        } catch (error) {
          setStatus(error.response.data.message)
        }
        setLoading(false)
      }}
      validationSchema={Yup.object({
        title: Yup.string()
          .required('Title is missing.')
          .max(150, 'Title cannot be longer than 150 characters.')
          .min(15, 'Title must be at least 15 characters.'),
        question: Yup.string()
          .required('Question body is missing.')
          .min(30, 'Body must be at least 30 characters.')
          .max(30000, 'Body cannot be longer than 30000 characters.'),
        answer: Yup.string()
          .required('Answer body is missing.')
          .min(30, 'Body must be at least 30 characters.')
          .max(30000, 'Body cannot be longer than 30000 characters.'),
        tags: Yup.array()
          .required('Please enter at least one tag.')
          .max(5, 'Please enter no more than 5 tags.')
          .of(Yup.string().max(15, 'Tag cannot be longer than 15 characters. '))
      })}
    >
      {({
        values,
        errors,
        touched,
        status,
        handleChange,
        setFieldValue,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.container}>
            <FormInput
              label="Title"
              type="text"
              name="title"
              autoComplete="off"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={touched.title && errors.title}
              errorMessage={errors.title && errors.title}
            />
            <Textarea
              label="Question"
              inputInfo="frequently asked question"
              name="question"
              autoComplete="off"
              value={values.question}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={touched.text && errors.text}
              errorMessage={errors.text && errors.text}
            />
            <Textarea
              label="Answer"
              inputInfo="frequently asked question's' answer"
              name="answer"
              autoComplete="off"
              value={values.answer}
              onChange={handleChange}
              onBlur={handleBlur}
              hasError={touched.text && errors.text}
              errorMessage={errors.text && errors.text}
            />
            <TagInput
              label="Tags"
              inputInfo="Add up to 5 tags to describe what this faq is about"
              type="text"
              name="tags"
              value={values.tags}
              onChange={(e) => setFieldValue('tags', e, true)}
              onBlur={handleBlur}
              hasError={touched.tags && errors.tags}
              errorMessage={errors.tags && errors.tags}
            />
          </div>
          <div className={styles.buttonContainer}>
            <p className={styles.status}>{status}</p>
            <div>
              <Button
                type="submit"
                primary
                isLoading={loading}
                disabled={isSubmitting}
              >
                Post FAQ
              </Button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default FaqForm
