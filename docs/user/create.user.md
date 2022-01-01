# Create User

Create new user

- **URL**

`POST /v1/user`

- **URL Params**

  None

- **Data Params**

```json
{
  "name": "test user",
  "email": "test@email.com",
  "password": "Password@1!"
}
```

- **Success Response:**

  - **Code:** 201

    **Content:**

    ```json
    {
      "data": {
        "name": "test user",
        "email": "test@email.com"
      }
    }
    ```
