from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from ..models import Workshop
from ..entities import WorkshopEntity
#from . import user
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
        return [ workshop_entity.to_model() for workshop_entity in workshop_entities]