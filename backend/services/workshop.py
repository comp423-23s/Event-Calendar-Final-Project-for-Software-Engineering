from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from ..models import Workshop, User
from ..entities import WorkshopEntity
from datetime import datetime
#from . import user
from . import UserService
from ..models import User
from ..entities import UserEntity
#from .permission import PermissionService

#from .permission import PermissionService


class WorkshopService:

    _session: Session
    #_permission: PermissionService
    #_permission: PermissionService

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session
        #self._permission = permission

        #self._permission = permission
    
    #def get_host(id: int) -> User:
    #    query = select(UserEntity).where(WorkshopEntity.id == id)
    #    user_entity: UserEntity = self._session.scalar(query)
    #    if user_entity is None:
    #        return None
    #    else:
    #        model = user_entity.to_model()
    #        model.permissions = self._permission.get_permissions(model)
    #        return model


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
    
    def add(self, workshop: Workshop) -> Workshop | None:
        workshop_entity = WorkshopEntity.from_model(workshop)
        self._session.add(workshop_entity)
        self._session.commit()
        return workshop_entity.to_model()
        