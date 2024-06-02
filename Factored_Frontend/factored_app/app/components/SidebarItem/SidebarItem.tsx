'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from 'react'

import style from './sidebarItem.module.css'

import { ListItemButton } from "@mui/material";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
  subTitle: string;
}

export function SidebarItem({ path, icon, title, subTitle }: Props) {

  // Get the current path to change the active link
  const pathName = usePathname();

  return (
    <ListItemButton>
      <Link href={path}
        className={pathName === path ? style.link_container_active : style.link_container}>
        <div className={style.link_icon}>
          {icon}
        </div>
        <div className={style.link_text}>
          <h2 className={style.link_title}>{title}</h2>
          <p className={style.link_subtitle}>{subTitle}</p>
        </div>
      </Link>
    </ListItemButton>

  )
}