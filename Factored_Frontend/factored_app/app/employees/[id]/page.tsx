import { notFound } from 'next/navigation'
import { employee } from '@/employee/interfaces/employee';
import { Metadata } from "next";
import Image from 'next/image';

import axios from 'axios';

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

  return (
    <div>
      <Image src={employee.avatar_url} alt={employee.name} width={200} height={200} />
      <h1>{employee.name}</h1>
      <p>{employee.position}</p>
      <p>{employee._skills}</p>
    </div>
  )
}