from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from . import UserService
from ..models import Workshop, NewWorkshop
from ..entities import WorkshopEntity


class WorkshopService:
    #the service containing all of the functions for managing workshop models in the database. 
    #these functions are called by the file backend\api\workshop.py
    # Attributes: _session: a sqlalchemy session for connecting the functions with the database
    #             _user_svc: a copy of UserService to assist with getting user info for the functions

    _session: Session
    _user_svc: UserService

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session
        self._user_svc = UserService(session)

        
    #Args: a NewWorkshop model workshop representing the workshop to be created
    #Returns: A copy of the created Workshop model, or None if no workshop was created
    #Raises: Nothing
    def add(self, workshop: NewWorkshop) -> Workshop | None:
        workshop_entity = WorkshopEntity.from_model_new_user(workshop)
        self._session.add(workshop_entity)
        self._session.commit()
        return workshop_entity.to_model()

    #Args: int id representing the id of the workshop to be deleted
    #Returns: a copy of the deleted Workshop model, or None if no workshop was deleted
    #Raises: Nothing
    def delete(self, id: int) -> Workshop | None:
        query = select(WorkshopEntity).filter(WorkshopEntity.id == id)
        workshop_entity: WorkshopEntity = self._session.execute(query).scalar()
        if workshop_entity != None:
            self._session.delete(workshop_entity)
            self._session.commit()
            return workshop_entity.to_model()
        else:
            return

    def search_by_id(self, i: int) -> Workshop | None:
        try: 
            query = select(WorkshopEntity).where(WorkshopEntity.id == i)
            workshop_entity: WorkshopEntity = self._session.scalar(query)
            if workshop_entity is None:
                return None
            else:
                model = workshop_entity.to_model()
                return model
        except Exception as e:
            print(e)
            return None


    #def add_attendee(self, workshop_id: int, attendee_id: int) -> Workshop | None:
    #    if attendee_id == None | workshop_id == None:
    #        return
    #    query = select(WorkshopEntity).where(WorkshopEntity.id == workshop_id)
    #    workshop_entity: WorkshopEntity = self._session.scalar(query)
    #    attendee = self._user_svc.search_by_id(attendee_id)
    #    if attendee == None:
    #        return
    #    attendee_entity = UserEntity.from_model(attendee)
    #    if workshop_entity != None:
    #        self._session.add(workshop_entity, attendee_entity)
    #        self._session.commit()
    #        return workshop_entity.to_model()
    #    return
    
    #Args: int workshop_id representing the id of the workshop to be updated, and a Workshop model named new_Workshop holding the data to be updated into the workshop
    #Returns: a copy of the updated Workshop model, or None if no workshop was deleted
    #Raises: Nothing
    def update_workshop(self, workshop_id: int, new_workshop: Workshop) -> Workshop | None:
        if not(workshop_id and Workshop):
            return
        entity = self._session.get(WorkshopEntity, workshop_id)
        if(entity == None): 
            raise Exception(f"Workshop with id {workshop_id} not found. You can only update workshops already in existance")
        entity.update(new_workshop)
        self._session.commit()
        return entity.to_model()
        

