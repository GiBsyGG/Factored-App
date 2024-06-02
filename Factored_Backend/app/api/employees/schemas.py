from pydantic import BaseModel, Field
from typing import Optional

class EmployeeBase(BaseModel):
    name: str
    position: str
    avatar_url: Optional[str] = None
    skills: list[tuple[str, float]] = Field(min_items=1)

    class Config:
        schema_extra = {
            "example": {
                "name": "John Doe",
                "position": "Software Engineer",
                "avatar_url": "https://example.com/avatar.jpg",
                "skills": [("Python", 9), ("Django", 8.5), ("React", 8.5)]
            }
        }