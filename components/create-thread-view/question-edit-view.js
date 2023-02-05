import React from 'react'

import styles from './create-thread-view.module.css'

const QuestionEditView = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.topForm}>
          <h1>Edit post</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default QuestionEditView
