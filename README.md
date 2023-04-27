# Module3 Project Gamma

## Getting started

You have a project repository, now what? The next section
lists all of the deliverables that are due at the end of the
week. Below is some guidance for getting started on the
tasks for this week.

## Install Extensions

- Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
- Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>

## Deliverables

- [ ] Wire-frame diagrams
- [ ] API documentation
- [ ] Project is deployed to Render.com/GitLab-pages
- [ ] GitLab issue board is setup and in use
- [ ] Journals

## Project layout

The layout of the project is just like all of the projects
you did with `docker-compose` in module #2. You will create
a directory in the root of the repository for each service
that you add to your project just like those previous
projects were setup.

### Directories

Several directories have been added to your project. The
directories `docs` and `journals` are places for you and
your team-mates to, respectively, put any documentation
about your project that you create and to put your
project-journal entries. See the _README.md_ file in each
directory for more info.

The other directories, `ghi` and `sample_service`, are
sample services, that you can start building off of or use
as a reference point.

Inside of `ghi` is a minimal React app that has an "under
construction" page. It is setup similarly to all of the
other React projects that you have worked on.

Inside of `sample_service` is a minimal FastAPI application.
"Where are all the files?" you might ask? Well, the
`main.py` file is the whole thing, and go take look inside
of it... There's not even much in there..., hmm? That is
FastAPI, we'll learn more about it in the coming days. Can
you figure out what this little web-application does even
though you haven't learned about FastAPI yet?

Also in `sample_service` is a directory for your migrations.
If you choose to use PostgreSQL, then you'll want to use
migrations to control your database. Unlike Django, where
migrations were automatically created for you, you'll write
yours by hand using DDL. Don't worry about not knowing what
DDL means; we have you covered. There's a sample migration
in there that creates two tables so you can see what they
look like.

The sample Dockerfile and Dockerfile.dev run your migrations
for you automatically.

### Other files

The following project files have been created as a minimal
starting point. Please follow the guidance for each one for
a most successful project.

- `docker-compose.yaml`: there isn't much in here, just a
  **really** simple UI and FastAPI service. Add services
  (like a database) to this file as you did with previous
  projects in module #2.
- `.gitlab-ci.yml`: This is your "ci/cd" file where you will
  configure automated unit tests, code quality checks, and
  the building and deployment of your production system.
  Currently, all it does is deploy an "under construction"
  page to your production UI on GitLab and a sample backend
  to Render.com. We will learn much more about this file.
- `.gitignore`: This is a file that prevents unwanted files
  from getting added to your repository, files like
  `pyc` files, `__pycache__`, etc. We've set it up so that
  it has a good default configuration for Python projects.

## How to complete the initial deploy

There will be further guidance on completing the initial
deployment, but it just consists of these steps:

### Setup GitLab repo/project

- make sure this project is in a group. If it isn't, stop
  now and move it to a GitLab group
- remove the fork relationship: In GitLab go to:

  Settings -> General -> Advanced -> Remove fork relationship

- add these GitLab CI/CD variables:
  - PUBLIC_URL : this is your gitlab pages URL
  - SAMPLE_SERVICE_API_HOST: enter "blank" for now

#### Your GitLab pages URL

You can't find this in GitLab until after you've done a deploy
but you can figure it out yourself from your GitLab project URL.

If this is your project URL

https://gitlab.com/GROUP_NAME/PROJECT_NAME

then your GitLab pages URL will be

https://GROUP_NAME.gitlab.io/PROJECT_NAME

### Create render.com account and application

- create account on render.com
- one person create a group and invite all other members
- create a new "Web Service"
  - authenticate with GitLab and choose your project
  - Enter fields:
    - Name: name of your service
    - Root Directory: the directory of your service in your git repo.
      For this example use "sample_service".
    - Environment: Docker
    - Plan Type: Free
  - click the "Create Web Service" button to create it
  - the build will succeed and it will look like the server is running,
    most likely, in 6-10 minutes, it will fail.
  - click "Manual Deploy" -> "Deploy latest commit" and the service
    should deploy successfully.

### Update GitLab CI/CD variables

Copy the service URL for your new render.com service and then paste
that into the value for the SAMPLE_SERVICE_API_HOST CI/CD variable
in GitLab.

### Deploy it

Merge a change into main to kick off the initial deploy. Once the build pipeline
finishes you should be able to see an "under construction" page on your GitLab
pages site.

### How to Install

1. Go to the Github repo [here](https://gitlab.com/lost-soles/module3-project-gamma)
2. Click the `Clone` button and copy the URL.
3. In your terminal and in your desired location run `git clone *URL HERE*`.
4. Run `code .` to open the project in VSCode.
5. Make sure you have Docker installed then in your terminal run `docker volume create sock-data`.
   - This will create the Docker database.
6. In your terminal run `docker compose build`.
   - This will create the Docker containers and images.
7. In your terminal run `docker compose up`.
   - This will run the Docker containers
8. When the Docker containers are running you can open your browser and go to http://localhost:8000/docs/ to view all of the RESTful backend endpoints.
9. When the Docker containers are running you can open your browser and go to http://localhost:3000/.
   - This will take you to the project home page and you can navigate via the navbar dropdown menu.

### Sock Service Overview

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
