import { useRouter } from 'next/router'
import React, { createContext, useState, useEffect } from 'react'
import { THREAD_TYPE } from '../constants'

const ThreadContext = createContext()
const { Provider } = ThreadContext

const ThreadProvider = ({ children }) => {
  const [threadState, setThreadState] = useState(THREAD_TYPE.QUESTIONS)
  const router = useRouter();

  useEffect(() => {
    switch (router.pathname) {
        case "/discussions":
            setThreadState(THREAD_TYPE.DISCUSSIONS)
            break;
        case "/faqs":
            setThreadState(THREAD_TYPE.FAQS)
            break;
        default:
            setThreadState(THREAD_TYPE.QUESTIONS)
            break;
      }
  }, [router.pathname])

  return <Provider value={{ threadState }}>{children}</Provider>
}

export { ThreadContext, ThreadProvider }
