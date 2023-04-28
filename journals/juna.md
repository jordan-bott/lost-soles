**Thursday April 26th(W17D4)**

---

**Today I worked on:**

I added a 'create match' unit test

- added `test_create_sock.py` to `sock_service/tests`

- ['Create Match" unit test](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/76)

I also worked on the 'Description' and 'Design' sections of the README.md. I wrote a user story describing the happy path on the website. I created a diagram of the data schema and a design of the routes with frontend and backend.

- [Description and Design README.md](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/72)

**AH-HA!💡**

- I had to pass all the data that `CreateMatchQuery` was expecting in a dictionary instead of doing it in two parts like I like did in the 'create sock' test because of the way the query handles data.

**References Used Today:**

- [Unit tests Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/04-unit-tests/04-unit-tests.md)
- [Example README.md](https://gitlab.com/smelli-belli/smelli-belli/-/blob/main/README.md)

**Tomorrow I'm working on:**

The team is adding finishing touches and presenting our project to instructors! The project is done :)

---

**Wednesday April 26th (W17D3)**

---

**Today I worked on:**

I went through all the API's in `sock_service/routers` and made sure they were RESTful.

- [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/74)
- [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/62)

- Changed the `update_verification` router in `sock_service/routers/user.py` from `api/update_user_verification/{user_id}` to `api/users/{user_id}/verification`
- Removed the `update_reverification` router in `sock_service/routers/user.py`
- Amended the `update_positive_verification_status` query in `sock_service/queries/user/py` to be called `update_verification`, changed the SQL statement so it flips the boolean value for verified.

I also added the 'Update your account' button to the sock drawer to direct users to `users/{user_id}`

Created an error 404 Page to display on any pages that are not registered to any routes.

- added `ErrorPage` to `ghi/src/components/errorpage.js`
- added an `ErrorPage` route to `ghi/src/App.js`
- added the class `.error-page` to `ghi/src/index.js`

- [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/76)
- [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/65)

**AH-HA!💡**

We were able to leave our 'approve verification' and 'reject verification' routers in the format:

`/api/verifications/{id}/reject` `/api/verifications/{id}/approve`

This is because these are 'put' methods that do very specific things and they still follow the criteria for RESTful API's
In `App.js` I registered `<Route path="*" element={<ErrorPage />} />` this allows the route to direct to the error page is a user tries an unregistered route!

**References Used Today:**

[RESTful API's Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1873/content_files/build/03-hello-bcs/02-restful.md)

**Tomorrow I'm working on:**

The team as a whole will have finished all code by tomorrow with the exception of possibly adding more unit tests. We will be working on the documentation for the project tomorrow.

**References for Tomorrow:**

[Example README.md](https://gitlab.com/smelli-belli/smelli-belli/-/blob/main/README.md)

---

**Tuesday April 25th(W17D2)**

---

**Today I worked on:**

I worked on the 'Delete your account' button and the 'Verify your account' buttons that show up under the user card. The 'Verify your account' button scales up when hovered over, a user can click on the 'Verify your account' button and be directed to `users/verify`. The 'Delete your account' button triggers a an alert where the user selects either a 'No don't delete my account button' or a 'Yes delete my account button'. If the user selects 'Yes delete my account button' then their account is deleted and they are logged out. Otherwise the account stays in tact.

Issues:

- [Sock Drawer 'Delete your account' Button](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/45)
- [Sock Drawer 'Verify your account' Button](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/40)

- [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/60)

**AH-HA!💡**

I had to import `useNavigate` from `react-router-dom` and I was able to easily have my buttons navigate to the API's

**References Used Today:**

- [daisyUI carousel](https://daisyui.com/components/carousel/)
- [daisyUI alert](https://daisyui.com/components/alert/)
- [tailwindcss documentation](https://tailwindcss.com/docs/installation)
- [useNavigate React Router](https://reactrouter.com/en/main/hooks/use-navigate)

**Tomorrow I'm working on:**

Going through the router API's to make sure they are all RESTful

**References for Tomorrow:**

[RESTful API's Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1873/content_files/build/03-hello-bcs/02-restful.md)

---

**Monday April 24th(W17D1)**

---

**Today I worked on:**

Worked on finishing up the carousel for the Sock Drawer Component and getting some detailed styling done, making sure the 'delete' and 'update' buttons are aligned and the user card is aligned with the carousel.

[Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/41)

**AH-HA!💡**

I realized that the carousel was inside of the same 3 column grid that we used to create the feed, this is why the carousel was stuck to the left side of the page. After deleting the div that contained the grid and ensuring that the carousel was in it's own flex box I was able to manipulate it into the location I wanted using margin and padding.

**References Used Today:**

[daisyUI](https://daisyui.com/components/carousel/)
[tailwindcss documentation](https://tailwindcss.com/docs/installation)

**Tomorrow I'm working on:**

Finishing the final details on the carousel and buttons

**References for Tomorrow:**

[daisyUI](https://daisyui.com/components/carousel/)
[tailwindcss documentation](https://tailwindcss.com/docs/installation)

---

**Saturday April 22nd(Day off)**

---

**Today I worked on:**

I wrote a unit test for the `create_sock` backend endpoint.

- added a tests folder to `sock_service`

included an` __init__.py` module in the `tests` folder
added the `test_create_sock` module to the `tests` folder
added `fake_acc` in the `test_create_sock` module
added the `CreateSockQuery` class in the `test_create_sock` module
added the `test_create_sock` function to the `test_create_sock` module

**AH-HA!💡**

I needed to write a stand in query since we couldn't just import the `create` query from `queries\sock.py`. That query touched the database and it's a fundamental rule of unit tests that they can't touch the database. Once I figured that out it was smooth sailing! Was getting lots of TypeErrors when trying to import the pydantic models, I realized I just needed to pass the data as a dictionary. I was getting a 'module not found' error when trying to import the `authenticator` I found a stack overflow article and realized I needed to add `___init.py__` to the `tests` folder! Celebrating having my unit test requirement complete, yay!

**References Used Today:**

- [Unit tests Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/04-unit-tests/04-unit-tests.md)
- [pytest cannot import module while python can Stackoverflow](https://stackoverflow.com/questions/41748464/pytest-cannot-import-module-while-python-can)

**Tomorrow I'm working on:**

Going to continue working on the carousel using daisyUI, hopefully finish the sock drawer page, or at least get the carousel done and do the buttons on monday if needed.

**References for Tomorrow:**

- [daisyUI](https://daisyui.com/components/carousel/)
- [tailwindcss documentation](https://tailwindcss.com/docs/installation)

---

**Friday April 21st (Day off)**

---

**Today I worked on:**

I worked on the carousel of sock cards for the sock drawer component. I tried to use a library called React Slick but it wasn't working as it was supposed to and it was causing issues with my VSC. So Instead I am going to try using a library called DaisyUI, it seems promising and the carousels look similar to our wireframe.

I also finished the user card. My delete and update buttons aren't in the spot I want them in anymore on the card and I still need to make the verify your account button and delete account button. I did write the query for the update button in socksApi.js but I'm not sure if it works yet because we don't have the `update sock` page up yet. Celebrating having the user card up and looking close to how we want it.

**AH-HA!💡**

Issues with the React Slick library, decided to move on from attempting to make that library work. Don't use old libraries that have barebones documentation, look for something more modern and make sure to thoroughly research everytime.

**References Used Today:**

- [React Slick](https://react-slick.neostack.com/)
- [daisyUI](https://daisyui.com/components/carousel/)
- [tailwindcss documentation](https://tailwindcss.com/docs/installation)

**Tomorrow I'm working on:**

writing a unit test for a backend endpoint

**References for Tomorrow:**

[Unit tests Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/04-unit-tests/04-unit-tests.md)

---

**Thursday April 20th(W16D4)**

---

**Today I worked on:**

Continued working on the sock drawer page, I added the `deletesock` query to the redux store in `socksApi.js` and got the delete button working at the end of the day. Started investigating how to make the carousel with React and tailwind css. Also began creating the user card, had to add the `getUser` query to `usersApi.js` and add the `prepare headers` so the endpoint will work when restricted by auth.

- Issues:
- [Sock Drawer User Card](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/39)
- [Sock Drawer Carousel Card 'Delete' Button](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/43)
- [Sock Drawer Carousel Card 'Update' Button](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/42)

**AH-HA!💡**

When making queries with redux that have multiple parameters you need to pass the parameters in a dictionary like so:

```
deleteSock: builder.mutation({
      query: ({ user_id, sock_id }) => ({
        url: `/api/users/${user_id}/socks/${sock_id}`,
        method: "DELETE",
        credentials: "include",
      }),
})
```

We also realized we needed to change the backend endpoint for deleting users to `/api/users/${user_id}/socks/${sock_id}`, this is to ensure the endpoint is restful and doesn't interfere with other endpoints.

**References Used Today:**

- [Redux Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/01-react-redux-tutorial.md)
- [Redux fundamentals](https://redux.js.org/tutorials/fundamentals/part-1-overview)

**Tomorrow I'm working on:**

Working on the carousel for the sock cards

**References for Tomorrow:**

- [Redux Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/01-react-redux-tutorial.md)
- [Redux fundamentals](https://redux.js.org/tutorials/fundamentals/part-1-overview)
- [React Slick](https://react-slick.neostack.com/)
- [Building a carousel with React and Tailwind](https://robkendal.co.uk/blog/how-to-build-a-multi-image-carousel-in-react-and-tailwind)
- [tailwindcss documentation](https://tailwindcss.com/docs/installation)

---

**Wednesday April 19th(W16D3)**

---

**Today I worked on:**

As a whole the team worked on reviewing Redux and making sure we are comfortable with it before diving into front end. I went through the Redux fundamentals documentation and followed the tutorial.

I also began writing issues and working on the Sock-Drawer component for the frontend. The sock drawer is accessible to a logged in user, it contains all of the socks they have posted as well as a user card with their username, profile picture, sockstar points, the date they became a user and their total pairings(matches). The sock cards will be on a carousel, these cards will have 'update' and 'delete' buttons. There will also be a 'verify your account' button and a 'delete your account' button.

Today I added a `getSocksByUser` query to the redux store `socksApi.js`, I also added `prepare headers` so that the query will work for the auth protected endpoints. I got the sock cards showing up on the page, plan to do a lot more styling tomorrow and try to get the `delete` and `update` buttons working. Celebrating the start of frontend, our team also began deployment so that's a big celebration.

**AH-HA!💡**

Redux was overwhelming at first but I'm starting to feel comfortable with it, I can see how global state will be useful for our application because we need the data across so many components.

**References Used Today:**

- [Redux Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/01-react-redux-tutorial.md)
- [Redux fundamentals](https://redux.js.org/tutorials/fundamentals/part-1-overview)

**Tomorrow I'm working on:**

Continuing work on the sock drawer component

**References for Tomorrow:**

- [Redux Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/01-react-redux-tutorial.md)
- [Redux fundamentals](https://redux.js.org/tutorials/fundamentals/part-1-overview)
- [React Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1883/content_files/build/05-react/66-attendees-list.md)

---

**Tuesday April 18th(W16D2)**

---

**Today I worked on:**

The 'Get Match List By User' backend endpoint. This allows a user to view a list of all matches where they are the requesting or approving user, it displays pending and approved matches. Celebrating backend being finished today!

- [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/24)
- [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/26)

- added `get_matches_by_user` router to `sock_service/routers/match.py `
- added `get_by_user` method to MatchQueries in `sock_service/queries/match.py`
- added the `SockIn` pydantic model so we can access sock information to display with the match
- added the `GiftSockOut` pydantic model because we need sock information for both the receiving sock and the gift sock
- added the `UserMatchOut` pydantic model because we needed to get dictionaries with the sock information to display along with the match information instead of just the integer types we use for the create method

**AH-HA!💡**

I realized that in order to display the data we wanted we needed to make a new pydantic model, pydantic models come in super handy for structuring data!

**References Used Today:**

[FastAPI Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/09-fast-api.md)

**Tomorrow I'm working on:**

Reviewing the Redux documentation and getting ready for frontend!

**References for Tomorrow:**

- [Redux Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/01-react-redux-tutorial.md)
- [Redux fundamentals](https://redux.js.org/tutorials/fundamentals/part-1-overview)

---

**Monday April 17th (W16D1)**

---

**Today I worked on:**

The Get One Match backend endpoint. This allows a logged in user to view matches that are associated with their user_id as either the `requesting_user` or `approving_user`.

- [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/25)
- [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/32)

- Added the `get_one_match` router to `sock_service/routers/match.py`
- Added the `get_one method` to `MatchQueries` in `sock_service/queries/match.py
`
  **AH-HA!💡**

I'm starting to get better at debugging pydantic validation errors, adding print statements is they key but I just need to remember to remove them! I was getting another 'validation error' but I just had to add "List" to my router since pydantic was expecting the match in a list format.

**References Used Today:**

[FastAPI Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/09-fast-api.md)

**Tomorrow I'm working on:**

Tomorrow we begin our front end!

**References for Tomorrow:**

[FastAPI Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/09-fast-api.md)

---

**Thursday April 13th (Spring Break)**

---

**Today I worked on:**

I realized the delete match feature we merged in had an issue. It allowed any logged in user to delete any match so I updated it to only allow the `receiving_user` or `approving_user` to delete the match.

- [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/28)
- [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/26)

- Updated the `delete_match` router in `sock_service/routers/match.py` so that it takes `requesting_user` and `approving_user` as parameters
- Updated the `delete query` in `sock_service/queries/match.py` so that is takes `requesting_user` and `approving_user` as parameters

**AH-HA!💡**

We can just pass the `receiving_user` and `approving_user` as parameters to the `delete_match` router and delete query, this should be easy to execute with React.

**References Used Today:**

[FastAPI Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/09-fast-api.md)

**Tomorrow I'm working on:**

View a single match backend point

**References for Tomorrow:**

[FastAPI Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/09-fast-api.md)

---

**Saturday April 8th (Spring Break)**

---

**Today I worked on:**

Jordan helped me figure out how we can fetch two different rows from the sock table to display the gifting sock and the receiving sock along with the match. We realized we needed to execute the cursor twice, planning to check in with James to see if this is how he would have recommended the implementation.

- [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/26)
- [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/24)

- Added the `SockIn` pydantic model so we can access sock information to display with the match
- Added the `GiftSockIn` pydantic model because we need sock information for both the receiving sock and the gift sock
- Added the `UserMatchOut` pydantic model because we needed to get dictionaries with the sock information to display along with the match information instead of just the integer types we use for the create method

**AH-HA!💡**

The cursor stores the data that is returned from the SQL query. We realized we can run `fetchall()` instead of `fetchone()` to get all of the information on the cursor and store it in a variable. This allowed us to get information twice from the sock table. After research we don't think it's possible to `JOIN` the same table twice in the same SQL query and get two different pieces of information. Unable to get information for both socks, we realized we needed to call the cursor twice since we were unable to do this with `JOIN` SQL statements.

**References Used Today:**

[Relational Databases Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/05-sql-I/07-relations.md)

**Tomorrow I'm working on:**

No plans to work tomorrow as it's Spring Break but we will do some light work over the week and the team plans to meet later in the week

**References for Tomorrow:**

[Learn FastAPI](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/09-fast-api.md)

---

**Friday April 7th, 2023 (W15D5)**

---

**Today I worked on:**

Updating the data schema so that the match table includes requesting_user column and approving_user column. Also worked on the create match backend endpoint so that users can request/approve a match between their sock and another sock.

- [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/18)
- [Issue (Create Match Feature)](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/20)
- [Issue Update Schema](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/23)

- Updated the match table to include `requesting_user` property, the id of the user requesting a match, and an `approving_user` property, the id of the user who needs to approve the match.
- Added `sock_service/queries/match.py` and `sock_service/routers/match.py`
- Wrote the pydantic model for `MatchOut` in `sock_service/queries/match.py` (`MatchIn `pydantic model not needed)
- Wrote `MatchQueries` class in `sock_service/queries/match.py`
- Added a create method to `MatchQueries` class
- dded the match routers to `main.py`

Started working on the get matches by user endpoint. Had to reach out in help-me-understand as we were getting a `Validation Error` that the team couldn't debug. We realized we did have to pass `user_id` as a parameter to the `get_matches_by_user `router but we will pass this automatically through the frontend.

-[Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/24)

- Added `get_matches_by_user` router to `sock_service/routers/match.py `
- Added `get_by_user` method to MatchQueries in `sock_service/queries/match.py`

**AH-HA!💡**

It's so easy to update the data tables in FastAPI, I was trying to figure out how to do migrations but all I had to do was delete my volume and docker containers, then create a new volume and rebuild. I realized `Validation Error`, means something is wrong with the data that's being passed in or sent out. We've seen it a lot and we're getting better at debugging it.

**References Used Today:**

- [Learn FastAPI](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)
- [Handeling Errors](https://fastapi.tiangolo.com/tutorial/handling-errors/)

**Tomorrow I'm working on:**

Jordan and I are going to work on making sure we can get the sock data too when we get matches by the user since we want to show the two socks when displaying the match.

**References for Tomorrow:**

[Learn FastAPI](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

---

**Thursday April 6th, 2023(W15D4)**

---

**Today I worked on:**

The get socks by user backend so that a logged in user can view all of the socks they have created.

- [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/15)
- [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/14)

- Added `get_socks_by_user` to `sock_service/routers/sock.py`
- Added `get_by_user` to `SockQueries` in `sock_service/queries/sock.py`

**AH-HA!💡**

We realized the get one sock had the same endpoint as get sock by user, they were both `/api/sock/{id}` so I changed the endpoint for the `get_socks_by_user` to `/api/socks/users/{user_id}` instead. Make sure all endpoints are different!

**References Used Today:**

- [Learn FastAPI](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)
- [HTTP errors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses)

**Tomorrow I'm working on:**

More backend tickets :)

**References for Tomorrow:**

[Learn FastAPI](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

---

**Wednesday April 5th, 2023 (W15D3)**

---

**Today I worked on:**

The delete sock endpoint for the backend so a logged in user can delete socks they have created.

- [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/13)
- [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/13)

- Added delete method to `SockQueries` class in `sock_service/queries/sock.py`
- Added `delete_sock` router to `sock_service/routers.sock.py`

**AH-HA!💡**

When deleting something the doesn't exist HTTP still returns 'true' but we decided as a group this is ok since we will come up with our own error handling on the frontend.

**References Used Today:**

[Learn FastAPI](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

**Tomorrow I'm working on:**

More backend tickets

**References for Tomorrow:**

[Learn FastAPI](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

---

**Tuesday April 4th, 2023 (W15D2)**

---

**Today I worked on:**

The get one user endpoint for the backend to allow us to get all the information for a given user id. If the user is viewing their own profile they can view all of the information. When viewing someone else's profile they can view limited information.

- [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/9)
- [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/9)

- Added `get_one_authorized` and `get_one` methods on `UserQueries` in `sock_service/queries/user.py`

- Added `get_one_user` router to `sock_service/routers/user.py` with the endpoint `/api/users/{user_id}`

- Added the `UserAuthorizedViewOut` pydantic model and the `UserViewOut` pydantic model to `sock_service/queries/user.py`

**AH-HA!💡**

Initially we were having trouble with the unauthorized query until realizing we had to make another pydantic model. Even though there is only one router I realized it made sense to have two different queries in `sock_service/queries/user.py` so that when viewing other users data we can select only what we want shown.

**References Used Today:**

[FastAPI Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

**Tomorrow I'm working on:**

Grabbing more backend tickets

**References for Tomorrow:**

[FastAPI Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

---

**Monday April 3rd, 2023 (W15D1)**

---

**Today I worked on:**

The group worked on adding an update and delete function for our user models. The update feature can only be used by the current logged in user.

- Added update & delete methods to `UserQueries` class in `sock_service/queries/user.py`
- Added update & delete routers to `sock_service/routers/user.py`

**AH-HA!💡**

We realized that using `account_data: dict = Depends(authenticator.get_current_account_data)` as a param in a router will pull a dictionary with all of the currently logged in user's data. This allows us to pull any property from the `UserOut model` to use for authentication.

`RETURNING *` in a SQL statement returns all of the table columns so this allows the user only amend the columns they need edited for an update

**References Used Today:**

- [JWTDown Documentation](https://jwtdown-fastapi.readthedocs.io/en/stable/intro.html#requiring-a-valid-token)
- [FastAPI Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

**Tomorrow I'm working on:**

- We will all be grabbing backend tickets to work on

**References for Tomorrow:**

[FastAPI Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

---

**Thursday, March 30th, 2023, (W14D4)**

---

**Today I worked on:**

As a group we all ensured we'd started our journals. We reviewed the authentication material in learn. We got pydantic models done for the user and login/logout routers working.

**AH-HA!💡**

We realized the docker-compose file can read the env file that contains our signin key, similar to how we used API keys in module 2.

**References Used Today:**

- [Authorization Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/02-backend-auth/01-using-jwtdown-fastapi.md)
- [JWTDown Docs](https://jwtdown-fastapi.readthedocs.io/en/stable/intro.html)
- [Creation for signing key](https://linuxhint.com/generate-random-string-bash/)

**Tomorrow I'm working on:**

Over the weekend each team member will work on creating the user for authentication

**References for Tomorrow:**

- [Authorization Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/02-backend-auth/01-using-jwtdown-fastapi.md)
- [JWTDown Docs](https://jwtdown-fastapi.readthedocs.io/en/stable/intro.html)

---

**Wednesday March 29, 2023 (W13D3)**

---

**Today I worked on:**

The group worked together to add PostgreSQL to the project by updating our `docker-compose.yml`. We added a relational- data directory to the `docker-compose.yml` to create multiple databases in case we need more than one database in the future. We updated the dockerfiles in `sock_service`(previously sample_service) to reflect the use of Postgres.

We set up the foundation of `sock_service` by creating queries and routers directories. We updated the dockerfile for the new directories and we wrote migrations for the tables we need in the sock database, 4 tables total.

Everyone in the team set up beekeeper studio and we tested to make sure we could see the migrations in there.

**AH-HA!💡**

We thought we might not need beekeeper at first but we realized it's easy to use and will be super helpful throughout the project, also a great chance to practice SQL.

**References Used Today:**

- [Download for Beekeeper](https://github.com/beekeeper-studio/beekeeper-studio/releases/tag/v3.8.9)
- [Postgres Datatypes](https://www.postgresql.org/docs/current/datatype.html)
- [Postgres Foriegn keys](https://www.postgresql.org/docs/current/tutorial-fk.html)
- [Beekeeper Docs](https://docs.beekeeperstudio.io/docs/editing-data)
- [Project SetUp Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/01-sql-II/70-module-project.md)

**Tomorrow I'm working on:**

The group plans on working on user endpoints and authentication in the backend

**References for Tomorrow:**

- [Authentication Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/02-backend-auth/01-using-jwtdown-fastapi.md)
- [CRUD in SQL Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/05-sql-I/04-relational-databases.md)

---

**Tuesday, March 28th, 2023 (W13D2)**

---

**Today I worked on:**

We worked together as a team to look into the starter project and investigate the code. I got caught up on FastAPI to get a better understanding. The team has already created all of ou wireframes and our endpoints as well as mapping out the MVP so we feel like we're in a good place.

**The team created an todo list:**

- Add PostgreSQL to the docker-compose.yml file
- Clean up the starter data in main.py
- Rename starter files to be relevant to our project
- Create queues and routers folders and a starter file in each
- Attend to the Dockerfile and Dockerfile.dev in `sock_service`
- Write migrations

**AH-HA!💡**

The projects feels less overwhelming after making a starter plan as a team and looking through the inital repo/README

**References Used Today:**

[Project Setup Instructions](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/01-sql-II/70-module-project.md)

**Tomorrow I'm working on:**

We will be working through the todo list together

**References for Tomorrow:**

[Project Setup Instructions](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/01-sql-II/70-module-project.md)

---
