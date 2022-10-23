import React, { createContext, useState, useEffect, useContext } from 'react'

import { publicFetch } from '../util/fetcher'
import { ThreadContext } from './thread'

const TagContext = createContext()
const { Provider } = TagContext

const TagProvider = ({ children }) => {
  const [tagState, setTagState] = useState(null);
  const { threadState } = useContext(ThreadContext);

  useEffect(() => {
    const fetchPopularTags = async () => {
      const { data } = await publicFetch.get(`/tags/populertags/${threadState}`)
      setTagState(data)
    }

    fetchPopularTags()
  }, [threadState])

  return <Provider value={{ tagState }}>{children}</Provider>
}

export { TagContext, TagProvider }
