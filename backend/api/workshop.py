from fastapi import APIRouter, Depends
#from ..services import UserService
from ..models import Workshop
from ..services.workshop import WorkshopService
#from .authentication import registered_user

api = APIRouter(prefix="/api/workshop")


@api.get("", response_model=list[Workshop], tags=['Workshops'])
def list_workshops(workshop_svc: WorkshopService = Depends()) -> list[Workshop]:
    return workshop_svc.list()