'use client'

import { notFound } from 'next/navigation'
import { employee } from '@/employee/interfaces/employee';

import axios from 'axios';

import { Avatar } from '@mui/material';

import style from './profilePage.module.css';

import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";

import { SkillsChart } from '@/employee/components';
import { ContactItem } from '@/employee/components';

import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { get } from 'http';

interface Props {
  params: {
    id: string;
  };
}

// export async function generateMetadata({ params }: Props): Promise<Metadata> {

//   try {

//     const token = getCookie('accessToken');
//       const response = await axios.get<employee>(`http://localhost:8000/auth/employees/${params.id}`,
//         { headers: { Authorization: 'Bearer ' + token } }
//       );

//     const { name } = response.data;
//     return {
//       title: `${ name } - Profile Page`,
//       description: `This is the ${ name } profile page`,
//     }
//   } catch (error) {
//     return {
//       title: 'Employee profile Page',
//       description: 'This is the employee profile page',
//     }
  
//   }
  
// }


export default function EmployeePage({ params }: Props) {
  
  const [employee, setEmployee] = useState<employee>();

  const getEmployee = async (id: string): Promise<employee> => {

    try{
      // Using the auth token to get the employee data
  
      const token = getCookie('accessToken');
      const response = await axios.get<employee>(`http://localhost:8000/employees/${id}`,
        { headers: { Authorization: 'Bearer ' + token } }
      );
  
      console.log(response);
      const employee = response.data;
  
      setEmployee(employee);
  
      return employee;
  
    } catch (error) {
      notFound();
    }
  }

  useEffect(() => {
    getEmployee(params.id);
  }, []);

  // split the skills into labels and values they are a string label:value,label:value...
  const skills = employee?._skills?.split(',') || [];
  const skills_labels = skills.map(skill => skill.split(':')[0]);
  const skills_values = skills.map(skill => parseInt(skill.split(':')[1]));

  return (
    <div className={style.page_container}>
      <div className={style.profile_info}>
        <div className={style.profile_info_avatar}>
          <Avatar
            alt={employee? employee.name : ''}
            src={employee? employee.avatar_url : ''}
            sx={{ width: 240, height: 240, backgroundColor: "#D9D9D9"}}
          />
          <div>
            <h1 className={style.name}>{employee? employee.name : ''}</h1>
            <p className={style.position}>{employee? employee.position : ''}</p>
          </div>
        </div>
        <div className={style.profile_info_skills}>
          <SkillsChart skills_labels={skills_labels} skills_values={skills_values}/>
        </div>
      </div>
      <div className={style.profile_description}>
        <div className={style.content}>
          <h2 className={style.title}>About {employee? employee.name : ''}</h2>
          <p className={style.description}>{employee? employee.about_employee : ''}</p>
          <div className={style.contact}>
            <ContactItem title="Email" link={`mailto:${employee? employee.email : ''}`} icon={BiLogoGmail} />
            <ContactItem title="LinkedIn" link={employee? employee.linkedin_url : ''} icon={FaLinkedin} />
          </div>
          
        </div>
      </div>
      
      
    </div>
  )
}