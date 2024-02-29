# Axios

Axios is a promise based HTTP client for the browser and Node.js. It has a lot of features and is very easy to use. It is a great tool to make HTTP requests and interact with APIs[^1]

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

To save the user's authentication state in your React application, you can use the `react-auth-kit` npm package. This package provides easy-to-use utilities for managing user authentication and storing authentication tokens[^3] securely.

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

# How to use Heroicons?

You can use [Heroicons](https://heroicons.com/) to add beautiful icons to your application.

To use Heroicons, you can install the `@heroicons/react` npm package by running the following command in your terminal:

```bash
npm install @heroicons/react
```

Once you have installed Heroicons, you can use the `Icon` component to add icons to your application. For example:

```tsx
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

> [!TIP]
> The [Heroicons documentation](https://heroicons.com/) is a great resource to refer to while working with Heroicons.

[^1]: [Axios Documentation](https://axios-http.com/docs/intro) - Axios is a promise based HTTP client for the browser and Node.js. It has a lot of features and is very easy to use. It is a great tool to make HTTP requests and interact with APIs.
[^2]: [React Router Documentation](https://reactrouter.com/web/guides/quick-start) - A route is a component that is rendered when its path matches the current URL. The Route component is the main building block of React Router. You can render a Route component by passing it a path prop to specify the URL path it should match, and a component prop to specify the component it should render when the URL matches the path.
[^3]: The token is a unique string that identifies the user and is used to authenticate the user's requests to the server. It is usually generated by the server and sent to the client when the user logs in. The client then sends the token with each request to the server to prove the user's identity.