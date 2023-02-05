import React from 'react';
import Head from 'next/head'

import QuestionEditView from '../../components/create-thread-view/question-edit-view'
import Header from '../../components/layout/header'
import QuestionForm from '../../components/create-thread-view/create-thread-form/question-form'

const Edit = () => {
  return (
    <div>
      <Head>
        <title>Edit Question - NPP Q&A</title>
      </Head>

      <Header />
      <QuestionEditView>
        <QuestionForm />
      </QuestionEditView>
    </div>
  )
}

export default Ask
