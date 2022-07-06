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
import { RESPONSE_TYPE, THREAD_TYPE } from '../../constants'

const QuestionDetail = ({ questionId, title }) => {
  const [question, setQuestion] = useState(null)
  const [answerSortType, setAnswersSortType] = useState('Votes')

  useEffect(() => {
    const fetchQuestion = async () => {
      const { data } = await publicFetch.get(`/question/${questionId}`)
      setQuestion(data)
    }

    fetchQuestion()
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
        {question && <title>{question.title}</title>}
        {!question && <title>{title}</title>}
        <link
          rel="canonical"
          href={isClient ? window.location.href : undefined}
        ></link>
      </Head>

      <DetailPageContainer>
        {!question && (
          <div className="loading">
            <Spinner />
          </div>
        )}

        {question && (
          <>
            <PageTitle
              title={question.title}
              create="Ask Question"
              createComp="/questions/ask"
            />
            <PostWrapper borderBottom={false}>
              <PostVote
                score={question.score}
                votes={question.votes}
                questionId={questionId}
                setQuestion={setQuestion}
              />
              <PostSummary
                tags={question.tags}
                author={question.author}
                created={question.created}
                questionId={questionId}
              >
                {question.text}
              </PostSummary>
              <CommentList questionId={questionId} setQuestion={setQuestion}>
                {question.comments.map(({ id, author, created, body }) => (
                  <CommentItem
                    key={id}
                    commentId={id}
                    questionId={questionId}
                    author={author.username}
                    isOwner={author.username === question.author.username}
                    created={created}
                    setQuestion={setQuestion}
                  >
                    {body}
                  </CommentItem>
                ))}
              </CommentList>
            </PostWrapper>

            {question.answers.length > 0 && (
              <AnswerContainer
                answersCount={question.answers.length}
                answerSortType={answerSortType}
                setAnswerSortType={setAnswersSortType}
                threadType={THREAD_TYPE.QUESTIONS}
              >
                {question.answers.sort(handleSorting()).map((answer) => (
                  <PostWrapper key={answer.id}>
                    <PostSummary
                      author={answer.author}
                      created={answer.created}
                      questionId={questionId}
                      answerId={answer.id}
                      setQuestion={setQuestion}
                    >
                      {answer.text}
                    </PostSummary>
                    <CommentList
                      questionId={questionId}
                      answerId={answer.id}
                      setQuestion={setQuestion}
                    >
                      {answer.comments.map(({ id, author, created, body }) => (
                        <CommentItem
                          key={id}
                          commentId={id}
                          questionId={questionId}
                          answerId={answer.id}
                          author={author.username}
                          isOwner={author.username === question.author.username}
                          created={created}
                          setQuestion={setQuestion}
                        >
                          {body}
                        </CommentItem>
                      ))}
                    </CommentList>
                  </PostWrapper>
                ))}
              </AnswerContainer>
            )}
            {question.answers.length == 0 && (
              <AddResponse
                tags={question.tags}
                type={RESPONSE_TYPE.ANSWER}
                id={questionId}
                setResponse={setQuestion}
              />
            )}
          </>
        )}
      </DetailPageContainer>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const slug = context.params.slug
  const questionId = slug.split('-').shift()
  const title = slug
    ?.substr(slug.indexOf('-') + 1)
    .split('-')
    .join(' ')

  return {
    props: {
      questionId,
      title
    }
  }
}

export default QuestionDetail
