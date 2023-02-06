import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import { AuthContext } from '../../../store/auth'
import { FetchContext } from '../../../store/fetch'

import Tag from '../../tag'

import styles from './post-summary.module.css'
import { getAvatar } from '../../../util/avatar'
import EditResponse from '../../add-response/edit'

const PostSummary = ({
  tags,
  author,
  created,
  threadType,
  threadId,
  answerId,
  setThread,
  isUserDetailsVisible = true,
  children
}) => {
  const [isEdit, setIsEdit] = useState();
  const { authState, isAdmin } = useContext(AuthContext)
  const { authAxios } = useContext(FetchContext)
  const router = useRouter()

  const handleEdit = () => {
    if (answerId) {
      setIsEdit(true);
    } else {
      router.push(`/${threadType}/edit?post=${threadId}`);
    }
  }

  const saveEdit = (update) => {
    setIsEdit(false);
    setThread(update);
  }

  const cancelEdit = () => {
    setIsEdit(false);
  }

  const handleDelete = async () => {
    const res = window.confirm('Are you sure delete your post?')
    if (res) {
      const { data } = await authAxios.delete(
        answerId
          ? `/answer/${threadType}/${threadId}/${answerId}`
          : `${threadType}/${threadId}`
      )

      if (answerId) {
        setThread(data)
      } else {
        router.push(`/${threadType}`)
      }
    }
  }

  return (
    <div className={styles.postCell}>
      {isEdit? 
        <EditResponse 
          threadType={threadType}
          threadId={threadId}
          answerId={answerId}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
          text={children}
        /> : 
        <>  
          <div className={styles.text}>{children}</div>
          <div className={styles.footer}>
            <div className={styles.row}>
              <div className={styles.tagContainer}>
                {tags?.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
              {isUserDetailsVisible && <div className={styles.userDetails}>
                <Link href="/users/[user]" as={`/users/${author.username}`}>
                  <a>
                    <img
                      src={getAvatar(author, 32)}
                      alt={author.username}
                    />
                  </a>
                </Link>
                <div className={styles.info}>
                  <span>
                    {tags ? 'asked' : 'answered'}{' '}
                    {formatDistanceToNowStrict(new Date(created), {
                      addSuffix: true
                    })}
                  </span>
                  <Link href="/users/[user]" as={`/users/${author.username}`}>
                    <a>{author.displayname}</a>
                  </Link>
                </div>
              </div>}
            </div>
            {(authState.userInfo?.id === author.id || isAdmin()) && (
              <div className={styles.row}>
                <a className={styles.delete} onClick={() => handleEdit()}>
                  edit
                </a>
                |
                <a className={styles.delete} onClick={() => handleDelete()}>
                  delete
                </a>
              </div>
            )}
          </div>
        </>
      }
    </div>
  )
}

export default PostSummary
