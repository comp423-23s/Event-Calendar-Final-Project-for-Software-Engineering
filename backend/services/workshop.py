from fastapi import Depends
#from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from ..models import Workshop
from ..entities import WorkshopEntity
#from .permission import PermissionService


class WorkshopService:

    _session: Session
    #_permission: PermissionService

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session
        #self._permission = permission

    def get() -> str:
        return "yay this worked"

