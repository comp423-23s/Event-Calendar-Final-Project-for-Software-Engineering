from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from . import UserService
from ..models import Workshop, User
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
        

    def add(self, workshop: Workshop) -> Workshop | None:
        workshop_entity = WorkshopEntity.from_model(workshop)
        self._session.add(workshop_entity)
        self._session.commit()
        #host = self._user_svc.search_by_id(workshop_entity.host_id)
        #return workshop_entity.to_model_w_host(host)
        #return workshop_entity.to_model()
        return workshop
    
    def delete(self, id: int) -> Workshop | None:
        query = select(WorkshopEntity).filter(WorkshopEntity.id == id)
        workshop_entity: WorkshopEntity = self._session.execute(query).scalar()
        if workshop_entity != None:
            self._session.delete(workshop_entity)
            self._session.commit()
            return workshop_entity.to_model()
        else:
            return