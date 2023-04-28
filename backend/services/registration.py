from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from .workshop import WorkshopService
from .user import UserService
from ..models import User, Workshop, Workshop_Users
from ..entities import UserEntity, WorkshopEntity, workshop_attendee_table

from typing import List

#the file as user serive and workshop service imported. This avoids a circular input error
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
    def list_workshops(self) -> List[Workshop_Users]:
        query = select(WorkshopEntity)
        workshop_entities: WorkshopEntity = self._session.execute(query).scalars()
        result = []
        for workshop_entity in workshop_entities:
            attendees: List[User] = []
            for a in workshop_entity.attendees:
                attendees.append(a.to_model())
            host: User = self._user.search_by_id(workshop_entity.host_id)
            model: Workshop_Users = workshop_entity.to_model_w_users(host, attendees)
            #model: Workshop_Users = workshop_entity.to_model_w_users()
            result.append(model)
        return result
    
    #Args: Workshop id, User id
    #Returns: adds the user as an attendee for a workshop, returns the updated workshop
    #Raises: Nothing
    def add_attendee(self, workshop_id: int, attendee_id: int) -> Workshop | None:
        user_entity = self._session.get(UserEntity, attendee_id)
        workshop_entity = self._session.get(WorkshopEntity, workshop_id)
        workshop_entity.attendees.append(user_entity)
        user_entity.workshops_as_attendee.append(workshop_entity)
        self._session.commit()
        return
    
