# Shehacks Project

# How to run:

1. clone repo
2. `cd frontend`
3. `npm i`
4. create `.env.local` and add mongodb uri:
```env
NEXT_PUBLIC_MONGODB_URI='mongodb+srv://<ask group chat for key>
```
5. run with `npm run dev`

### Docs

`src/lib/mongodb.ts`:
- loads uri from env and creates the db connection
- note: if there is a connection alr use that

`models`:
- `User`: schema w email and password
- `Post`: to-do
- add coordinates? how to get browser coordinates?

`src/app/api/auth`
- used for registration and login
- connets to the db, has `email, password` as params
- encrypts password before saving or compare
- look for user that has that email

**Flow**:
1. New Users:
    - Uses the `User` model to create a new users
2. Existing Users:
    - check the password to the hash
    - if valid return msg, otherwise error

`src/components/auth-form.tsx`
- handles register and login
- only allows `ALLOWED_DOMAINS` atm only `@uwo.ca`
- calls the `api/auth` if user registered or founds sets user
- if user, render `Dashboard`

`src/components/Dashboard.tsx`
- takes email as prop
- dummy data

### Development Plan:

Backend:
- posts model see `User.ts`
- new api routes on `src/app/api/posts`
    - `api/posts/index.ts` 
        - GET Handles getting all posts
        - POST creating a post
- `api/posts/[userId].ts` get posts by a specific user

Frontend:
- create post form
    - title, description, price, img url, etc
    - integrate to user dashboard

- explore page
- use v0 ai code to create page with mock data
- improve filters and UI
- use api to get all posts and show them

Extras:
- allow image upload and hosting (AWS S3?)- maybe use imgur 
- add coordinates and target posts using location
- where to add ai????

