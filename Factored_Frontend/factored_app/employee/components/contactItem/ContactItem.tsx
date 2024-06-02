import React from 'react';

import Link from 'next/link';

import style from './contactItem.module.css';

interface ContactItemProps {
  title: string
  link: string
  icon: React.ComponentType<{ size: string }>
}

export function ContactItem({ title, link, icon }: ContactItemProps) {
  const IconComponent = icon; // Assign the icon prop to a variable

  return (
    <div className={style.items_container}>
      <Link href={link} 
        target="_blank"
        rel="noopener noreferrer"
        className={style.link_container}>
        <div className={style.btn_contact}>
          <IconComponent size="20px" /> {/* Use the IconComponent as a JSX element */}
          <p className={style.item_text}>{title}</p>
        </div>
      </Link>
    </div>
  );
}