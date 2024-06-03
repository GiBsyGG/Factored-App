from fastapi import APIRouter

from fastapi import Path, Query, Depends
from fastapi.responses import JSONResponse

# To use the model of the db as response
from fastapi.encoders import jsonable_encoder

from app.config.database import Session

from.models import EmployeeModel

from app.middlewares.jwt_bearer import JWTBearer

from.service import EmployeeService

from.schemas import EmployeeBase

employee_router = APIRouter()

# TODO: Add the JWT bearer token dependency to the routes

@employee_router.get("/employees", tags=["Employee"], response_model=list[EmployeeBase], status_code=200)
def get_employees():
    session = Session()
    employee_service = EmployeeService(session)
    employees = employee_service.get_employees()
    session.close()
    return JSONResponse(content=jsonable_encoder(employees), status_code=200)

@employee_router.get("/employees/{employee_id}", tags=["Employee"], response_model=EmployeeBase, status_code=200,
                    dependencies=[Depends(JWTBearer)])
def get_employee(employee_id: int = Path(..., title="The ID of the employee you want to get", ge=1)):
    session = Session()
    employee_service = EmployeeService(session)
    employee = employee_service.get_employee(employee_id)
    session.close()

    if not employee:
        return JSONResponse(content={"message": "Employee not found"}, status_code=404)
    
    return JSONResponse(content=jsonable_encoder(employee), status_code=200)

@employee_router.post("/employees", tags=["Employee"], response_model=EmployeeBase, status_code=201)
def create_employee(employee: EmployeeBase):
    session = Session()
    employee_service = EmployeeService(session)
    employee_service.create_employee(employee)
    session.close()
    return JSONResponse(content={"message": "Employee profile created successfully"}, status_code=201)

@employee_router.put("/employees/{employee_id}", tags=["Employee"], response_model=EmployeeBase, status_code=200, 
                    dependencies=[Depends(JWTBearer)])
def update_employee(employee: EmployeeBase, employee_id: int = Path(..., title="The ID of the employee you want to update", ge=1)):
    session = Session()
    employee_service = EmployeeService(session)

    employee_by_id = employee_service.get_employee(employee_id)
    if not employee_by_id:
        session.close()
        return JSONResponse(content={"message": "Employee not found"}, status_code=404)
    
    employee_service.update_employee(employee_id, employee)
    session.close()
    return JSONResponse(content={"message": "Employee profile updated successfully"}, status_code=200)

@employee_router.delete("/employees/{employee_id}", tags=["Employee"], status_code=204, dependencies=[Depends(JWTBearer)])
def delete_employee(employee_id: int = Path(..., title="The ID of the employee you want to delete", ge=1)):
    session = Session()
    employee_service = EmployeeService(session)

    employee_by_id = employee_service.get_employee(employee_id)
    if not employee_by_id:
        session.close()
        return JSONResponse(content={"message": "Employee not found"}, status_code=404)
    
    employee_service.delete_employee(employee_id)
    session.close()
    return JSONResponse(content={"message": "Employee profile deleted successfully"}, status_code=204)