import React from 'react';
import Head from 'next/head'

import QuestionAskView from '../../components/create-thread-view/question-ask-view'
import Header from '../../components/layout/header'
import QuestionForm from '../../components/create-thread-view/create-thread-form/question-form'

const Ask = () => {
  return (
    <div>
      <Head>
        <title>Ask a Question - NPP Q&A</title>
      </Head>

      <Header />
      <QuestionAskView>
        <QuestionForm />
      </QuestionAskView>
    </div>
  )
}

export default Ask
