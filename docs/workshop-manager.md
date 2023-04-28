# Workshop Manager
*Authors: Ella Carter, Emma Lozevski, Shannon Little, and Ximena Colopy*

## Overview

 We implemented everything you'd need to host workshops on the CSXL website. The first page we implmented is 'All Workshops' and is a list of all upcoming workshops. We made it possible for users to create workshops under the 'Create Workshops' page. When Administrators view this page they also see a delete button that deletes that workshop. Users with Administrative or above permisions are the only ones who can delete workshops. 

### High Level Functions

 __Create:__

 Adds a workshop to the database. It takes in a workshop model to add, and uses workshop_service as a dependency
 ```
@api.post("", response_model=Workshop, tags=['Workshops'])
 ```
Example usage in workshop-create.service file:
```
 return this.http.post<Workshop>('/api/workshop', returnWorkshop);
 ```
This function allowed us to take data from a form, create a workshop object, and pass it to the FastApi.

 __Read:__

This function returns list of workshop models. It uses workshop_service as a dependency.
 ```
@api.get("", response_model=list[Workshop], tags=['Workshops'])
 ```
 Example usage is in workshop-list.service file:
```
return this.http.get<Workshop[]>("/api/workshop");
```
This function allows the 'All Workshops' page to display all workshops currently in the database.

<img src="/workspace/docs/images/workshop-list-example.png">

 __Delete:__
 

  This api deletes a workshop from the database. Takes in the id of the workshop to delete, and uses workshop_service as a dependency. 
  ``` 
  @api.delete("", response_model=Workshop | None, tags=['Workshops']) 
  ```
  Example usage in the workshop-delete.service file:
  ```
  let tempString = '/api/workshop?id=' + id
  return this.http.delete<Workshop>(tempString)
  ```
  This function allowed us to have a `Delete` button for Administratiors:


<img src="/workspace/docs/images/workshop-delete-example.png">

## Implementation Notes 
__'Models'__
- We created a Workshop model of the following format:
```
Workshop(id: int, title: str, description: str, location: str, date: datetime | None, host_id: int, host: User | None)
```

- We created a NewWorkshop model of the following format:
```
NewWorkshop(title: str, descript: str, location: str, date: datetime | None, host_id: int)
```

NewWorkshops were made to be a seperate entity so their id's could be generated seperately. Creating this new entity let's us maintain the constraint that all workshops stored in the database must have an id. 


__'Entities'__

- We created a WorkshopEntity and WorkshopAttendeeEntity. Both Entities contain functions .from_model(model) and .to_model() to easily convert entities to and from their corresponding model.

__'Database Tables'__
- We added one table pairing workshops with user attendees to the database. The structure is as follows:

__workshop_attendee_table:__

| user_id (integer) | workshop_id (integer) |
| --- | --- |
|primary_key = true | primary_key = True |


Example from current database query:
<img src="/workspace/docs/images/workshop-attendee-table-ex.png">


## Development Concerns
To begin work on this app, you should first skim over the contents of the backend folders "models" and "entities", paying special attention to the workshop and user files in each folder. Next, you look at workshop.py in the backend api folder, and workshop.py in the backend services folder. All the functions called by the api can be found in this last file. You can find where they are called in the workshop.py file in the api folder. After you understand those files we also suggests that you take a look at workshop-list.service, workshop-create.service, and workshop-delete.service. These files will give you a good sense and examples of how to use the the Fast Api that have already been implemented. 



## Future Work
We hope to allow users to register for workshops and update the workshops they host. We are also always aiming for a better and more user friendly UI and formating. We also want to be stricter on what can be inputed for 