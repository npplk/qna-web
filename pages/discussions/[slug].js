import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { publicFetch } from '../../util/fetcher'
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'
import DetailPageContainer from '../../components/detail-page-container'
import PostWrapper from '../../components/post/post-wrapper'
import PostVote from '../../components/post/post-vote'
import PostSummary from '../../components/post/post-summary'
import CommentList from '../../components/post/comment-list'
import CommentItem from '../../components/post/comment-list/comment-item'
import AnswerContainer from '../../components/answer-container'
import AddResponse from '../../components/add-response'
import { Spinner } from '../../components/icons'
import { THREAD_TYPE } from '../../constants'

const DiscussionDetail = ({ discussionId, title }) => {
  const [discussion, setDiscussion] = useState(null)
  const [answerSortType, setAnswersSortType] = useState('Votes')

  useEffect(() => {
    const fetchDiscussion = async () => {
      const { data } = await publicFetch.get(`/discussion/${discussionId}`)
      setDiscussion(data)
    }

    fetchDiscussion()
  }, [])

  const handleSorting = () => {
    switch (answerSortType) {
      case 'Votes':
        return (a, b) => b.score - a.score
      case 'Newest':
        return (a, b) => new Date(b.created) - new Date(a.created)
      case 'Oldest':
        return (a, b) => new Date(a.created) - new Date(b.created)
      default:
        break
    }
  }

  const isClient = typeof window === 'object'

  return (
    <Layout extra={false}>
      <Head>
        {discussion && <title>{discussion.title}</title>}
        {!discussion && <title>{title}</title>}
        <link
          rel="canonical"
          href={isClient ? window.location.href : undefined}
        ></link>
      </Head>

      <DetailPageContainer>
        {!discussion && (
          <div className="loading">
            <Spinner />
          </div>
        )}

        {discussion && (
          <>
            <PageTitle
              title={discussion.title}
              create="Start Discussion"
              createComp="/discussions/start"
            />
            <PostWrapper borderBottom={false}>
              <PostVote
                score={discussion.score}
                votes={discussion.votes}
                threadType={THREAD_TYPE.DISCUSSIONS}
                threadId={discussionId}
                setThread={setDiscussion}
              />
              <PostSummary
                tags={discussion.tags}
                author={discussion.author}
                created={discussion.created}
                threadType={THREAD_TYPE.DISCUSSIONS}
                threadId={discussionId}
              >
                {discussion.text}
              </PostSummary>
              <CommentList
                threadType={THREAD_TYPE.DISCUSSIONS}
                threadId={discussionId}
                setThread={setDiscussion}
              >
                {discussion.comments.map(({ id, author, created, body }) => (
                  <CommentItem
                    key={id}
                    commentId={id}
                    threadId={discussionId}
                    author={author}
                    isOwner={author.username === discussion.author.username}
                    created={created}
                    setThread={setDiscussion}
                  >
                    {body}
                  </CommentItem>
                ))}
              </CommentList>
            </PostWrapper>

            {discussion.answers.length > 0 && (
              <AnswerContainer
                answersCount={discussion.answers.length}
                answerSortType={answerSortType}
                setAnswerSortType={setAnswersSortType}
                threadType={THREAD_TYPE.DISCUSSIONS}
              >
                {discussion.answers.sort(handleSorting()).map((answer) => (
                  <PostWrapper
                    key={answer.id}
                    isAdminPost={answer.author.role === 'admin'}
                  >
                    <PostVote
                      score={answer.score}
                      votes={answer.votes}
                      answerId={answer.id}
                      threadType={THREAD_TYPE.DISCUSSIONS}
                      threadId={discussionId}
                      setThread={setDiscussion}
                    />
                    <PostSummary
                      author={answer.author}
                      created={answer.created}
                      threadType={THREAD_TYPE.DISCUSSIONS}
                      threadId={discussionId}
                      answerId={answer.id}
                      setThread={setDiscussion}
                    >
                      {answer.text}
                    </PostSummary>
                    <CommentList
                      threadType={THREAD_TYPE.DISCUSSIONS}
                      threadId={discussionId}
                      answerId={answer.id}
                      setThread={setDiscussion}
                    >
                      {answer.comments.map(({ id, author, created, body }) => (
                        <CommentItem
                          key={id}
                          commentId={id}
                          threadId={discussionId}
                          answerId={answer.id}
                          author={author}
                          isOwner={
                            author.username === discussion.author.username
                          }
                          created={created}
                          setThread={setDiscussion}
                        >
                          {body}
                        </CommentItem>
                      ))}
                    </CommentList>
                  </PostWrapper>
                ))}
              </AnswerContainer>
            )}
            <AddResponse
              tags={discussion.tags}
              threadType={THREAD_TYPE.DISCUSSIONS}
              threadId={discussionId}
              setResponse={setDiscussion}
            />
          </>
        )}
      </DetailPageContainer>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const slug = context.params.slug
  const discussionId = slug.split('-').shift()
  const title = slug
    ?.substr(slug.indexOf('-') + 1)
    .split('-')
    .join(' ')

  return {
    props: {
      discussionId,
      title
    }
  }
}

export default DiscussionDetail
