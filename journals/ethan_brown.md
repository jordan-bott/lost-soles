## Template

## Friday April 28, 2023

Today I worked on:
Show off day!

## Thursday April 27, 2023

Today I worked on:
Worked on some additional unit tests. The match object is MUCH harder to create tests for than the sock object. I think it's because it has like four different objects all in one.

**AH-HA!💡**
Very difficult. 

## Wednesday April 26, 2023

Today I worked on:
Got my journal up to date. Did some small grammar edits and minor code tweaks. Nothing big. 

**AH-HA!💡**
No AHHAs today. 

## Tuesday April 25, 2023

Today I worked on:
Created the application footer with randomized and rotating sock puns/jokes. Hardcoded approximately 40 jokes into a list and created a function to randomize them.

**AH-HA!💡**
Figuring out more about Tailwind CSS. Definitely not my strong suit but getting better regardless. 

**🎉 Celebrations 🎉**
Almost done!

## Monday April 24, 2023

Today I worked on:
Created the List Matches page that displays a list of matches, both pending and approved, that a user is associated with. The matches will display whether or not the user is the giver or receiver of the socks. 

**AH-HA!💡**
Played with a lot of JSX conditionals which was super fun. 

## Saturday April 22, 2023

Today I worked on:
Completed the verification list, started and completed the verification request page, and created my first unit test to delete a sock object. The verification list can only be accessed by an admin user. The verification request page is for any account to submit a driver's license image url so that an admin can then go in and accept or reject the verification request which will change the user account to verified. 

**AH-HA!💡**
First unit test was very difficult to create. It took me a while to realize that I had to create a fake account and use that fake account to delete the sock object. 

## Friday April 21, 2023

Today I worked on: Continued working on the verification list page. I thought it was completed but then I realized that the change in the verification object didn't actually change the user object to verify them. 

**AH-HA!💡**
Relational data is a thing.

## Thursday April 20, 2023

Today I worked on: Continued working on the verification list page. I was able to get the list to show the properties that we wanted. Now I have to add the three button functionality to accept, reject, or delete the verification object. I also need to figure out this tailwind styling stuff. I'm not very good at it.

**AH-HA!💡**
Tailwind is definitely different than bootstrap. Have had to live in the docs while building this component.

## Wednesday April 19, 2023

Today I worked on: Started my first frontend component using redux. I decided to do the list of verification objects since it needs three separate buttons of functionality on it. I figured the best way to learn this stuff is to dive head first into it. 

**AH-HA!💡**
Just learning redux as I go. It's a super cool concept. 

## Tuesday April 18, 2023

Today I worked on: Went back to the redux lesson in Learn and went over it again. It still isn't making a lot of sense. I think I just need to get my hands into it to really start understanding it. I don't learn well from just reading about something. I have to do it.

**AH-HA!💡**
I still don't get Redux. 

## Monday April 17, 2023

Today I worked on: Finished the approve/reject match backend endpoint. Went back into the learn to cover React with Redux. I felt comfortable with React in Mod 2 but with redux I feel like I need to learn a whole new language again. Read read read. 

**AH-HA!💡**
Backend endpoints in FastAPI are more fun than in Django. 

## Friday April 7, 2023

Today I worked on: I created the get_one_sock backend endpoint. The pydantic models are really cool and I really like how you can build relationships between different objects by bringing in specific properties into that pydantic model. 

**AH-HA!💡**
Pydantic models can essentially be comprised of whatever properties you may need for the objects.

## Thursday April 6, 2023

Today I worked on: Sick as a dog.

## Wednesday April 5, 2023

Today I worked on: Was very sick. 

## Tuesday April 4, 2023

Today I worked on: Had Jordan walk me through the authentication stuff regarding log in and log out. It's very foreign to me. It is nice that we're using JWTDown though because that means we don't have to build our own auth stuff.

**AH-HA!💡**
Thank god for JWTDown.


## Monday April 3, 2023

Today I worked on:
As a group we worked to add an update and delete function for our user model. We locked the update feature behind a log-in, and limited editing to only the current user.

Added update & delete methods to UserQueries class in sock_service/queries/user.py

Added update & delete routers to sock_service/routers/user.py

**AH-HA!💡**
Backend in FastAPI making a lot more sense. It was a struggle for me at first but it seems to be clicking.

**🎉 Celebrations 🎉**
Team is flowing well. 

## Thursday March 30, 2023

Today I worked on:
As a group we started working on Authentication. We managed to get our pydantic models done for the User, and got the Login and Logout routers working. Most of our time today was spent learning about JWTDown and figuring out how authentication would be implemented with our user model.

**AH-HA!💡**
JWTDown seems to be the way to go as it seems to be well built for the purposes we need. Crazy to imagine someone desiging their own auth. Yikes.

**🎉 Celebrations 🎉**
Backend progress made. 


## Wednesday March 29, 2023 (W13D3)

Today I worked on:

- As a group we worked to create the foundations of our project:
  - Adding PostgreSQL
    - Updating docker-compose.yml
    - Adding relational-data directory and it's contents to create multiple databases
    - Updating the dockerfiles in the sock_service to reflect the use of Postgres
  - Initializing the foundation of the sock service
    - Creating queries and routers directories and a filler file for user
    - Updating the dockerfile to copy the new directories
    - Writing the migrations for all 4 tables in the sock database
  - Setting up beekeeper and exploring how to use it
    - Made sure our migrations showed up in beekeeper studio
    - Tried one create and one read query to test the functionality

We are working together to get the project to a good starting place to branch off. We're trying to write anything that every piece of the project will need (such as migrations), as a group so that we can all learn, and so that we have 4 eyes on the code making sure it works properly. I imagine we will start pair or solo programming early next week.

**AH-HA💡!** The merge request error in github about pipeline failure is nothing to worry about.

**🎉 Celebrations 🎉**

Got our whole list of "together" things done, and figured out BeeKeeper Studio!



## Tuesday March 28, 2023 (W13D2)

Today I worked on:

As a group we tore into the starter project as well as some of the content on learn and decided how we wanted to approach the project. We decided to create a list of things we want to complete as a group on one machine before moving forward into other tickets in a solo or paired programming environment.

List of Things to Complete Together: - Add PostgreSQL to the docker-compose.ynml file - Clean up the starter data in main.py - Rename starter files - Create queues and routers folders and a starter file in each - Attend to the Dockerfile and Dockerfile.dev in the sock_service - Write migrations

We also decided to attack one model's CRUD together as a group to learn FastAPI together. We are thinking of doing the sock model/CRUD as a group since it is the most complex.

**AH-HA!💡** Following the Learn Project Advice section is going to be very important to remain on task.

**🎉 Celebrations 🎉**

The group is working really well together. Everyone seems to be on the same conceptual page and is able to spitball ideas back and forth really well.
