import React from 'react'
import Image from 'next/image'

import { ImProfile } from "react-icons/im";
import { FaUserEdit } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";

import { SidebarItem } from '@/app/components'
import { LogoutButton } from '@/app/components';


import styles from './sidebar.module.css'

import List from '@mui/material/List';
import { getCookie } from 'cookies-next';

const GetMenuItems = () => {

  const menuItems = [
    {
      path: '/employees/login',
      icon: <FaUserLarge  size={40} />,
      title: 'Login',
      subTitle: 'Employee Login'
    },
    {
      path: '/employees/register',
      icon: <FaUserEdit size={40} />,
      title: 'Register',
      subTitle: 'Employee Registration'
    },
    {
      path: '/employees',
      icon: <FaUsers size={40} />,
      title: 'Employees',
      subTitle: 'Factored Team Members'
    },
    // {
    //   path: `/employees/`,
    //   icon: <ImProfile size={40} />,
    //   title: 'My profile',
    //   subTitle: 'Employee Profile'
    // }
  ]

  return menuItems;
}

export function Sidebar() {

  const menuItems = GetMenuItems();

  return (
    <div className={styles.sidebar_container}>
      <div className={styles.sidebar_main_nav}>
        <div className={styles.brand}>
          <Image className={styles.logo}
          src="/images/factored_logo.png" alt="Factored Logo" width={200} height={200} />
          <div className={styles.texts}>
            <h1 className={styles.title}>Factored</h1>
            <h2 className={styles.subtitle}>Profiles System</h2>
          </div>
        </div>
        <List
          sx={{ width: '100%', maxWidth: 360 }}
          component="nav"
        >
          {menuItems.map(item => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </List>
      </div>
      <div className={styles.btn_container}>
      </div>
    </div>
  )
}