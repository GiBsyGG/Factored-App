from pydantic import BaseModel, Field, EmailStr
from typing import Optional

class EmployeeBase(BaseModel):
    name: str
    email: EmailStr
    hashed_password: str
    position: str
    avatar_url: Optional[str] = None
    skills: dict[str, int] = Field(min_items=5)
    linkedin_url: Optional[str] = None
    about_employee: str
    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "email": "Jhon_Doe@factored.com",
                "hashed_password": "password",
                "position": "Software Engineer",
                "avatar_url": "https://example.com/avatar.jpg",
                "skills": {
                    "Python": 7,
                    "SQL": 6,
                    "Docker": 3,
                    "React": 8,
                    "Java": 5
                },
                "linkedin_url": "https://www.linkedin.com/in/johndoe",
                "about_employee": "John is a software engineer with 5 years of experience in the field. He has worked in various projects and has expertise in React and Python. He graduated from the University of Example with a degree in Computer Science in Colombia."
            }
        }