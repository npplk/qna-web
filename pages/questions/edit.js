import React, { useEffect, useState } from 'react';
import Head from 'next/head'

import QuestionEditView from '../../components/create-thread-view/question-edit-view'
import Header from '../../components/layout/header'
import QuestionForm from '../../components/create-thread-view/create-thread-form/question-form'
import { publicFetch } from '../../util/fetcher';
import { useRouter } from 'next/router';

const Edit = () => {
  const [question, setQuestion] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const questionId = router.query.post;

    if (questionId) {
      const fetchQuestion = async () => {
        const { data } = await publicFetch.get(`/question/${questionId}`)
        setQuestion(data)
      }
      fetchQuestion()
    }
  }, [router.query.post])

  return (
    <div>
      <Head>
        <title>Edit Question - NPP Q&A</title>
      </Head>

      <Header />
      <QuestionEditView>
        {question && <QuestionForm question={question} />}
      </QuestionEditView>
    </div>
  )
}

export default Edit
