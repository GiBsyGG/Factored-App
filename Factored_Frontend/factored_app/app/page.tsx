import styles from "./page.module.css";

import Button from '@mui/material/Button';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <h1 className={styles.title}>Welcome to Factored Employee System!</h1>
        <Button variant="contained">Go To Employees</Button>
      </div>
    </main>
  );
}
