import React, { useEffect, useState } from 'react';
import Head from 'next/head'

import Header from '../../components/layout/header'
import DiscussionForm from '../../components/create-thread-view/create-thread-form/discussion-form'
import DiscussionEditView from '../../components/create-thread-view/discussion-edit-view';
import { useRouter } from 'next/router';
import { publicFetch } from '../../util/fetcher';

const Edit = () => {
    const [discussion, setDiscussion] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const discussionId = router.query.post;

        if (discussionId) {
        const fetchDiscussion = async () => {
            const { data } = await publicFetch.get(`/discussion/${discussionId}`)
            setDiscussion(data)
        }
        fetchDiscussion()
        }
    }, [router.query.post])

  return (
    <div>
      <Head>
        <title>Edit Discussion - NPP Q&A</title>
      </Head>

      <Header />
      <DiscussionEditView>
        {discussion && <DiscussionForm discussion={discussion} />}
      </DiscussionEditView>
    </div>
  )
}

export default Edit