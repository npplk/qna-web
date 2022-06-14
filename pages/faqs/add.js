import React from 'react';
import Head from 'next/head'

import FaqAddView from '../../components/create-thread-view/faq-add-view'
import Header from '../../components/layout/header'
import FaqForm from '../../components/create-thread-view/create-thread-form/faq-form'

const Add = () => {
  return (
    <div>
      <Head>
        <title>Add a Faq - NPP Q&A</title>
      </Head>

      <Header />
      <FaqAddView>
        <FaqForm />
      </FaqAddView>
    </div>
  )
}

export default Add