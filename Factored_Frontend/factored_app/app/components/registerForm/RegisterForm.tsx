'use client'

import React, { useState } from 'react'

import TextField from '@mui/material/TextField'
import { cyan } from '@mui/material/colors'
import Button from '@mui/material/Button'
import { Input as BaseInput, InputProps } from '@mui/base/Input';

import { notFound, redirect } from 'next/navigation'

import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation'

import axios from 'axios';

import style from './registerForm.module.css'
import Slider from '@mui/material/Slider'
import { Grid } from '@mui/material'

// Slider Value Label
interface SliderValueLabelProps {
  children: React.ReactElement;
}

function SliderValueLabel({ children }: SliderValueLabelProps) {
  return <span className="valueLabel">{children}</span>;
}

function valuetext(value: number) {
  return `${value}`;
}

export function RegisterForm() {

  const router = useRouter()

  const [errorInput, setErrorInput] = useState(false)
  const [errorText, setErrorText] = useState('')

  const skills = [1, 2, 3, 4, 5]

  const FormSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    try{
      // Create a dictionary of the skills and their values
      let skills_dict: { [key: string]: string } = {} // Add type annotation for skills_dict

      for (let i = 1; i <= 5; i++) {
        const skill = formData.get(`skill${i}`)?.toString()
        const value = formData.get(`value ${i}`)?.toString() // Convert the value to a string
        
        if (skill && value) {
          skills_dict[skill] = value
        }
      }
      
      // Probably not a secure way to send the data with password
      const response = await axios.post('http://localhost:8000/auth/register', {
        email: formData.get('email'),
        hashed_password: formData.get('password'),
        name: formData.get('name'),
        position: formData.get('CompanyPosition'),
        linkedin_url: formData.get('linkedinURL'),
        about_employee: formData.get('bio'),
        skills: skills_dict
      })
      
    
      if (response.status === 201) {
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
    
        // Redirect to the profile page with the employee id
        router.push(`/employees/${employee_id}`)
    }
    } catch (error: any) {
      if (error.response.status === 409) {
        setErrorInput(true)
        setErrorText('User already exists')
      }
    }
  }

  return (

    <form onSubmit={FormSubmitHandler} className={style.form_container}>
      <TextField id="name" name="name" label="Name" type='text' variant="outlined" size='medium' fullWidth required />
      <TextField id="email" name="email" label="Email" type='email' variant="outlined" size='medium' fullWidth required error={errorInput} helperText={errorText} />
      <TextField id="CompanyPosition" name="CompanyPosition" label="Company Position" type='text' variant="outlined" size='medium' fullWidth required />
      <TextField id="linkedinURL" name="linkedinURL" label="LinkedinURL" type='url' variant="outlined" size='medium' fullWidth />
      <textarea id="bio" name="bio" placeholder="About Employee" className={style.bio}/>
      <TextField id="password" name="password" label="Password" type='password' variant="outlined" size='medium' fullWidth required />
      <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm:2, md:3}}>
        {skills.map((skill) => (
          <Grid item key={skill} xs={6}>
            <TextField
              id={`skill${skill}`} 
              name={`skill${skill}`} 
              label={`Skill ${skill}`} 
              type='text' variant="outlined" 
              size='medium' 
              fullWidth 
              required 
            />
            <Slider
              name={`value ${skill}`}
              aria-label={`value ${skill}`}
              defaultValue={3}
              shiftStep={3}
              getAriaValueText={valuetext}
              step={1}
              marks
              min={1}
              max={10}
              slots={{ valueLabel: SliderValueLabel }}
            />
          </Grid>
        ))}
      </Grid>
      
      <Button  
        variant="contained" 
        sx={{bgcolor: "#42B6C5", "&:hover": {bgcolor: cyan[800]}}}
        type="submit"
        >
        <p className={style.btn_text}>Register</p>
      </Button>
    </form>
  )
}