# Axios

Axios is a promise based HTTP client for the browser and Node.js. It has a lot of features and is very easy to use. It is a great tool to make HTTP requests and interact with APIs[^1]

To install Axios, run the following command in your terminal:

```bash
npm install axios
```

Once you have installed Axios, you can use it to make requests to the backend. Here's an example of how to use Axios to make a ``POST`` request to the login endpoint:

```js
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
```js
<input
  type='email'
  id='email'
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className='border border-gray-300 rounded-md p-2'
/>
```

- A button with a background color and padding:
```js
<button type='submit' className='bg-blue-500 text-white p-2 rounded-md'>
  Login
</button>
```

| Class name | Description |
|------------|-------------|
| `border` | Add a border to an element |
| `border-gray-300` | Set the border color to gray-300 |
| `rounded-md` | Add rounded corners to an element |
| `p-2` | Add padding to an element |
| `bg-blue-500` | Set the background color to blue-500 |
| `text-white` | Set the text color to white |
| More classes :arrow_right: | [Tailwind CSS Documentation](https://tailwindcss.com/docs) |

# Set up React Router

To set up React Router[^2], you can use the `react-router-dom` npm package. This package provides easy-to-use utilities for routing in React applications.

For example, you can create a `Router` component in your `App.tsx` file and use the `Route` component to define the routes for your pages:

```js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />

        {/* Add more routes here */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;
```


# How to save the user's authentication state?

To save the user's authentication state in your React application, you can use the `react-auth-kit` npm package. This package provides easy-to-use utilities for managing user authentication and storing authentication tokens[^3] securely.

> [!NOTE]
> If you haven't installed `react-auth-kit` yet, you can install it by running ``npm install react-auth-kit`` in your terminal.

## Login
To implement the login functionality, use the `useSignIn` hook from `react-auth-kit` to sign in the user. For example:

```js
import useSignIn from 'react-auth-kit/hooks/useSignIn';


/* ... */

  const signIn = useSignIn();

  if(signIn({
    auth: {
      token: response.data.token,   // the token received from the backend
      type: 'Bearer'                // the type of the token (e.g., Bearer)
    },
    userState: {
      name: email                   // the user's name
    }
  })) {
    console.info('signIn success');
  } else {
    console.error('signIn failed');
  }

/* ... */
```

## Check authentication state

To check the user's authentication state, use the `useAuthUser` hook from `react-auth-kit` to get the user object. For example:

```js
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useAuthHeader from 'react-auth-kit/hooks/useAuthHeader';

/* ... */

  const user = useAuthUser();
  const authHeader = useAuthHeader();

  if (user) {
    console.log('User is authenticated:', user);
    console.log('Auth header:', authHeader);
  } else {
    console.log('User is not authenticated');
  }

/* ... */
```

## Logout

To implement the logout functionality, use the `useSignOut` hook from `react-auth-kit` to sign out the user. For example:

```js
import useSignOut from 'react-auth-kit/hooks/useSignOut';

/* ... */

  const signOut = useSignOut();

  signOut();

/* ... */
```

# How to use Heroicons?

You can use [Heroicons](https://heroicons.com/) to add beautiful icons to your application.

To use Heroicons, you can install the `@heroicons/react` npm package by running the following command in your terminal:

```bash
npm install @heroicons/react
```

Once you have installed Heroicons, you can use the `Icon` component to add icons to your application. For example:

```js
import { EyeIcon } from '@heroicons/react/24/solid';

function MyComponent() {
  return (
    <div>
      <EyeIcon className='w-6 h-6 text-red-500' />
    </div>
  );
}
```

In this example, we use the `EyeIcon` component from Heroicons to add an eye icon to the page. We use the `w-6` and `h-6` classes to set the width and height of the icon, and the `text-red-500`(``#ff0000``) class to set the color of the icon.


# CORS policy error

If you encounter a CORS policy error when making requests to the backend, follow these steps to resolve the issue:

1. Install the `cors` npm package in your backend project:
```bash
npm install cors
```

2. Use the `cors` middleware in your backend server to allow requests from your frontend application. For example:

```js
const cors = require('cors');

/* ... */

app.use(cors());

/* ... */
```

This will allow requests from your frontend application to your backend server and resolve the CORS policy error.
The provided backend code already includes the `cors` middleware, so you don't need to install it again.

> [!TIP]
> The [Heroicons documentation](https://heroicons.com/) is a great resource to refer to while working with Heroicons.

[^1]: [Axios Documentation](https://axios-http.com/docs/intro) - Axios is a promise based HTTP client for the browser and Node.js. It has a lot of features and is very easy to use. It is a great tool to make HTTP requests and interact with APIs.
[^2]: [React Router Documentation](https://reactrouter.com/web/guides/quick-start) - A route is a component that is rendered when its path matches the current URL. The Route component is the main building block of React Router. You can render a Route component by passing it a path prop to specify the URL path it should match, and a component prop to specify the component it should render when the URL matches the path.
[^3]: The token is a unique string that identifies the user and is used to authenticate the user's requests to the server. It is usually generated by the server and sent to the client when the user logs in. The client then sends the token with each request to the server to prove the user's identity.