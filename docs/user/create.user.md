# CREATE USER - SignUp

- **URL**

  `POST /v1/user`
  `AUTHENTICATION`

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

  - **Code:** 201 <br/>
    **Content:**

    ```json
    {
      "data": {
        "name": "test user",
        "email": "test@email.com"
      }
    }
    ```
