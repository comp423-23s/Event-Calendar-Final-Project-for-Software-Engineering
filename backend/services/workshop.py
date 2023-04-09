from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from ..models import Workshop, User
from ..entities import WorkshopEntity
from datetime import datetime
from ..entities import UserEntity

class WorkshopService:

    _session: Session

    def __init__(self, session: Session = Depends(db_session)):
        self._session = session

    def list(self) -> list[Workshop]:
        query = select(WorkshopEntity)
        workshop_entities: WorkshopEntity = self._session.execute(query).scalars()
        return [ workshop_entity.to_model() for workshop_entity in workshop_entities]

    def add(self, workshop: Workshop) -> Workshop | None:
        workshop_entity = WorkshopEntity.from_model(workshop)
        self._session.add(workshop_entity)
        self._session.commit()
        return workshop_entity.to_model()

