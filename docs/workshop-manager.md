# Workshop Manager
*Authors: Ella Carter, Emma Lozevski, Shannon Little, and Ximena Colopy*

## Overview

 We implemented everything you'd need to host workshops on the CSXL website. The first page we implemented is 'All Workshops' and is a list of all upcoming workshops. We enabled users to create workshops under the 'Create Workshops' page. When Administrators view this page, they also see a delete button that deletes that workshop. Users also have the option to register for a workshop! We also have a "my workshops" page where users can see what workshops they are hosting and attending. For workshops the user is hosting, they can delete and edit them. 


### High Level Functions

 __Create:__

 Adds a workshop to the database. It takes in a workshop model to add, and uses workshop_service as a dependency
 ```
@api.post("", response_model=Workshop, tags=['Workshops'])
 ```
Example usage in workshop-create.service file:
```
  let returnWorkshop: Workshop = {
        id: 10,
        title: title,
        description: description,
        location: location,
        date: dateAsDate,
        host_id: hostid,
        host: user,
        attendees: []
      }

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

![image](https://user-images.githubusercontent.com/97571121/235318891-d8039b1b-94e8-4ef5-bb51-307fae65e96c.png)


__Update:__

This function updates the workshop with the given workshop id using the parameters of the new workshop passed in. It takes in an id of the workshop to update, a workshop model with the new arguments to be updated and uses workshop_service as a dependency. Note: neither the host nor the workshop_id are updated by this function.
```
@api.put("", response_model=Workshop | None, tags=['Workshops'])
```

Example usage is in workshop-update.service file:
```
    let returnWorkshop: = {
          id: 0,
          title: title,
          description: description,
          location: location,
          date: dateAsDate,
          host_id: 0
        }
    let tempstring = '/api/workshop?workshop_id=' + id;
    return this.http.put<Workshop>(tempstring, returnWorkshop); 
```
This function allows a user to update the workshop's title, description, location, and date in the 'Edit Workshop' Page, which is accessible through the 'My Workshops' Page after hitting the edit button of workshops you are hosting.  

My Workshops -> Edit
![image](https://user-images.githubusercontent.com/97571121/235318854-050c7eb7-e125-46f3-b5d3-5a0864aa8697.png)

The save button calls the update method in workshop-update.service which uses the code in the example above to call the update API function.

![image](https://user-images.githubusercontent.com/97571121/235318821-e2016a70-7cec-43d1-84e8-0f51e990dd67.png)

 __Delete:__
 

  This api deletes a workshop from the database. It takes in the id of the workshop to delete and uses workshop_service as a dependency. 

  ``` 
  @api.delete("", response_model=Workshop | None, tags=['Workshops']) 
  ```
  Example usage in the workshop-delete.service file:
  ```
  let tempString = '/api/workshop?id=' + id
  return this.http.delete<Workshop>(tempString)
  ```
  This function allowed us to have a `Delete` button for Administratiors:


![image](https://user-images.githubusercontent.com/97571121/235318918-2fad6bd1-a455-425f-99db-08713d4193cc.png)

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

NewWorkshops was made to be a separate entity so their id's could be generated separately. Creating this new entity lets us maintain the constraint that all workshops stored in the database must have an id.

__'Entities'__

- We created a WorkshopEntity and WorkshopAttendeeEntity. Both Entities contain functions .from_model(model) and .to_model() to easily convert entities to and from their corresponding model.

__'Database Tables'__
- We added one table pairing workshops with user attendees to the database. The structure is as follows:

__workshop_attendee_table:__

| user_id (integer) | workshop_id (integer) |
| --- | --- |
|primary_key = true | primary_key = True |


Example from current database query:

![image](https://user-images.githubusercontent.com/97571121/235318864-b59372a0-d799-4409-877c-e11e6329a04f.png)


## Development Concerns
To begin work on this app, you should first skim over the contents of the backend folders "models" and "entities", paying special attention to the workshop and user files in each folder. Next, you look at workshop.py in the backend api folder, and workshop.py in the backend services folder. All the functions called by the api can be found in this last file. You can find where they are called in the workshop.py file in the api folder. After you understand those files, we also suggest that you take a look at workshop-list.service, workshop-create.service, and workshop-delete.service. These files will give you a good sense and examples of how to use the Fast Api functions that have already been implemented. 




## Future Work
We want to add the ability to see who is attending a workshop and limit the number of people who can attend. We also want to add a number of available spots in a workshop so users can see if the workshop is full.

