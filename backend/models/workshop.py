"""Workshop is the data object"""

from pydantic import BaseModel
#from . import User
from .user import User
from datetime import datetime



__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class Workshop(BaseModel):
    id: int 
    title: str
    description: str = "No description provided for this event."
    location: str = "Location TBD"
    date: datetime | None = None
    host_id: int = 1

class Workshop_Users(BaseModel):
    id: int 
    title: str
    description: str = "No description provided for this event."
    location: str = "Location TBD"
    date: datetime | None = None
    host_id: int = 1
    host: User | None = None
    attendees: list[User] = []

class NewWorkshop(BaseModel):
    title: str
    description: str = "No description provided for this event."
    location: str = "Location TBD"
    date: datetime | None = None
    host_id: int = 1
