# Backend: Google Authentication Setup (Future Scope)

This document outlines the newly implemented backend services for Google OAuth 2.0 authentication. The server is now configured to handle Google login, user creation/lookup, and JWT generation for authenticated users.

---

## Summary of Changes

### New Dependencies
The following packages have been added to support this feature:
* `passport`
* `passport-google-oauth20`
* `express-session`

### Key File Updates
* **`backend/config/passport-setup.js`**: (New) Configures the Passport.js Google OAuth strategy.
* **`backend/models/User.js`**: (Updated) Includes a `googleId` field. `username`, `email`, and `password` are now conditionally required to allow for Google-only users.
* **`backend/routes/GoogleAuth.js`**: (New) Handles all Google auth routes (`/api/google`) and the callback (`/api/google/callback`), issuing a JWT on success.
* **`backend/index.js`**: (Updated) Integrates Passport middleware, session middleware, and registers the new Google authentication routes.

---

## ❗ CRUCIAL: Environment Variable Setup

Before proceeding to the frontend or running the server, you **MUST** update your `backend/.env` file with the following new variables.

```dotenv
GOOGLE_CLIENT_ID=Your_Google_OAuth_client_ID
GOOGLE_CLIENT_SECRET=Your_Google_OAuth_client_secret
FRONTEND_URL=http://localhost:5173