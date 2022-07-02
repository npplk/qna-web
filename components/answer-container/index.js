import React from 'react'
import cn from 'classnames'
import { THREAD_TYPE } from '../../constants'

import ButtonGroup from '../button-group'

import styles from './answer-container.module.css'

const AnswerContainer = ({
  answersCount,
  answerSortType,
  setAnswerSortType,
  threadType,
  children
}) => {
  return (
    <div className={cn(styles.container, threadType === THREAD_TYPE.QUESTIONS && styles.adminAnswer)}>
      {threadType === THREAD_TYPE.DISCUSSIONS && <div className={styles.header}>
        <div className={styles.fill}>
          <h2>{answersCount} Replies</h2>
        </div>
        <ButtonGroup
            buttons={['Votes', 'Newest', 'Oldest']}
            selected={answerSortType}
            setSelected={setAnswerSortType}
          />
      </div>}
      {children}
    </div>
  )
}

export default AnswerContainer
