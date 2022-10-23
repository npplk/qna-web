import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import ReactPaginate from 'react-paginate';
import { publicFetch } from '../util/fetcher'

import Layout from '../components/layout'
import ThreadWrapper from '../components/thread/thread-wrapper'
import ThreadStats from '../components/thread/thread-stats'
import ThreadSummary from '../components/thread/thread-summary'
import PageTitle from '../components/page-title'
import ButtonGroup from '../components/button-group'
import { Spinner } from '../components/icons'
import { THREAD_TYPE } from '../constants'
import { getSortingParam } from '../util/util';

const HomePage = () => {
  const router = useRouter()

  const [questions, setQuestions] = useState(null)
  const [page, setPage] = useState(1);
  const [paging, setPaging] = useState({
    page: 1,
    count: 0,
    limit: 10,
    totalPages: 0
  })
  const [sortType, setSortType] = useState('Newest')

  const fetchQuestion = async (pageNo = 1) => {
    const { data } = await publicFetch.get('/questions', { 
      params: { 
        page: pageNo,
        sort: getSortingParam(sortType),
      }
    })
    setQuestions(data.docs);
    setPaging({
      page: data.page,
      count: data.totalDocs,
      limit: data.limit,
      totalPages: data.totalPages
    });

    router.push(`/?page=${data.page}`, undefined, { shallow: true });
  }
  
  const fetchQuestionByTag = async (pageNo = 1) => {
    const { data } = await publicFetch.get(`/questions/${router.query.tag}`, { 
      params: { 
        page: pageNo,
        sort: getSortingParam(sortType),
      }
    })
    setQuestions(data.docs);
    setPaging({
      page: data.page,
      count: data.totalDocs,
      limit: data.limit,
      totalPages: data.totalPages
    });

    router.push(`/?tag=${router.query.tag}&page=${data.page}`, undefined, { shallow: true });
  }
  
  useEffect(() => {
    setPaging({
      page: 1,
      count: 0,
      limit: 10,
      totalPages: 0
    });

    if (router.query.tag) {
      fetchQuestionByTag();
    } else {
      fetchQuestion();
    }
  }, [router.query.tag, sortType]);

  const handlePageClick = (event) => {
    if (router.query.tag) {
      fetchQuestionByTag();
    } else {
      fetchQuestion(event.selected+1);
    }
  };

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
        ?.map(
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
        {paging.count &&
          <ReactPaginate
            forcePage={paging.page-1}
            previousLabel="<"
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={paging.totalPages}
            renderOnZeroPageCount={null}
            containerClassName="paging-ul"
            pageClassName="paging-li"
            previousClassName="paging-li"
            nextClassName="paging-li"
            pageLinkClassName="paging-link"
            previousLinkClassName="paging-link"
            nextLinkClassName="paging-link"
            activeClassName="current-page"
          />}
    </Layout>
  )
}

export default HomePage
