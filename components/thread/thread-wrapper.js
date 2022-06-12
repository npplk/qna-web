import React from 'react'

import styles from './thread-wrapper.module.css'

const ThreadWrapper = ({ children }) => {
  return <div className={styles.container}>{children}</div>
}

export default ThreadWrapper
