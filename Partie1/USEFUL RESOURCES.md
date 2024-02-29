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
