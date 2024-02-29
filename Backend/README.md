# How to run API ?

To launch this API run the following command at ``.``

```bash
sudo docker-compose up --build
```

# Routes

| Route         | Method | Protected | Description                    |
|---------------|--------|-----------|--------------------------------|
| `/register`     | POST   |         | Register a new user            |
| `/login`        | POST   |         | Connect a user                 |
| `/user`         | GET    | :lock:       | View all user information      |
| `/user/todos`   | GET    | :lock:       | View all user tasks            |
| `/users/:id or :email` | GET    | :lock:       | View user information          |
| `/users/:id`    | PUT    | :lock:       | Update user information        |
| `/users/:id`    | DELETE | :lock:       | Delete user                    |
| `/todos`        | GET    | :lock:       | View all the todos             |
| `/todos/:id`    | GET    | :lock:       | View the todo                  |
| `/todos`        | POST   | :lock:       | Create a todo                  |
| `/todos/:id`    | PUT    | :lock:       | Update a todo                  |
| `/todos/:id`    | DELETE | :lock:       | Delete a todo                  |

# Authentication methode
We using [bearer token](https://learning.postman.com/docs/sending-requests/authorization/#bearer-token) to protect our routes. You can get your token with `/login` in the body response.
```txt
Authorization: Bearer <token>
```

# Returns Codes

| Status               | Message                         | Code |
|----------------------|---------------------------------|------|
| Ok                   | OK                              | 200  |
| Created              | Created                         | 201  |
| Bad Request          | Bad Request                     | 400  |
| Unauthorized         | Unauthorized                    | 401  |
| Forbidden            | Forbidden                       | 403  |
| Not Found            | Not Found                       | 404  |
| Conflict             | Conflict                        | 409  |
| Internal Server Error| Internal Server Error           | 500  |

## Authors

- [@L.Langanay](https://github.com/LouisLanganay)
- [@Jean-Yanis Jeffroy](https://github.com/neo-jgrec)


> [!CAUTION]
> This code is not yours, do not use it for the evaluation of the project. It is only for the workshop.
