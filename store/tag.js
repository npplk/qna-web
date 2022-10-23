import { useRouter } from 'next/router'
import React, { createContext, useState, useEffect } from 'react'

import { publicFetch } from '../util/fetcher'

const TagContext = createContext()
const { Provider } = TagContext

const TagProvider = ({ children }) => {
  const [tagState, setTagState] = useState(null)
  const router = useRouter();

  useEffect(() => {
    const fetchPopularTags = async () => {
      const threadType = router.pathname === "/" ? "/questions" : router.pathname;
      const { data } = await publicFetch.get(`/tags${threadType}/populertags`)
      setTagState(data)
    }

    fetchPopularTags()
  }, [router.pathname])

  return <Provider value={{ tagState }}>{children}</Provider>
}

export { TagContext, TagProvider }
