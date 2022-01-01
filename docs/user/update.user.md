# UPDATE USER

- **URL**

`PUT /v1/user`

`AUTHENTICATION`

- **URL Params**

  None

- **Data Params**

```json
{
  "currentPassword": "Password@1!",
  "toUpdate": "email",
  "email": "test1@email.com"
}
```

**VALUE**

**toUpdate:** `name` or `email` or `password`

- **Success Response:**

  - **Code:** 200

    **Content:**

    ```json
    {
      "data": {
        "name": "test user",
        "email": "test1@email.com"
      }
    }
    ```
