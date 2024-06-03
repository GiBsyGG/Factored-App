from jwt import encode, decode
from jwt import exceptions
from  datetime import datetime, timedelta
from fastapi.responses import JSONResponse

from os import getenv

def expire_date(days: int) -> datetime:
    return datetime.now() + timedelta(days=days)

def write_token(data: dict):
    token = encode(payload={**data, "exp":expire_date(2)}, key = getenv("SECRET_KEY"), algorithm="HS256")
    return token

def validate_token(token: str, output=False):
    try:
        if output:
            return decode(token, getenv("SECRET_KEY"), algorithms=["HS256"])
        decode(token, getenv("SECRET_KEY"), algorithms=["HS256"])
    except exceptions.DecodeError:
        return JSONResponse(content={"detail": "Invalid token"}, status_code=401)
    except exceptions.ExpiredSignatureError:
        return JSONResponse(content={"detail": "Token has expired"}, status_code=401)