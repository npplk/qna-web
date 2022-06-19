import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict'
import { getAvatar } from '../../../util/avatar'
import { publicFetch } from '../../../util/fetcher'

import { Spinner } from '../../icons'

import styles from './avatar-card.module.css'

const UserAvatar = ({ username }) => {
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await publicFetch.get(`/user/${username}`)
      setUserInfo(data)
    }

    fetchUser()
  }, [username])

  return (
    <div>
      <div className={styles.avatarCard}>
        {!userInfo ? (
          <div className="loading">
            <Spinner />
          </div>
        ) : (
          <div className={styles.avatar}>
            <Link href="/users/[username]" as={`/users/${username}`}>
              <a>
                <img
                  src={getAvatar(userInfo, 164)}
                  alt={username}
                />
              </a>
            </Link>
          </div>
        )}
        {userInfo && <h2 className={styles.displayname}>{userInfo.displayname}</h2>}
        <h4 className={styles.username}>({username})</h4>
        {!userInfo ? (
          <div className="loading">
            <Spinner />
          </div>
        ) : (
          <div className={styles.created}>
            <p>
              Created:{' '}
              <span>
                {formatDistanceToNowStrict(new Date(userInfo.created), {
                  addSuffix: true
                })}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserAvatar
