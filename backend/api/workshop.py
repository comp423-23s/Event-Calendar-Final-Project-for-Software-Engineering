from fastapi import APIRouter, Depends
from ..models import Workshop
from ..services.workshop import WorkshopService
from datetime import datetime

api = APIRouter(prefix="/api/workshop")

#returns list of workshop models. It uses workshop_service as a dependency
@api.get("", response_model=list[Workshop], tags=['Workshops'])
def list_workshops(workshop_svc: WorkshopService = Depends()) -> list[Workshop]:
    return workshop_svc.list()

#Adds a workshop to the database. It takes in a workshop model to add, and uses workshop_service as a dependency
@api.post("", response_model=Workshop, tags=['Workshops'])
def create_workshop(workshop: Workshop, workshop_svc: WorkshopService = Depends()) -> Workshop:
    return workshop_svc.add(workshop)