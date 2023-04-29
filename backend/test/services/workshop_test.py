import pytest

from sqlalchemy.orm import Session

from ...services.registration import RegistrationService
from ...models import User, Role, Permission, Workshop
from ...entities import UserEntity, RoleEntity, PermissionEntity, WorkshopEntity
from ...services.workshop import  WorkshopService
from datetime import datetime

"""This file contains tests for the functions in WorkshopService
    The following functions are tested:
    list()
    add(Workshop)
    delete(Workshop)
"""

#MockModels
#these are sample users and workshops for the below tests to use
user = User(id=1, pid=999999999, onyen='root', email='root@unc.edu')

workshop1 = Workshop(id=1, title="Workshop1", description="this is a sample description for workshop1", location="Sitterson Hall", date=datetime(2023, 4, 5, 12, 0), host_id=1, attendees=[])
workshop2 = Workshop(id=2, title="Workshop2", description="this is a sample description for workshop2", location="Dey Hall", date=datetime(2023, 4, 5, 11, 0), host_id=1, attendees=[])
workshop3 = Workshop(id=3, title="Workshop3", description="this is a sample description for workshop3", location="Genome Science Building", date=datetime(2023, 4, 5, 11, 0), host_id=1, attendees=[])

@pytest.fixture(autouse=True)
def setup_teardown(test_session: Session):
    # Adds the mock models to the database so the tests can use them
    workshop_entity1 = WorkshopEntity.from_model(workshop1)
    test_session.add(workshop_entity1)
    workshop_entity2 = WorkshopEntity.from_model(workshop2)
    test_session.add(workshop_entity2)
    user_entity = UserEntity.from_model(user)
    test_session.add(user_entity)
    test_session.commit()
    
#creates a new WorkshopService. All the functions we are testing can be found in WorkshopService
@pytest.fixture()
def workshop(test_session: Session):
    return WorkshopService(test_session)

""" Tests for list()"""
#tests that list() returns the correct number of workshops

def test_list_size(workshop: WorkshopService):
    assert len(workshop.list()) == 2

#tests that list() returns only Workshop models
def test_list_type(workshop: WorkshopService):
    assert type(workshop.list()[0] is Workshop)
    assert type(workshop.list()[1] is Workshop)

#tests that list() returns a workshop with the correct parameters
def test_workshop_params(workshop: WorkshopService):
    workshop1 = workshop.list()[0]
    assert workshop1.id == 1
    assert workshop1.title == "Workshop1"
    assert workshop1.description == "this is a sample description for workshop1"
    assert workshop1.location == "Sitterson Hall"


"""Tests for add(workshop)"""
#tests that only 1 workshop is added to the database
def test_add_workshop(workshop: WorkshopService):
    workshop.add(workshop3)
    assert len(workshop.list()) == 3


#tests that a workshop with the correct attributes is added to the database
def test_add_correct_workshop(workshop: WorkshopService):
    workshop.add(workshop3)
    workshop_test = workshop.list()[2]
    assert workshop_test.title =="Workshop3"


"""Tests for delete(id)"""
#Tests that only one workshop, and that the correct workshop, are removed by delete(id)
def test_delete_workshop(workshop: WorkshopService):
    workshop.delete(workshop2.id)
    assert len(workshop.list()) == 1
    assert workshop.list()[0].title == "Workshop1"


#Tests that deleting a nonexistant workshop will both not delete any workshops
def test_delete_nonexistant_workshop(workshop: WorkshopService):
    workshop.delete(9)
    assert len(workshop.list()) == 2
    
    
# Tests registering for a workshop
def test_register(registration: RegistrationService):
    registration.add_attendee(user, workshop1)
    assert len(workshop1.attendees) == 1
