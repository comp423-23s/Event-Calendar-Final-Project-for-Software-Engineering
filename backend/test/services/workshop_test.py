import pytest

from sqlalchemy.orm import Session
from ...models import User, Role, Permission, Workshop
from ...entities import UserEntity, RoleEntity, PermissionEntity, WorkshopEntity
from ...services.workshop import  WorkshopService
from datetime import datetime
#from .. import users #not sure if this will work 

#MockModels
user = User(id=1, pid=999999999, onyen='root', email='root@unc.edu')
workshop1 = Workshop(id=1, title="Workshop1", description="this is a sample description for workshop1", location="Sitterson Hall", date=datetime(2023, 4, 5, 12, 0), host_id=user.id)
workshop2 = Workshop(id=2, title="Workshop2", description="this is a sample description for workshop2", location="Dey Hall", date=datetime(2023, 4, 5, 11, 0), host_id=user.id)
#Bootstrap basic workshop


# I need to assert that each object in the workshop list is indeed a workshop model, 
# and that all the parameters in the object are indeed valid

@pytest.fixture(autouse=True)
def setup_teardown(test_session: Session):
    # Bootstrap Workshop
    workshop_entity1 = WorkshopEntity.from_model(workshop1)
    test_session.add(workshop_entity1)
    workshop_entity2 = WorkshopEntity.from_model(workshop2)
    test_session.add(workshop_entity2)
    test_session.commit()
    

@pytest.fixture()
def workshop(test_session: Session):
    return WorkshopService(test_session)

def test_list_size(workshop: WorkshopService):
    assert len(workshop.list()) == 2

def test_list_type(workshop: WorkshopService):
    assert type(workshop.list()[0] is Workshop)
    assert type(workshop.list()[1] is Workshop)

def test_workshop_params(workshop: WorkshopService):
    workshop1 = workshop.list()[0]
    assert workshop1.id == 1
    assert workshop1.title == "Workshop1"
    assert workshop1.description == "this is a sample description for workshop1"
    assert workshop1.location == "Sitterson Hall"
