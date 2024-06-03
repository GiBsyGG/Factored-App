from fastapi import Request
from fastapi.routing import APIRoute
from app.utils.jwt_validation import validate_token

class VerifyTokenRouteMiddleware(APIRoute):
    def get_route_handler(self):
        original_route_handler = super().get_route_handler()

        async def verify_token_middleware(request:Request):
            token = request.headers["Authorization"].split(" ")[1]

            validation_response = validate_token(token)

            if validation_response.status_code:
                return await original_route_handler(request)
            else:
                return validation_response