# CREATE SESSION

- **URL**

  `POST /v1/session` <br/>
  `AUTHENTICATION`

- **URL Params** <br/>
  None

- **Data Params**

  ```json
  {
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
