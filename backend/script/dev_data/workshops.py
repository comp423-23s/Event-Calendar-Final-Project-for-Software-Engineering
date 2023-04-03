"""Sample workshops to use in the development environment.

These were intially designed to be used by the `script.reset_database` module."""

from ...models import Workshop
from datetime import datetime
from . import users


workshop1 = Workshop(id=1, title="Workshop1", description="this is a sample description for workshop1", location="Sitterson Hall", date=datetime(2023, 4, 5, 12, 0), host_id=users.merritt_manager.id)

workshop2 = Workshop(id=2, title="Workshop2", description="this is a sample description for workshop2", location="Phillips Hall", date=datetime(2023, 4, 10, 3, 0))

workshop3 = Workshop(id=3, title="Workshop3", description="this is a sample description for workshop3", location="Dey Hall", date=datetime(2023, 4, 12, 4, 30))

workshop4 = Workshop(id=4, title="Workshop4", description="this is a sample description for workshop4", location="Peabody Hall", date=datetime(2023, 4, 20, 1, 20))

models = [
    workshop1, 
    workshop2,
    workshop3, 
    workshop4
]
