from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from . import UserService
from ..models import Workshop, NewWorkshop
from ..entities import WorkshopEntity, UserEntity
from datetime import datetime

class WorkshopService:

    _session: Session
    _user_svc: UserService

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session
        self._user_svc = UserService(session)
        #UserService(session)


    def list(self) -> list[Workshop]:
        query = select(WorkshopEntity)
        workshop_entities: WorkshopEntity = self._session.execute(query).scalars()
        result = []
        for workshop_entity in workshop_entities:
            host = self._user_svc.search_by_id(workshop_entity.host_id)
            model = workshop_entity.to_model_w_host(host)
            result.append(model)
        return result
        

    def add(self, workshop: NewWorkshop) -> Workshop | None:
        
        print("workshop:", workshop, "\n\n\n")
        #print("\n\n\n\n\n")
        workshop_entity = WorkshopEntity.from_model_new_user(workshop)
        print("workshop_entity = WorkshopEntity.from_model(workshop) -- done \n\n\n")
        self._session.add(workshop_entity)
        print("self._session.add(workshop_entity) -- done\n\n\n")
        self._session.commit()
        print("self._session.commit() -- done\n\n\n")
        #host = self._user_svc.search_by_id(workshop_entity.host_id)
        #return workshop_entity.to_model_w_host(host)
        #return workshop_entity.to_model()
        return workshop_entity.to_model()