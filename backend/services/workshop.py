from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from . import UserService
from ..models import Workshop, NewWorkshop
from ..entities import WorkshopEntity, UserEntity
from datetime import datetime

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


    #Args: None
    #Returns: the list of all Workshop models currently stored
    #Raises: Nothing
    #def list(self) -> list[Workshop]:
    #    query = select(WorkshopEntity)
    #    workshop_entities: WorkshopEntity = self._session.execute(query).scalars()
    #    result = []
    #    for workshop_entity in workshop_entities:
    #        attendees = []
    #        for a in workshop_entity.attendees:
    #            attendees.append(a.to_model())
    #        host = self._user_svc.search_by_id(workshop_entity.host_id)
    #        model = workshop_entity.to_model_w_users(host, attendees)
    #        result.append(model)
    #    return result
        
        
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
    #    if attendee_id == None:
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

