import React from 'react'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'

import styles from './user-item.module.css'

const UserItem = ({ username, displayname, profilePhoto, created }) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Link href="/users/[username]" as={`/users/${username}`}>
          <a>
            <img src={profilePhoto} alt={username} />
          </a>
        </Link>
      </div>
      <div className={styles.body}>
        <Link href="/users/[username]" as={`/users/${username}`}>
          <a>{displayname}</a>
        </Link>
        <p>
          created{' '}
          {formatDistanceToNowStrict(new Date(created), {
            addSuffix: true
          })}
        </p>
      </div>
    </div>
  )
}

export default UserItem
