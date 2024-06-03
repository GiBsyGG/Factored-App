from fastapi.security import HTTPBearer
from app.utils.jwt_validation import validate_token
from fastapi import Request, HTTPException

#para la auth, call en base a la peticion devuelve las credenciales del usuario, esto es un middleware
class JWTBearer(HTTPBearer):
    async def __call__(self, request: Request):
        auth = await super().__call__(request)
        validate = validate_token(auth.credentials, output=True)

        # Transforme the JSON response to a dict
        validate = validate.json()

        # verificar si el usuario está registrado
        if validate.email is None:
            raise HTTPException(status_code=401, detail="Invalid token")