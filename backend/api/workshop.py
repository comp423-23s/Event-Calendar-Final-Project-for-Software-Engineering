from fastapi import APIRouter, Depends
from ..models import Workshop, NewWorkshop, User
from ..services.workshop import WorkshopService
from datetime import datetime

api = APIRouter(prefix="/api/workshop")

#returns list of workshop models. It uses workshop_service as a dependency
@api.get("", response_model=list[Workshop], tags=['Workshops'])
def list_workshops(workshop_svc: WorkshopService = Depends()) -> list[Workshop]:
    return workshop_svc.list()

#Adds a workshop to the database. It takes in a workshop model to add, and uses workshop_service as a dependency
@api.post("", response_model=Workshop, tags=['Workshops'])
def create_workshop(workshop: NewWorkshop, workshop_svc: WorkshopService = Depends()) -> Workshop:
    return workshop_svc.add(workshop)


#Deletes a workshop from the database. Takes in the id of the workshop to delete, and uses workshop_service as a dependency. 
@api.delete("", response_model=Workshop | None, tags=['Workshops'])
def delete_workshop(id: int, workshop_svc: WorkshopService = Depends()) -> Workshop | None:
    return workshop_svc.delete(id)

#gets a specific workshop by the id
@api.get("/{id}", response_model=Workshop | None, tags=['Workshops'])
def search_by_id(q: int, workshop_svc: WorkshopService = Depends()) -> Workshop | None:
    return workshop_svc.search_by_id(q)

#Add an attendee to a workshop. Takes in the id of the workshop to register to, and uses workshop_service as a dependency.
@api.post("/register", response_model=Workshop | None, tags=['Workshops'])
def register_attendee(workshop_id: int, attendee_id: int, workshop_svc: WorkshopService = Depends()) -> Workshop | None:
    return workshop_svc.add_attendee(workshop_id, attendee_id)

#Updates the workshop with the given workshop id using the parameters of the new workshop passed in. 
#Takes in id of the workshop to update, a workshop model with the new arguments to be updated, and uses workshop_service as a dependency. 
#Note: neither the host nor the workshop_id are updated by this function
@api.put("", response_model=Workshop | None, tags=['Workshops'])
def update_workshop(workshop_id: int, new_workshop: Workshop, workshop_svc: WorkshopService = Depends()) -> Workshop | None:
    return workshop_svc.update_workshop(workshop_id, new_workshop)


