from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from.config.database import engine, Base

# TODO: Create and import the error handler middleware
# from middlewares.error_handler import Error_handler

from.api.employees.router import employee_router

app = FastAPI()

app.title = "Employee API"
app.version = "0.0.1"

# TODO: Add the error handler middleware to the app
#app.add_middleware(Error_handler)

#Include the routers
app.include_router(employee_router)


# To create the tables in the database
Base.metadata.create_all(bind=engine)

@app.get('/', tags=['home'])
def message():
    return HTMLResponse('<h1>Hello world</h1>')