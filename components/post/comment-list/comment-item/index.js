import React, { useContext } from 'react'
import Link from 'next/link'
import format from 'date-fns/format'

import { AuthContext } from '../../../../store/auth'
import { FetchContext } from '../../../../store/fetch'

import styles from './comment-item.module.css'

const CommentItem = ({
  author,
  created,
  isOwner,
  answerId,
  threadId,
  commentId,
  setThread,
  children
}) => {
  const { authState, isAdmin } = useContext(AuthContext)
  const { authAxios } = useContext(FetchContext)

  const handleDeleteComment = async () => {
    const res = window.confirm('Are you sure delete your comment?')
    if (res) {
      const { data } = await authAxios.delete(
        answerId
          ? `/comment/${threadId}/${answerId}/${commentId}`
          : `/comment/${threadId}/${commentId}`
      )

      setThread(data)
    }
  }

  return (
    <div className={styles.commentContainer}>
      <p>{children} –</p> &nbsp;
      <Link href="/users/[user]" as={`/users/${author.username}`}>
        <a className={isOwner ? styles.owner : undefined}>{author.displayname}</a>
      </Link>
      &nbsp;
      <p className={styles.dateText}>
        {format(new Date(created), "MMM dd'`'yy 'at' k':'mm")}{' '}
      </p>
      {(authState.userInfo?.username === author.username || isAdmin()) && (
        <a className={styles.delete} onClick={() => handleDeleteComment()}>
          delete
        </a>
      )}
    </div>
  )
}

export default CommentItem
