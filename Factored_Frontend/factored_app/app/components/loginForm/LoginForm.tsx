'use client'

import React, { useState } from 'react'

import TextField from '@mui/material/TextField'
import { cyan } from '@mui/material/colors'
import Button from '@mui/material/Button'

import { notFound, redirect } from 'next/navigation'

import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'

import axios from 'axios';

import style from './loginForm.module.css'

export function LoginForm() {

  const router = useRouter()

  const [errorInput, setErrorInput] = useState(false)
  const [errorText, setErrorText] = useState('')

  const [errorPassword, setErrorPassword] = useState(false)
  const [errorPasswordText, setErrorPasswordText] = useState('')

  const FormSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  
    const formData = new FormData(event.currentTarget)
    try {
      // Probably not a secure way to send the data with password
      const response = await axios.post('http://localhost:8000/auth/login', {
        email: formData.get('email'),
        password: formData.get('password')
      })

      if (response.status === 200) {
        const data = response.data
        const token = data.token
        const employee_id: number = data.employee_id
    
        // Save the token and employee as cookie
        setCookie('accessToken', token, {
          maxAge: 60 * 60, // 1 hour
          path: '/',
        })
    
        setCookie('employee_id', employee_id.toString(), {
          maxAge: 60 * 60, // 1 hour
          path: '/',
        })

        router.push(`/employees/${employee_id}`)
      }
    } catch (error: any) {
        if (error.response.status === 404) {
          setErrorInput(true)
          setErrorText('Invalid email')
        } else if (error.response.status === 401) {
          setErrorPassword(true)
          setErrorPasswordText('Wrong password')
        }
    }
  }

  return (
    <form onSubmit={FormSubmitHandler} className={style.form_container}>
      <TextField id="email" name="email" label="Email" type='email' variant="outlined" size='medium' fullWidth required error={errorInput} helperText={errorText} />
      <TextField id="password" name="password" label="Password" type='password' variant="outlined" size='medium' fullWidth required error={errorPassword} helperText={errorPasswordText} />
      <Button  
        variant="contained" 
        sx={{bgcolor: "#42B6C5", "&:hover": {bgcolor: cyan[800]}}}
        type="submit"
        >
        <p className={style.btn_text}>Login</p>
      </Button>
    </form>
  )
}