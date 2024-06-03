'use client'

import React, { useState } from 'react'

import Button from '@mui/material/Button';

import styles from './logoutButton.module.css'
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter()

  const Logout = () => {
    deleteCookie('accessToken', { path: '/' });
    deleteCookie('employee_id', { path: '/' });
    router.push('/employees/login');
  }

  return (
    <Button variant="contained" color="error" onClick={Logout}>
      <p className={styles.logout_text}>Logout</p>
    </Button>
  )
}
