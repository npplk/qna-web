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

const DiscussionsPage = () => {
  const router = useRouter()

  const [discussions, setDiscussions] = useState(null);
  const [sortType, setSortType] = useState('Newest');

  const [paging, setPaging] = useState({
    page: 1,
    count: 0,
    limit: 10,
    totalPages: 0
  });

  const fetchDiscussions = async () => {
    const { data } = await publicFetch.get('/discussions', { 
      params: { 
        page: router.query.page,
        sort: getSortingParam(sortType),
      }
    });
    setDiscussions(data.docs);
    setPaging({
      page: data.page,
      count: data.totalDocs,
      limit: data.limit,
      totalPages: data.totalPages
    });
  }

  const fetchDiscussionsByTag = async () => {
    const { data } = await publicFetch.get(`/discussions/${router.query.tag}`, { 
      params: { 
        page: router.query.page,
        sort: getSortingParam(sortType),
      }
    });
    setDiscussions(data.docs);
    setPaging({
      page: data.page,
      count: data.totalDocs,
      limit: data.limit,
      totalPages: data.totalPages
    });
  }

  useEffect(() => {
    if (router.query.tag) {
      fetchDiscussionsByTag();
    } else {
      fetchDiscussions();
    }
  }, [router.query.tag, router.query.page, sortType]);

  const handlePageClick = (event) => {
    if (router.query.tag) {
      router.push(`/discussions?tag=${router.query.tag}&page=${event.selected+1}`);
    } else {
      router.push(`/discussions?page=${event.selected+1}`);
    }
  };

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
                answerCount={answers.length}
                view={views}
                threadType={THREAD_TYPE.DISCUSSIONS}
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

export default DiscussionsPage
