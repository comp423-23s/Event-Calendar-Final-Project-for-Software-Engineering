from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from ..models import Workshop
from ..entities import WorkshopEntity
#from ..entities import UserEntity
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

    def list(self) -> list[Workshop]:
        query = select(WorkshopEntity)
        workshop_entities: WorkshopEntity = self._session.execute(query).scalars()
        return [workshop_entity.to_model() for workshop_entity in workshop_entities]

