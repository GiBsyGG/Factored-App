import React from 'react'

import style from './login.module.css'
import { LoginForm } from '@/app/components';


function LoginPage() {

  return (
    <div className={style.page_container}>
      <div className={style.page_content}>
        <h1 className={style.title}>Employee <br /> Login</h1>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage