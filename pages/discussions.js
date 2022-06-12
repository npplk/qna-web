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

const DiscussionsPage = () => {
  const router = useRouter()

  const [discussions, setDiscussions] = useState(null);
  const [sortType, setSortType] = useState('Votes');

  useEffect(() => {
    const fetchDiscussions = async () => {
      const { data } = await publicFetch.get('/discussions');
      setDiscussions(data);
    }

    const fetchDiscussionsByTag = async () => {
      const { data } = await publicFetch.get(`/discussions/${router.query.tag}`);
      setDiscussions(data)
    }

    if (router.query.tag) {
      fetchDiscussionsByTag();
    } else {
      fetchDiscussions();
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
          {router.query.tag ? router.query.tag : 'Discussions'} - NPP Q&A
        </title>
      </Head>

      <PageTitle title={router.query.tag ? `Discussions tagged [${router.query.tag}]` : 'All Discussions'}
        create='Start Discussion'
        createComp='/discussions/start'
        borderBottom={false}
      />

      <ButtonGroup
        borderBottom
        buttons={['Votes', 'Views', 'Newest', 'Oldest']}
        selected={sortType}
        setSelected={setSortType}
      />

      {!discussions && (
        <div className="loading">
          <Spinner />
        </div>
      )}

      {discussions
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
                answerCount={answers.length}
                view={views}
              />
              <ThreadSummary
                type={THREAD_TYPE.DISCUSSIONS}
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

export default DiscussionsPage
