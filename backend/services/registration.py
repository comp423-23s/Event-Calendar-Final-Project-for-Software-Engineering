from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from .workshop import WorkshopService
from .user import UserService
from ..models import User, Workshop
from ..entities import UserEntity, WorkshopEntity


class RegistrationService:

    _session: Session
    _user: UserService
    _workshop: WorkshopService

    def __init__(self, session: Session = Depends(db_session), workshop: WorkshopService = Depends(), user: UserService = Depends()):
        self._session = session
        self._workshop = workshop
        self._user = user
    
    #Args: None
    #Returns: the list of all Workshop models currently stored
    #Raises: Nothing
    def list(self) -> list[Workshop]:
        query = select(WorkshopEntity)
        workshop_entities: WorkshopEntity = self._session.execute(query).scalars()
        result = []
        for workshop_entity in workshop_entities:
            attendees = []
            for a in workshop_entity.attendees:
                attendees.append(a.to_model())
            host = self._user.search_by_id(workshop_entity.host_id)
            model = workshop_entity.to_model_w_users(host, attendees)
            result.append(model)
        return result
    

    def add_attendee(self, workshop_id: int, attendee_id: int) -> Workshop | None:
        if attendee_id == None:
            return
        query = select(WorkshopEntity).where(WorkshopEntity.id == workshop_id)
        workshop_entity: WorkshopEntity = self._session.scalar(query)
        attendee = self._user_svc.search_by_id(attendee_id)
        if attendee == None:
            return
        attendee_entity = UserEntity.from_model(attendee)
        if workshop_entity != None:
            self._session.add(workshop_entity, attendee_entity)
            self._session.commit()
            return workshop_entity.to_model()
        return

    #testing this
    def get_as_host(self, subject: User) -> list[Workshop] | None:
        try: 
            query = select(WorkshopEntity).where(WorkshopEntity.host_id == subject.id)
            workshop_entities = self._session.execute(query).scalars().all()
            if workshop_entities is None:
                return None
            else:
                workshop_models = [entity.to_model() for entity in workshop_entities]
                return workshop_models
        except Exception as e:
            print(e)
            return None