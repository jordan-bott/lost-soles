## Thursday April 27, 2023 (W17D4)

### Today I worked on:

- Finished up the approve match page
  - This had four sneaky backend points that we didn't think to write 😳 it makes a lot of RTKQ calls. But we collect so much data!
- Did some CSS Standardization including adding toasts, making a "uh oh you're logged out page", updating all the buttons to look the same site wide, etc.
- Worked on the readme

  **AH-HA!💡** It is really hard to plan out a project all the way and not miss any backend points that are needed to do what you want. I wonder what the process is like in the real world.

  **🎉 Celebrations 🎉**

  - Pretty much done!! Just gotta do a final runthrough of the site to make sure everything is in working order, and add the API documentation.

### Bugs encountered 🐛🐞🐜 :

🪲 Mostly just CSS issues

**\~Solution~**

Gotta trial and error through (and sometimes ask Christian)

### References Used Today:

- [Tailwind Docs](https://tailwindcss.com/docs/margin)
- [Lost Soles Wire Frame](https://docs.google.com/presentation/d/1WV382aEsaGcHJ5HanklXor2u03GkOkvwGPdNn3Pv8Gg/edit?usp=sharing)

### Any Blockers:

None!

### Tomorrow I'm working on:

- Final code walkthrough
- Adding API documentation to the docs folder
- Adding alllllll the sock posts 🧦🧦🧦🧦
- Presenting!

### References for Tomorrow:

- [Tailwind Docs](https://tailwindcss.com/docs/margin)
- [Lost Soles Wire Frame](https://docs.google.com/presentation/d/1WV382aEsaGcHJ5HanklXor2u03GkOkvwGPdNn3Pv8Gg/edit?usp=sharing)

## Wednesday April 26, 2023 (W17D3)

### Today I worked on:

- Finished up the "update sock" page, which is really a conditional view of the single sock page
  - I'm really proud of how this page turned out! It required a lot of logic to make it so users can only see the update options on their own socks, users can only see a match option on socks they don't own, and they can't see the match or the update options if they aren't logged in.
- Went through and did some more sitewide CSS standardization

**AH-HA!💡** It's really hard to go through every piece of a site and make sure everything works. I think this is why there are beta tests. People will certainly find the bugs you don't.

**🎉 Celebrations 🎉**

- Approaching the end!
- Update/detail page works as intended 🤩

### Bugs encountered 🐛🐞🐜 :

🪲 The detail page required a lot of rtkq to have information from previous rtkq's to fetch. This lead to a lot of undefined errors.

**\~Solution~**

Add a ? before the . when referencing inside of objects. ex. `user?.account?.id` (and also a lot of messing around with order and assigning variables)

### References Used Today:

- Brandon and Matthew (thank you!)
- [Tailwind Docs](https://tailwindcss.com/docs/margin)
- [Lost Soles Wire Frame](https://docs.google.com/presentation/d/1WV382aEsaGcHJ5HanklXor2u03GkOkvwGPdNn3Pv8Gg/edit?usp=sharing)

### Any Blockers:

None!

### Tomorrow I'm working on:

- Finishing up the approve a sock page
- Documentation
- CSS

### References for Tomorrow:

- [Tailwind Docs](https://tailwindcss.com/docs/margin)
- [Lost Soles Wire Frame](https://docs.google.com/presentation/d/1WV382aEsaGcHJ5HanklXor2u03GkOkvwGPdNn3Pv8Gg/edit?usp=sharing)

## Tuesday April 25, 2023 (W17D2)

### Today I worked on:

- Approve a match page
- Helping my teammates with bugs

**AH-HA!💡** Approving a match requires many rtkq's to update all of the correct stats. I wonder if there is a way to still update all of the same stats / send all the emails, but in a more simplistic way.

**🎉 Celebrations 🎉**

- The group (except me) has finished up their frontend components. So now we can go through and standardize everything and make sure the website feels cohesive!

### Bugs encountered 🐛🐞🐜 :

🪲 None

### References Used Today:

- [Tailwind Docs](https://tailwindcss.com/docs/margin)
- [Lost Soles Wire Frame](https://docs.google.com/presentation/d/1WV382aEsaGcHJ5HanklXor2u03GkOkvwGPdNn3Pv8Gg/edit?usp=sharing)

### Any Blockers:

Having a hard time getting the approve a match page to make all the rtkqs because they depend on each other. Getting undefined errors.

### Tomorrow I'm working on:

- Finishing up the approve a match page
- CSS Standardization

### References for Tomorrow:

- [Tailwind Docs](https://tailwindcss.com/docs/margin)
- [Lost Soles Wire Frame](https://docs.google.com/presentation/d/1WV382aEsaGcHJ5HanklXor2u03GkOkvwGPdNn3Pv8Gg/edit?usp=sharing)

## Monday April 24, 2023 (W17D1)

### Today I worked on:

- Worked some on both the approve a match page and the update a sock page
- Team bug fixes
- Testing the weekend's work on the caprover site

**AH-HA!💡** Some tasks feel easier when you begin to approach them than when you're in them!

**🎉 Celebrations 🎉**

Final week! Almost done 😌

### Bugs encountered 🐛🐞🐜 :

🪲 None

### References Used Today:

- [Tailwind Docs](https://tailwindcss.com/docs/margin)
- [Lost Soles Wire Frame](https://docs.google.com/presentation/d/1WV382aEsaGcHJ5HanklXor2u03GkOkvwGPdNn3Pv8Gg/edit?usp=sharing)

### Any Blockers:

🎉 None! 🎉

### Tomorrow I'm working on:

- Continuing work on the approve match and the update sock page

### References for Tomorrow:

- [Tailwind Docs](https://tailwindcss.com/docs/margin)
- [Lost Soles Wire Frame](https://docs.google.com/presentation/d/1WV382aEsaGcHJ5HanklXor2u03GkOkvwGPdNn3Pv8Gg/edit?usp=sharing)

## Sunday April 23, 2023

### Today I worked on:

- Finishing up most of the sock detail page
  - I still need to make it so that it is appropriately assigning gift or no gift sock for email purposes.
  - Also I would like to make it only show the sock descriptions if they aren't "other"
  - Got the dropdown to work, and be styled how I was hoping. Used tailwind-scrollbar for the scrollbar, it's so nice.
- Implemented the email sending using fastapi-email [ISSUE](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/66)
  - There are three different email endpoints that will send different email bodies. One for when a sock of yours is requested in a match, one for if a match you're in was accepted and you have to send your sock off, and one if you are going to receive a sock.
    - I considered adding a rejection email, but I was debating if they needed an email for that. I think maybe I will add one.
- Added a backend endpoint that will add the input amount of sockstar points to the input user's account (oh my there is going to be a lot of rtk queries called on this matching situation - I'm glad we're using redux) [ISSUE](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/68) [MR](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/55)

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZDVkNmIxMTljYTNkNTM4YzVlNjEzYTdlNzMzMmZhZDM2ZmE2M2I3MCZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/muT1HDCTDwKF2vUHUI/giphy.gif">

**AH-HA!💡** I wasn't sure how to implement the email feature, but now it makes a lot of sense! The router in the backend doesn't have a query, it's just getting passed the set information that it needs.

**🎉 Celebrations 🎉**

- Got a _lot_ done this weekend. Feeling good going into the final week! Our list of things to do is getting shorter and shorter.
- Built a dropdown and a form from scratch! (because I'm a silly goose and wanted it pretty)

### Bugs encountered 🐛🐞🐜 :

🪲 fast-api email wasn't getting the right username and password for gmail

**\~Solution~**

I had to set the server to `smtp.gmail.com` and then I had to add an "app password" and 2fa in the gmail account. I had to set the app password as the password, and the username without the "@gmail.com"

### References Used Today:

- [fastapi-mail](https://sabuhish.github.io/fastapi-mail/getting-started/#connectionconfig-class)
- [SMTP Hosts](https://sendgrid.com/blog/what-is-an-smtp-server/)
- [Signing In with an app password (Gmail)](https://support.google.com/accounts/answer/185833?hl=en)
- [Tailwind Docs](https://tailwindcss.com/docs/margin)
- [Tailwind Scollbar](https://www.npmjs.com/package/tailwind-scrollbar)
- [Icons8](https://icons8.com/icons/set/dropdown)
- [Lost Soles Wire Frame](https://docs.google.com/presentation/d/1WV382aEsaGcHJ5HanklXor2u03GkOkvwGPdNn3Pv8Gg/edit?usp=sharing)

### Any Blockers:

None!

### Tomorrow I'm working on:

- Finishing up the sock detail page
- Unit test and implementing the last portion of the CI/CD (the unit tests)
- Probably starting on the match page
- Planning with the group

### References for Tomorrow:

- [Tailwind Docs](https://tailwindcss.com/docs)
- [Learn Unit Tests](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/04-unit-tests/04-unit-tests.md)

## Satruday April 22, 2023

### Today I worked on:

- Styled the login and signup pages, as well as added toasts and some minute functionality
  - Added a success and an error toast when logging in and signing up
- Added a checkmark to cards in the feed that shows if a user is verified
- Initial styling and functionality of the sock detail page
  - Added a sock detail route in `app.js`
  - Added the links to the sock detail pages on the cards and lonely socks in `feed.js`

**AH-HA!💡** `useParams` will grab anything that you put in the url, and then you hard code in the URL when you create it. But you have to use the same name that you give it in the route path. For example, you have to do `const { id } = useParams` and the route would be `:id`

**🎉 Celebrations 🎉**

Only one unassigned page in the front end left!

### Bugs encountered 🐛🐞🐜 :

🪲 Juna installed daisyUI and it created a black background on some pages

**\~Solution~**

Configured DaisyUI to not include the base.

### References Used Today:

- [DaisyUI Black Background SO](https://stackoverflow.com/questions/71004604/the-background-becomes-black-when-i-add-daisyui-in-my-sveltejstailwindcss-proje)
- [React-Toastify](https://github.com/fkhadra/react-toastify#readme)
- [Tailwind Docs](https://tailwindcss.com/docs)

### Any Blockers:

A partial blocker - trying to see if there is a way to await getting the account data. For example, when I'm trying to pass in the user_id to the "get socks by user" rtkq, if I push refresh the page won't load because accounts is undefined. I know you aren't supposed to refresh in SPAs, but I think it would be nice if there was a way to make it so that the rtkq hooks would wait for each one to finish before starting the next

### Tomorrow I'm working on:

- Finishing up the sock detail page
- Writing a unit test (or a few unit tests) for the backend
- Adding the "add sockstar points" endpoint to the backend
- Possibly implementing the search feature on the backend and the front end, if I have time.

### References for Tomorrow:

- [Tailwind Docs](https://tailwindcss.com/docs)
- [Learn Unit Tests](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/04-unit-tests/04-unit-tests.md)
- [Fast API Query Parameters](https://fastapi.tiangolo.com/tutorial/query-params/#query-parameters)

## Friday April 21, 2023

### Today I worked on:

- Worked with multiple groups to help get their caprover up and running, as well as some other bug fixes
- Worked with Juna to help debug a carousel that she has been working on. We ended up finding a different carousel to use through DaisyUI
- Finished up the initial styling and functionality of the feed page. [ISSUE 1](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/58) [ISSUE 2](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/59) [MR](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/48)

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjViZTY3ZWVlMTI0M2FiNWJmNTE2OWQ2ZGQxMmE5YjRmYjRmYTY2NiZlcD12MV9pbnRlcm5hbF9naWZzX2dpZklkJmN0PWc/eddNa01AO0eMieopVT/giphy.gif">

**AH-HA!💡** Apparently you cannot have images in the "public" folder for deployment? I'm not clear on why. But it's gotta be in the src!

**🎉 Celebrations 🎉**

- My study group's caprovers all seem to be working!
- Feed page looks and feels really good to me
- Group is making some good progress on the project. Still lots to do though!

### Bugs encountered 🐛🐞🐜 :

🪲 Bugs with using a carousel from a react library

**\~Solution~**

Ended up using daisyUI instead

### References Used Today:

- [DaisyUI Carousel](https://daisyui.com/components/carousel/#slide2)

### Any Blockers:

None at the moment! A little nervous about doing a unit test, but not blocked.

### Tomorrow I'm working on:

I'd like to get done:

- Login Page Styling
- Logout Page Styling
- Sign Up Page Styling
- Unit Test Writing
- Verification check addition to the feed

I'll potentially also try to start:

- Endpoint that adds sockstar points in the backend
- Email or notification stuff
- Feed search function

### References for Tomorrow:

- [Tailwind Docs](https://tailwindcss.com/docs)
- [Learn Unit Tests](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/04-unit-tests/04-unit-tests.md)

## Thursday April 20, 2023 (W16D4)

### Today I worked on:

- Finishing up the styling of the feed. Still need to add the functionality of clicking on the cards to go to the detail pages, but we haven't implemented individual pages yet so I will add that functionality in a later merge request.
  - Added feature where the feed is sorted by newest at the top
- Worked with Juna on a "422 unprocessable entity" bug
- Squashed a caprover "bug". Turns out you just have to push "save and update" to get the logs to actually update, and also you have to use HTTPS for your /docs page 🤦🏻‍♀️
- Implemented the logout button taking you back to the feed page
  - I read about the `useNavigate` and `Navigation` but neither were working. I ended up just putting a NavLink inside of the button that goes to the feed page. I don't think this is the best practice because if the logout is not successful it might seem like it was. I'm going to push it for now, but might revisit this later.

**AH-HA!💡** If the logs aren't updating there is definitely something wrong.

**🎉 Celebrations 🎉**

- Initial deployment is up and bug free! _knocks on wood_
- Website is finally starting to come together and look like a website!

### Bugs encountered 🐛🐞🐜 :

🪲 "422 unprocessable entity"

**\~Solution~**

Most of this bug was in relation to how we were passing the parameters. The params in the routers all have to be in the URL otherwise you have to pass them like search params and hardcode them on the end in the RTKQ. For example: `api/socks/${id}?user_id=${user_id}`

🪲 Caprover database logs saying "connection reset by peer"

**\~Solution~**

Push save and update to wake up caprover

🪲 Deployed /docs page wasn't storing the token, so we couldn't test any endpoints

**\~Solution~**

Make sure you are using https not http 🤦🏻‍♀️

### References Used Today:

- James!
- [Tailwind Docs](https://tailwindcss.com/docs)
- [Lost Soles WireFrame](https://docs.google.com/presentation/d/1WV382aEsaGcHJ5HanklXor2u03GkOkvwGPdNn3Pv8Gg/edit?usp=sharing)
- [Lost Soles Color Scheme](https://coolors.co/79aadd-ffee93-fff2b7-ffc09f-ffecb4-fff8e6-fff5db-c1eead-f7c5c7)
- [SQL ORDER BY](https://www.w3schools.com/sql/sql_orderby.asp)
- [FastAPI Query Params](https://fastapi.tiangolo.com/tutorial/query-params/#query-parameters)
- [useNavigate](https://reactrouter.com/en/main/hooks/use-navigate)
- [Navigate](https://reactrouter.com/en/main/components/navigate)

### Any Blockers:

None!

### Tomorrow I'm working on:

Not fully decided, but some of the following:

- Styling of the login and logout pages
- Implementing the sock detail page
- 1 unit test
- Restricting sock creation behind verification
- Searching the list
- Notification of a new match

### References for Tomorrow:

- [Tailwind Docs](https://tailwindcss.com/docs)
- [Learn Unit Tests](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/04-unit-tests/04-unit-tests.md)

## Wednesday April 19, 2023 (W16D3)

### Today I worked on:

- Finished up the nav bar functionality, including having three different views (logged in, logged out, and admin)!
- Started working on the feed page. Got a lot of the initial functionality and styling of it completed. I'm planning to finish this up tomorrow.

<img src="https://media.giphy.com/media/vTsxY5599bTvHiXtaZ/giphy.gif">

- Looked at caprover some. Didn't get much clarity on what the logs might be. Going to try to tackle that some more tomorrow.
- Lots of bug smashing for my group and classmates!

**AH-HA!💡** Using "absolute" positioning and the z-index will allow you to stack items on top of each other in css!

**🎉 Celebrations 🎉**

Finally starting to understand CSS a little better thanks to Christian!

### Bugs encountered 🐛🐞🐜 :

🪲 Nothing of huge note today

### References Used Today:

- [Tailwind Docs](https://tailwindcss.com/docs)
- Previous RTKQ Code
- Christian!

### Any Blockers:

Nope!

### Tomorrow I'm working on:

- Finishing up the feed's styling and most of it's functionality. I likely will not add the links to the individual pages, as they aren't created yet.

### References for Tomorrow:

- [Tailwind Docs](https://tailwindcss.com/docs)

## Tuesday April 18, 2023 (W16D2)

### Today I worked on:

- Fixing some of the caprover frontend bugs (you need a /postgres at the end of your database_URL)
- Got nav bar to show user info / changed based on token status (thank you Young!)
- Still have some questions about whether our code should be totally free of `useState` or not. Seems like it makes sense for form data, but isn't necessary for things like grabbing a list now.

**AH-HA!💡** Getting the token will return account data as well! Also, RTKQ works with react, and doesn't necessarily replace it.

**🎉 Celebrations 🎉**

- Feels like our redux really works now that I can interact with account data!

### Bugs encountered 🐛🐞🐜 :

🪲 Not showing token/account data in state. Also getting a 404 error when running the `getToken` path.

**\~Solution~**

Didn't have a `get token` endpoint in the backend. Had to add that, and then it worked!

### References Used Today:

- Young
- [Learn CI/CD](https://learn-2.galvanize.com/cohorts/3560/blocks/1908/content_files/build/01-ci-cd/04-continuous-deployment.md)
- [Caprover Troubleshooting](https://caprover.com/docs/troubleshooting.html)
- [Rosheen's Notion](https://complete-rutabaga-7b8.notion.site/Deployment-efb08b229ac249e6aceba13dc8400f66)
- [Redux Toolkit Docs](https://redux-toolkit.js.org/usage/usage-guide)

### Any Blockers:

- The deployed front end isn't giving the token to the browser, but I am wondering if pushing this getToken to main will fix the problems - will try tomorrow first thing.

### Tomorrow I'm working on:

- Admin nav bar view
- Fixing up the last of the deployed front end bugs

### References for Tomorrow:

- Previous day's code

## Monday April 17, 2023 (W16D1)

### Today I worked on:

- Initial deploy to caprover
- So many pipelines. So, so many.
- The initial deploy to caprover wasn't as bad as I thought it would be, just very tedious. I was happy to have Rosheen's notes to follow, and I think I managed to do it somewhat seemlessly! Tomorrow I will have to work on getting the deployed frontend totally functional, because it has some bugs, but everything is showing up! That is a win.

**AH-HA!💡** There is a frontend-url and a backend-url that are used for deployment that replace [localhost:8000](localhost:8000) and [localhost:3000](localhost:3000)

**🎉 Celebrations 🎉**

Initial deploy to caprover ✅

### Bugs encountered 🐛🐞🐜 :

🪲 Many - mostly in relation to where environment variables were set or not set in git and caprover.

**\~Solution~**

Have to be meticulous and make sure that you are giving git and caprover all of the variables that they need to run

### References Used Today:

- [Learn CI/CD](https://learn-2.galvanize.com/cohorts/3560/blocks/1908/content_files/build/01-ci-cd/04-continuous-deployment.md)
- [Caprover Troubleshooting](https://caprover.com/docs/troubleshooting.html)
- [Rosheen's Notion](https://complete-rutabaga-7b8.notion.site/Deployment-efb08b229ac249e6aceba13dc8400f66)

### Any Blockers:

There are some errors in the frontend, but not _too_ blocked yet.

### Tomorrow I'm working on:

- Getting the nav bar to show user information / different options based on if the user is logged in
- Working through caprover errors

### References for Tomorrow:

- [Redux Docs](https://react-redux.js.org/tutorials/quick-start)
- [React-Redux Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/01-react-redux-tutorial.md)

## Sunday April 16, 2023 (Last Day of Spring Break T_T)

### Today I worked on:

- Finished up initializing frontend auth by creating a `createUser` endpoint and a barebones sign up page to test it. [Issue 1](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/35) [Issue 2](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/36) [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/29)
- Added a password widget that hides the password while you are typing it (html input, type="password")
  - I want to see if I can do some research to implement the "show password" toggle button. I think that I could do it by setting the type in the input to a variable, with a state that holds password or text. And then having an onClick handler on the button that updates the state.
  - While typing the above bullet for this journal I realized that I thought I could pretty easily implement this, so I did! One `useState`, a ternary in the "type" and an `onClick` handler and it's done!
- Installed `react-icons` for the password show/hide button, but it's kinda ugly so I'm gonna have to look for something better! (Also I think mostly the HTML button styling is making it ugly and implementing tailwind for the styling will help.)

**AH-HA!💡** A lot of the time when I have an idea for a feature I've never done before I quickly take to google to see how it's done. But more and more I am realizing that if I just slow down and try to think about it, a lot of times I can figure out how to do it. I had this happen with the dropdown for the nav bar, and then now with this password show/don't show feature. I know how the react components are working, I can manipulate them a lot more than I think I know how to if I just take a minute and think about it.

**🎉 Celebrations 🎉**

Feeling a lot more confident about my ability to manipulate things in the frontend!

### Bugs encountered 🐛🐞🐜 :

🪲 Pushing any button on the page caused the states to reset. 🥲

**\~Solution~**

The button "type" in html is important. Any button that is a child of a `<form>` tag is considered type "submit" automatically. In react this means that it will reset all of the states when any button is pressed. To fix this, you add `type="button"` to your button tag, and then it won't refresh/reset the states 🤩 (I think this is funny because last mod I was struggling to get things _to_ refresh, now I am having an issue with them refreshing too much.)

### References Used Today:

- [Button Reset's State SO](https://stackoverflow.com/questions/72313452/react-app-resets-state-and-rerenders-without-e-preventdefault-on-click)
- [React Icons](https://react-icons.github.io/react-icons)

### Any Blockers:

Luckily none today. Have a few questions for James about how things work, but not a "blocker" per say.

### Tomorrow I'm working on:

- Finishing up the nav-bar aesthetics, and trying to implement auth into it to show a different menu depending on if the user is logged in or not. [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/37)
- Writing some front end tickets
- Looking further into the CI/CD stuff

### References for Tomorrow:

- [Learn Frontend Auth](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/03-authorization-cookbook.md)
- [RTKQ Default Headers on Requests](https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#setting-default-headers-on-requests)

## Saturday April 15, 2023 (Spring Break!)

### Today I worked on:

- Implemented redux initially. Tested redux with a "get all socks" dummy page, and a bare bones log-in / log-out page. [Issue 1](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/35) [Issue 2](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/36)
- Installed `react-router-dom`
- Met as a group to determine our plan for the front end and talk about redux implementation
- Looked through the [aftermetoo](https://www.aftermetoo.com/) for some website design inspiration because this website has a similar color scheme to ours. (Recommended by Christian! He found it through the [awwwards page](https://www.awwwards.com/inspiration/hub-pages-aftermetoo))

**AH-HA!💡** You still have to include `event.preventDefault()` to your submission handler for it to do the right thing when using redux 🤦🏻‍♀️

**🎉 Celebrations 🎉**

### Bugs encountered 🐛🐞🐜 :

🪲 Login was getting a 200 success response, but wasn't storing the token in a cookie in the browser.

**\~Solution~**

- Needed to add `event.preventDefault()` to the submission handler
- Also needed to reset the states of username and password.
- I solved this by looking at my implementation of redux in [CarCar](https://gitlab.com/jordan.bott/project-beta) to see if there were any differences (other than the state handling, because that project did not use redux)

🪲 Couldn't figure out what baseURL to use for the baseFetch in redux

**\~Solution~**

- After watching more Curtis videos, I found that it is a variable name in the docker compose file where we are assigning it "localhost:8000"
- For some reason, redux won't let you type the string localhost:8000, and instead would prefer this environ variable (see `process.evn.API_URL undefined below)

### References Used Today:

- [CarCar Project](https://gitlab.com/jordan.bott/project-beta)
- [Learn Frontend Auth](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/03-authorization-cookbook.md)
- [RTKQ Default Headers on Requests](https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery#setting-default-headers-on-requests)
- [Redux Overview](https://redux.js.org/tutorials/fundamentals/part-1-overview)
- [Redux Toolkit Usage Guide](https://redux-toolkit.js.org/usage/usage-guide)
- [Redux Chrome Dev Tools Install](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd/related?hl=en)
- [`process.env.API_URL` Undefined](https://stackoverflow.com/questions/56462444/process-env-api-url-is-undefined)
- [Learn Redux Videos](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/02-redux-videos.md)
- [`react-router-dom` Install](https://www.npmjs.com/package/react-router-dom)
- [mdn Form Element Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)
- [React Form Docs](https://legacy.reactjs.org/docs/forms.html)

### Any Blockers:

- Thought I was going to have a blocker over the token not showing up, but luckily managed to figure it out!
- Not entirely a blocker - but I do have some questions about redux and where the Default Headers code goes. Not sure I put it in the right place.

### Tomorrow I'm working on:

- Trying to create a bare bones sign-in page to see if the account info is being stored somewhere
- Adding a password widget to hide the password in the input line
- Finishing up the initial nav bar so it can be merged in - have some auth things that need to happen in the nav, but haven't decided on the order of merging in the redux branch and the nav bar branch.

### References for Tomorrow:

- [Learn Redux Videos](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/02-redux-videos.md)
- [Learn Frontend Auth](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/03-authorization-cookbook.md)
- [Redux Overview](https://redux.js.org/tutorials/fundamentals/part-1-overview)
- [Redux Toolkit Usage Guide](https://redux-toolkit.js.org/usage/usage-guide)

## Friday April 14, 2023 (Spring Break!)

### Today I worked on:

- Working on designing the nav bar and some basic styling for the front end [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/37)
- Added some more styling to the drop down
- Adjusted some styling for the cards that hold the sock postings
- Added hover animations

<img src="https://media.giphy.com/media/cYL3vX7l1eTU2cDHzV/giphy.gif"></img>

<img src="https://media.giphy.com/media/AqOwGplpOnJAKyosCP/giphy.gif"></img>

**AH-HA!💡** Found a new handler in react - `onMouseEnter` and `onMouseLeave`

**🎉 Celebrations 🎉**

Things are starting to really look like the website!

### Bugs encountered 🐛🐞🐜 :

🪲 CSS fighting me on centering things T_T

**\~Solution~**

Just keep trying until it works. Using the inspect feature is helpful.

### References Used Today:

- [Tailwind Object Fit](https://tailwindcss.com/docs/object-fit#using-an-element-s-original-size)
- [Tailwind Border](https://tailwindcss.com/docs/border-width)
- [MDN Dropshadow](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow)
- [Lost Soles Color Scheme](https://coolors.co/79aadd-ffc09f-ffee93-fff2b7-fff8e6-fff5db-c1eead-f7c5c7)
- [Tailwind Hover Docs](https://tailwindcss.com/docs/hover-focus-and-other-states)
- [Tailwind Hover Examples](https://birdeatsbug.com/blog/creating-hover-effects-with-tailwind-css)
- [Tailwind Height](https://tailwindcss.com/docs/height)
- [React "onHover" Event Handling](https://upmostly.com/tutorials/react-onhover-event-handling-with-examples)
- [Tailwind Divider](https://tailwindcss.com/docs/divide-width)

### Any Blockers:

None!

### Tomorrow I'm working on:

- Finishing the styling of the nav drop down [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/37)
- Meeting with the team to create a plan for the front end

### References for Tomorrow:

- [Tailwind Docs](https://tailwindcss.com/docs/)
- [Lost Soles Notion](https://polar-purpose-cfb.notion.site/Lost-Soles-fa727c6bdbc541fd860fc7c34039c6ea)

## Thursday April 13, 2023 (Spring Break!)

### Today I worked on:

- Installed tailwind and react-router-dom
- Starting the navbar for the frontend [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/37)
- Positioned and sized the two logos
- Started a dropdown navigation feature off of the right side sock logo.
- Looked into React-Icons, though not sure if we will have a use for them.
- Tried to use Flowbite and Flotbite-react, but wasn't having much luck.

**AH-HA!💡** Sometimes I over complicate things. Dropdown menus can be a simple `useState` with and `onClick` ternary `<div>`

**🎉 Celebrations 🎉**

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjdhN2Y0YzYxZjBjNDhmZTY4ZTA0ZDYwMmM5ZGFlNDg5NzNhNWE1NyZjdD1n/aevNdG5MazeJypSsu9/giphy.gif"></img>

### Bugs encountered 🐛🐞🐜 :

🪲 Quite a few, mostly relating to trying to use tailwind related packages.

**\~Solution~**

Decided to scrap them and use tailwind and react only. Worked well in the end!

### References Used Today:

- [Dropdown Styling Video](https://www.youtube.com/watch?v=TQFW3AtrDw4)
- [React Docs - Conditional Rendering](https://legacy.reactjs.org/docs/conditional-rendering.html)
- [Tailwind Docs](https://tailwindcss.com/docs/guides/create-react-app)
- [react-router-dom Install](https://www.npmjs.com/package/react-router-dom)
- [react-icons Docs (not installed - just lookin 👀)](https://react-icons.github.io/react-icons)
- [Flowbite-react Docs](https://flowbite-react.com/)
- [Flowbite Docs](https://flowbite.com/docs/components/dropdowns/)

### Any Blockers:

Luckily sorted it all!!

### Tomorrow I'm working on:

- Finishing styling the navbar

### References for Tomorrow:

- [Tailwind Docs](https://tailwindcss.com/docs/guides/create-react-app)
- [react-icons Docs (maybe!)](https://react-icons.github.io/react-icons)

## Wednesday April 12, 2023 (Spring Break!)

### Today I worked on:

- I finished up the data schema update to add `created_on` to each table. [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/27) [Issue 1](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/19) [Issue 2](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/18) [Issue 3](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/32) [Issue 4](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/33)
- This involved reading through the code to find which query methods to update, and also adding the `created_on` property to the pydantic models where it made sense.

**AH-HA!💡** It might be a better practice to use `fetchone()` on the cursor, than to use the `old_data` dictionary method when assigning things for our return. We just have to make sure that our SQL statement is returning all of the properties we need for our return.

**🎉 Celebrations 🎉**

Mostly I am happy to be done with this schema update. This was a tedious task, and the merge request felt even more tedious.

### Bugs encountered 🐛🐞🐜 :

None today (thankfully!)

### References Used Today:

- Mostly just the code I had worked on last where I added `created_on` to most of the necessary `UserQueries` methods.

### Any Blockers:

None! 🎉

### Tomorrow I'm working on:

- Looking at the wire frames that we created as a group to have a better understanding of what will be involved in our front end.
- Reading up about redux and getting a general idea of how we might implement it in our code

### References for Tomorrow:

- [Learn Redux](https://learn-2.galvanize.com/cohorts/3560/blocks/1906/content_files/build/02-redux-frontend-auth/01-react-redux-tutorial.md)
- [Lost Soles Wireframe](https://docs.google.com/presentation/d/1WV382aEsaGcHJ5HanklXor2u03GkOkvwGPdNn3Pv8Gg/edit?usp=sharing)

## Saturday April 8, 2023 (Spring Break)

### Today I worked on:

- Helped Juna implement getting the list of matches by user feature. This was tricky because we needed to fetch two different rows from the sock table. Together, Juna and I worked to implement this by executing on the cursor twice. We're not sure if this is the best practice for this, and will check in with James after spring break. However, it does work as desired!

**AH-HA!💡** The cursor is storing the data requested from the SQL statement. Running `fetchall()` on the cursor will grab all of the information on the cursor, and you can store this on a variable. This way you can execute the cursor again to grab a different piece of information if desired.

**🎉 Celebrations 🎉**

- Trying to figure out how to grab two separate rows from the same table using a `JOIN` eluded us for awhile. Happy we finally figured it out even though it took two separate cursor executes.

### Bugs encountered 🐛🐞🐜 :

🪲 Trying to execute the cursor a second time within the for loop changed the data that was stored in the cursor

**\~Solution~**

Running a `fetchall()` on the original cursor and storing this in a variable allowed us to re-execute the cursor to grab other sock data, while still iterating through the original cursor data.

### References Used Today:

- [Learn Relational Databases](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/05-sql-I/04-relational-databases.md)
- [Learn Outer Joins](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/01-sql-II/01-outer-joins.md)

### Any Blockers:

- None thankfully!

### Tomorrow I'm working on:

- Adding `created_on` to the `UserViewOut` and `UserAuthorizedViewOut` pydantic models
- Updating the `get_one_authroized` and `get_one` query methods to include `created_on`
- Add `created_on` to sock, match, and verification queries.

### References for Tomorrow:

- [SQL Auto Time Stamp](https://www.postgresqltutorial.com/postgresql-date-functions/postgresql-current_timestamp/)
- [FastAPI DataTypes](https://fastapi.tiangolo.com/tutorial/extra-data-types/)
- [Python DateTime](https://docs.python.org/3/library/datetime.html)

## Friday April 7, 2023 (W15D5)

### Today I worked on:

- Figured out how to use dates within our Postgresql database and with the built in pydantic/fastapi encoder. For our purposes, it is okay to use a date as a string in fastapi, but stored as a date object in the database.
  - To do this I have it set the date automatically in the database, and then when I fetch from the database I use the built-in python method `str()` to change the iso formatted date into a string.
- Finally implemented the `created_on` property for the user model after struggling through using date in fastapi. [ISSUE](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/19)
  - Added `created_on` to Migration file, and set it to auto assign the current time and date with `TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL`.
    - Added `created_on` to `UserOut` pydantic model
    - Added `created_on` in the `get` query method
    - Added `created_on` in the `create` query method
    - Added `created_on` in the `create_admin` query method
    - Added `created_on` in the `update` query method
    - Added `created_on` in the `get_all_users` query method
- Grouped the endpoints at [localhost:8000/docs](localhost:8000/docs) by which table they are interacting with

**AH-HA!💡** You an add dates as a string instead of dealing with datetime objects if you just want to use them for sorting purposes! SQL will auto assign the current datetime when using `CURRENT_TIMESTAMP`, and then you can change it to a string for use in your "out" pydantic model.

**🎉 Celebrations 🎉**

Finally figured out the date stuff in fastAPI! Also we are down to less than 6 issues in the backend!!

### Bugs encountered 🐛🐞🐜 :

🪲 FastAPI won't auto encode a date object from the database.

**\~Solution~**

Store as a date object in the database, and change to a string in the fastAPI output.

### References Used Today:

- [SQL Auto Time Stamp](https://www.postgresqltutorial.com/postgresql-date-functions/postgresql-current_timestamp/)
- [FastAPI DataTypes](https://fastapi.tiangolo.com/tutorial/extra-data-types/)
- [Python DateTime](https://docs.python.org/3/library/datetime.html)
- [How to add labels in Swagger UI](https://stackoverflow.com/questions/63762387/how-to-group-fastapi-endpoints-in-swagger-ui)

### Any Blockers:

None right now!

### Tomorrow I'm working on:

- Adding `created_on` to the `UserViewOut` and `UserAuthorizedViewOut` pydantic models
- Updating the `get_one_authroized` and `get_one` query methods to include `created_on`
- Add `created_on` to sock, match, and verification queries.

### References for Tomorrow:

- [SQL Auto Time Stamp](https://www.postgresqltutorial.com/postgresql-date-functions/postgresql-current_timestamp/)
- [FastAPI DataTypes](https://fastapi.tiangolo.com/tutorial/extra-data-types/)
- [Python DateTime](https://docs.python.org/3/library/datetime.html)

## Thursday April 6, 2023

### Today I worked on:

- Checking and merging pending merge requests.
- Checking on the issue board and writing more issues
- Started on adjusting our migrations to match our updated data schema

**AH-HA!💡** It's important to check that your endpoint doesn't match an existing endpoint! (This happened with get sock by user and get one sock, they were both `/api/sock/{id}).

**🎉 Celebrations 🎉**

Making some real progress through the backend issues! Feels like we're finding a lot of things in our code that we need to update for our front end functionality (adding to backend schema, endpoints we didn't think about, etc.)

### Bugs encountered 🐛🐞🐜 :

🪲 Two endpoint routes with the same endpoint (`/api/sock/{id}`), one was calling the other endpoint because of the order in the python file.

**\~Solution~**

Gotta make sure you don't have identical endpoints that have identical HTTP requests!

### References Used Today:

- [Learn Relational Databases](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/05-sql-I/04-relational-databases.md)

### Any Blockers:

🎉 None! 🎉

### Tomorrow I'm working on:

- Finishing updating the data schema. Maybe starting on the front end template?
- Writing the rest of the backend endpoints.

### References for Tomorrow:

- [Learn Relational Databases](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/05-sql-I/04-relational-databases.md)
- [Lost Soles Notion](https://polar-purpose-cfb.notion.site/Lost-Soles-fa727c6bdbc541fd860fc7c34039c6ea)

## Wednesday April 5, 2023 (W15D2)

### Today I worked on:

- Wrote the `Get Feed` feature, where we can see a list of all socks! [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/11) [Merege Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/17)

**AH-HA!💡** You can select only the lines from the foreign key table that you want in the SELECT statement. Then you can add those to another pydantic model to have to reference!

**🎉 Celebrations 🎉**

First foreign key figured out! Feels like we're crushing all the things that we thought would be tricky int he backend.

### Bugs encountered 🐛🐞🐜 :

🪲 `Verification Error` usually tied to either a mismatch in the intended OUT type and what you're returning in the router, or it's an issue with the data you're entering into the OUT in the query.

### References Used Today:

- [Learn FastAPI Tutorial Videos](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)
- [Learn Outer Joins](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/01-sql-II/01-outer-joins.md)

### Any Blockers:

None today!

### Tomorrow I'm working on:

- Have some ideas about items that need to be adjusted in the migrations.
- Overall organization, writing of issues etc

### References for Tomorrow:

- [Learn Relational Databases](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/05-sql-I/04-relational-databases.md)

## Tuesday April 4, 2023 (W15D2)

### Today I worked on:

- Creating an admin user [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/12) [Merge Request](https://gitlab.com/lost-soles/module3-project-gamma/-/merge_requests/8)
  - Added a `create_admin` method on the `UserQueries` class in `sock_service/queries/user.py`
    - This wasn't too bad because I could just use the `create` method, but change the type to "admin" instead of "user"
  - Added a `Create Admin` router in `sock_service/routers/user.py`
- Creating a sock [Issue](https://gitlab.com/lost-soles/module3-project-gamma/-/issues/12)
  - Added `sock_service/queries/sock.py` and `sock_service/routers/sock.py`
  - Wrote pydantic models for `SockIn` and `SockOut` in `sock_service/queries/sock.py`
  - Wrote a `SockQueries` class in `sock_service/queries/sock.py`
    - Added `create` method
  - Added `Create Sock` router to `sock_service/routers/sock.py`
  - Added sock router to `main.py`

**AH-HA!💡** It's helpful to make multiple "out" pydantic models when you only want to display set data.

**🎉 Celebrations 🎉**

User service finished! Sock started!

### Bugs encountered 🐛🐞🐜 :

🪲 `validation error` - this seems to come up commonly when data in methods isn't lining up properly. Usually you need to check the order of items in the list that is output by the `db.execute` and line up the items you're passing into the return properly.

### References Used Today:

[Learn FastAPI Tutorial Videos](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

### Any Blockers:

None tonight!

### Tomorrow I'm working on:

- I'd like to grab the "get one sock" ticket, but I have to check with my team
- Write some more issues for the MVP backend
- Check in with team about gitlab organization & project plan

### References for Tomorrow:

[Learn FastAPI Tutorial Videos](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

## Monday April 3, 2023 (W15D1)

### Today I worked on:

As a group we worked to add an update and delete function for our user model. We locked the update feature behind a log-in, and limited editing to only the current user.

- Added update & delete methods to `UserQueries` class in `sock_service/queries/user.py`
- Added update & delete routers to `sock_service/routers/user.py`

**AH-HA!💡** Using the `account_data: dict = Depends(authenticator.get_current_account_data)` param in a router will pull a dictionary with all of the currently logged in user's data, so you can pull any property from the UserOut model to use for authentication.

Also, `RETURNING *` at the end of an SQL statement will return all of the columns of a table, even if you are just working with some of the columns (in an update for example)

**🎉 Celebrations 🎉**

Moving into pair programming tomorrow! Feeling good as a team and starting to pick up speed.

### Bugs encountered 🐛🐞🐜 :

🪲 Make sure you're returning the right things!

### References Used Today:

[JWTDown Documentation](https://jwtdown-fastapi.readthedocs.io/en/stable/intro.html#requiring-a-valid-token)

[Learn FastAPI Tutorial Videos](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

### Any Blockers:

None right now!

### Tomorrow I'm working on:

- Grabbing a couple of tickets and starting to knock them out.
- Finishing up writing issues for the MVP's backend

### References for Tomorrow:

[Learn FastAPI Tutorial Videos](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

## Sunday April 2, 2023

### Today I worked on:

Trying to figure out creating a user with our additional user properties.

- Added a create user (signup) feature to the backend
  - Added `create_account` to `sock_service/queries.user.py`
    - This function creates a new user account, including hashing the password and then logging the user in.
    - This uses the create method on the `UserQueries` class in `queries/user.py`.
    - Added functionality to check if the password equals the password confirmation.
  - Added two `UserQueries` methods in `sock_service/queries/user.py`
    - get (gets one user by username)
    - create (creates a new user - used in the `create_account` function in `routers/user.py`)
  - Added `user.router` to `main.py`
- I checked the functionality by:
  - Creating a user in the UI at [localhost:8000/docs](localhost:8000/docs)
  - Logging in a user in the UI at [localhost:8000/docs](localhost:8000/docs)
  - Seeing the user in the user table in Bee Keeper

**AH-HA!💡** It is making more sense how routers and queries are connected, as well as how they are connected to the database.

**🎉 Celebrations 🎉**

The create user works! And I have a much clearer understanding of how JWTDown works.

### Bugs encountered 🐛🐞🐜 :

🪲 401 "Incorrect username or password"

**\~Solution~**

You have to write the get method for the user queries, as the login method of the authenticator uses the get method.

### References Used Today:

[Create Table options SQL](https://www.postgresql.org/docs/14/sql-createtable.html)

[Learn FastAPI Tutorial Videos](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

[Learn JWTDown Tutorial Videos](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/02-backend-auth/01-using-jwtdown-fastapi.md)

[JWTDown Documentation](https://jwtdown-fastapi.readthedocs.io/en/stable/intro.html)

[JWTDown Reference](https://jwtdown-fastapi.readthedocs.io/en/stable/api-reference.html)

### Any Blockers:

Got it all sorted before signing off 🎉

### Tomorrow I'm working on:

- Writing some more issues
- Dividing up issues
- Finishing up the user endpoints

### References for Tomorrow:

[Learn FastAPI Tutorial Videos](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/02-rest-fastapi/10-fast-api-videos.md)

[Learn Relational Databases](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/05-sql-I/04-relational-databases.md)

## Thursday March 30, 2023 (W14D4)

### Today I worked on:

As a group we started working on Authentication. We managed to get our pydantic models done for the User, and got the Login and Logout routers working. Most of our time today was spent learning about JWTDown and figuring out how authentication would be implemented with our user model.

**AH-HA!💡** The docker-compose file can read the .env file because of the "environment" section. It will auto-read things within that file.

**🎉 Celebrations 🎉**

We were able to get started with JWTDown and made a lot of progress with backend auth! So far we have been good at making plans for the day that are achievable.

### Bugs encountered 🐛🐞🐜 :

🪲 When you add to the routers you have to rebuild to see it in the /docs page.

### References Used Today:

[JWTDown Demo On Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/02-backend-auth/01-using-jwtdown-fastapi.md)

[JWTDown Docs](https://jwtdown-fastapi.readthedocs.io/en/stable/intro.html)

[SINGING_KEY creation - option 5](https://linuxhint.com/generate-random-string-bash/)

### Any Blockers:

Some concern about adding in the default values and other properties in our "create user" router, but we're all going to look at it this weekend independently and see if we can figure it out.

### Tomorrow I'm working on:

Working on the "create user" section. Need to specifically figure out how to implement our default values for sockstar_points, total_pairings, verified, and type. Also need to figure out the password confirmation piece. Everything else (aside from ID) will be user input.

### References for Tomorrow:

[JWTDown Demo On Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/02-backend-auth/01-using-jwtdown-fastapi.md)

[JWTDown Docs](https://jwtdown-fastapi.readthedocs.io/en/stable/intro.html)

## Wednesday March 29, 2023 (W13D3)

### Today I worked on:

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

**AH-HA💡!** You can write queries directly in BeeKeeper to test the database out!

**🎉 Celebrations 🎉**

Got our whole list of "together" things done, and figured out BeeKeeper Studio!

### Bugs encountered 🐛🐞🐜 :

🪲 I had to rebase my main because I accidentally added to my local main and can't push my changes. Repo main was ahead by multiple commits and it wouldn't let me pull.

**\~Solution~**

Run `git config pull.rebase true` in your terminal to rebase the local main with the repo main.

[Rebase Info](https://stackoverflow.com/questions/2472254/when-should-i-use-git-pull-rebase)

### References Used Today:

[Beekeeper Download](https://github.com/beekeeper-studio/beekeeper-studio/releases/tag/v3.8.9)

[Postgres Datatypes](https://www.postgresql.org/docs/current/datatype.html)

[Postgres Foreign Keys](https://www.postgresql.org/docs/current/tutorial-fk.html)

[BeeKeeper Docs](https://docs.beekeeperstudio.io/docs/editing-data)

[Project SetUp Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/01-sql-II/70-module-project.md)

### Any Blockers:

No blockers right now! ✨*knocks on wood*✨

### Tomorrow I'm working on:

As a group we're planning to start working on the endpoints for the user, as well as some authentication in the backend.

### References for Tomorrow:

[Learn on Authentication](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/02-backend-auth/01-using-jwtdown-fastapi.md)

[Learn on CRUD in SQL](https://learn-2.galvanize.com/cohorts/3560/blocks/1893/content_files/build/05-sql-I/04-relational-databases.md)

## Tuesday March 28, 2023 (W13D2)

### Today I worked on:

As a group we tore into the starter project as well as some of the content on learn and decided how we wanted to approach the project. We decided to create a list of things we want to complete as a group on one machine before moving forward into other tickets in a solo or paired programming environment.

List of Things to Complete Together: - Add PostgreSQL to the docker-compose.yml file - Clean up the starter data in main.py - Rename starter files - Create queues and routers folders and a starter file in each - Attend to the Dockerfile and Dockerfile.dev in the sock_service - Write migrations

We also decided to attack one model's CRUD together as a group to learn FastAPI together. We are thinking of doing the sock model/CRUD as a group since it is the most complex.

**AH-HA!💡** There is some good info in the ReadMe of the starter project! Also it is much less overwhelming to look at the starter project and decide where to go from there 😌

**🎉 Celebrations 🎉**

Feeling really solid about our plan and like we're finally getting into the progress after a lot of (much needed) planning!!

### Bugs encountered 🐛🐞🐜 :

None today!

### References Used Today:

[Project SetUp Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/01-sql-II/70-module-project.md)

### Any Blockers:

None right now! 🎉

### Tomorrow I'm working on:

As a group we're going to work on getting through our list of items to work on together. Hoping to get through writing the migrations.

### References for Tomorrow:

[Project SetUp Learn](https://learn-2.galvanize.com/cohorts/3560/blocks/1897/content_files/build/01-sql-II/70-module-project.md)

## Template

## Date

### Today I worked on:

**AH-HA!💡**

**🎉 Celebrations 🎉**

### Bugs encountered 🐛🐞🐜 :

🪲

**\~Solution~**

### References Used Today:

### Any Blockers:

### Tomorrow I'm working on:

### References for Tomorrow:
