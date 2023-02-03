import React from 'react'
import { THREAD_TYPE } from '../../../constants'

import styles from './thread-stats.module.css'

const ThreadStats = ({ voteCount, answerCount = null, threadType, view }) => {
  return (
    <div className={styles.container}>
      <div className={styles.vote}>
        <span>{voteCount}</span>
        <p>votes</p>
      </div>
      {answerCount && (threadType === THREAD_TYPE.QUESTIONS ? 
        <div className={styles.answer}>
          <p className={styles.answered}>answered</p>
        </div> : 
        <div className={styles.answer}>
          <span>{answerCount}</span>
          <p>replies</p>
        </div>)
      }
      <p className={styles.view}>{view} views</p>
    </div>
  )
}

export default ThreadStats
