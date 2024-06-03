import random
from app.api.employees.models import EmployeeModel
from app.api.employees.schemas import EmployeeBase

from passlib.context import CryptContext

# create a new instance of CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class EmployeeService:
    def __init__(self, session):
        self.session = session

    def create_employee(self, employee: EmployeeBase):

        # Hash the password
        employee.hashed_password = str(pwd_context.hash(employee.hashed_password))

        # Using Gravatar to get the profile picture of the employee
        hash_employee = str(abs(hash(employee.email.lower())))
        employee.avatar_url = f"https://www.gravatar.com/avatar/{hash_employee}?d=robohash&s=200"

        # If not linkedin_url is provided, we use the company's linkedin page
        if not employee.linkedin_url or employee.linkedin_url == "":
            employee.linkedin_url = "https://www.linkedin.com/company/factoredai?trk=public_profile_experience-item_profile-section-card_subtitle-click&originalSubdomain=co"

        new_employee = EmployeeModel(**employee.dict())
        self.session.add(new_employee)
        self.session.commit()
        return 

    def get_employee(self, employee_id: int):
        result = self.session.query(EmployeeModel).filter(EmployeeModel.id == employee_id).first()
        return result
    
    def get_employee_by_email(self, email: str):
        result = self.session.query(EmployeeModel).filter(EmployeeModel.email == email).first()
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