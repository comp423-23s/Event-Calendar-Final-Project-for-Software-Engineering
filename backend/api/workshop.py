from fastapi import APIRouter, Depends
from ..models import Workshop
from ..services.workshop import WorkshopService

api = APIRouter(prefix="/api/workshop")

#returns list of workshop models. It takes in a workshop_service as a dependency
@api.get("", response_model=list[Workshop], tags=['Workshops'])
def list_workshops(workshop_svc: WorkshopService = Depends()) -> list[Workshop]:
    return workshop_svc.list()