"""Sample workshop/user pairings."""

from . import users
from . import workshops

__authors__ = ["Kris Jordan"]
__copyright__ = "Copyright 2023"
__license__ = "MIT"

pairs = [
    (users.root, workshops.workshop1),
    (users.merritt_manager, workshops.workshop2),
    (users.arden_ambassador, workshops.workshop3)
]