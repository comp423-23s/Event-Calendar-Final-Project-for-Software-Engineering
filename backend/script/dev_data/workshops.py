"""Sample workshops to use in the development environment.

These were intially designed to be used by the `script.reset_database` module."""

from ...models import Workshop
from datetime import datetime
from . import users


workshop1 = Workshop(id=1, title="Workshop 1", description="This is a sample description for Workshop 1.", location="Sitterson Hall", date=datetime(2023, 4, 5, 12, 0), host_id=users.merritt_manager.id)

workshop2 = Workshop(id=2, title="Workshop 2", description="This is a sample description for Workshop 2.", location="Phillips Hall", date=datetime(2023, 4, 10, 3, 0), host_id=users.sol_student.id)

workshop3 = Workshop(id=3, title="Workshop 3", description="This is a sample description for Workshop 3.", location="Dey Hall", date=datetime(2023, 4, 12, 4, 30), host_id=users.sol_student.id)

workshop4 = Workshop(id=4, title="Workshop 4", description="This is a sample description for Workshop 4.", location="Peabody Hall", date=datetime(2023, 4, 20, 1, 20), host_id=users.merritt_manager.id)

models = [
    workshop1, 
    workshop2,
    workshop3, 
    workshop4
]
