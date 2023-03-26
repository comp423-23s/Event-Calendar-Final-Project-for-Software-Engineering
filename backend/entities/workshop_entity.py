'''User accounts for all registered users in the application.'''


from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Self
from .entity_base import EntityBase
from .user_role_entity import user_role_table
from ..models import Workshop


__authors__ = ['Kris Jordan']
__copyright__ = 'Copyright 2023'
__license__ = 'MIT'


class WorkshopEntity(EntityBase):
    __tablename__ = 'workshop'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(64), nullable=False, default='')

    @classmethod
    def from_model(cls, model: Workshop) -> Self:
        return cls(
            id=model.id,
            title=model.title,    
        )

    def to_model(self) -> Workshop:
        return Workshop(
            id=self.id,
            title=self.title,
        )

