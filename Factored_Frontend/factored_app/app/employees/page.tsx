import { employee } from "@/employee/interfaces/employee";

import style from "./employeesMain.module.css";

import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";

import Grid from "@mui/material/Grid";

import axios from "axios";
import { notFound } from "next/navigation";



const getEmployees = async (): Promise<employee[]> => {

  try{
    const response = await axios.get<employee[]>(`http://127.0.0.1:8000/employees`);
    const employees = response.data;

    return employees;

  } catch (error) {
    notFound();
  }
}

export default async function Page() {

  const employees = await getEmployees();

  return (
    <main>
      <div className={style.container}>
        <div className={style.titles_container}>
          <h1 className={style.title}>Welcome to Factored Employee System!</h1>
          <h2 className={style.subtitle}>Meet Our Team</h2>
        </div>
        <div className={style.employees_list_container}>
          <Grid container rowSpacing={2} columnSpacing={4}>
            {employees.map((employee) => (
              <Grid item xs={12} sm={6} md={4} key={employee.id}>
                <Card>
                  <CardActionArea href={`./employees/${employee.id}`}>
                    <div className={style.card_avatar}>
                      <Avatar
                        alt={employee.name}
                        src={employee.avatar_url}
                        sx={{ width: 200, height: 200, backgroundColor: "#D9D9D9"}}
                      />
                    </div>
                    
                    <CardContent>
                      <h1 className={style.card_name}>
                        {employee.name}
                      </h1>
                      <h2 className={style.card_position}>
                        {employee.position}
                      </h2>
                      <p className={style.card_description}>
                        {employee.about_employee}
                      </p>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </main>
  );
}