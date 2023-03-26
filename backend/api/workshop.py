from fastapi import APIRouter, Depends
#from ..services import UserService
from ..models import Workshop
from ..services.workshop import WorkshopService
#from .authentication import registered_user

api = APIRouter(prefix="/api/workshop")


@api.get("")
def search(workshop_svc: WorkshopService = Depends()) -> str:
    return workshop_svc.get()