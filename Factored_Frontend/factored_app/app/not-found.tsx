import Button from '@mui/material/Button';
import { cyan } from '@mui/material/colors';

import Link from 'next/link'

import style from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={style.page_container}>
      <h1 className={style.title}>404</h1>
      <h2 className={style.subtitle}>Page Not Found</h2>
      <Button  variant="contained" className={style.button} sx={{bgcolor: "#42B6C5", "&:hover": {bgcolor: cyan[800]}}}>
        <Link className={style.link} href="./">Return</Link>
      </Button>
    </div>
  )
}