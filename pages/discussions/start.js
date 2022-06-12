import React from 'react';
import Head from 'next/head'

import DiscussionStartView from '../../components/create-thread-view/discussion-start-view'
import Header from '../../components/layout/header'
import DiscussionForm from '../../components/create-thread-view/create-thread-form/discussion-form'

const Start = () => {
  return (
    <div>
      <Head>
        <title>Start a Discussion - NPP Q&A</title>
      </Head>

      <Header />
      <DiscussionStartView>
        <DiscussionForm />
      </DiscussionStartView>
    </div>
  )
}

export default Start