import React from 'react'
import { useRouter } from 'next/router'

import NavItem from './nav-item'

import styles from './navigation.module.css'

const Navigation = () => {
  const router = useRouter()

  return (
    <nav className={styles.nav}>
      <NavItem
        href="/"
        selected={
          router.pathname == '/' || router.pathname.split('/')[1] == 'questions'
        }
      >
        <span>Q&A</span>
      </NavItem>
      <NavItem href="/discussions" selected={router.pathname == '/discussions'}>
        <span>Discussion</span>
      </NavItem>
      <NavItem href="/faqs" selected={router.pathname == '/faqs'}>
        <span>FAQ</span>
      </NavItem>

      <NavItem href="/tags" selected={router.pathname == '/tags'}>
        <span>Tags</span>
      </NavItem>
      <NavItem
        href="/users"
        selected={router.pathname.split('/')[1] == 'users'}
      >
        <span>Users</span>
      </NavItem>
    </nav>
  )
}

export default Navigation
