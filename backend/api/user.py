from fastapi import APIRouter, Depends
from ..services import UserService
from ..models import User
from .authentication import registered_user

api = APIRouter(prefix="/api/user")

##this api returns a user based on their first name, last name, onyen, or email
@api.get("", response_model=list[User], tags=['User'])
def search(q: str, subject: User = Depends(registered_user), user_svc: UserService = Depends()):
    return user_svc.search(subject, q)

#this api returns a user based on their user id
@api.get("/{id}", response_model=User | None, tags=['User'])
def search_by_id(q: int, user_svc: UserService = Depends()) -> User | None:
    return user_svc.search_by_id(q)