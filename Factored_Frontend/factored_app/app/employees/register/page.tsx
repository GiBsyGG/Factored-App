import React from 'react'

import style from './register.module.css'
import { RegisterForm } from '@/app/components';


function RegisterPage() {

  return (
    <div className={style.page_container}>
      <div className={style.page_content}>
        <h1 className={style.title}>Employee <br /> Register</h1>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage