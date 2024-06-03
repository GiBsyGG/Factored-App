from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from.config.database import engine, Base

from dotenv import load_dotenv

# TODO: Create and import the error handler middleware
# from middlewares.error_handler import Error_handler

from.api.employees.router import employee_router
from.routes.auth import auth_routes

app = FastAPI()

# Add the CORS middleware
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the environment variables
load_dotenv()


app.title = "Employee API"
app.version = "0.0.1"

# TODO: Add the error handler middleware to the app
#app.add_middleware(Error_handler)

#Include the routers
app.include_router(employee_router)
app.include_router(auth_routes, prefix="/auth")


# To create the tables in the database
Base.metadata.create_all(bind=engine)

@app.get('/', tags=['home'])
def message():
    return HTMLResponse('<h1>Hello world</h1>')