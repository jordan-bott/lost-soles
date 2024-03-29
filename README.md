## Description

  Lost Soles is a Web application that is designed to provide a solution for the pesky issue of missing socks. If you've ever done laundry only to realize that you have a sock missing its partner, this application is for you. Users of Lost Soles can make sock postings with a picture and a description of their single sock. If they're feeling generous they can mark the sock as a gift, meaning that other users can request a match. 

  When a match is requested the owner of the newly-matched sock receives an email notifying them so that they can take a peek at the requesting user and their sock to ensure it's a perfect pair. If the user approves the match both users receive an email notifying them of an approved pairing! The generous gifting user receives an email with the address of the requesting user, and they're able to go ahead and mail the sock to them! 
  
  Users can become verified by sending in an image of a driver's license or official ID. Admin users will check the name and address on the ID to ensure it matches the account information, then the user will receive a little check mark on their profile so that other users know it’s safe to match with them. Unverified users can still match but this is less secure than matching with verified users. 
  
  Users can peruse the sock feed while listening to a custom sock playlist, they can check out the loneliest socks that have been on the site the longest, and they can scroll through a carousel of their posted socks. Lost Soles is a sock lover's paradise, not to mention saving the waste of throwing out single socks (or leaving them in the laundry basket indefinitely hoping the other will appear).


## Design

Lost Soles consists of a FastAPI back end, a PostgreSQL database and a React/Redux front end styled with tailwind CSS, the application utilizes RESTful API's. Docker is used to run the app locally and it is deployed through CapRover.

<img src="/docs/dataschema.png" />
<img src="/docs/design.png" />

## Sock Service Overview

In the project files you'll find a microservice folder named sock_service. Inside of sock_service you'll find addtional folders and files.

- migrations
  - In the migrations folder you'll find a file named 001_create_my_tables.py. This is the file where we determine all of the properties of our objects that will be stored in the database.
- queries
  - In the queries folder is all of our pydantic models for our objects. Here we can lay out how we want each object to look and include whatever additional relational properties that we wish to include. You'll find a file dedicated to each of the objects.
  - We can add an endpoint query for whatever backend endpoint we need to communicate with.
- routers
  - The routers folder is where we actually route the paths of the objects we want to create so that the sock_service can communicate with the database effectively.
  - The router files communicate with the querie files to ensure the correct data is being sent back and forth.
- tests
  - The tests folder is where all of the unit tests are located.
  - The unit tests are tests which communicate with the backend endpoints to ensure they're working properly.
- authenticator.py
  - The authenticator.py file contains important pieces of code which help our authentication system so that users can create accounts, log in, and log out.
- Dockerfile
  - The Dockerfile is a file that helps the docker system load all the important information and run all of the systems through the appropriate ports.
- main.py
  - main.py is a file that helps us connect our routers to the FastAPI system.
- requirements.txt
  - requirements.txt is a very important file that tells the Dockerfile what it needs to install when it boots the program.


As admins, we verify user accounts with their attached ID to ensure their legitimacy and build trust within our community. Once an account is verified, users can see the verified address associated with the profile and feel more confident about initiating a trade.

Our goal is to make finding a match for your single sock as easy and efficient as possible, while also encouraging a culture of giving and reliability. Join us at Lost Soles and let's reunite those wayward socks with their missing pairs!
