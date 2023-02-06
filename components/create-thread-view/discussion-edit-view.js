import React from 'react'

import styles from './create-thread-view.module.css'

const DiscussionEditView = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.topForm}>
          <h1>Edit discussion</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default DiscussionEditView
