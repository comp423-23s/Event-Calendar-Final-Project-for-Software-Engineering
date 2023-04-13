'''User accounts for all registered users in the application.'''


from sqlalchemy import Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Self
from .entity_base import EntityBase
from .user_entity import UserEntity
from ..models import Workshop, User
from datetime import datetime
from .workshop_attendee_entity import workshop_attendee_table


__authors__ = ['Kris Jordan']
__copyright__ = 'Copyright 2023'
__license__ = 'MIT'


class WorkshopEntity(EntityBase):
    __tablename__ = 'workshop'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(64), nullable=False, default='')
    description: Mapped[str] = mapped_column(String(500), nullable=False, default='')
    location: Mapped[str] = mapped_column(String(64), nullable=False, default='')
    date: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now)
    
    #host: Mapped['UserEntity'] = mapped_column(UserEntity, )
    host_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=True)
    host: Mapped[UserEntity] = relationship('UserEntity', back_populates='workshops_as_host')

    attendees: Mapped[list['UserEntity']] = relationship('UserEntity', secondary=workshop_attendee_table, back_populates='workshops_as_attendee')

    @classmethod
    def from_model(cls, model: Workshop) -> Self:
        return cls(
            id=model.id,
            title=model.title,  
            description=model.description,
            location=model.location,
            date=model.date,
            host_id = model.host_id
        )
    
    def from_model_w_host(cls, model: Workshop, _host: User | None) -> Self:
        return cls(
            id=model.id,
            title=model.title,  
            description=model.description,
            location=model.location,
            date=model.date,
            host_id = model.host_id
        )

    def to_model(self) -> Workshop:
        return Workshop(
            id=self.id,
            title=self.title,
            description=self.description,
            location=self.location,
            date=self.date,
            host_id = self.host_id
        )
    
    def to_model_w_host(self, _host: User | None) -> Workshop:
         return Workshop(
             id=self.id,
             title=self.title,
             description=self.description,
             location=self.location,
             date=self.date,
             host_id = self.host_id,
             host=_host
         )
    

