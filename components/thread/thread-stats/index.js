import React from 'react'

import styles from './thread-stats.module.css'

const ThreadStats = ({ voteCount, answerCount = null, view }) => {
  return (
    <div className={styles.container}>
      <div className={styles.vote}>
        <span>{voteCount}</span>
        <p>votes</p>
      </div>
      {answerCount !== null && <div className={styles.answer}>
        <span>{answerCount}</span>
        <p>replies</p>
      </div>}
      <p className={styles.view}>{view} views</p>
    </div>
  )
}

export default ThreadStats
