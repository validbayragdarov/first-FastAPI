from pydantic import BaseModel

class Vuser(BaseModel):
    name: str
    email: str