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

const HomePage = () => {
  const router = useRouter()

  const [questions, setQuestions] = useState(null)
  const [sortType, setSortType] = useState('Votes')

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await publicFetch.get('/questions')
      setQuestions(data)
    }

    const fetchQuestionByTag = async () => {
      const { data } = await publicFetch.get(`/questions/${router.query.tag}`)
      setQuestions(data)
    }

    if (router.query.tag) {
      fetchQuestionByTag()
    } else {
      fetchQuestion()
    }
  }, [router.query.tag])

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
          {router.query.tag ? router.query.tag : 'Questions'} - NPP Q&A
        </title>
      </Head>

      <PageTitle
        title={router.query.tag ? `Questions tagged [${router.query.tag}]` : 'All Questions'}
        create='Ask Question'
        createComp='/questions/ask'
        borderBottom={false}
      />

      <ButtonGroup
        borderBottom
        buttons={['Votes', 'Views', 'Newest', 'Oldest']}
        selected={sortType}
        setSelected={setSortType}
      />

      {!questions && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {questions
        ?.sort(handleSorting())
        .map(
          ({
            id,
            votes,
            answers,
            views,
            title,
            text,
            tags,
            author,
            created
          }) => (
            <ThreadWrapper key={id}>
              <ThreadStats
                voteCount={votes.length}
                view={views}
                threadType={THREAD_TYPE.QUESTIONS}
              />
              <ThreadSummary
                type={THREAD_TYPE.QUESTIONS}
                id={id}
                title={title}
                tags={tags}
                author={author}
                createdTime={created}
              >
                {text}
              </ThreadSummary>
            </ThreadWrapper>
          )
        )}
    </Layout>
  )
}

export default HomePage
