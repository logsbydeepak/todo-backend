# UPDATE USER

- **URL**

  `PUT /v1/todo` <br/>
  `AUTHENTICATION`

- **URL Params** <br/>
  None

- **Data Params**

  ```json
  {
    "id": "61c9d2c3df3feac98cf40180",
    "task": "task 2",
    "status": false
  }
  ```

**Value:**

**status:** `true` or `false`

- **Success Response:**

  - **Code:** 201

    **Content:**

    ```json
    {
      "data": {
        "id": "61c9d2c3df3feac98cf40180",
        "task": "task 2",
        "status": false
      }
    }
    ```
