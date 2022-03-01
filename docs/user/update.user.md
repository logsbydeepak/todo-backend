# UPDATE USER

- **URL**

  `PUT /v1/user` <br/>
  `AUTHORIZATION`

- **URL Params** <br/>
  None

- **Data Params**

  ```json
  {
    "currentPassword": "Password@1!",
    "toUpdate": "email",
    "email": "test1@email.com"
  }
  ```

  **Value: ** <br/>
  **toUpdate:** `name` or `email` or `password`

- **Success Response:**

  - **Code:** 200 <br/>
    **Content:**

    ```json
    {
      "data": {
        "name": "test user",
        "email": "test1@email.com"
      }
    }
    ```
