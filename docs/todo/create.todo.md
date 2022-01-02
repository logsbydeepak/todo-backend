# CREATE TODO

- **URL**

  `POST /v1/todo` <br/>
  `AUTHENTICATION`

- **URL Params** <br/>
  None

- **Data Params**

  ```json
  {
    "task": "task 1",
    "status": true
  }
  ```

  **Value:**<br/>
  **status:** `true` or `false`

- **Success Response:**

  - **Code:** 201 <br/>
    **Content:**

    ```json
    {
      "data": {
        "id": "61c9d2c3df3feac98cf40180",
        "task": "task 1",
        "status": true
      }
    }
    ```
