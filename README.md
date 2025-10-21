# BlogsForYou | Tech, Lifestyle, Travel & More

***A full-stack blog project allowing users to authenticate via email/password or Google OAuth, and access a personalized dashboard. The blog management features are currently under development.***

## Tech Stack

### Frontend

- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: For declarative routing in React applications.
- **Axios**: Promise-based HTTP client for making API requests.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vite**: A fast build tool for modern web projects.
- **ESLint**: For linting and code quality.

### Backend

- **Node.js**: JavaScript runtime environment.
- **Express.js**: A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB**: A NoSQL database for storing user data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **bcryptjs**: For hashing passwords securely.
- **jsonwebtoken**: For implementing JSON Web Tokens (JWT) for authentication.
- **Passport.js**: Authentication middleware for Node.js, specifically for Google OAuth.
- **dotenv**: For loading environment variables from a `.env` file.
- **cors**: Node.js middleware for enabling Cross-Origin Resource Sharing.
- **express-session**: Simple session middleware for Express.
- **Nodemon**: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes are detected.

## Detailed Working

### User Authentication

The application provides robust user authentication mechanisms:

1.  **Email/Password Authentication**:

    - Users can sign up with a unique username, email, and password. Passwords are
      hashed using `bcryptjs` before being stored in MongoDB.
    - Existing users can log in using their registered email and password.
    - Upon successful login or signup, a JSON Web Token (JWT) is generated
      using `jsonwebtoken` and sent to the client. This token is then used
      to authenticate subsequent requests to protected routes.
    - Users can update their profile information (username and email) and
      delete their accounts, both requiring authentication via JWT.

2.  **Google OAuth Authentication**:
    - Users can also authenticate using their Google accounts.
    - The backend integrates `Passport.js` with a Google strategy to handle
      the OAuth flow.
    - Upon successful authentication with Google, a JWT is generated and
      redirected to the frontend with the token.

### Authorization

- A custom `auth` middleware is used on the backend to verify the JWT sent
  with requests to protected routes.
- If the token is valid, the user's information is attached to the request,
  allowing access to the protected resource.
- Frontend routes like `/dashboard` and `/blogs` are protected using a `PrivateRoute`
  component, which checks for the presence of a JWT in local storage before
  rendering the component. If no token is found, the user is redirected to the
  login page.

### User Management

- User data, including `username`, `email`, `userId`, `password` (hashed),
  and `googleId` (for Google authenticated users), is stored in a MongoDB
  database using Mongoose.
- Each user is assigned a unique `userId` upon registration.

### Blog Management

- The `Blogs` section of the application is currently under development.
  Users will be able to view, create, edit, and delete blog posts in the future.

## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- MongoDB instance (local or cloud-hosted)
- Google OAuth credentials (if using Google authentication)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd pro
    ```

2.  **Backend Setup:**

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory with the following variables:

    ```
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=a_strong_secret_key_for_jwt
    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    FRONTEND_URL=http://localhost:5173 (or your frontend's URL)
    PORT=5000
    ```

3.  **Frontend Setup:**
    ```bash
    cd ../frontend
    npm install
    ```

### Running the Application

1.  **Start the Backend:**

    ```bash
    cd backend
    npm start
    ```

    The backend server will run on `http://localhost:5000` (or your specified PORT).

2.  **Start the Frontend:**
    ```bash
    cd frontend
    npm run dev
    ```
    The frontend application will run on `http://localhost:5173` (or the URL provided by Vite).

## Future Enhancements

- Implementation of blog creation, editing, and deletion.
- User roles and permissions.
- Improved UI/UX for blog display and management.
- Integration with other social login providers.


**Link to Project** - 
    ```
    Deployed on Render
    ```
    Visit website at 'https://blogsforyou-2.onrender.com'
    Email us at `work.jadhavsaurabh@gmail.com`
