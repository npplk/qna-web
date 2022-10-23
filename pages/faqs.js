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
import { getSortingParam } from '../util/util'
import ReactPaginate from 'react-paginate'

const FaqsPage = () => {
  const router = useRouter()

  const [faqs, setFaqs] = useState(null);
  const [sortType, setSortType] = useState('Newest');

  const [paging, setPaging] = useState({
    page: 1,
    count: 0,
    limit: 10,
    totalPages: 0
  });

  const fetchFaqs = async (pageNo = 1) => {
    const { data } = await publicFetch.get('/faqs', { 
      params: { 
        page: pageNo,
        sort: getSortingParam(sortType),
      }
    });
    setFaqs(data.docs);
    setPaging({
      page: data.page,
      count: data.totalDocs,
      limit: data.limit,
      totalPages: data.totalPages
    });

    router.push(`/faqs?page=${data.page}`, undefined, { shallow: true });
  }

  const fetchFaqsByTag = async (pageNo = 1) => {
    const { data } = await publicFetch.get(`/faqs/${router.query.tag}`, { 
      params: { 
        page: pageNo,
        sort: getSortingParam(sortType),
      }
    });
    setFaqs(data.docs);
    setPaging({
      page: data.page,
      count: data.totalDocs,
      limit: data.limit,
      totalPages: data.totalPages
    });

    router.push(`/faqs?tag=${router.query.tag}&page=${data.page}`, undefined, { shallow: true });
  }

  useEffect(() => {
    setPaging({
      page: 1,
      count: 0,
      limit: 10,
      totalPages: 0
    });

    if (router.query.tag) {
      fetchFaqsByTag();
    } else {
      fetchFaqs();
    }
  }, [router.query.tag, sortType]);

  const handlePageClick = (event) => {
    if (router.query.tag) {
      fetchFaqsByTag(event.selected+1);
    } else {
      fetchFaqs(event.selected+1);
    }
  };

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
        ?.map(
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

export default FaqsPage
