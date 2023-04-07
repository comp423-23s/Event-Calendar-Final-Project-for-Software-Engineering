from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from ..models import Workshop
from ..entities import WorkshopEntity
from . import UserService
from ..models import User
from ..entities import UserEntity

#from .permission import PermissionService




class WorkshopService:

    _session: Session
    

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session
        


    def list(self) -> list[Workshop]:
        query = select(WorkshopEntity)
        workshop_entities: WorkshopEntity = self._session.execute(query).scalars()

        result = []
        for workshop_entity in workshop_entities:
            user_svc = UserService(self._session)
            host = user_svc.search_by_id(workshop_entity.host_id)
            model = workshop_entity.to_model_w_host(host)
            result.append(model)
        return result

        #return [ workshop_entity.to_model() for workshop_entity in workshop_entities]