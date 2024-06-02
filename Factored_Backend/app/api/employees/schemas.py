from pydantic import BaseModel, Field
from typing import Optional

class EmployeeBase(BaseModel):
    name: str
    position: str
    avatar_url: Optional[str] = None
    skills: dict[str, int] = Field(min_items=3)

    class Config:
        json_schema_extra = {
            "example": {
                "name": "John Doe",
                "position": "Software Engineer",
                "avatar_url": "https://example.com/avatar.jpg",
                "skills": {
                    "Python": 7,
                    "SQL": 6,
                    "Docker": 3,
                    "React": 8,
                    "Java": 5
                }
            }
        }