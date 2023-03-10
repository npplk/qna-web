import React from 'react'

import styles from './create-thread-view.module.css'

const DiscussionStartView = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.topForm}>
          <h1>Start a public discussion</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default DiscussionStartView
