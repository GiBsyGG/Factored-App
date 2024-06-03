from typing import Optional
from fastapi import APIRouter, Header
from fastapi.responses import JSONResponse
from passlib.context import CryptContext
from fastapi.encoders import jsonable_encoder

from app.schemas.user import UserBase
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

    generated_token = write_token({"email": user.email})
    return JSONResponse(content={"token": generated_token, "employee_id": employee.id}, status_code=200)


@auth_routes.post('/verify/token', tags=["Auth"])
def verify_token(authorization: Optional[str] = Header(None)):
    token = authorization
    if not authorization:
        return JSONResponse(content={"message": "Invalid authorization header"}, status_code=422)
    return validate_token(token, output=True)