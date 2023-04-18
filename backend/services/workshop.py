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
    def list(self) -> list[Workshop]:
        query = select(WorkshopEntity)
        workshop_entities: WorkshopEntity = self._session.execute(query).scalars()
        result = []
        for workshop_entity in workshop_entities:
            host = self._user_svc.search_by_id(workshop_entity.host_id)
            model = workshop_entity.to_model_w_host(host)
            result.append(model)
        return result
        
    #Args: a NewWorkshop model workshop representing the workshop to be created
    #Returns: A copy of the created Workshop model, or None if no workshop was created
    #Raises: Nothing
    def add(self, workshop: NewWorkshop) -> Workshop | None:
        print("workshop:", workshop, "\n\n\n")
        workshop_entity = WorkshopEntity.from_model_new_user(workshop)
        print("workshop_entity = WorkshopEntity.from_model(workshop) -- done \n\n\n")
        self._session.add(workshop_entity)
        print("self._session.add(workshop_entity) -- done\n\n\n")
        self._session.commit()
        print("self._session.commit() -- done\n\n\n")
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
