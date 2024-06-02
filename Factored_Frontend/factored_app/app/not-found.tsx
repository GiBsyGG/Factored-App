import Button from '@mui/material/Button';

import Link from 'next/link'

import style from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={style.page_container}>
      <h1 className={style.title}>404</h1>
      <h2 className={style.subtitle}>Page Not Found</h2>
      <Button  variant="contained" className={style.button}>
        <Link className={style.link} href="/">Return</Link>
      </Button>
    </div>
  )
}