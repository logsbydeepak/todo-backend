# READ TODO

- **URL**

`DELETE /v1/todo`

`AUTHENTICATION`

- **URL Params**

  **Required:**

  `page="1"`
  `status="false"`

  **Value:**

  **page:** `integer value` or `0` to get all the todo

  **status:** `true` or `false`

- **Data Params**

None

- **Success Response:**

  - **Code:** 200

    **Content:**:

    ```json
    {
      "data": {
        [
          {
            "id": "61c9d2c3df3feac98cf40180",
            "task": "task 1",
            "status": true
          },
          {
            "id": "61c9d2cbdf3feac98cf40188",
            "task": "task 3",
            "status": true
          }
        ]
      }
    }
    ```
