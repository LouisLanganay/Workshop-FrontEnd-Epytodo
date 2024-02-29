# Axios

Axios is a promise based HTTP client for the browser and Node.js. It has a lot of features and is very easy to use. It is a great tool to make HTTP requests and interact with APIs.

To install Axios, run the following command in your terminal:

```bash
npm install axios
```

Once you have installed Axios, you can use it to make requests to the backend. Here's an example of how to use Axios to make a ``POST`` request to the login endpoint:

```tsx
import axios from 'axios';

const fetchData = async () => {
  try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
```

In this example, we use the ``axios.post`` method to make a ``POST`` request to the ``http://localhost:3000/login`` endpoint with the email and password as the request body. We use the ``await`` keyword to wait for the response, and then we log the response data to the console. If there is an error, we catch it and log it to the console.

### How to know if the request was successful or not?
You can check the status code of the response ``response.status`` to know if the request was successful or not.

> [!TIP]
> The [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) documentation is a great resource to refer to while working with HTTP requests.


# How to style using Tailwind CSS?

You can use [Tailwind CSS classes](https://tailwindcss.com/docs) to style the page.  
Some examples:

- An input field with a border and padding:
```tsx
<input
  type='email'
  id='email'
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className='border border-gray-300 rounded-md p-2'
/>
```

- A button with a background color and padding:
```tsx
<button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>
  Login
</button>
```

# Set up React Router

To set up React Router, you can use the `react-router-dom` npm package. This package provides easy-to-use utilities for routing in React applications.

For example, you can create a `Router` component in your `App.tsx` file and use the `Route` component to define the routes for your pages:

```tsx
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />

        {/* Add more routes here */}

      </Switch>
    </Router>
  );
}

export default App;
```


# How to save the user's authentication state?

To save the user's authentication state in your React application, you can use the `react-auth-kit` npm package. This package provides easy-to-use utilities for managing user authentication and storing authentication tokens securely.

> [!NOTE]
> If you haven't installed `react-auth-kit` yet, you can install it by running ``npm install react-auth-kit`` in your terminal.

## Login
To implement the login functionality, use the `useSignIn` hook from `react-auth-kit` to sign in the user. For example:

```tsx
import { useSignIn } from 'react-auth-kit';

/* ... */

  const signIn = useSignIn();

  if (signIn({
    token: userToken,     // the token you get from the backend
    expiresIn: 43200,     // the token expiration time in seconds
    tokenType: 'Bearer',  // the token type (e.g., Bearer, JWT)
    //authState: user     // the user object (optional)
  })) {
    console.info('signIn success');
  } else {
    console.error('signIn failed');
  }

/* ... */
```

## Check authentication state

To check the user's authentication state, use the `useAuthUser` hook from `react-auth-kit` to get the user object. For example:

```tsx
import { useAuthUser } from 'react-auth-kit';

export function AuthUser() {
  const auth = useAuthUser();
  const user = auth();
  const origin = window.location.origin;

  if (!user)
    return null;
  return user;
}
```

## Logout

To implement the logout functionality, use the `useSignOut` hook from `react-auth-kit` to sign out the user. For example:

```tsx
import { useSignOut } from 'react-auth-kit';

/* ... */

  const signOut = useSignOut();

  signOut();

/* ... */
```


