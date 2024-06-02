import { notFound } from 'next/navigation'
import { employee } from '@/employee/interfaces/employee';
import { Metadata } from "next";

import axios from 'axios';

import { Avatar } from '@mui/material';

import style from './profilePage.module.css';

import { BiLogoGmail } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";

import { SkillsChart } from '@/employee/components';
import { ContactItem } from '@/employee/components';


interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  try {
    const { name } = await getEmployee(params.id);
    return {
      title: `${ name } - Profile Page`,
      description: `This is the ${ name } profile page`,
    }
  } catch (error) {
    return {
      title: 'Employee profile Page',
      description: 'This is the employee profile page',
    }
  
  }
  
}

const getEmployee = async (id: string): Promise<employee> => {

  try{
    const response = await axios.get<employee>(`http://127.0.0.1:8000/employees/${id}`);
    const employee = response.data;

    return employee;

  } catch (error) {
    notFound();
  }
}


export default async function EmployeePage({ params }: Props) {
  
  const employee = await getEmployee(params.id);

  // split the skills into labels and values they are a string label:value,label:value...
  const skills = employee._skills.split(',');
  const skills_labels = skills.map(skill => skill.split(':')[0]);
  const skills_values = skills.map(skill => parseInt(skill.split(':')[1]));

  return (
    <div className={style.page_container}>
      <div className={style.profile_info}>
        <div className={style.profile_info_avatar}>
          <Avatar
            alt={employee.name}
            src={employee.avatar_url}
            sx={{ width: 240, height: 240, backgroundColor: "#D9D9D9"}}
          />
          <div>
            <h1 className={style.name}>{employee.name}</h1>
            <p className={style.position}>{employee.position}</p>
          </div>
        </div>
        <div className={style.profile_info_skills}>
          <SkillsChart skills_labels={skills_labels} skills_values={skills_values}/>
        </div>
      </div>
      <div className={style.profile_description}>
        <div className={style.content}>
          <h2 className={style.title}>About {employee.name}</h2>
          <p className={style.description}>{employee.about_employee}</p>
          <div className={style.contact}>
            <ContactItem title="Email" link={`mailto:${employee.email}`} icon={BiLogoGmail} />
            <ContactItem title="LinkedIn" link={employee.linkedin_url} icon={FaLinkedin} />
          </div>
          
        </div>
      </div>
      
      
    </div>
  )
}