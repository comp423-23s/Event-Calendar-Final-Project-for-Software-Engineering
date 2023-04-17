from fastapi import Depends
from sqlalchemy import select, or_, func
from sqlalchemy.orm import Session
from ..database import db_session
from . import UserService
from ..models import Workshop, NewWorkshop, User
from ..entities import WorkshopEntity, UserEntity #, workshop__attendee_table
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
        

    def add(self, workshop: NewWorkshop) -> Workshop | None:
        
        print("workshop:", workshop, "\n\n\n")
        #print("\n\n\n\n\n")
        workshop_entity = WorkshopEntity.from_model_new_user(workshop)
        print("workshop_entity = WorkshopEntity.from_model(workshop) -- done \n\n\n")
        self._session.add(workshop_entity)
        print("self._session.add(workshop_entity) -- done\n\n\n")
        self._session.commit()
        print("self._session.commit() -- done\n\n\n")
        return workshop_entity.to_model()

    
    def delete(self, id: int) -> Workshop | None:
        query = select(WorkshopEntity).filter(WorkshopEntity.id == id)
        workshop_entity: WorkshopEntity = self._session.execute(query).scalar()
        if workshop_entity != None:
            self._session.delete(workshop_entity)
            self._session.commit()
            return workshop_entity.to_model()
        else:
            return

    def search_by_id(self, i: int) -> Workshop | None:
        try: 
            query = select(WorkshopEntity).where(WorkshopEntity.id == i)
            workshop_entity: WorkshopEntity = self._session.scalar(query)
            if workshop_entity is None:
                return None
            else:
                model = workshop_entity.to_model()
                return model
        except Exception as e:
            print(e)
            return None
        
    # not sure if this works, but I can test!
    #really good example of how to do this in reset_database
    def add_attendee(self, workshop_id: int, attendee_id: int) -> Workshop | None:
        if attendee_id == None:
            return
        #query = select(WorkshopEntity).filter(WorkshopEntity.id == workshop_id)
        #workshop_entity: WorkshopEntity = self._session.execute(query).scalar()
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


        

            


