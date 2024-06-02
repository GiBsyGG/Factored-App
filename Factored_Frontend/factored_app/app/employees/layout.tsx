import { Sidebar } from "@/app/components";

import style from "./employees.module.css"

export default function EmployeeLayout({
  children,
}: {
  children: React.ReactNode;
  }) {
  return (
    <div className={style.layout_container}>
      <div className={style.sidebar_container}>
        <Sidebar />
      </div>
      <div className={style.main_container}>
        {children}
      </div>
    </div>
  );
  }