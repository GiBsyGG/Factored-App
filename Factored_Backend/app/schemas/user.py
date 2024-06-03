from pydantic import BaseModel, EmailStr

class UserBase(BaseModel):
    email: EmailStr
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "exaple@example.com",
                "password": "password"
            }
        }