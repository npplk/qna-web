import React from 'react'
import cn from 'classnames'

import styles from './post-wrapper.module.css'

const PostWrapper = ({ borderBottom = true, isAdminPost = false, adminAnswer = false, children }) => {
  return (
    <div className={cn(styles.layout, borderBottom && styles.borderBottom, isAdminPost && styles.adminPost, adminAnswer && styles.adminAnswer)}>
      {children}
    </div>
  )
}

export default PostWrapper
