from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from .workshop import WorkshopService
from .user import UserService
from ..models import User, Workshop, Workshop_Users
from ..entities import UserEntity, WorkshopEntity

from typing import List

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
            result.append(model)
        return result
    
    #this is the function we need to be working on
    def add_attendee(self, workshop_id: int, attendee_id: int) -> Workshop | None:
        #if attendee_id == None:
        #    return
        query = select(WorkshopEntity).where(WorkshopEntity.id == workshop_id)
        workshop_entity: WorkshopEntity = self._session.scalar(query)
        #workshop: Workshop = self._workshop.search_by_id(workshop_id)
        attendee: User = self._user.search_by_id(attendee_id)
        if attendee is None:
            return
        attendee_entity: UserEntity = UserEntity.from_model(attendee)
        #workshop_entity: WorkshopEntity = WorkshopEntity.from_model(workshop)
        #if workshop_entity != None:
        try:
            self._session.add(workshop_entity, attendee_entity)
            self._session.commit()
            return workshop_entity.to_model()
        except Exception as e:
            print("\n\n\nThere was an Exception:", e, "\n\n\n")
            return


    def get_hosting(self, subject_id: int) -> List[Workshop] | None:
        try: 
            query = select(UserEntity).where(UserEntity.id == subject_id)
            user_entity: UserEntity = self._session.scalar(query)
            if user_entity is None:
                return None
            else:
                hosting: List[Workshop] = []
                for h in user_entity.workshops_as_host:
                    hosting.append(h.to_model())
                #model = workshop_entity.to_model()
                return hosting
        except Exception as e:
            print(e)
            return None
        
    def get_attending(self, subject_id: int) -> List[Workshop] | None:
        try: 
            query = select(UserEntity).where(UserEntity.id == subject_id)
            user_entity: UserEntity = self._session.scalar(query)
            if user_entity is None:
                return None
            else:
                attending: List[Workshop] = []
                for a in user_entity.workshops_as_attendee:
                    attending.append(a.to_model())
                #model = workshop_entity.to_model()
                return attending
        except Exception as e:
            print(e)
            return None
        
        
        #try: 
        #    query = select(WorkshopEntity).where(WorkshopEntity.host_id == subject_id)
        #    workshop_entities: list[WorkshopEntity] = self._session.execute(query).scalars().all()
        #    if not workshop_entities:
        #        return []
        #    else:
        #        workshop_models: list[Workshop] = [entity.to_model() for entity in workshop_entities]
        #        return workshop_models
        #except Exception as e:
        #    print("\n\n\n The exception:")
        #    print(e)
        #    return []
    
    #def get_attendees(self, subject_id: int) -> List[Workshop]:
    #    try: 
    #        query = select(UserEntity).where(UserEntity.id == subject_id)
    #        workshop_entities: list[WorkshopEntity] = self._session.execute(query).scalars().all()
    #        if not workshop_entities:
    #            return []
    #        else:
    #            workshop_models: list[Workshop] = [entity.to_model() for entity in workshop_entities]
    #            return workshop_models
    #    except Exception as e:
    #        print("\n\n\n The exception:")
    #        print(e)
    #        return []
