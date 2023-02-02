import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import { publicFetch } from '../../util/fetcher'
import Layout from '../../components/layout'
import PageTitle from '../../components/page-title'
import DetailPageContainer from '../../components/detail-page-container'
import PostWrapper from '../../components/post/post-wrapper'
import PostVote from '../../components/post/post-vote'
import PostSummary from '../../components/post/post-summary'
import { Spinner } from '../../components/icons'
import { THREAD_TYPE } from '../../constants'

const FaqDetail = ({ faqId, title }) => {
  const [faq, setFaq] = useState(null)

  useEffect(() => {
    const fetchFaq = async () => {
      const { data } = await publicFetch.get(`/faq/${faqId}`)
      setFaq(data)
    }

    fetchFaq()
  }, [])

  const isClient = typeof window === 'object'

  return (
    <Layout extra={false}>
      <Head>
        {faq && <title>{faq.title}</title>}
        {!faq && <title>{title}</title>}
        <link
          rel="canonical"
          href={isClient ? window.location.href : undefined}
        ></link>
      </Head>

      <DetailPageContainer>
        {!faq && (
          <div className="loading">
            <Spinner />
          </div>
        )}

        {faq && (
          <>
            <PageTitle
              title={faq.title}
              create="Add FAQ"
              adminOnly={true}
              createComp="/faqs/add"
            />
            <PostWrapper key="faq-question" borderBottom={false}>
              <PostVote
                score={faq.score}
                votes={faq.votes}
                threadType={THREAD_TYPE.FAQS}
                threadId={faqId}
                setThread={setFaq}
              />
              <PostSummary
                tags={faq.tags}
                author={faq.author}
                created={faq.created}
                threadType={THREAD_TYPE.FAQS}
                threadId={faqId}
                isUserDetailsVisible={false}
              >
                {faq.question}
              </PostSummary>
            </PostWrapper>
            <PostWrapper
              key="faq-answer"
              adminAnswer={true}
              borderBottom={false}
            >
              <PostSummary
                author={faq.author}
                created={faq.created}
                threadType={THREAD_TYPE.FAQS}
                threadId={faqId}
                isUserDetailsVisible={false}
              >
                {faq.answer}
              </PostSummary>
            </PostWrapper>
          </>
        )}
      </DetailPageContainer>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const slug = context.params.slug
  const faqId = slug.split('-').shift()
  const title = slug
    ?.substr(slug.indexOf('-') + 1)
    .split('-')
    .join(' ')

  return {
    props: {
      faqId,
      title
    }
  }
}

export default FaqDetail
