import random
from.models import EmployeeModel
from.schemas import EmployeeBase

class EmployeeService:
    def __init__(self, session):
        self.session = session

    def create_employee(self, employee: EmployeeBase):

        # Using Gravatar to get the profile picture of the employee
        hash_employee = hash(employee.name.lower().strip() + employee.position.lower().strip() + str(random.randint(1, 1000)))
        employee.avatar_url = f"https://www.gravatar.com/avatar/{hash_employee}?d=robohash&s=200"

        new_employee = EmployeeModel(**employee.dict())
        self.session.add(new_employee)
        self.session.commit()
        return 

    def get_employee(self, employee_id: int):
        result = self.session.query(EmployeeModel).filter(EmployeeModel.id == employee_id).first()
        return result

    def get_employees(self):
        result = self.session.query(EmployeeModel).all()
        return result

    def update_employee(self, employee_id: int, employee_data: EmployeeBase):
        employee = self.session.query(EmployeeModel).filter(EmployeeModel.id == employee_id).first()
        for key, value in employee_data.dict().items():
            setattr(employee, key, value)
        self.session.commit()

        return 

    def delete_employee(self, employee_id: int):
        employee = self.session.query(EmployeeModel).filter(EmployeeModel.id == employee_id).first()
        self.session.delete(employee)
        self.session.commit()
        return