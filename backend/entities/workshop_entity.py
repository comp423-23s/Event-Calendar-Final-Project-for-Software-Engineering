'''User accounts for all registered users in the application.'''
from sqlalchemy import Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Self
from .entity_base import EntityBase
from ..models import Workshop, User, NewWorkshop, Workshop_Users
from datetime import datetime
from .workshop_attendee_entity import workshop_attendee_table


__authors__ = ['Kris Jordan']
__copyright__ = 'Copyright 2023'
__license__ = 'MIT'

"""WorkshopEntity models all Workshops in the database. 
    Arguments: EntityBase
    Attributes:
"""
class WorkshopEntity(EntityBase):
    __tablename__ = 'workshop'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(64), nullable=False, default='')
    description: Mapped[str] = mapped_column(String(500), nullable=False, default='')
    location: Mapped[str] = mapped_column(String(64), nullable=False, default='')
    date: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now)
    
    host_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=True)
    host: Mapped['UserEntity'] = relationship('UserEntity', back_populates='workshops_as_host')

    attendees: Mapped[list['UserEntity']] = relationship('UserEntity', secondary=workshop_attendee_table, back_populates='workshops_as_attendee')

    #Args: takes in a NewWorkshop model called model
    #Returns: a WorkshopEntity with identical parameters to the NewWorkshop passed in
    #Raises: Nothing
    @classmethod
    def from_model_new_user(cls, model: NewWorkshop) -> Self:
        return cls(
            title=model.title,  
            description=model.description,
            location=model.location,
            date=model.date,
            host_id = model.host_id
        )
    
    @classmethod
    def from_model(cls, model: Workshop) -> Self:
        return cls(
            id=model.id,
            title=model.title,  
            description=model.description,
            location=model.location,
            date=model.date,
            host_id=model.host_id
        )

    #Args: nothing
    #Returns: a Workshop model with identical parameters to the WorkshopEntity that calls it
    #Raises: Nothing
    def to_model(self) -> Workshop:    
        return Workshop(
            id=self.id,
            title=self.title,
            description=self.description,
            location=self.location,
            date=self.date,
            host_id=self.host_id,
        )
    
    #Args: an optional User _host which is designated at the host of the returned Workshop model
    #Returns: a Workshop model with identical parameters to the WorkshopEntity that calls it
    #Raises: Nothing
    def to_model_w_users(self, _host: User=None, _attendees: list[User]=None) -> Workshop_Users:
        return Workshop_Users(
            id=self.id,
            title=self.title,
            description=self.description,
            location=self.location,
            date=self.date,
            host_id = self.host_id,
            host=_host,
            attendees =_attendees
        )

    #Args: a Workshop model called model containing the new Workshop settings you wish to update
    #Returns: Nothing
    #Raises: Nothing
    def update(self, model: Workshop) -> None:
        self.title = model.title
        self.description = model.description
        self.location  = model.location
        self.date = model.date

    

