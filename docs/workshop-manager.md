#Overview
Short description of your feature, who it primarily serves, the value it provides to the community
Description of its high-level functions

We implemented everything you'd need to host websites on the XL websites. The first page is a list of all upcoming workshops. You can click on each workshop to get a description of the workshop and register for it. Administrators are the only ones who can create and delete workshops at this time. 


#Implementation Notes

'Models'
We created a Workshop model of the following format:
Workshop(id: int, title: str, description: str, location: str, date: datetime | None, host_id: int, 
host: User | None)

We created a NewWorkshop model of the following format:
NewWorkshop(title: str, descript: str, location: str, date: datetime | None, host_id: int)

NewWorkshops were made to be a seperate entity so their id's could be generated seperately. Creating this new entity let's us maintain the constraint that all workshops stored in the database must have an id. 


'Entities'

We created a WorkshopEntity and WorkshopAttendeeEntity. Both Entities contain functions .from_model(model) and .to_model() to easily convert entities to and from their corresponding model.

'Database Tables'
We added one table pairing workshops with user attendees to the database. The structure is as follows:
workshop_attendee_table:
Column 1: user_id, primary_key=True
Column 2: workshop_id, primary_key=True

#Development Concerns
To begin work on this app, you should first skim over the contents of the backend folders "models" and "entities", paying special attention to the workshop and user files in each folder. Next, you look at workshop.py in the backend api folder, and workshop.py in the backend services folder. All the functions called by the api can be found in this last file. You can find where they are called in the workshop.py file in the api folder. 

#Future Work
We hope to allow everyone to add, update, and delete the workshops they host, not just the admin. We also hope to make a better, more user friendly UI for the workshop list. 