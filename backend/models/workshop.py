"""Workshop is the data object"""

from pydantic import BaseModel
from . import User
from datetime import datetime



__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"


class Workshop(BaseModel):
    id: int | None = None
    title: str
    description: str | None = None
    location: str | None = None
    date: datetime | None = None
    host_id: int | None = None
    host: User | None = None
