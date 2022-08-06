import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { publicFetch } from '../util/fetcher'

import Layout from '../components/layout'
import ThreadWrapper from '../components/thread/thread-wrapper'
import ThreadStats from '../components/thread/thread-stats'
import ThreadSummary from '../components/thread/thread-summary'
import PageTitle from '../components/page-title'
import ButtonGroup from '../components/button-group'
import { Spinner } from '../components/icons'
import { THREAD_TYPE } from '../constants'

const FaqsPage = () => {
  const router = useRouter()

  const [faqs, setFaqs] = useState(null);
  const [sortType, setSortType] = useState('Votes');

  useEffect(() => {
    const fetchFaqs = async () => {
      const { data } = await publicFetch.get('/faqs');
      setFaqs(data);
    }

    const fetchFaqsByTag = async () => {
      const { data } = await publicFetch.get(`/faqs/${router.query.tag}`);
      setFaqs(data)
    }

    if (router.query.tag) {
      fetchFaqsByTag();
    } else {
      fetchFaqs();
    }
  }, [router.query.tag]);

  const handleSorting = () => {
    switch (sortType) {
      case 'Votes':
        return (a, b) => b.score - a.score
      case 'Views':
        return (a, b) => b.views - a.views
      case 'Newest':
        return (a, b) => new Date(b.created) - new Date(a.created)
      case 'Oldest':
        return (a, b) => new Date(a.created) - new Date(b.created)
      default:
        break
    }
  }

  return (
    <Layout>
      <Head>
        <title>
          {router.query.tag ? router.query.tag : 'FAQs'} - NPP Q&A
        </title>
      </Head>

      <PageTitle title={router.query.tag ? `FAQs tagged [${router.query.tag}]` : 'All FAQs'}
        create='Add FAQ'
        adminOnly={true}
        createComp='/faqs/add'
        borderBottom={false}
      />

      <ButtonGroup
        borderBottom
        buttons={['Votes', 'Views', 'Newest', 'Oldest']}
        selected={sortType}
        setSelected={setSortType}
      />

      {!faqs && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {faqs
        ?.sort(handleSorting())
        .map(
          ({
            id,
            votes,
            views,
            title,
            question,
            tags,
            author,
            created
          }) => (
            <ThreadWrapper key={id}>
              <ThreadStats
                voteCount={votes.length}
                view={views}
                threadType={THREAD_TYPE.FAQ}
              />
              <ThreadSummary
                type={THREAD_TYPE.FAQ}
                id={id}
                title={title}
                tags={tags}
                author={author}
                createdTime={created}
              >
                {question}
              </ThreadSummary>
            </ThreadWrapper>
          )
        )}
    </Layout>
  )
}

export default FaqsPage
