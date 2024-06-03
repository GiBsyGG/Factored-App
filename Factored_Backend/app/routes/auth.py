from typing import Optional
from fastapi import APIRouter, Header
from fastapi import Path, Depends
from fastapi.responses import JSONResponse
from passlib.context import CryptContext
from fastapi.encoders import jsonable_encoder

from app.schemas.user import UserBase
from app.api.employees.schemas import EmployeeBase
from app.api.employees.service import EmployeeService
from app.config.database import Session

from app.utils.jwt_validation import write_token, validate_token

auth_routes = APIRouter()

# create a new instance of CryptContext
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@auth_routes.post('/login', tags=["Auth"], status_code=200)
def login(user: UserBase):

    session = Session()

    # find user in database
    employee_service = EmployeeService(session)
    employee = employee_service.get_employee_by_email(user.email)

    if not employee:
        session.close()
        return JSONResponse(content={"message": "User not found"}, status_code=404)
    
    # check password
    if not pwd_context.verify(user.password, employee.hashed_password):
        session.close()
        return JSONResponse(content={"message": "Incorrect password"}, status_code=401)
    session.close()

    #print(user.email)
    #generated_token = write_token({"email": user.email})
    # TODO: Fix the token generation in production
    return JSONResponse(content={"token": "123", "employee_id": employee.id}, status_code=200)

@auth_routes.post('/register', tags=["Auth"], status_code=201)
def register(new_employee: EmployeeBase):

    session = Session()

    # find user in database
    employee_service = EmployeeService(session)
    employee = employee_service.get_employee_by_email(new_employee.email)

    if employee:
        session.close()
        return JSONResponse(content={"message": "User already exists"}, status_code=409)
    
    # create new user
    new_employee_created = employee_service.create_employee(new_employee)
    
    new_employee_created_id = employee_service.get_employee_by_email(new_employee.email).id

    session.close()

    # TODO: Fix the token generation in production
    # generated_token = write_token({"email": new_employee.email})
    return JSONResponse(content={"token": "123", "employee_id": new_employee_created_id}, status_code=201)

@auth_routes.post('/verify/token', tags=["Auth"])
def verify_token(authorization: Optional[str] = Header(None)):
    token = authorization
    if not authorization:
        return JSONResponse(content={"message": "Invalid authorization header"}, status_code=422)
    return validate_token(token, output=True)


# Routes for testing purposes
@auth_routes.get("/employees", tags=["Employee"], response_model=list[EmployeeBase], status_code=200)
def get_employees():
    session = Session()
    employee_service = EmployeeService(session)
    employees = employee_service.get_employees()
    session.close()
    return JSONResponse(content=jsonable_encoder(employees), status_code=200)

@auth_routes.get("/employees/{employee_id}", tags=["Employee"], response_model=EmployeeBase, status_code=200)
def get_employee(employee_id: int = Path(..., title="The ID of the employee you want to get", ge=1)):
    session = Session()
    employee_service = EmployeeService(session)
    employee = employee_service.get_employee(employee_id)
    session.close()

    if not employee:
        return JSONResponse(content={"message": "Employee not found"}, status_code=404)
    
    return JSONResponse(content=jsonable_encoder(employee), status_code=200)
