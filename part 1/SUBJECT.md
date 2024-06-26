# Creating a new React project with JavaScript

In this section, we will create a new React project with JavaScript using the `create-react-app` tool. This tool allows us to quickly set up a new React project with all the necessary configurations and dependencies.

:arrow_right: Follow the steps described [here](INSTALL%20AND%20SETUP.md#set-up-a-react-project) to create a new React project with JavaScript.

Once you have set up the project, you can test it by running the development server and opening the application in your web browser.

```bash
npm start
```

This will start the development server and open the application in your default web browser.

<details>
  <summary>You should see the default React application running with JavaScript.</summary>
    <img src="assets/react-app.png" alt="React application running with JavaScript">
</details>

Now that we have set up the project, we need to setup Tailwind CSS for styling the application. We will cover this in the next section.

# Integrating Tailwind CSS for styling

In this section, we will integrate Tailwind CSS into our React project to style the application. Tailwind CSS is a utility-first CSS framework that allows us to quickly build custom designs without writing any CSS.

:arrow_right: Follow the steps described [here](INSTALL%20AND%20SETUP.md#add-tailwind-css) to integrate Tailwind CSS into your React project.

> [!NOTE]
> [Tailwind CSS Documentation](https://tailwindcss.com/docs) is a great resource you gonna need to refer to while working with Tailwind CSS.


# Creating the login and register pages

Now that we have set up our React project with JavaScript and integrated Tailwind CSS, let's create our first pages.

1. Install React Router ``npm install react-router-dom``  
2. Create a new folder named `pages` inside the `src` directory.  
3. Inside the pages folder, create two new files named `Login.js` and `Register.js`.

:arrow_right: Follow the steps described [here](USEFUL%20RESOURCES.md#set-up-react-router) to set up React Router.

## Login page

:checkered_flag: <u>Objectives of the login page</u>:
- Create a form with email and password fields
- Add validation for the form fields (e.g., required, email format)
- Handle form submission and display success or error messages


> [!TIP]
> Use the `useState` hook to manage the form state.  
> Use ``axios`` to make requests to the backend. [How to use axios?](USEFUL%20RESOURCES.md#axios).

> [!TIP]
> [How to save the user's authentication state?](USEFUL%20RESOURCES.md#how-to-save-the-users-authentication-state)

<details>
  <summary>If you need help, you can refer to the following example (SPOILER).</summary>

  ```js
    import React, { useState } from 'react';

    const Login = () => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
          setError('Please enter your email and password.');
        } else {
          // Handle form submission (e.g., make a request to the backend with axios)
          // ...
        }
      };

      return (
        <div>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='email'>Email</label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {/* Add password field */}
            <button type='submit'>Login</button>
          </form>
        </div>
      );
    };

    export default Login;
  ```
</details>

> [!TIP]
> [How to style your page using Tailwind CSS?](USEFUL%20RESOURCES.md#how-to-style-using-tailwind-css)


## Register page

:checkered_flag: <u>Objectives of the register page</u>:
- Create a form with email, password, and confirm password fields
- Add validation for the form fields (e.g., required, email format, password match)
- Handle form submission and display success or error messages

<details>
  <summary>If you need help, you can refer to the following example (SPOILER).</summary>

  ```js
    import React, { useState } from 'react';

    const Register = () => {
      const [email, setEmail] = useState('');
      // Add state for first name
      // Add state for last name
      // Add state for password
      // Add state for confirm password
      const [error, setError] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
          setError('Please enter your email, password, and confirm password.');
        } else if (password !== confirmPassword) {
          setError('Passwords do not match.');
        } else {
          // Handle form submission (e.g., make a request to the backend with axios)
          // ...
        }
      };

      return (
        <div>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor='name'>First Name</label>
              <input
                type='text'
                id='firstname'
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            {/* Add last name field */}
            {/* Add email field */}
            {/* Add password field */}
            {/* Add confirm password field */}
            <button type='submit'>Register</button>
          </form>
        </div>
      );
    };

    export default Register;
  ```
</details>

# Home and not found pages

## Home page

:checkered_flag: <u>Objectives of the home page</u>:
- Create a simple home page with a welcome message and a link to the login page
- Add a navigation bar with links to the login and register pages

<details>
  <summary>If you need help, you can refer to the following example (SPOILER).</summary>

  ```js
    import React from 'react';
    import { Link } from 'react-router-dom';

    const Home = () => {
      return (
        <div>
          <h1>Welcome to EpyTodo!</h1>
          <p>
            Please <Link to='/login'>login</Link> or <Link to='/register'>register</Link> to get started.
          </p>
        </div>
      );
    };

    export default Home;
  ```
</details>

## Not found page

:checkered_flag: <u>Objectives of the not found page</u>:
- Create a simple 404 page with a message indicating that the page was not found
- Add a link to the home page

<details>
  <summary>If you need help, you can refer to the following example (SPOILER).</summary>

  ```js
    import React from 'react';
    import { Link } from 'react-router-dom';

    const NotFound = () => {
      return (
        <div>
          <h1>404 - Page Not Found</h1>
          <p>The page you are looking for does not exist.</p>
          <p>
            <Link to='/'>Go to the home page</Link>
          </p>
        </div>
      );
    };

    export default NotFound;
  ```
</details>




> [!TIP]
> _:sparkles: **Congratulations!** You have successfully created the login, register, home, and not found pages for your React application. Now you can customize the pages and add more features to your application or create a custom design using Tailwind CSS and [Heroicons](USEFUL%20RESOURCES.md#how-to-use-heroicons) icons. If you need help, you can refer to the [USEFUL RESOURCES](USEFUL%20RESOURCES.md) guide for more information and examples._
