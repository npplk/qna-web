import React from 'react'

import styles from './create-thread-view.module.css'

const FaqAddView = ({ children }) => {
  return (
    <div className={styles.layout}>
      <div className={styles.container}>
        <div className={styles.topForm}>
          <h1>Add a FAQ</h1>
        </div>
        {children}
      </div>
    </div>
  )
}

export default FaqAddView
