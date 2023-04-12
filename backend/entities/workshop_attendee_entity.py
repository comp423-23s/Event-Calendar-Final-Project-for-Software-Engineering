from sqlalchemy import Table, Column, ForeignKey
from .entity_base import EntityBase

workshop_attendee_table = Table(
    "workshop_attendees",
    EntityBase.metadata,
    Column('user_id', ForeignKey('user.id'), primary_key=True),
    Column('workshop_id', ForeignKey('workshop.id'), primary_key=True)
)